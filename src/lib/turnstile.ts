// Server-side Cloudflare Turnstile verification.
// Returns true when the token is valid. If TURNSTILE_SECRET_KEY is not configured,
// verification is treated as disabled (returns true) so forms keep working until
// the env var is set — set the key to actually enforce protection.

export async function verifyTurnstile(
    token: string | null | undefined,
    remoteIp?: string | null
): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    // Turnstile not configured -> treat as disabled (do not block submissions).
    if (!secret) {
        console.warn("TURNSTILE_SECRET_KEY not set — skipping Turnstile verification.");
        return true;
    }

    if (!token) return false;

    try {
        const body = new URLSearchParams();
        body.append("secret", secret);
        body.append("response", token);
        if (remoteIp) body.append("remoteip", remoteIp);

        const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
        });
        const data = (await res.json()) as { success?: boolean };
        return data.success === true;
    } catch (err) {
        console.error("Turnstile verification request failed:", err);
        return false;
    }
}

export function getClientIp(request: Request): string | null {
    const fwd = request.headers.get("x-forwarded-for") || request.headers.get("x-nf-client-connection-ip");
    return fwd ? fwd.split(",")[0].trim() : null;
}
