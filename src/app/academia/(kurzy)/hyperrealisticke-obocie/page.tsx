import type { Metadata } from "next";
import PhotoSection from "@/app/academia/_components/PhotoSection";
import CourseProgram from "@/app/academia/_components/CourseProgram";
import TatraBankaBanner from "@/app/academia/_components/TatraBankaBanner";

export const metadata: Metadata = {
    title: "Hyperrealistické Obočie | Academia | Salón Viktória",
    description: "Master Class pre pokročilých zameraný na najnáročnejšiu techniku PMU – hyperrealistické obočie (hair stroke).",
    alternates: { canonical: "/academia/hyperrealisticke-obocie" },
};

const PHOTOS = ["/academia/kurz-hyperrealisticke-obocie/5.png", "/academia/kurz-hyperrealisticke-obocie/d58b22d3-0299-4126-b2de-dbe420480e95.JPG", "/academia/kurz-hyperrealisticke-obocie/IMG_4090%201.jpg"];


const SCHEDULE = [
    { num: "1", title: "ONLINE ŠTART", date: "20.10.", items: ["4 online stretnutia po 60 min – teória, systém práce"] },
    { num: "2", title: "ACADEMIA – TRÉNING + PRAX", date: "4. – 6.11. | 09:00 – 18:00", items: ["Intenzívny tréning techniky", "Práca na modelkách"] },
    { num: "3", title: "ACADEMIA – MODELKY + KOREKCIE", date: "4.12. | 09:00 – 18:00", items: ["Práca na modelkách", "Korekcie výsledkov"] },
];

import CourseBookingSection from "@/app/academia/_components/CourseBookingSection";
import AnimatedSpace from "@/app/academia/_components/AnimatedSpace";
import ContactCTA from "@/app/academia/_components/ContactCTA";

export default function Kurz5Page() {
    return (
        <AnimatedSpace className="space-y-16">
            <PhotoSection photo={PHOTOS[0]} flip={false}>
                <div className="space-y-6">
                    <h1 className="font-marcellus text-3xl uppercase tracking-widest text-[#1D0E22] mb-4">
                        HYPERREALISTICKÉ OBOČIE / HAIRSTROKE
                    </h1>
                    
                    <p className="font-montserrat text-base font-light text-[#1D0E22] leading-snug">
                        Technika kreslenia chĺpkov a schéma ich ukladania, ktorú učím, je vytvorená predovšetkým pre klientsku prax.
                        Na medzinárodných súťažiach som s touto technikou obsadila 2. až 8. miesto, no pre mňa je najdôležitejšie, že klientky tento typ obočia milujú — pretože pôsobí prirodzene, vzdušne a zároveň husto.
                    </p>
                    
                    <p className="font-montserrat text-base font-light text-[#1D0E22] leading-snug">
                        Hyperrealistické obočie patrí technicky medzi najnáročnejšie techniky permanentného make-upu.
                        Aj skúsený artist musí pri práci neustále premýšľať nad smerom, rytmom a hustotou chĺpkov, vytvárať priestorový 3D efekt a kontrolovať jemnosť jednotlivých ťahov.
                    </p>
                    
                    <p className="font-montserrat text-base font-light text-[#1D0E22] leading-snug">
                        Pracujeme s viacerými odtieňmi pigmentov aj s riedidlom, aby sme vedeli regulovať intenzitu chĺpka — pretože prirodzený chĺpok nikdy nemá rovnakú sýtosť po celej dĺžke a ku koncu zostáva jemnejší a priesvitnejší.
                    </p>
                    
                    <p className="font-montserrat text-base font-light text-[#1D0E22] leading-snug">
                        Tento Master Class je určený pre skúsených artistov.
                        Budeme sa venovať predovšetkým technicky správnemu tetovaniu chĺpkov, práci s rýchlosťou strojčeka, vhodnou konfiguráciou ihiel a kontrole pohybu ruky pri vytváraní realistického efektu.
                    </p>
                </div>
            </PhotoSection>

            <PhotoSection photo={PHOTOS[1]} flip={true} aspectClass="aspect-[2/3] md:aspect-[3/4] max-h-[620px] mx-auto w-full" imageClass="object-cover object-top">
                <div className="space-y-6">
                    <div>
                        <h2 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22]">Čo sa naučíte</h2>
                    </div>
                    <ul className="space-y-1 font-montserrat text-base font-light text-[#1D0E22] leading-snug">
                        {[
                            "presné vedenie chĺpkov (flow, smer, vrstvenie)",
                            "kontrolu ruky a hĺbky pigmentácie",
                            "výber vhodných pigmentov pre čisté chĺpky bez rozpitia",
                            "tvorbu prirodzenej hustoty bez preplnenia",
                            "dosiahnuť výsledok, ktorý sa hojí jemne a čisto"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3"><span className="text-gold mt-0.5 shrink-0">✦</span><span>{item}</span></li>
                        ))}
                    </ul>
                </div>
            </PhotoSection>

            <PhotoSection photo={PHOTOS[2]} flip={false}>
                <div className="space-y-6">
                    <CourseProgram schedule={SCHEDULE} />
                </div>
            </PhotoSection>

            <div className="grid md:grid-cols-2 gap-6 md:max-w-[66.666%] md:mx-auto">
                <div className="border border-[#1D0E22]/30 bg-[#1D0E22]/5 rounded-2xl p-8 text-center space-y-3 flex flex-col justify-center">
                    <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-[#1D0E22]/50">Cena kurzu</p>
                    <p className="font-marcellus text-5xl text-[#1D0E22]">1 680 €</p>
                </div>
                <TatraBankaBanner />
            </div>
            
            <div className="p-8 bg-[#1D0E22]/5 rounded-2xl text-center italic font-montserrat text-sm text-[#1D0E22]/70">
                „Priemernosť dnes nestačí – klientky si vyberajú kvalitu, presnosť a výsledok. Pridajte sa na kurz a posuňte svoju prácu na vyššiu úroveň.“
            </div>

            <CourseBookingSection courseName="Hyperrealistické Obočie" />
        <ContactCTA />
        </AnimatedSpace>
    );
}
