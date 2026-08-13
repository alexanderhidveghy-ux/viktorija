import { NextResponse } from "next/server";
import { verifyTurnstile, getClientIp } from "@/lib/turnstile";
import { supabase } from "@/lib/supabase";

function escapeHtml(value: unknown): string {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

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
            const apiKey = process.env.SMTP2GO_API_KEY;
            const sender = process.env.SMTP2GO_SENDER;
            const recipient = process.env.COURSE_FORM_RECIPIENT || "viktorijakendra.pmu@gmail.com";

            if (apiKey && sender) {
                const topicsText = safeTopics.length ? safeTopics.join(", ") : "Neuvedené";
                const safeName = escapeHtml(name);
                const safeEmail = escapeHtml(email);
                const safePhone = escapeHtml(phone);
                const safePosition = escapeHtml(position);
                const safeTopicsText = escapeHtml(topicsText);
                const safeQuestion = question ? escapeHtml(question) : "<em>Neuvedené</em>";
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
                    <p><strong>Meno:</strong> ${safeName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
                    <p><strong>Telefón:</strong> ${safePhone}</p>
                    <hr />
                    <p><strong>Kde sa momentálne nachádza:</strong> ${safePosition}</p>
                    <p><strong>Zaujíma ju:</strong> ${safeTopicsText}</p>
                    <p><strong>Otázka:</strong> ${safeQuestion}</p>
                    <hr />
                    <p><strong>Súhlas so spracovaním osobných údajov:</strong> áno</p>
                    <p><strong>Marketingový súhlas:</strong> ${marketingConsent === true ? "áno" : "nie"}</p>
                `;

                const adminResponse = await fetch("https://api.smtp2go.com/v3/email/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        api_key: apiKey,
                        sender,
                        to: [recipient],
                        subject: `Nová registrácia na webinar — ${name}`,
                        text_body: textBody,
                        html_body: htmlBody,
                        custom_headers: [{ header: "Reply-To", value: `${name} <${email}>` }],
                    }),
                });

                const adminData = await adminResponse.json().catch(() => null);
                if (!adminResponse.ok || adminData?.data?.error) {
                    console.error("SMTP2GO webinar admin email error:", adminData);
                }

                const confirmationText =
                    `Dobrý deň,\n\n` +
                    `ďakujeme za registráciu na LIVE webinar Permanentný make-up 2027.\n\n` +
                    `Termín: ${selectedTerm}\n` +
                    `Téma: Nová generácia techník, vzdelávania a PMU biznisu\n\n` +
                    `Link na pripojenie k LIVE webináru vám pošleme pred jeho začiatkom na tento e-mail.\n\n` +
                    `Tešíme sa na vás,\n` +
                    `Viktorija Kendra Academy`;

                const confirmationHtml = `
                    <div style="font-family: Arial, sans-serif; color: #1D0E22; line-height: 1.6;">
                        <h2 style="font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Ďakujeme za registráciu</h2>
                        <p>Dobrý deň,</p>
                        <p>ďakujeme za registráciu na LIVE webinar <strong>Permanentný make-up 2027</strong>.</p>
                        <p><strong>Termín:</strong> ${selectedTerm}</p>
                        <p><strong>Téma:</strong> Nová generácia techník, vzdelávania a PMU biznisu</p>
                        <p>Link na pripojenie k LIVE webináru vám pošleme pred jeho začiatkom na tento e-mail.</p>
                        <br />
                        <p>Tešíme sa na vás,<br />Viktorija Kendra Academy</p>
                    </div>
                `;

                const confirmationResponse = await fetch("https://api.smtp2go.com/v3/email/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        api_key: apiKey,
                        sender,
                        to: [email],
                        subject: "Potvrdenie registrácie: LIVE webinar Permanentný make-up 2027",
                        text_body: confirmationText,
                        html_body: confirmationHtml,
                    }),
                });

                const confirmationData = await confirmationResponse.json().catch(() => null);
                if (!confirmationResponse.ok || confirmationData?.data?.error) {
                    console.error("SMTP2GO webinar confirmation email error:", confirmationData);
                }
            } else {
                console.error("Missing SMTP2GO configuration — webinar email skipped.");
            }
        } catch (emailErr) {
            console.error("Webinar registration email failed:", emailErr);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webinar registration error:", error);
        return NextResponse.json({ error: "Interná chyba servera." }, { status: 500 });
    }
}
