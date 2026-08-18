import { NextResponse } from "next/server";
import { verifyTurnstile, getClientIp } from "@/lib/turnstile";
import { supabase } from "@/lib/supabase";
import { escapeHtml, sendEmail, confirmationLayout, CONFIRMATION_TEXT_FOOTER } from "@/lib/email";

export async function POST(request: Request) {
    try {
        const {
            name,
            email,
            phone,
            position,
            topics,
            question,
            privacyConsent,
            marketingConsent,
            turnstileToken,
        } = await request.json();

        const human = await verifyTurnstile(turnstileToken, getClientIp(request));
        if (!human) {
            return NextResponse.json({ error: "Overenie proti robotom zlyhalo. Skúste to znova." }, { status: 400 });
        }

        if (!name || !email || !phone || !position) {
            return NextResponse.json({ error: "Chýbajú povinné polia." }, { status: 400 });
        }

        if (privacyConsent !== true) {
            return NextResponse.json({ error: "Súhlas so spracovaním osobných údajov je povinný." }, { status: 400 });
        }

        const safeTopics = Array.isArray(topics) ? topics : [];
        const courseName = "LIVE webinar: Permanentný make-up 2027";
        const selectedTerm = "14. 9. 2026 | 19:00 | LIVE";
        const extraData = {
            type: "webinar_registration",
            position,
            topics: safeTopics,
            question: question || null,
            privacy_consent: true,
            marketing_consent: marketingConsent === true,
        };

        const { error: dbError } = await supabase.from("viktorija_course_applications").insert({
            course_name: courseName,
            client_name: name,
            client_email: email,
            client_phone: phone,
            message: JSON.stringify(extraData),
            selected_term: selectedTerm,
        });

        if (dbError) {
            console.error("Webinar registration DB insert failed:", dbError);
            return NextResponse.json({ error: "Nepodarilo sa uložiť registráciu." }, { status: 500 });
        }

        try {
            const recipient = process.env.COURSE_FORM_RECIPIENT || "viktorijakendra.pmu@gmail.com";

            const topicsText = safeTopics.length ? safeTopics.join(", ") : "Neuvedené";

            // Notification to the academy
            const textBody =
                `Nová registrácia na LIVE webinar\n\n` +
                `Webinar: Permanentný make-up 2027\n` +
                `Termín: ${selectedTerm}\n\n` +
                `Meno: ${name}\n` +
                `Email: ${email}\n` +
                `Telefón: ${phone}\n\n` +
                `Kde sa momentálne nachádza: ${position}\n` +
                `Zaujíma ju: ${topicsText}\n` +
                `Otázka: ${question || "Neuvedené"}\n\n` +
                `Súhlas so spracovaním osobných údajov: áno\n` +
                `Marketingový súhlas: ${marketingConsent === true ? "áno" : "nie"}`;

            const htmlBody = `
                <h3>Nová registrácia na LIVE webinar</h3>
                <p><strong>Webinar:</strong> Permanentný make-up 2027</p>
                <p><strong>Termín:</strong> ${selectedTerm}</p>
                <hr />
                <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                <p><strong>Telefón:</strong> ${escapeHtml(phone)}</p>
                <hr />
                <p><strong>Kde sa momentálne nachádza:</strong> ${escapeHtml(position)}</p>
                <p><strong>Zaujíma ju:</strong> ${escapeHtml(topicsText)}</p>
                <p><strong>Otázka:</strong> ${question ? escapeHtml(question) : "<em>Neuvedené</em>"}</p>
                <hr />
                <p><strong>Súhlas so spracovaním osobných údajov:</strong> áno</p>
                <p><strong>Marketingový súhlas:</strong> ${marketingConsent === true ? "áno" : "nie"}</p>
            `;

            await sendEmail({
                to: recipient,
                subject: `Nová registrácia na webinar — ${name}`,
                textBody,
                htmlBody,
                replyTo: `${name} <${email}>`,
                label: "webinar admin",
            });

            // Confirmation to the registrant
            const confirmationText =
                `Dobrý deň,\n\n` +
                `ďakujeme za registráciu na LIVE webinar Permanentný make-up 2027.\n\n` +
                `Termín: ${selectedTerm}\n` +
                `Téma: Nová generácia techník, vzdelávania a PMU biznisu\n\n` +
                `Link na pripojenie k LIVE webináru vám pošleme pred jeho začiatkom na tento e-mail.\n\n` +
                `Tešíme sa na vás,\n` +
                `Viktorija Kendra Academy` +
                CONFIRMATION_TEXT_FOOTER;

            const confirmationHtml = confirmationLayout(
                "Ďakujeme za registráciu",
                `
                    <p>Dobrý deň,</p>
                    <p>ďakujeme za registráciu na LIVE webinar <strong>Permanentný make-up 2027</strong>.</p>
                    <p><strong>Termín:</strong> ${selectedTerm}</p>
                    <p><strong>Téma:</strong> Nová generácia techník, vzdelávania a PMU biznisu</p>
                    <p>Link na pripojenie k LIVE webináru vám pošleme pred jeho začiatkom na tento e-mail.</p>
                    <br />
                    <p>Tešíme sa na vás,<br />Viktorija Kendra Academy</p>
                `
            );

            await sendEmail({
                to: email,
                subject: "Potvrdenie registrácie: LIVE webinar Permanentný make-up 2027",
                textBody: confirmationText,
                htmlBody: confirmationHtml,
                label: "webinar confirmation",
            });
        } catch (emailErr) {
            console.error("Webinar registration email failed:", emailErr);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webinar registration error:", error);
        return NextResponse.json({ error: "Interná chyba servera." }, { status: 500 });
    }
}
