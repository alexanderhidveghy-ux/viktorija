"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import BookingModal from "./BookingModal";

export default function ContactForm() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="self-start h-fit bg-[#1D0E22] border border-gold/30 p-8 rounded-2xl space-y-6 text-center shadow-2xl">
                <div className="space-y-3">
                    <h4 className="font-marcellus text-2xl text-gold uppercase tracking-widest">Objednať sa</h4>
                    <p className="text-white/70 text-sm font-montserrat">Vyberte si voľný termín priamo v online rezervačnom systéme.</p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="mx-auto bg-white text-[#1D0E22] border border-white/70 px-6 py-3 rounded-full shadow-2xl flex items-center justify-center gap-3 backdrop-blur-md group transition-transform hover:scale-105 hover:bg-gold active:scale-95"
                >
                    <span className="font-marcellus text-sm uppercase tracking-widest transition-colors">Objednať sa ONLINE</span>
                    <CalendarDays className="w-5 h-5 text-[#1D0E22]" />
                </button>
            </div>

            <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
