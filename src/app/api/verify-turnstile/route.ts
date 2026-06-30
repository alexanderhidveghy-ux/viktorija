import { NextResponse } from "next/server";
import { verifyTurnstile, getClientIp } from "@/lib/turnstile";

// Lightweight token-verification endpoint used by client-side forms that write
// directly to Supabase (booking + course application modals).
export async function POST(request: Request) {
    try {
        const { token } = await request.json();
        const ok = await verifyTurnstile(token, getClientIp(request));
        if (!ok) {
            return NextResponse.json({ error: "Overenie proti robotom zlyhalo." }, { status: 400 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("verify-turnstile error:", error);
        return NextResponse.json({ error: "Interná chyba servera." }, { status: 500 });
    }
}
