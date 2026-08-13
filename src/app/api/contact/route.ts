import { NextResponse } from "next/server";
import { verifyTurnstile, getClientIp } from "@/lib/turnstile";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const { name, email, phone, message, turnstileToken, privacyConsent } = await request.json();

        // Anti-bot verification (Cloudflare Turnstile)
        const human = await verifyTurnstile(turnstileToken, getClientIp(request));
        if (!human) {
            return NextResponse.json(
                { error: "Overenie proti robotom zlyhalo. Skúste to znova." },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Meno, email a správa sú povinné polia." },
                { status: 400 }
            );
        }

        if (privacyConsent !== true) {
            return NextResponse.json(
                { error: "Súhlas so spracovaním osobných údajov je povinný." },
                { status: 400 }
            );
        }

        // Save to CMS (viktorija_contact_messages) so it shows in the admin "Messages"
        // tab. Best-effort: a DB failure must not prevent the email from being sent.
        try {
            const { error: dbError } = await supabase
                .from("viktorija_contact_messages")
                .insert({ name, email, phone: phone || null, message });
            if (dbError) console.error("Failed to save contact message to Supabase:", dbError);
        } catch (dbErr) {
            console.error("Supabase contact insert threw:", dbErr);
        }

        const apiKey = process.env.SMTP2GO_API_KEY;
        const recipient = process.env.CONTACT_FORM_RECIPIENT;
        const sender = process.env.SMTP2GO_SENDER;

        if (!apiKey || !recipient || !sender) {
            console.error("Missing SMTP2GO configuration variables.");
            return NextResponse.json(
                { error: "Konfigurácia e-mailového odosielateľa chýba." },
                { status: 500 }
            );
        }

        const payload = {
            api_key: apiKey,
            sender: sender,
            to: [recipient],
            subject: `Nová správa z kontaktného formulára od: ${name}`,
            text_body: `Nová kontaktná správa z webu:\n\nMeno: ${name}\nEmail: ${email}\nTelefón: ${phone || "Neuvedené"}\nSúhlas so spracovaním osobných údajov: áno\n\nSpráva:\n${message}`,
            html_body: `
                <h3>Nová kontaktná správa z webu</h3>
                <p><strong>Meno:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Telefón:</strong> ${phone || "<em>Neuvedené</em>"}</p>
                <p><strong>Súhlas so spracovaním osobných údajov:</strong> áno</p>
                <br />
                <p><strong>Správa:</strong></p>
                <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #b68d57; border-radius: 4px;">${message}</p>
            `,
            custom_headers: [
                {
                    header: "Reply-To",
                    value: `${name} <${email}>`
                }
            ]
        };

        const response = await fetch("https://api.smtp2go.com/v3/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok || data.data?.error) {
            console.error("SMTP2GO send error:", data);
            return NextResponse.json(
                { error: "Chyba pri odosielaní e-mailu." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Interná chyba servera." },
            { status: 500 }
        );
    }
}
