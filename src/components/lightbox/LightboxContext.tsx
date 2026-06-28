"use client";

import { createContext, useCallback, useContext, useState } from "react";
import Lightbox from "@/components/Lightbox";

interface LightboxApi {
    /** Open the fullscreen lightbox at `index` within the given list of image srcs. */
    open: (images: string[], index?: number) => void;
}

interface LightboxState {
    images: string[];
    index: number;
}

const LightboxCtx = createContext<LightboxApi | null>(null);

export function useLightbox(): LightboxApi {
    const ctx = useContext(LightboxCtx);
    if (!ctx) {
        throw new Error("useLightbox must be used within a <LightboxProvider>");
    }
    return ctx;
}

export default function LightboxProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<LightboxState | null>(null);

    const open = useCallback((images: string[], index = 0) => {
        const cleaned = images.filter(Boolean);
        if (cleaned.length === 0) return;
        setState({ images: cleaned, index: Math.min(Math.max(index, 0), cleaned.length - 1) });
    }, []);

    const close = useCallback(() => setState(null), []);

    const next = useCallback(
        () => setState((s) => (s ? { ...s, index: (s.index + 1) % s.images.length } : s)),
        []
    );

    const prev = useCallback(
        () => setState((s) => (s ? { ...s, index: (s.index - 1 + s.images.length) % s.images.length } : s)),
        []
    );

    return (
        <LightboxCtx.Provider value={{ open }}>
            {children}
            <Lightbox
                isOpen={!!state}
                images={state?.images ?? []}
                currentIndex={state?.index ?? 0}
                onClose={close}
                onNext={next}
                onPrev={prev}
            />
        </LightboxCtx.Provider>
    );
}
