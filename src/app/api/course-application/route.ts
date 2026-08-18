import { NextResponse } from "next/server";
import { verifyTurnstile, getClientIp } from "@/lib/turnstile";
import { supabase } from "@/lib/supabase";
import { escapeHtml, sendEmail, confirmationLayout, CONFIRMATION_TEXT_FOOTER } from "@/lib/email";

const LEVEL_LABELS: Record<string, string> = {
    beginner: "Začiatočník",
    intermediate: "Mierne pokročilá",
    advanced: "Pokročilá",
};

// Handles a course (kurz) application: anti-bot check -> save to CMS
// (viktorija_course_applications) -> notification to the academy inbox and a
// confirmation to the applicant.
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

        // 2. Emails (best-effort — never block a saved application)
        try {
            const recipient = process.env.COURSE_FORM_RECIPIENT || "viktorijakendra.pmu@gmail.com";

            const lvl = experienceLevel ? LEVEL_LABELS[experienceLevel] || experienceLevel : "Neuvedené";
            const beauty =
                worksInBeauty === true
                    ? `Áno${beautyField ? ` (${beautyField})` : ""}`
                    : worksInBeauty === false
                      ? "Nie"
                      : "Neuvedené";
            const termLabel = selectedTerm || "Neuvedené";

            // 2a. Notification to the academy
            const textBody =
                `Nová prihláška na kurz\n\n` +
                `Kurz: ${courseName}\nTermín: ${termLabel}\n\n` +
                `Meno: ${name}\nEmail: ${email}\nTelefón: ${phone}\n` +
                `Instagram: ${instagram || "Neuvedené"}\nFacebook: ${facebook || "Neuvedené"}\n\n` +
                `Úroveň zručnosti: ${lvl}\n` +
                `Rozsah praxe (klientiek mesačne): ${practiceScope || "Neuvedené"}\n` +
                `Pracuje v skrášľujúcich službách: ${beauty}\n` +
                `Súhlas so spracovaním osobných údajov: áno`;

            const htmlBody = `
                <h3>Nová prihláška na kurz</h3>
                <p><strong>Kurz:</strong> ${escapeHtml(courseName)}</p>
                <p><strong>Termín:</strong> ${escapeHtml(termLabel)}</p>
                <hr />
                <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                <p><strong>Telefón:</strong> ${escapeHtml(phone)}</p>
                <p><strong>Instagram:</strong> ${instagram ? escapeHtml(instagram) : "<em>Neuvedené</em>"}</p>
                <p><strong>Facebook:</strong> ${facebook ? escapeHtml(facebook) : "<em>Neuvedené</em>"}</p>
                <hr />
                <p><strong>Úroveň zručnosti:</strong> ${escapeHtml(lvl)}</p>
                <p><strong>Rozsah praxe (klientiek mesačne):</strong> ${practiceScope ? escapeHtml(practiceScope) : "<em>Neuvedené</em>"}</p>
                <p><strong>Pracuje v skrášľujúcich službách:</strong> ${escapeHtml(beauty)}</p>
                <p><strong>Súhlas so spracovaním osobných údajov:</strong> áno</p>
            `;

            await sendEmail({
                to: recipient,
                subject: `Nová prihláška na kurz: ${courseName} — ${name}`,
                textBody,
                htmlBody,
                replyTo: `${name} <${email}>`,
                label: "course admin",
            });

            // 2b. Confirmation to the applicant
            const confirmationText =
                `Dobrý deň,\n\n` +
                `ďakujeme za vašu prihlášku na kurz ${courseName}.\n\n` +
                `Kurz: ${courseName}\n` +
                `Termín: ${termLabel}\n\n` +
                `Vašu prihlášku sme prijali a čoskoro vás budeme kontaktovať s ďalšími informáciami ` +
                `o priebehu kurzu a platbe.\n\n` +
                `Tešíme sa na vás,\n` +
                `Viktorija Kendra Academy` +
                CONFIRMATION_TEXT_FOOTER;

            const confirmationHtml = confirmationLayout(
                "Ďakujeme za vašu prihlášku",
                `
                    <p>Dobrý deň,</p>
                    <p>ďakujeme za vašu prihlášku na kurz <strong>${escapeHtml(courseName)}</strong>.</p>
                    <p><strong>Kurz:</strong> ${escapeHtml(courseName)}</p>
                    <p><strong>Termín:</strong> ${escapeHtml(termLabel)}</p>
                    <p>Vašu prihlášku sme prijali a čoskoro vás budeme kontaktovať s ďalšími informáciami o priebehu kurzu a platbe.</p>
                    <br />
                    <p>Tešíme sa na vás,<br />Viktorija Kendra Academy</p>
                `
            );

            await sendEmail({
                to: email,
                subject: `Potvrdenie prihlášky na kurz: ${courseName}`,
                textBody: confirmationText,
                htmlBody: confirmationHtml,
                label: "course confirmation",
            });
        } catch (emailErr) {
            console.error("Course application email failed:", emailErr);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Course application error:", error);
        return NextResponse.json({ error: "Interná chyba servera." }, { status: 500 });
    }
}
