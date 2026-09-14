"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import GoogleMap from "@/components/GoogleMap";
import LightboxImage from "@/components/LightboxImage";
import TurnstileWidget, { TURNSTILE_ENABLED } from "@/components/TurnstileWidget";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";

export default function KontaktPage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [turnstileToken, setTurnstileToken] = useState("");
    const [privacyConsent, setPrivacyConsent] = useState(false);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!privacyConsent) {
            setStatus("error");
            return;
        }
        setStatus("submitting");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, turnstileToken, privacyConsent }),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", message: "" });
                setTurnstileToken("");
                setPrivacyConsent(false);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen text-[#1D0E22]">
            <Header />
            <h1 className="sr-only">Kontakt</h1>

            <div className="pt-20 pb-8 md:pt-32 md:pb-24 w-[90vw] md:w-[95vw] mx-auto md:min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                {/* Contact Text & Form */}
                <div className="lg:col-span-4 space-y-4 md:space-y-10 animate-fade-in-up">
                    <div>
                        <p className="font-montserrat text-sm md:text-xl text-[#1D0E22]/80 font-light max-w-lg leading-relaxed border-l-2 border-[#1D0E22] pl-4 md:pl-6">
                            Máte otázky alebo sa chcete objednať? Neváhajte ma kontaktovať.
                        </p>
                    </div>

                    <div className="space-y-2 md:space-y-5 font-montserrat font-light text-sm md:text-lg">
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1D0E22] uppercase tracking-widest text-xs md:text-sm font-bold">Adresa</span>
                            <p>Twin City Tower<br />Mlynské Nivy 10, 821 09 Bratislava</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1D0E22] uppercase tracking-widest text-xs md:text-sm font-bold">Telefón</span>
                            <a href="tel:+421907796562" className="hover:text-gold transition-colors">+421 907 796 562</a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1D0E22] uppercase tracking-widest text-xs md:text-sm font-bold">Email</span>
                            <a href="mailto:viktorija@viktorija.sk" className="hover:text-gold transition-colors">viktorija@viktorija.sk</a>
                        </div>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-5 max-w-md pt-0 md:pt-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Vaše Meno"
                                className="w-full bg-transparent border-b border-[#1D0E22]/20 py-2 md:py-3 text-sm md:text-base text-[#1D0E22] placeholder-[#1D0E22]/80 focus:outline-none focus:border-[#1D0E22] transition-colors font-montserrat font-light"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={status === "success"}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Vaša E-mailová Adresa"
                                className="w-full bg-transparent border-b border-[#1D0E22]/20 py-2 md:py-3 text-sm md:text-base text-[#1D0E22] placeholder-[#1D0E22]/80 focus:outline-none focus:border-[#1D0E22] transition-colors font-montserrat font-light"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={status === "success"}
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Telefón"
                                className="w-full bg-transparent border-b border-[#1D0E22]/20 py-2 md:py-3 text-sm md:text-base text-[#1D0E22] placeholder-[#1D0E22]/80 focus:outline-none focus:border-[#1D0E22] transition-colors font-montserrat font-light"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={status === "success"}
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Správa"
                                rows={3}
                                className="w-full bg-transparent border-b border-[#1D0E22]/20 py-2 md:py-3 text-sm md:text-base text-[#1D0E22] placeholder-[#1D0E22]/80 focus:outline-none focus:border-[#1D0E22] transition-colors font-montserrat font-light resize-none"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                disabled={status === "success"}
                            />
                        </div>

                        {status === "error" && (
                            <div className="flex items-center gap-2 text-red-500 text-sm font-montserrat">
                                <AlertCircle className="w-4 h-4" />
                                Niečo sa pokazilo. Skúste to znova.
                            </div>
                        )}

                        {status === "success" && (
                            <div className="flex items-center gap-2 text-green-600 text-sm font-montserrat">
                                <CheckCircle className="w-4 h-4" />
                                Správa bola odoslaná. Ďakujeme!
                            </div>
                        )}

                        <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} theme="light" />
                        <PrivacyConsentCheckbox
                            id="contact-privacy-consent"
                            checked={privacyConsent}
                            onChange={setPrivacyConsent}
                            theme="light"
                            compactOnMobile
                        />

                        <button
                            type="submit"
                            disabled={status === "submitting" || status === "success" || !privacyConsent || (TURNSTILE_ENABLED && !turnstileToken)}
                            className="px-12 py-3 md:py-4 bg-[#1D0E22] text-gold font-marcellus font-bold tracking-widest hover:bg-opacity-90 transition-colors duration-300 w-full md:w-auto disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {status === "submitting" ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    ODOSIELAM...
                                </>
                            ) : status === "success" ? (
                                "ODOSLANÉ"
                            ) : (
                                "ODOSLAŤ SPRÁVU"
                            )}
                        </button>
                    </form>
                </div>

                {/* Map Section */}
                <div className="hidden md:grid lg:col-span-8 grid-cols-1 sm:grid-cols-2 gap-4 h-[600px] w-full">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <LightboxImage
                            src="/shared/mapa.jpeg"
                            alt="Mapa prístupu"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <GoogleMap
                            title="Salón Viktória - kontakt mapa"
                            extraMarkers={[
                                { lat: 48.146789638941314, lng: 17.12874363688941, label: "NIVY", imageSrc: "/shared/NIVY.webp", name: "NIVY centrum", address: "Mlynské Nivy 16, 821 09 Bratislava" },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
