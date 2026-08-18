"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageSquare } from "lucide-react";
import Script from "next/script";
import { useLenis } from "lenis/react";

const BOOKIO_SCRIPT = "https://bookio-services-eu.s3.eu-central-1.amazonaws.com/assets/widget.bookio.js";
const BOOKIO_WIDGET =
    "https://services.bookio.com/viktorija-kendra-permanent-makeup-academy-beauty-studio/widget?lang=sk";

const PHONE = "+421907796562";
const WHATSAPP = "https://wa.me/421907796562";

declare global {
    interface Window {
        initBookioWidget?: () => void;
    }
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

// Mounted only while the modal is open, so every reopen starts with fresh state and
// re-runs initBookioWidget(). The script resizes the iframe, which needs both the
// script and the iframe to be ready — in either order.
function BookioWidget() {
    const [scriptReady, setScriptReady] = useState(false);
    const [frameLoaded, setFrameLoaded] = useState(false);

    useEffect(() => {
        if (scriptReady && frameLoaded) window.initBookioWidget?.();
    }, [scriptReady, frameLoaded]);

    return (
        <>
            <Script src={BOOKIO_SCRIPT} strategy="afterInteractive" onReady={() => setScriptReady(true)} />
            <div className="rounded-xl overflow-hidden bg-white">
                <iframe
                    id="bookio-iframe"
                    src={BOOKIO_WIDGET}
                    title="Rezervácia termínu"
                    width="100%"
                    height={620}
                    scrolling="no"
                    onLoad={() => setFrameLoaded(true)}
                    className="block w-full border-0"
                />
            </div>
        </>
    );
}

export default function BookingModal({ isOpen, onClose, title = "Objednať sa" }: BookingModalProps) {
    // Lenis animates window scroll from wheel events anywhere on the page, so body
    // overflow alone does not stop the page drifting behind the modal. Halt it while
    // open; the card below is additionally marked data-lenis-prevent so its own
    // overflow scrolls natively.
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;
        if (isOpen) lenis.stop();
        else lenis.start();
        return () => lenis.start();
    }, [isOpen, lenis]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-[#1D0E22] border border-gold/30 w-full max-w-3xl rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
                        data-lenis-prevent
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="font-marcellus text-gold text-xl uppercase tracking-widest">
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Bookio booking widget */}
                        <div className="p-4 sm:p-6">
                            <BookioWidget />

                            {/* Fallback contact — the widget needs JS and a third-party host */}
                            <div className="mt-5 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
                                <p className="font-montserrat text-white/50 text-xs text-center sm:text-left">
                                    Nedarí sa vám rezervovať online?
                                </p>
                                <div className="flex gap-3">
                                    <a
                                        href={`tel:${PHONE}`}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-marcellus uppercase tracking-widest rounded-lg hover:bg-white/20 transition-colors text-xs"
                                    >
                                        <Phone className="w-4 h-4" />
                                        Zavolať
                                    </a>
                                    <a
                                        href={WHATSAPP}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white font-marcellus uppercase tracking-widest rounded-lg hover:bg-[#20ba56] transition-colors text-xs"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
