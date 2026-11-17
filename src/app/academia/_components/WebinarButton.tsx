"use client";

import { useState } from "react";
import { useNow } from "@/lib/use-now";
import { WEBINAR, isPast } from "@/lib/academy-dates";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import TurnstileWidget, { TURNSTILE_ENABLED } from "@/components/TurnstileWidget";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";

const POSITIONS = [
    "Chcem začať s permanentným make-upom",
    "Už pracujem ako PMU artist",
    "Absolvovala som PMU kurz, ale ešte aktívne nepracujem",
    "Zatiaľ sa o permanentný make-up iba zaujímam",
];

const TOPICS = [
    "Ako začať s permanentným make-upom",
    "Hyperrealistické obočie",
    "Kórejské očné linky",
    "Minerálne pigmenty a techniky pier",
    "Kórejské pery",
    "Ako sa ďalej profesionálne rozvíjať",
    "Klientela, osobná značka a PMU biznis",
];

export default function WebinarButton() {
    const [view, setView] = useState<"closed" | "intro" | "form">("closed");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [topics, setTopics] = useState<string[]>([]);
    const [question, setQuestion] = useState("");
    const [privacyConsent, setPrivacyConsent] = useState(false);
    const [marketingConsent, setMarketingConsent] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    // Po termíne webinára sa tlačidlo už nezobrazuje.
    const now = useNow();
    const expired = now === null || isPast(WEBINAR.endsAt, now);

    const close = () => {
        setView("closed");
        setStatus("idle");
        setErrorMsg("");
        setTurnstileToken("");
    };

    const toggleTopic = (topic: string) => {
        setTopics((current) =>
            current.includes(topic)
                ? current.filter((item) => item !== topic)
                : [...current, topic]
        );
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        if (!position) {
            setStatus("error");
            setErrorMsg("Prosím vyberte, kde sa momentálne nachádzate.");
            return;
        }

        if (!privacyConsent) {
            setStatus("error");
            setErrorMsg("Súhlas so spracovaním osobných údajov je povinný.");
            return;
        }

        try {
            const response = await fetch("/api/webinar-registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    position,
                    topics,
                    question,
                    privacyConsent,
                    marketingConsent,
                    turnstileToken,
                }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                setStatus("error");
                setErrorMsg(data.error || "Registráciu sa nepodarilo odoslať. Skúste to prosím znova.");
                return;
            }

            setStatus("success");
        } catch (error) {
            console.error("Webinar registration failed:", error);
            setStatus("error");
            setErrorMsg("Registráciu sa nepodarilo odoslať. Skúste to prosím znova.");
        }
    };

    if (expired) return null;

    return (
        <>
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView("intro")}
                className="fixed bottom-24 right-4 md:right-8 z-50 bg-gold text-[#1D0E22] px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(238,227,206,0.35)] font-marcellus uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors flex items-center gap-3 border border-white/20"
            >
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D0E22] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1D0E22]" />
                </span>
                Webinár
            </motion.button>

            <AnimatePresence>
                {view !== "closed" && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                            className="absolute inset-0 bg-black/85 backdrop-blur-md"
                        />

                        {view === "intro" ? (
                            <motion.div
                                initial={{ scale: 0.94, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.94, opacity: 0, y: 20 }}
                                className="relative w-full max-w-5xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                                data-lenis-prevent
                                onClick={(event) => event.stopPropagation()}
                            >
                                <button onClick={close} className="absolute top-6 right-6 z-10 text-[#1D0E22]/50 hover:text-[#1D0E22] transition-colors">
                                    <X size={24} />
                                </button>

                                <div className="flex-1 p-8 md:p-14 flex flex-col justify-center space-y-8">
                                    <div className="space-y-4">
                                        <p className="text-[#A6824D] font-marcellus uppercase tracking-[0.3em] text-xs">
                                            {WEBINAR.label.replace(" | LIVE", "")} | LIVE WEBINAR
                                        </p>
                                        <h2 className="text-[#1D0E22] font-marcellus text-3xl md:text-5xl uppercase leading-tight">
                                            Permanentný make-up 2027
                                        </h2>
                                        <p className="text-[#1D0E22]/70 font-montserrat text-base md:text-lg leading-relaxed max-w-xl">
                                            Nová generácia techník, vzdelávania a PMU biznisu.
                                        </p>
                                        <div className="space-y-2 font-marcellus text-[#1D0E22] uppercase tracking-[0.14em] text-sm md:text-base">
                                            <p>Hyperrealistic Brows × Korean Eyeliner</p>
                                            <p>Mineral Lips × Korean Lips</p>
                                        </div>
                                        <p className="text-[#1D0E22]/70 font-montserrat text-sm md:text-base leading-relaxed max-w-xl">
                                            Kam sa posunul svet permanentného make-upu a čo z toho budeme túto jeseň učiť v akadémii.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setView("form")}
                                        className="w-fit bg-[#1D0E22] text-gold px-8 py-4 rounded-full font-marcellus uppercase tracking-[0.22em] text-sm hover:bg-[#2f1738] transition-all shadow-lg hover:-translate-y-0.5"
                                    >
                                        Bezplatná registrácia →
                                    </button>
                                </div>

                                <div className="hidden md:block flex-1 relative min-h-[520px]">
                                    <Image src="/academia/vik1.jpg" alt="Permanentný make-up webinar" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-[#1D0E22] border border-gold/30 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
                                data-lenis-prevent
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div className="p-6 border-b border-gold/20 flex justify-between items-center bg-black/20">
                                    <div>
                                        <p className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-white/40">Prihláška na LIVE webinar</p>
                                        <h3 className="font-marcellus text-gold text-xl uppercase tracking-widest">Permanentný make-up 2027</h3>
                                    </div>
                                    <button onClick={close} className="w-10 h-10 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 md:p-12">
                                    {status === "success" ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="h-full flex flex-col items-center justify-center space-y-6 text-center py-12"
                                        >
                                            <CheckCircle className="w-20 h-20 text-gold" />
                                            <div className="space-y-2">
                                                <h3 className="font-marcellus text-gold text-3xl uppercase tracking-widest">Registrácia odoslaná</h3>
                                                <p className="font-montserrat text-white/70 max-w-md">
                                                    Po registrácii vám príde potvrdenie na uvedený e-mail. Link na pripojenie k LIVE webináru vám pošleme pred jeho začiatkom.
                                                </p>
                                            </div>
                                            <button onClick={close} className="px-12 py-4 bg-gold text-[#1D0E22] font-marcellus uppercase tracking-widest rounded-full hover:bg-white transition-colors">
                                                Zavrieť
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="space-y-2 text-center">
                                                <p className="font-montserrat text-white/50 uppercase tracking-[0.25em] text-xs">14. 9. 2026 | 19:00 | LIVE</p>
                                                <h2 className="font-marcellus text-2xl md:text-4xl text-white uppercase tracking-widest">Permanentný make-up 2027</h2>
                                                <p className="font-montserrat text-white/60 text-sm">Nová generácia techník, vzdelávania a PMU biznisu</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="space-y-1 md:col-span-2">
                                                    <label className="font-montserrat text-[11px] font-medium uppercase tracking-widest text-white/70 ml-1">Meno a priezvisko*</label>
                                                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-montserrat text-sm focus:border-gold outline-none transition-all" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="font-montserrat text-[11px] font-medium uppercase tracking-widest text-white/70 ml-1">E-mail*</label>
                                                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-montserrat text-sm focus:border-gold outline-none transition-all" />
                                                    <p className="font-montserrat text-[11px] text-white/40 leading-relaxed pt-1">
                                                        Na tento e-mail vám pošleme potvrdenie registrácie a link na LIVE webinar.
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="font-montserrat text-[11px] font-medium uppercase tracking-widest text-white/70 ml-1">Telefónne číslo*</label>
                                                    <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-montserrat text-sm focus:border-gold outline-none transition-all" />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="font-montserrat text-xs font-medium uppercase tracking-widest text-white/85">Kde sa momentálne nachádzate?*</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {POSITIONS.map((item) => (
                                                        <label key={item} className={`flex items-center gap-3 rounded-xl border p-4 font-montserrat text-xs cursor-pointer transition-all ${position === item ? "border-gold bg-gold/10 text-white" : "border-white/10 bg-white/5 text-white/60 hover:border-white/25"}`}>
                                                            <input type="radio" name="webinar-position" checked={position === item} onChange={() => setPosition(item)} className="accent-gold" />
                                                            <span>{item}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="font-montserrat text-xs font-medium uppercase tracking-widest text-white/85">Čo vás na webinári zaujíma najviac?</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {TOPICS.map((item) => (
                                                        <label key={item} className={`flex items-center gap-3 rounded-xl border p-4 font-montserrat text-xs cursor-pointer transition-all ${topics.includes(item) ? "border-gold bg-gold/10 text-white" : "border-white/10 bg-white/5 text-white/60 hover:border-white/25"}`}>
                                                            <input type="checkbox" checked={topics.includes(item)} onChange={() => toggleTopic(item)} className="accent-gold" />
                                                            <span>{item}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="font-montserrat text-[11px] font-medium uppercase tracking-widest text-white/70 ml-1">
                                                    Máte otázku, na ktorú by ste chceli počas webinára dostať odpoveď?
                                                </label>
                                                <textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-montserrat text-sm focus:border-gold outline-none transition-all resize-none" />
                                                <p className="font-montserrat text-[11px] text-white/35">nepovinné</p>
                                            </div>

                                            <div className="space-y-3">
                                                <PrivacyConsentCheckbox
                                                    id="webinar-privacy-consent"
                                                    checked={privacyConsent}
                                                    onChange={setPrivacyConsent}
                                                    theme="dark"
                                                />
                                                <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 font-montserrat text-xs leading-relaxed text-white/70">
                                                    <input
                                                        type="checkbox"
                                                        checked={marketingConsent}
                                                        onChange={(event) => setMarketingConsent(event.target.checked)}
                                                        className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
                                                    />
                                                    <span>
                                                        Chcem dostávať informácie o nových PMU technikách, vzdelávaní a kurzoch Viktorija Kendra Academy.
                                                        <span className="block pt-1 text-white/35">nepovinné</span>
                                                    </span>
                                                </label>
                                            </div>

                                            {status === "error" && (
                                                <div className="flex items-center gap-2 text-red-400 text-xs font-montserrat bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errorMsg}
                                                </div>
                                            )}

                                            {TURNSTILE_ENABLED && (
                                                <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} theme="dark" className="flex justify-center" />
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === "submitting" || !privacyConsent || !position || (TURNSTILE_ENABLED && !turnstileToken)}
                                                className="w-full py-5 bg-gold text-[#1D0E22] font-marcellus uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all shadow-xl hover:shadow-gold/20 flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                {status === "submitting" ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Registrujem...
                                                    </>
                                                ) : (
                                                    "Registrovať sa bezplatne"
                                                )}
                                            </button>

                                            <p className="font-montserrat text-center text-white/45 text-xs leading-relaxed">
                                                Po registrácii vám príde potvrdenie na uvedený e-mail. Link na pripojenie k LIVE webináru vám pošleme pred jeho začiatkom.
                                            </p>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
