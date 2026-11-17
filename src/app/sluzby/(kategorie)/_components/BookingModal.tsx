"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { X, Phone, CheckCircle, AlertCircle, Loader2, MessageSquare } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import TurnstileWidget, { TURNSTILE_ENABLED } from "@/components/TurnstileWidget";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";

const MONTHS_SK = [
    "januára", "februára", "marca", "apríla", "mája", "júna",
    "júla", "augusta", "septembra", "októbra", "novembra", "decembra"
];

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    defaultMessage?: string;
}

export default function BookingModal({ isOpen, onClose, title = "Objednať sa", defaultMessage = "" }: BookingModalProps) {
    const [preferredDate, setPreferredDate] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState(defaultMessage);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    // Smooth scrolling (Lenis) keeps moving the page behind the modal; halt it while
    // open – the card is marked data-lenis-prevent so its own overflow scrolls natively.
    const lenis = useLenis();
    useEffect(() => {
        if (!lenis) return;
        if (isOpen) lenis.stop();
        else lenis.start();
        return () => lenis.start();
    }, [isOpen, lenis]);
    const [turnstileToken, setTurnstileToken] = useState("");
    const [privacyConsent, setPrivacyConsent] = useState(false);

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

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setPreferredDate("");
            setName("");
            setPhone("");
            setMessage(defaultMessage);
            setStatus("idle");
            setErrorMsg("");
            setTurnstileToken("");
            setPrivacyConsent(false);
        }
    }, [isOpen, defaultMessage]);

    // Format an ISO date (YYYY-MM-DD from the date input) into a Slovak label.
    const formatPreferredDate = (iso: string) => {
        if (!iso) return "";
        const [y, m, d] = iso.split("-").map(Number);
        return `${d}. ${MONTHS_SK[m - 1]} ${y}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        try {
            if (!privacyConsent) {
                setStatus("error");
                setErrorMsg("Pre odoslanie je potrebný súhlas so spracovaním osobných údajov.");
                return;
            }

            // Anti-bot verification before writing to the database
            if (TURNSTILE_ENABLED) {
                const verifyRes = await fetch("/api/verify-turnstile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: turnstileToken }),
                });
                if (!verifyRes.ok) {
                    setStatus("error");
                    setErrorMsg("Overenie proti robotom zlyhalo. Skúste to znova.");
                    return;
                }
            }

            // Insert booking (preferred date stored in the message — no time slot)
            const fullMessage = [
                preferredDate ? `Preferovaný termín: ${formatPreferredDate(preferredDate)}` : null,
                message || null,
                "Súhlas so spracovaním osobných údajov: áno",
            ]
                .filter(Boolean)
                .join("\n\n");

            // Copy for the old CMS (AEB Supabase) – best-effort only: the email and
            // the WhatsApp message below must go out even if that database refuses it.
            try {
                const { data: booking, error: bookingError } = await supabase
                    .from("viktorija_bookings")
                    .insert({
                        client_name: name,
                        client_phone: phone,
                        message: fullMessage || null,
                        time_slot_id: null,
                    })
                    .select()
                    .single();
                if (bookingError) throw bookingError;
                await supabase.from("viktorija_notifications").insert({ booking_id: booking.id, type: "new_booking" });
            } catch (cmsError) {
                console.error("CMS booking copy failed", cmsError);
            }

            // Besides the CMS, email the salon (await before any WhatsApp app-switch
            // so a mobile navigation can't interrupt the request). Best-effort.
            try {
                await fetch("/api/booking-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name,
                        phone,
                        message: message || null,
                        dateLabel: preferredDate ? formatPreferredDate(preferredDate) : null,
                        timeLabel: null,
                        privacyConsent,
                    }),
                });
            } catch (mailErr) {
                console.error("Booking email failed:", mailErr);
            }

            setStatus("success");
            // Besides saving to the CMS, open a prefilled WhatsApp message to the salon.
            // (Booking is already saved at this point; on desktop pop-up blockers may
            //  defer this to the manual WhatsApp button on the success screen.)
            handleWhatsAppRedirect();
        } catch {
            setStatus("error");
            setErrorMsg("Niečo sa pokazilo. Skúste to znova alebo zavolajte.");
        }
    };

    const handleWhatsAppRedirect = () => {
        const dateStr = preferredDate ? formatPreferredDate(preferredDate) : "Individuálny termín";

        const text = `Dobrý deň, rada by som si potvrdila rezerváciu u Viktorije Kendry.\n\n👤 Meno: ${name}\n📞 Telefón: ${phone}\n📅 Preferovaný termín: ${dateStr}${message ? `\n\n💬 Správa: ${message}` : ''}`;

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/421907796562?text=${encodedText}`;
        window.open(whatsappUrl, "_blank");
    };

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
                        data-lenis-prevent
                        className="bg-[#1D0E22] border border-gold/30 w-full max-w-lg rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
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

                        {/* Body */}
                        <div className="p-6">
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-12 space-y-4 text-center"
                                >
                                    <CheckCircle className="w-16 h-16 text-green-400" />
                                    <h4 className="font-marcellus text-gold text-xl uppercase tracking-wider">
                                        Ďakujeme!
                                    </h4>
                                    <p className="font-montserrat text-white/70 text-sm max-w-sm">
                                        Vaša rezervácia bola odoslaná. Pre rýchlejšie potvrdenie ma môžete kontaktovať priamo cez WhatsApp.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-4">
                                        <button
                                            onClick={handleWhatsAppRedirect}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-marcellus uppercase tracking-widest rounded-lg hover:bg-[#20ba56] transition-colors text-sm"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            WhatsApp
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="flex-1 px-6 py-3 bg-white/10 text-white font-marcellus uppercase tracking-widest rounded-lg hover:bg-white/20 transition-colors text-sm"
                                        >
                                            Zavrieť
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="max-w-md mx-auto">
                                    <div className="flex flex-col space-y-5">
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <p className="font-montserrat text-white/70 text-sm leading-relaxed">
                                                Vyberte preferovaný termín a vyplňte kontaktné údaje. V prípade potreby ma môžete kontaktovať aj telefonicky.
                                            </p>
                                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gold/40 shadow-lg">
                                                <Image
                                                    src="/sluzby/rezervacia.jpg"
                                                    alt="Viktória"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <a
                                                href="tel:+421907796562"
                                                className="flex items-center gap-2 text-gold/80 hover:text-gold transition-colors font-montserrat text-base"
                                            >
                                                <Phone className="w-5 h-5" />
                                                <span>Zavolať</span>
                                            </a>
                                        </div>

                                        <div className="border-t border-white/10" />

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {/* Preferred date */}
                                            <div className="space-y-1">
                                                <label className="font-montserrat text-[11px] uppercase tracking-widest text-white/50 ml-1">
                                                    Preferovaný termín
                                                </label>
                                                <input
                                                    type="date"
                                                    value={preferredDate}
                                                    onChange={(e) => setPreferredDate(e.target.value)}
                                                    required
                                                    min={new Date().toISOString().split("T")[0]}
                                                    className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white font-montserrat font-light text-sm focus:border-gold focus:outline-none transition-colors [color-scheme:dark]"
                                                />
                                            </div>

                                            <input
                                                type="text"
                                                placeholder="Vaše meno"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 font-montserrat font-light text-sm focus:border-gold focus:outline-none transition-colors"
                                            />
                                            <input
                                                type="tel"
                                                placeholder="Telefón"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 font-montserrat font-light text-sm focus:border-gold focus:outline-none transition-colors"
                                            />
                                            <textarea
                                                placeholder="Správa (voliteľné)"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                rows={2}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 font-montserrat font-light text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                                            />

                                            {status === "error" && (
                                                <div className="flex items-center gap-2 text-red-400 text-sm font-montserrat">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errorMsg}
                                                </div>
                                            )}

                                            {TURNSTILE_ENABLED && (
                                                <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} theme="dark" className="flex justify-center" />
                                            )}
                                            <PrivacyConsentCheckbox
                                                id="booking-privacy-consent"
                                                checked={privacyConsent}
                                                onChange={setPrivacyConsent}
                                                theme="dark"
                                            />

                                            <button
                                                type="submit"
                                                disabled={status === "submitting" || !preferredDate || !privacyConsent || (TURNSTILE_ENABLED && !turnstileToken)}
                                                className="w-full bg-gold text-[#1D0E22] font-marcellus uppercase tracking-widest py-3 rounded-lg hover:bg-gold/90 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {status === "submitting" ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Odosielam...
                                                    </>
                                                ) : (
                                                    "Odoslať"
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
