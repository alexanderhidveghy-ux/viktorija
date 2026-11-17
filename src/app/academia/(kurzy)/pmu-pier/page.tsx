import type { Metadata } from "next";
import LightboxImage from "@/components/LightboxImage";
import PhotoSection from "@/app/academia/_components/PhotoSection";
import CourseProgram from "@/app/academia/_components/CourseProgram";
import PlayableVideo from "@/components/PlayableVideo";
import TatraBankaBanner from "@/app/academia/_components/TatraBankaBanner";

export const metadata: Metadata = {
    title: "Master Class: Permanentný Make-up Pier | Viktorija Kendra Academia",
    description: "Špecializačný kurz zameraný na moderné techniky pier, ombré a kórejské pery pre pokročilých artistov.",
    alternates: { canonical: "/academia/pmu-pier" },
};

const PHOTOS = ["/academia/kurz-pery/4.png", "/academia/kurz-pery/kozmetika.webp", "/academia/kurz-pery/vik2.jpg"];


const STUDENT_WORKS = [
    "/academia/kurz-pery/081a3ef1-727c-45b5-8bef-4c47d01c3b52.JPG",
    "/academia/kurz-pery/PHOTO-2026-06-04-13-38-01.JPG",
];

const SCHEDULE = [
    { num: "1", title: "ONLINE ŠTART", date: "09:00 – 10:00", items: ["Úvod, nastavenie systému práce a očakávaní"] },
    { num: "2", title: "1. DEŇ – TEÓRIA + TRÉNING", date: "09:00 – 19:00", items: ["komplexný teoretický základ", "analýza typov pokožky", "tréning na latexe", "demo ukážka od Viktorije", "prezentácia techník (ombré, kórejské pery, čistá forma)"] },
    { num: "3", title: "2. DEŇ – PRAX NA MODELKÁCH", date: "09:00 – 18:00", items: ["každá účastníčka pracuje na modelkách", "výber 2 techník", "individuálne vedenie", "malá skupina pre maximálnu pozornosť"] },
    { num: "4", title: "ONLINE", date: "08:00 – 9:00", items: ["Rozbor domácich úloh (latex / klientky)"] },
    { num: "5", title: "KOREKCIA", date: "09:00 – 19:00", items: ["Stabilizácia výsledkov a prehĺbenie techniky"] },
];

import CourseBookingSection from "@/app/academia/_components/CourseBookingSection";
import AnimatedSpace from "@/app/academia/_components/AnimatedSpace";
import ContactCTA from "@/app/academia/_components/ContactCTA";
import { INDIVIDUAL_NOTE } from "@/lib/academy-dates";

