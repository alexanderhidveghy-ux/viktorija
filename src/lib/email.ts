// Shared SMTP2GO helpers.
//
// Every send goes through sendEmail(), which always reads and checks the API
// response — a rejected email must never look like a success. Sends are
// best-effort by design: the caller decides whether a failure is fatal, and
// form submissions that are already persisted should never be failed by one.

const SMTP2GO_ENDPOINT = "https://api.smtp2go.com/v3/email/send";

const BRAND_DARK = "#1D0E22";
const BRAND_GOLD = "#b68d57";

export function escapeHtml(value: unknown): string {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/** True when SMTP2GO is configured; routes use this to keep their own skip/fail behaviour. */
export function hasEmailConfig(): boolean {
    return Boolean(process.env.SMTP2GO_API_KEY && process.env.SMTP2GO_SENDER);
}

interface SendEmailArgs {
    to: string;
    subject: string;
    textBody: string;
    htmlBody: string;
    /** Reply-To header, e.g. `Meno <mail@example.com>`. */
    replyTo?: string;
    /** Short label used in log lines, e.g. "course confirmation". */
    label: string;
}

/** Sends one email. Returns true only when SMTP2GO confirmed it accepted the message. */
export async function sendEmail({ to, subject, textBody, htmlBody, replyTo, label }: SendEmailArgs): Promise<boolean> {
    const apiKey = process.env.SMTP2GO_API_KEY;
    const sender = process.env.SMTP2GO_SENDER;

    if (!apiKey || !sender) {
        console.error(`Missing SMTP2GO configuration — ${label} email skipped.`);
        return false;
    }

    try {
        const response = await fetch(SMTP2GO_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api_key: apiKey,
                sender,
                to: [to],
                subject,
                text_body: textBody,
                html_body: htmlBody,
                ...(replyTo ? { custom_headers: [{ header: "Reply-To", value: replyTo }] } : {}),
            }),
        });

        const data = await response.json().catch(() => null);
        const failed = data?.data?.failed;

        if (!response.ok || data?.data?.error || (typeof failed === "number" && failed > 0)) {
            console.error(`SMTP2GO ${label} email error:`, data);
            return false;
        }

        return true;
    } catch (err) {
        console.error(`SMTP2GO ${label} email failed:`, err);
        return false;
    }
}

/** Wraps confirmation copy in the shared branded shell so all client emails look alike. */
export function confirmationLayout(heading: string, bodyHtml: string): string {
    return `
        <div style="font-family: Arial, sans-serif; color: ${BRAND_DARK}; line-height: 1.6; max-width: 600px;">
            <h2 style="font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; color: ${BRAND_DARK};">${heading}</h2>
            ${bodyHtml}
            <hr style="border: none; border-top: 1px solid #e6e0e8; margin: 24px 0;" />
            <p style="font-size: 12px; color: #6b6470;">
                Toto je automatické potvrdenie, na tento e-mail nie je potrebné odpovedať.<br />
                Viktorija Kendra &middot; <a href="tel:+421907796562" style="color: ${BRAND_GOLD};">+421 907 796 562</a> &middot;
                <a href="https://www.viktorija.sk" style="color: ${BRAND_GOLD};">viktorija.sk</a>
            </p>
        </div>
    `;
}

/** Shared signature block for the plain-text half of confirmation emails. */
export const CONFIRMATION_TEXT_FOOTER =
    `\n\n---\n` +
    `Toto je automatické potvrdenie, na tento e-mail nie je potrebné odpovedať.\n` +
    `Viktorija Kendra | +421 907 796 562 | www.viktorija.sk`;
