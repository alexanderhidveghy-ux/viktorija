import type { Metadata } from "next";
import Image from "next/image";
import LightboxImage from "@/components/LightboxImage";

export const metadata: Metadata = {
    title: "Master Class: PMU Očných Liniek | Academia | Salón Viktória",
    description: "Špecializačný kurz zameraný na moderné techniky očných liniek, precíznu prácu na viečkach a tieňované linky.",
    alternates: { canonical: "/academia/pmu-ocnych-liniek" },
};

const PHOTOS = ["/academia/kurz-linky/3.png", "/academia/kurz-linky/IMG_5826 1.jpg", "/academia/kurz-linky/vik1.jpg"];

const SCHEDULE = [
    { num: "1", title: "Online príprava", date: "8:00 – 9:00", items: ["úvodné online stretnutie, nastavenie systému práce a príprava na kurz", "4 hodiny teoretických lekcií"] },
    { num: "2", title: "1. deň", date: "9:00 – 18:00", items: ["analýza domácich úloh", "nastavenie ruky", "odpracovanie každej techniky na latexe", "demo ukážka od Viktorije"] },
    { num: "3", title: "2. deň", date: "9:00 – 18:00", items: ["prax na modelkách", "každá študentka odpracuje dve techniky"] },
    { num: "4", title: "Online kontrolné stretnutie", date: "8:00 – 9:00", items: ["analýza domácich prác (na latexe alebo klientkach)"] },
    { num: "5", title: "Korekcia o mesiac", date: "9:00 – 18:00", items: ["analýza vyhojených prác", "porozumenie procesu hojenia", "dovedenie práce ku krásnemu a profesionálnemu výsledku"] },
];

function PhotoSection({ photo, flip = false, objectPosition, aspectClass, photoLabel, children }: { photo: string; flip?: boolean; objectPosition?: string; aspectClass?: string; photoLabel?: string; children: React.ReactNode }) {
    const isVideo = /\.(mp4|mov|webm)$/i.test(photo);
    const isPortraitPNG = /\.png$/i.test(photo);
    const containerClass = aspectClass || (isPortraitPNG ? "aspect-[4/5]" : "min-h-[400px] md:min-h-[520px]");
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-start ${flip ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}>
            <div className={`relative overflow-hidden rounded-2xl ${containerClass}`}>
                {isVideo ? (
                    <video src={photo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" style={objectPosition ? { objectPosition } : undefined} />
                ) : (
                    <LightboxImage src={photo} alt="" fill className="object-cover" style={objectPosition ? { objectPosition } : undefined} />
                )}
                {photoLabel && (
                    <>
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                        <p className="absolute bottom-6 left-6 font-marcellus text-base md:text-lg uppercase tracking-widest text-[#EEE3CE]">
                            {photoLabel}
                        </p>
                    </>
                )}
            </div>
            <div className="flex flex-col justify-start px-0 md:px-12 pt-6 md:pt-0 pb-10">
                {children}
            </div>
        </div>
    );
}

import CourseBookingSection from "@/app/academia/_components/CourseBookingSection";
import AnimatedSpace from "@/app/academia/_components/AnimatedSpace";
import ContactCTA from "@/app/academia/_components/ContactCTA";

