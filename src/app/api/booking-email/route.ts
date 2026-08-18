import { NextResponse } from "next/server";
import { escapeHtml, sendEmail, hasEmailConfig, confirmationLayout, CONFIRMATION_TEXT_FOOTER } from "@/lib/email";

// Emails a studio booking notification to the salon (besides saving it to the CMS),
// plus a confirmation to the client when she left an email address (the field is optional).
// Best-effort: the booking is already persisted client-side before this is called.
export async function POST(request: Request) {
    try {
        const { name, email, phone, message, dateLabel, timeLabel, privacyConsent } = await request.json();

        if (privacyConsent !== true) {
            return NextResponse.json({ error: "Súhlas so spracovaním osobných údajov je povinný." }, { status: 400 });
        }

        const recipient = process.env.BOOKING_FORM_RECIPIENT || "viktorija@viktorija.sk";

        if (!hasEmailConfig()) {
            console.error("Missing SMTP2GO configuration — booking email skipped.");
            return NextResponse.json({ skipped: true });
        }

        const dateText = dateLabel || "Neuvedené";
        const timeText = timeLabel || "Neuvedené";

        const textBody =
            `Nová rezervácia zo štúdia\n\n` +
            `Meno: ${name}\nTelefón: ${phone}\nEmail: ${email || "Neuvedené"}\n` +
            `Termín: ${dateText}\nČas: ${timeText}\n\n` +
            `Súhlas so spracovaním osobných údajov: áno\n\n` +
            `Správa:\n${message || "Neuvedené"}`;

        const htmlBody = `
            <h3>Nová rezervácia zo štúdia</h3>
            <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
            <p><strong>Telefón:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Email:</strong> ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : "<em>Neuvedené</em>"}</p>
            <p><strong>Termín:</strong> ${dateLabel ? escapeHtml(dateLabel) : "<em>Neuvedené</em>"}</p>
            <p><strong>Čas:</strong> ${timeLabel ? escapeHtml(timeLabel) : "<em>Neuvedené</em>"}</p>
            <p><strong>Súhlas so spracovaním osobných údajov:</strong> áno</p>
            <br />
            <p><strong>Správa:</strong></p>
            <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #b68d57; border-radius: 4px;">${message ? escapeHtml(message) : "<em>Neuvedené</em>"}</p>
        `;

        const sent = await sendEmail({
            to: recipient,
            subject: `Nová rezervácia zo štúdia — ${name}`,
            textBody,
            htmlBody,
            ...(email ? { replyTo: `${name} <${email}>` } : {}),
            label: "booking admin",
        });

        if (!sent) {
            return NextResponse.json({ error: "Chyba pri odosielaní e-mailu." }, { status: 500 });
        }

        // Confirmation to the client — only possible when the optional email was filled in.
        if (email) {
            const confirmationText =
                `Dobrý deň,\n\n` +
                `ďakujeme za vašu rezerváciu v Salóne Viktória. Prijali sme ju a čoskoro vám ju potvrdíme.\n\n` +
                `Preferovaný termín: ${dateText}\n` +
                (timeLabel ? `Čas: ${timeText}\n` : "") +
                (message ? `\nVaša správa:\n${message}\n` : "") +
                `\nRezervácia je záväzná až po našom potvrdení.\n\n` +
                `Tešíme sa na vás,\n` +
                `Salón Viktória` +
                CONFIRMATION_TEXT_FOOTER;

            const confirmationHtml = confirmationLayout(
                "Ďakujeme za vašu rezerváciu",
                `
                    <p>Dobrý deň,</p>
                    <p>ďakujeme za vašu rezerváciu v <strong>Salóne Viktória</strong>. Prijali sme ju a čoskoro vám ju potvrdíme.</p>
                    <p><strong>Preferovaný termín:</strong> ${dateLabel ? escapeHtml(dateLabel) : "<em>Neuvedené</em>"}</p>
                    ${timeLabel ? `<p><strong>Čas:</strong> ${escapeHtml(timeLabel)}</p>` : ""}
                    ${
                        message
                            ? `<p><strong>Vaša správa:</strong></p>
                               <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #b68d57; border-radius: 4px;">${escapeHtml(message)}</p>`
                            : ""
                    }
                    <p>Rezervácia je záväzná až po našom potvrdení.</p>
                    <br />
                    <p>Tešíme sa na vás,<br />Salón Viktória</p>
                `
            );

            await sendEmail({
                to: email,
                subject: "Potvrdenie: prijali sme vašu rezerváciu",
                textBody: confirmationText,
                htmlBody: confirmationHtml,
                label: "booking confirmation",
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Booking email error:", error);
        return NextResponse.json({ error: "Interná chyba servera." }, { status: 500 });
    }
}
