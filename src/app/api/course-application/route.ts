import { NextResponse } from "next/server";
import { verifyTurnstile, getClientIp } from "@/lib/turnstile";
import { supabase } from "@/lib/supabase";

const LEVEL_LABELS: Record<string, string> = {
    beginner: "Začiatočník",
    intermediate: "Mierne pokročilá",
    advanced: "Pokročilá",
};

// Handles a course (kurz) application: anti-bot check -> save to CMS
// (viktorija_course_applications) -> email confirmation to the academy inbox.
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            courseName,
            selectedTerm,
            name,
            email,
            phone,
            instagram,
            facebook,
            experienceLevel,
            practiceScope,
            worksInBeauty,
            beautyField,
            turnstileToken,
            privacyConsent,
        } = body;

        // Anti-bot verification (Cloudflare Turnstile)
        const human = await verifyTurnstile(turnstileToken, getClientIp(request));
        if (!human) {
            return NextResponse.json({ error: "Overenie proti robotom zlyhalo. Skúste to znova." }, { status: 400 });
        }

        if (!name || !email || !phone || !courseName) {
            return NextResponse.json({ error: "Chýbajú povinné polia." }, { status: 400 });
        }

        if (privacyConsent !== true) {
            return NextResponse.json({ error: "Súhlas so spracovaním osobných údajov je povinný." }, { status: 400 });
        }

        const extraData = {
            instagram: instagram || null,
            facebook: facebook || null,
            experience_level: experienceLevel,
            practice_scope: practiceScope || null,
            works_in_beauty: worksInBeauty,
            beauty_field: beautyField || null,
            privacy_consent: true,
        };

        // 1. Save to CMS
        const { error: dbError } = await supabase.from("viktorija_course_applications").insert({
            course_name: courseName,
            client_name: name,
            client_email: email,
            client_phone: phone,
            message: JSON.stringify(extraData),
            selected_term: selectedTerm,
        });
        if (dbError) {
            console.error("Course application DB insert failed:", dbError);
            return NextResponse.json({ error: "Nepodarilo sa uložiť prihlášku." }, { status: 500 });
        }

        // 2. Email confirmation (best-effort — never block a saved application)
        try {
            const apiKey = process.env.SMTP2GO_API_KEY;
            const sender = process.env.SMTP2GO_SENDER;
            const recipient = process.env.COURSE_FORM_RECIPIENT || "viktorijakendra.pmu@gmail.com";

            if (apiKey && sender) {
                const lvl = experienceLevel ? LEVEL_LABELS[experienceLevel] || experienceLevel : "Neuvedené";
                const beauty =
                    worksInBeauty === true
                        ? `Áno${beautyField ? ` (${beautyField})` : ""}`
                        : worksInBeauty === false
                          ? "Nie"
                          : "Neuvedené";

                const textBody =
                    `Nová prihláška na kurz\n\n` +
                    `Kurz: ${courseName}\nTermín: ${selectedTerm || "Neuvedené"}\n\n` +
                    `Meno: ${name}\nEmail: ${email}\nTelefón: ${phone}\n` +
                    `Instagram: ${instagram || "Neuvedené"}\nFacebook: ${facebook || "Neuvedené"}\n\n` +
                    `Úroveň zručnosti: ${lvl}\n` +
                    `Rozsah praxe (klientiek mesačne): ${practiceScope || "Neuvedené"}\n` +
                    `Pracuje v skrášľujúcich službách: ${beauty}\n` +
                    `Súhlas so spracovaním osobných údajov: áno`;

                const htmlBody = `
                    <h3>Nová prihláška na kurz</h3>
                    <p><strong>Kurz:</strong> ${courseName}</p>
                    <p><strong>Termín:</strong> ${selectedTerm || "Neuvedené"}</p>
                    <hr />
                    <p><strong>Meno:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Telefón:</strong> ${phone}</p>
                    <p><strong>Instagram:</strong> ${instagram || "<em>Neuvedené</em>"}</p>
                    <p><strong>Facebook:</strong> ${facebook || "<em>Neuvedené</em>"}</p>
                    <hr />
                    <p><strong>Úroveň zručnosti:</strong> ${lvl}</p>
                    <p><strong>Rozsah praxe (klientiek mesačne):</strong> ${practiceScope || "<em>Neuvedené</em>"}</p>
                    <p><strong>Pracuje v skrášľujúcich službách:</strong> ${beauty}</p>
                    <p><strong>Súhlas so spracovaním osobných údajov:</strong> áno</p>
                `;

                await fetch("https://api.smtp2go.com/v3/email/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        api_key: apiKey,
                        sender,
                        to: [recipient],
                        subject: `Nová prihláška na kurz: ${courseName} — ${name}`,
                        text_body: textBody,
                        html_body: htmlBody,
                        custom_headers: [{ header: "Reply-To", value: `${name} <${email}>` }],
                    }),
                });
            } else {
                console.error("Missing SMTP2GO configuration — course email skipped.");
            }
        } catch (emailErr) {
            console.error("Course application email failed:", emailErr);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Course application error:", error);
        return NextResponse.json({ error: "Interná chyba servera." }, { status: 500 });
    }
}
