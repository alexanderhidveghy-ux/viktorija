"use client";

import { useEffect, useRef } from "react";

// Cloudflare Turnstile explicit-render integration.
// Renders the widget and reports the verification token via onVerify.
// If NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set, the component renders nothing
// (Turnstile effectively disabled), so forms keep working before keys are set.

type TurnstileApi = {
    render: (el: HTMLElement, opts: Record<string, unknown>) => string;
    reset: (id?: string) => void;
    remove: (id?: string) => void;
};

declare global {
    interface Window {
        turnstile?: TurnstileApi;
        __onloadTurnstileCallback?: () => void;
    }
}

const SCRIPT_SRC =
    "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__onloadTurnstileCallback&render=explicit";

let scriptReady = false;
let scriptRequested = false;
const waiters: (() => void)[] = [];

function loadTurnstileScript(): Promise<void> {
    return new Promise((resolve) => {
        if (scriptReady && window.turnstile) return resolve();
        waiters.push(resolve);
        if (scriptRequested) return;
        scriptRequested = true;
        window.__onloadTurnstileCallback = () => {
            scriptReady = true;
            waiters.splice(0).forEach((fn) => fn());
        };
        const s = document.createElement("script");
        s.src = SCRIPT_SRC;
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
    });
}

export const TURNSTILE_ENABLED = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function TurnstileWidget({
    onVerify,
    onExpire,
    theme = "auto",
    className,
}: {
    onVerify: (token: string) => void;
    onExpire?: () => void;
    theme?: "auto" | "light" | "dark";
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const onVerifyRef = useRef(onVerify);
    const onExpireRef = useRef(onExpire);

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    useEffect(() => {
        onVerifyRef.current = onVerify;
        onExpireRef.current = onExpire;
    }, [onVerify, onExpire]);

    useEffect(() => {
        if (!siteKey) return;
        let cancelled = false;

        loadTurnstileScript().then(() => {
            if (cancelled || !containerRef.current || !window.turnstile || widgetIdRef.current) return;
            widgetIdRef.current = window.turnstile.render(containerRef.current, {
                sitekey: siteKey,
                theme,
                language: "sk",
                callback: (token: string) => onVerifyRef.current(token),
                "expired-callback": () => onExpireRef.current?.(),
                "error-callback": () => onExpireRef.current?.(),
            });
        });

        return () => {
            cancelled = true;
            if (widgetIdRef.current && window.turnstile) {
                try {
                    window.turnstile.remove(widgetIdRef.current);
                } catch {
                    /* widget already gone */
                }
                widgetIdRef.current = null;
            }
        };
    }, [siteKey, theme]);

    if (!siteKey) return null;
    return <div ref={containerRef} className={className} />;
}
