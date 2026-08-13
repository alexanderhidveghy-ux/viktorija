import { NextResponse } from "next/server";

// Emails a studio booking notification to the salon (besides saving it to the CMS).
// Best-effort: the booking is already persisted client-side before this is called.
export async function POST(request: Request) {
    try {
        const { name, phone, message, dateLabel, timeLabel, privacyConsent } = await request.json();

        if (privacyConsent !== true) {
            return NextResponse.json({ error: "Súhlas so spracovaním osobných údajov je povinný." }, { status: 400 });
        }

        const apiKey = process.env.SMTP2GO_API_KEY;
        const sender = process.env.SMTP2GO_SENDER;
        const recipient = process.env.BOOKING_FORM_RECIPIENT || "viktorija@viktorija.sk";

        if (!apiKey || !sender) {
            console.error("Missing SMTP2GO configuration — booking email skipped.");
            return NextResponse.json({ skipped: true });
        }

        const textBody =
            `Nová rezervácia zo štúdia\n\n` +
            `Meno: ${name}\nTelefón: ${phone}\n` +
            `Termín: ${dateLabel || "Neuvedené"}\nČas: ${timeLabel || "Neuvedené"}\n\n` +
            `Súhlas so spracovaním osobných údajov: áno\n\n` +
            `Správa:\n${message || "Neuvedené"}`;

        const htmlBody = `
            <h3>Nová rezervácia zo štúdia</h3>
            <p><strong>Meno:</strong> ${name}</p>
            <p><strong>Telefón:</strong> ${phone}</p>
            <p><strong>Termín:</strong> ${dateLabel || "<em>Neuvedené</em>"}</p>
            <p><strong>Čas:</strong> ${timeLabel || "<em>Neuvedené</em>"}</p>
            <p><strong>Súhlas so spracovaním osobných údajov:</strong> áno</p>
            <br />
            <p><strong>Správa:</strong></p>
            <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #b68d57; border-radius: 4px;">${message || "<em>Neuvedené</em>"}</p>
        `;

        const response = await fetch("https://api.smtp2go.com/v3/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api_key: apiKey,
                sender,
                to: [recipient],
                subject: `Nová rezervácia zo štúdia — ${name}`,
                text_body: textBody,
                html_body: htmlBody,
            }),
        });

        const data = await response.json();
        if (!response.ok || data.data?.error) {
            console.error("SMTP2GO booking email error:", data);
            return NextResponse.json({ error: "Chyba pri odosielaní e-mailu." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Booking email error:", error);
        return NextResponse.json({ error: "Interná chyba servera." }, { status: 500 });
    }
}