export default function Kurz2Page() {
    return (
        <AnimatedSpace className="space-y-16">
            <h1 className="sr-only">Master Class: PMU Pier</h1>

            {/* Section 1: Techniques */}
            <PhotoSection poster="pmu-pier" flip={false} contentClassName="md:pl-8 md:pr-6">
                <div className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="font-marcellus text-3xl uppercase tracking-widest text-[#1D0E22] leading-none">
                            Permanentný make-up pier
                        </h2>
                    </div>

                    <p className="font-montserrat text-base font-light text-[#1D0E22] leading-[1.18]">
                        Na kurze sa budeme venovať dvom moderným technikám permanentného make-upu pier:
                    </p>

                    <ul className="space-y-1 font-montserrat text-base font-light text-[#1D0E22] leading-[1.16]">
                        {[
                            "efektu kórejských pier — jemná červeň prirodzene vychádzajúca zo stredu pier so sviežim a prirodzeným výsledkom",
                            "ombré technike — definovanejšia kontúra plynulo prechádzajúca do jemného púdrového ružového alebo broskyňového odtieňa smerom do vnútra pier"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-2"><span className="text-gold text-sm mt-0.5 shrink-0">✦</span><span>{item}</span></li>
                        ))}
                    </ul>

                    <p className="font-montserrat text-base font-light text-[#1D0E22] leading-[1.18]">
                        Permanentný make-up pier vyžaduje jemnosť, technickú kontrolu a správne pochopenie práce s pokožkou pier.
                    </p>

                    <p className="font-montserrat text-base font-light text-[#1D0E22] leading-[1.18]">
                        Jedným z najdôležitejších bodov pri práci na perách je správne vyrovnanie pracovnej plochy — tak akurát.
                        Nie príliš veľa, ale ani málo.
                        Práve správne napnutie pokožky výrazne ovplyvňuje čistotu implantácie pigmentu aj následné hojenie.
                    </p>

                    <p className="font-montserrat text-base font-light text-[#1D0E22] leading-[1.18]">
                        Počas kurzu budeme pracovať s minerálnymi aj hybridnými pigmentami, aby študenti precítili rozdiel v implantácii pigmentu, jeho správaní v pokožke a vo vyhojenom výsledku.
                    </p>

                    <h3 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22] pt-1 leading-none">
                        Budeme sa venovať:
                    </h3>
                    <ul className="space-y-1 font-montserrat text-base font-light text-[#1D0E22] leading-[1.16]">
                        {[
                            "správnemu šrafovaniu končekom ihly",
                            "práci s rýchlosťou strojčeka",
                            "netraumatickému pohybu ruky",
                            "technike práce bez zbytočného opuchu a krvácania",
                            "vytváraniu jemných farebných prechodov",
                            "práci s formou a optickou harmóniou pier"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-2"><span className="text-gold text-sm mt-0.5 shrink-0">✦</span><span>{item}</span></li>
                        ))}
                    </ul>
                </div>
            </PhotoSection>

            {/* Section 2: Photo + PERY video side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-2xl min-h-[400px] md:min-h-[520px]">
                    <LightboxImage src="/academia/kurz-pery/IMG_8614.webp" alt="" fill className="object-cover" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <p className="absolute bottom-6 left-6 font-marcellus text-base md:text-lg uppercase tracking-widest text-[#EEE3CE]">
                        Definícia formy pier
                    </p>
                </div>
                <div className="relative overflow-hidden rounded-2xl min-h-[400px] md:min-h-[520px]">
                    <PlayableVideo src="https://pub-60b685024baf4def829d5151d4dc320a.r2.dev/PERY.mp4" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <p className="absolute bottom-6 left-6 font-marcellus text-base md:text-lg uppercase tracking-widest text-[#EEE3CE]">
                        Šrafovanie
                    </p>
                </div>
            </div>

            {/* Program kurzu + video */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
                <div className="relative overflow-hidden rounded-2xl min-h-[400px] md:min-h-[520px]">
                    <PlayableVideo src="https://pub-60b685024baf4def829d5151d4dc320a.r2.dev/pery-academy.mp4" />
                </div>
                <div className="flex flex-col justify-start px-0 md:px-12 pt-6 md:pt-0 pb-10">
                    <div className="space-y-6">
                        <CourseProgram schedule={SCHEDULE} note={INDIVIDUAL_NOTE} />
                    </div>
                </div>
            </div>

            {/* Práce študentiek */}
            <div className="space-y-6">
                <h2 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22] text-center">Práce študentiek</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {STUDENT_WORKS.map((item, i) => (
                        <div key={item} className="relative aspect-square overflow-hidden rounded-2xl border border-black/10 shadow-sm bg-[#1D0E22]/5">
                            <LightboxImage src={item} alt="Práca študentky" fill className="object-cover" group={STUDENT_WORKS} groupIndex={i} />
                        </div>
                    ))}
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-black/10 shadow-sm bg-[#1D0E22]/5">
                        <PlayableVideo src="https://pub-60b685024baf4def829d5151d4dc320a.r2.dev/IMG_3039.mp4" small />
                    </div>
                </div>
            </div>

            {/* Hours + Pricing */}
            <div className="space-y-8">
                <div className="border border-[#1D0E22]/10 rounded-2xl p-8 space-y-6">
                    <h2 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22]">Rozsah výučby</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <p className="font-marcellus text-3xl text-[#1D0E22]">29 hod</p>
                            <p className="font-montserrat text-[11px] uppercase tracking-wider text-[#1D0E22]/50">Prezenčne</p>
                        </div>
                        <div>
                            <p className="font-marcellus text-3xl text-[#1D0E22]">2 hod</p>
                            <p className="font-montserrat text-[11px] uppercase tracking-wider text-[#1D0E22]/50">Online</p>
                        </div>
                        <div>
                            <p className="font-marcellus text-3xl text-[#1D0E22]">2 hod</p>
                            <p className="font-montserrat text-[11px] uppercase tracking-wider text-[#1D0E22]/50">Video lekcie</p>
                        </div>
                    </div>
                </div>
            <div className="grid md:grid-cols-2 gap-6 md:max-w-[66.666%] md:mx-auto">
                <div className="border border-[#1D0E22]/30 bg-[#1D0E22]/5 rounded-2xl p-8 text-center space-y-3 flex flex-col justify-center">
                    <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-[#1D0E22]/50">Cena kurzu</p>
                    <p className="font-marcellus text-5xl text-[#1D0E22]">1 268 €</p>
                </div>
                <TatraBankaBanner />
            </div>
            </div>

            <CourseBookingSection courseName="Master Class: PMU Pier" />
        <ContactCTA />
        </AnimatedSpace>
    );
}