export default function Kurz3Page() {
    return (
        <AnimatedSpace className="space-y-16">
            <h1 className="sr-only">Master Class: PMU Očných Liniek</h1>

            {/* Section 1: Intro & Techniques */}
            <PhotoSection photo={PHOTOS[0]} flip={false}>
                <div className="space-y-6 font-montserrat font-light text-[#1D0E22] leading-snug text-base">
                    <h2 className="font-marcellus text-3xl uppercase tracking-widest text-[#1D0E22] mb-4">
                        MASTER CLASS — Permanentný make-up očných liniek
                    </h2>
                    <p>
                        Očné linky patria medzi najprecíznejšie techniky permanentného make-upu. Práca na viečkach vyžaduje jemnosť, technickú kontrolu a správne nastavenie ruky.
                    </p>
                    <p>
                        Ja osobne si myslím, že linky medzi riasy pristanú takmer každému oku. Niektorým klientkam pristane len veľmi jemné zahustenie medzi riasami, iným mäkký chvostík alebo linka vedená jemne nad líniou rias.
                    </p>
                    <p>
                        Ich najväčšou výhodou je, že opticky vytvárajú efekt hustejších rias a zvýrazňujú pohľad bez toho, aby pôsobili ťažko.
                    </p>
                    <p>
                        Kórejské očné linky patria medzi moderné svetové trendy. Sú jemné, elegantné, vzdušné a klientky ich veľmi žiadajú. Vďaka tejto technike obohatíte svoju ponuku o aktuálnu estetickú novinku zo sveta moderného permanentného make-upu.
                    </p>
                    <p>
                        Tieňované očné linky patria technicky medzi najnáročnejšie techniky tetovania viečok. Vyžadujú trpezlivosť, jemnosť, technické znalosti a pochopenie práce s tieňom, hustotou a gradáciou pigmentu.
                    </p>
                </div>
            </PhotoSection>

            {/* Section 2: What we will cover & Who it is for */}
            <PhotoSection photo="/academia/kurz-linky/IMG_1249.mp4" flip={true} aspectClass="aspect-[4/5] w-full" objectPosition="50% 50%">
                <div className="space-y-6 font-montserrat font-light text-[#1D0E22] leading-snug text-base">
                    <h3 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22]">Budeme sa venovať:</h3>
                    <ul className="space-y-1 text-base text-[#1D0E22]/80">
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>správnemu nastaveniu ruky pre jemnú prácu na viečkach</span></li>
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>technike natiahnutia pokožky</span></li>
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>anatómii očí a viečok</span></li>
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>korekcii formy oka</span></li>
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>vyrovnávaniu asymetrie</span></li>
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>vytváraniu harmonického mandľového tvaru oka</span></li>
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>výberu vhodných ihiel a nastaveniu strojčeka</span></li>
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>bezpečnej a šetrnej práci na citlivej pokožke viečok</span></li>
                    </ul>

                    <p className="pt-4">
                        Kurz je určený pre artistov, ktorí chcú získať väčšiu istotu pri práci na očiach a naučiť sa vytvárať moderné, jemné a estetické očné linky.
                    </p>

                    <div className="pt-4 border-t border-[#1D0E22]/10">
                        <p className="text-sm font-medium text-[#1D0E22] italic">
                            ⚠️ Prosím, príďte s krátkymi prírodnými nechtami.
                        </p>
                    </div>

                    <div className="relative aspect-[8/7] overflow-hidden rounded-2xl border border-black/10 shadow-sm">
                        <LightboxImage src={PHOTOS[1]} alt="" fill className="object-cover object-[50%_44%]" />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                        <p className="absolute bottom-6 left-6 font-marcellus text-base md:text-lg uppercase tracking-widest text-[#EEE3CE]">
                            Kórejské očné linky
                        </p>
                    </div>
                </div>
            </PhotoSection>

            {/* Program kurzu */}
            <div className="max-w-3xl mx-auto px-2 md:px-0 space-y-6">
                <h2 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22]">Program kurzu</h2>
                <div className="space-y-4">
                    {SCHEDULE.map((block) => (
                        <div key={block.num} className="flex gap-3">
                            <span className="font-marcellus text-3xl text-[#1D0E22]/15 leading-none shrink-0">{block.num}</span>
                            <div className="space-y-0.5">
                                <div>
                                    <p className="font-marcellus text-base uppercase tracking-widest text-[#1D0E22] leading-tight">{block.title}</p>
                                    {block.date && <p className="font-montserrat text-xs text-[#1D0E22]/45 leading-tight mb-[3px]">{block.date}</p>}
                                </div>
                                <ul className="font-montserrat text-base font-light text-[#1D0E22]/70 leading-tight">
                                    {block.items.map((item, i) => (
                                        <li key={i} className="flex gap-1.5"><span className="text-gold shrink-0">✦</span><span>{item}</span></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Rozsah kurzu */}
            <div className="border border-[#1D0E22]/10 rounded-2xl p-8 space-y-6">
                <h2 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22]">Rozsah kurzu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                    <div>
                        <p className="font-marcellus text-3xl text-[#1D0E22]">27 hod</p>
                        <p className="font-montserrat text-[11px] uppercase tracking-wider text-[#1D0E22]/50">Prezenčne</p>
                    </div>
                    <div>
                        <p className="font-marcellus text-3xl text-[#1D0E22]">2 hod</p>
                        <p className="font-montserrat text-[11px] uppercase tracking-wider text-[#1D0E22]/50">Online</p>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="grid md:grid-cols-2 gap-6 md:max-w-[66.666%] md:mx-auto">
                <div className="border border-[#1D0E22]/30 bg-[#1D0E22]/5 rounded-2xl p-8 text-center space-y-3 flex flex-col justify-center">
                    <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-[#1D0E22]/50">Cena kurzu</p>
                    <p className="font-marcellus text-5xl text-[#1D0E22]">1 268 €</p>
                </div>
                <a
                    href="https://www.tatrabanka.sk/sk/business/uvery-financovanie/online-podnikatelsky-uver/?utm_medium=banner&utm_campaign=opu2026&utm_source=viktorijakendra"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Tatra banka – Online podnikateľský úver"
                    className="relative block overflow-hidden rounded-2xl border border-gold/30 bg-gold/5 h-full min-h-[180px]"
                >
                    <Image
                        src="/_unused/tb-opu/TB-OPU_1000x450px-ucto_1.jpg"
                        alt="Tatra banka – Online podnikateľský úver"
                        fill
                        className="object-cover"
                    />
                </a>
            </div>

            <CourseBookingSection courseName="Master Class: PMU Očných Liniek" />
            <ContactCTA />
        </AnimatedSpace>
    );
}
