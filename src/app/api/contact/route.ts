import { NextResponse } from "next/server";
import { verifyTurnstile, getClientIp } from "@/lib/turnstile";
import { supabase } from "@/lib/supabase";
import { escapeHtml, sendEmail, hasEmailConfig, confirmationLayout, CONFIRMATION_TEXT_FOOTER } from "@/lib/email";

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

        const recipient = process.env.CONTACT_FORM_RECIPIENT;

        if (!hasEmailConfig() || !recipient) {
            console.error("Missing SMTP2GO configuration variables.");
            return NextResponse.json(
                { error: "Konfigurácia e-mailového odosielateľa chýba." },
                { status: 500 }
            );
        }

        // Notification to the salon — a failure here is reported to the sender.
        const sent = await sendEmail({
            to: recipient,
            subject: `Nová správa z kontaktného formulára od: ${name}`,
            textBody: `Nová kontaktná správa z webu:\n\nMeno: ${name}\nEmail: ${email}\nTelefón: ${phone || "Neuvedené"}\nSúhlas so spracovaním osobných údajov: áno\n\nSpráva:\n${message}`,
            htmlBody: `
                <h3>Nová kontaktná správa z webu</h3>
                <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                <p><strong>Telefón:</strong> ${phone ? escapeHtml(phone) : "<em>Neuvedené</em>"}</p>
                <p><strong>Súhlas so spracovaním osobných údajov:</strong> áno</p>
                <br />
                <p><strong>Správa:</strong></p>
                <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #b68d57; border-radius: 4px;">${escapeHtml(message)}</p>
            `,
            replyTo: `${name} <${email}>`,
            label: "contact admin",
        });

        if (!sent) {
            return NextResponse.json(
                { error: "Chyba pri odosielaní e-mailu." },
                { status: 500 }
            );
        }

        // Confirmation to the sender (best-effort — the message is already delivered).
        const confirmationText =
            `Dobrý deň,\n\n` +
            `ďakujeme za vašu správu. Prijali sme ju a ozveme sa vám čo najskôr.\n\n` +
            `Vaša správa:\n${message}\n\n` +
            `S pozdravom,\n` +
            `Viktorija Kendra` +
            CONFIRMATION_TEXT_FOOTER;

        const confirmationHtml = confirmationLayout(
            "Ďakujeme za vašu správu",
            `
                <p>Dobrý deň,</p>
                <p>ďakujeme za vašu správu. Prijali sme ju a ozveme sa vám čo najskôr.</p>
                <p><strong>Vaša správa:</strong></p>
                <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #b68d57; border-radius: 4px;">${escapeHtml(message)}</p>
                <br />
                <p>S pozdravom,<br />Viktorija Kendra</p>
            `
        );

        await sendEmail({
            to: email,
            subject: "Potvrdenie: prijali sme vašu správu",
            textBody: confirmationText,
            htmlBody: confirmationHtml,
            label: "contact confirmation",
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Interná chyba servera." },
            { status: 500 }
        );
    }
}
