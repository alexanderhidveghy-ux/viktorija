"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon, X } from "lucide-react";
import { useLenis } from "lenis/react";

// A decorative muted loop that can actually be opened. Autoplay forces `muted`,
// so the inline video stays silent by necessity; clicking it opens a fullscreen
// copy with native controls and sound, which is the only way to offer both.
export default function PlayableVideo({
    src,
    className = "absolute inset-0 h-full w-full object-cover",
    style,
    small = false,
    label = "Prehrať video",
}: {
    src: string;
    className?: string;
    style?: React.CSSProperties;
    small?: boolean;
    label?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const fullRef = useRef<HTMLVideoElement>(null);
    const lenis = useLenis();

    const close = useCallback(() => setIsOpen(false), []);

    const openFull = useCallback(() => {
        setIsOpen(true);
        // Start at a civil volume rather than full blast.
        window.setTimeout(() => {
            if (fullRef.current) fullRef.current.volume = 0.5;
        }, 50);
    }, []);

    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        },
        [close]
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKey);
            lenis?.stop();
        } else {
            document.body.style.overflow = "unset";
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKey);
            lenis?.start();
        };
    }, [isOpen, handleKey, lenis]);

    const ring = small ? "w-12 h-12" : "w-16 h-16";
    const glyph = small ? 20 : 24;

    return (
        <>
            <div
                className="absolute inset-0 cursor-pointer group/video"
                onClick={openFull}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openFull();
                    }
                }}
                role="button"
                tabIndex={0}
                aria-label={label}
            >
                <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className={className}
                    style={style}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                    <div
                        className={`${ring} rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white group-hover/video:bg-white group-hover/video:text-black transition-all duration-300`}
                    >
                        <PlayIcon size={glyph} fill="currentColor" />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                        onClick={close}
                    >
                        <button
                            onClick={close}
                            aria-label="Zavrieť"
                            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <X size={22} />
                        </button>
                        <div
                            className="relative w-full max-w-3xl mx-auto p-4 md:p-12"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            >
                                <video
                                    ref={fullRef}
                                    src={src}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="w-full max-h-[90vh] rounded-xl"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
