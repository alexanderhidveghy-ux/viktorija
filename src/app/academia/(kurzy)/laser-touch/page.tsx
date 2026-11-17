import type { Metadata } from "next";
import LightboxImage from "@/components/LightboxImage";
import PhotoSection from "@/app/academia/_components/PhotoSection";
import TatraBankaBanner from "@/app/academia/_components/TatraBankaBanner";
import AnimatedSpace from "@/app/academia/_components/AnimatedSpace";
import ContactCTA from "@/app/academia/_components/ContactCTA";
import CourseBookingSection from "@/app/academia/_components/CourseBookingSection";

export const metadata: Metadata = {
    title: "Laser Touch | Viktorija Kendra Academia",
    description: "Individuálny kurz odstraňovania permanentného make-upu ND:YAG Q-Switch laserom – teória, bezpečnosť a prax v rukách skúsenej špecialistky.",
    alternates: { canonical: "/academia/laser-touch" },
};


export default function Kurz6Page() {
    return (
        <AnimatedSpace className="space-y-16">
            <h1 className="sr-only">Laser Touch – Individuálny kurz</h1>

            {/* Section 1: Photo + Intro */}
            <PhotoSection photo="/academia/kurz-laser/lasertouch%20main.PNG" flip={false}>
                <div className="space-y-6">
                    <div className="space-y-6 font-montserrat font-light text-[#1D0E22] leading-snug text-base">
                        <h2 className="font-marcellus text-3xl uppercase tracking-widest text-[#1D0E22] mb-4">
                            Odstraňovanie nežiaduceho permanentného make-upu ND:YAG Q-Switch laserom
                        </h2>
                        <p>
                            Laserovému odstraňovaniu permanentného make-upu sa venujem od roku 2014.
                            Aj ja sama som absolvovala individuálne školenia u dvoch špecialistov, ktorí patrili medzi priekopníkov laserového odstraňovania pigmentov. Jeden z nich sa dokonca podieľal na vývoji Q-Switch technológie.
                        </p>
                        <p>
                            Dlhoročná prax v permanentnom make-upe mi umožňuje rozumieť pigmentu nielen z pohledu lasera, ale aj z pohľadu jeho správania v pokožke, hĺbky uloženia, hojenia a reakcie organizmu počas rokov.
                        </p>
                        <p>
                            Kurz je určený pre špecialistov, ktorí chcú bezpečne a profesionálne pracovať s laserovým odstraňovaním permanentného make-upu a malých tetovaní.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22]">
                                1. časť — Teória a ukážky procedúr
                            </h2>
                        </div>
                        <div className="space-y-6 font-montserrat font-light text-[#1D0E22] leading-snug text-base">
                            <p>
                                Prvé stretnutie prebieha v mojom štúdiu formou teoretickej výučby a praktických ukážok.
                            </p>
                            <h3 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22] pt-4">Budeme sa venovať:</h3>
                            <ul className="space-y-1 text-base text-[#1D0E22]/80">
                                <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>technickým možnostiam ND:YAG Q-Switch lasera</span></li>
                                <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>správnemu nastavovaniu a kalibrácii impulzov</span></li>
                                <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>komunikácii medzi laserom, pokožkou a pigmentom</span></li>
                                <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>odtieňom pigmentov, ktoré laser vidí a ktoré reagujú odlišne</span></li>
                                <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>biologickým procesom v pokožke počas procedúry</span></li>
                                <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>fungovaniu lymfatického systému pri odvádzaní pigmentu</span></li>
                                <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>životu pigmentu v pokožke a pôsobeniu organizmu na jeho zmeny</span></li>
                                <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>bezpečnosti práce a ochrane integrity pokožky</span></li>
                                <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>situáciám, v ktorých môžeme bezpečne zvýšiť intenzitu laserového lúča</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </PhotoSection>

            {/* Section 2: Video + Učíme sa pracovať s & 2. časť */}
            <PhotoSection photo="https://pub-60b685024baf4def829d5151d4dc320a.r2.dev/lasertouch-academy.mp4" flip={true} aspectClass="aspect-square" playable>
                <div className="space-y-6 font-montserrat font-light text-[#1D0E22] leading-tight text-base">
                    <div>
                        <h2 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22]">Učíme sa pracovať s:</h2>
                        <ul className="space-y-1 text-base text-[#1D0E22]/80 mt-2">
                            <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>obočím</span></li>
                            <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>perami</span></li>
                            <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>očnými linkami</span></li>
                            <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>malými tetovaniami</span></li>
                        </ul>
                    </div>
                    <p className="pt-2">
                        Súčasťou školenia je aj systém výpočtu predpokladaného počtu procedúr pomocou špecializovaných tabuliek, aby ste vedeli klientov správne informovať ešte pred začiatkom procesu.
                    </p>
                    <div className="border-l-2 border-gold/40 pl-4 italic text-[#1D0E22]/80 py-1">
                        <p>Laserové odstránenie patrí medzi najrýchlejšie a najbezpečnejšie metódy odstránenia pigmentu z tela bez narušenia integrity pokožky.</p>
                    </div>

                    <div className="space-y-6 pt-4">
                        <div>
                            <h2 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22]">
                                2. časť — Práca s vaším laserom
                            </h2>
                        </div>
                        <div className="space-y-6 font-montserrat font-light text-[#1D0E22] leading-snug text-base">
                            <p>Druhá časť kurzu prebieha priamo u vás v salóne alebo na klinike.</p>
                            <p>Pracujeme s vaším laserom a nastavujeme vhodné parametre podľa typu zariadenia, výkonu a konkrétnych procedúr.</p>
                            <p>Nasleduje praktická časť na modelkách, kde sa špecialista zaučuje pod mojím vedením priamo v praxi.</p>
                        </div>
                    </div>
                </div>
            </PhotoSection>

            {/* Section 3: Photo + V rámci kurzu získavate */}
            <PhotoSection photo="/academia/kurz-laser/photo_2025-03-17_13-31-34.jpg" flip={false} aspectClass="aspect-square">
                <div className="space-y-6">
                    <div>
                        <h2 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22]">
                            V rámci kurzu získavate
                        </h2>
                    </div>
                    <ul className="space-y-1 font-montserrat font-light text-[#1D0E22]/80 text-base">
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>plagáty procesu odstránenia pre klientov</span></li>
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>anamnézy a informované súhlasy</span></li>
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>systém práce a konzultácií</span></li>
                        <li className="flex gap-2"><span className="text-gold shrink-0">✦</span><span>individuálne vedenie počas zaučenia</span></li>
                    </ul>
                    <div className="border-l-2 border-gold/40 pl-4 italic text-[#1D0E22]/70 text-sm">
                        <p className="font-montserrat font-light leading-relaxed">V prípade záujmu viem individuálne pomôcť aj so zabezpečením kvalitného lasera priamo od výrobcu — od komunikácie a dohodnutia podmienok až po samotný proces objednávky.</p>
                    </div>
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-black/10 shadow-sm">
                        <LightboxImage src="/academia/kurz-laser/IMG_4532%201.jpg" alt="" fill className="object-cover" />
                    </div>
                </div>
            </PhotoSection>

            {/* Pricing */}
            <div className="grid md:grid-cols-2 gap-6 md:max-w-[66.666%] md:mx-auto -mt-8 md:-mt-12">
                <div className="border border-[#1D0E22]/30 bg-[#1D0E22]/5 rounded-2xl p-8 text-center space-y-3 flex flex-col justify-center">
                    <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-[#1D0E22]/50">Cena kurzu</p>
                    <p className="font-marcellus text-5xl text-[#1D0E22]">1 280 €</p>
                </div>
                <TatraBankaBanner />
            </div>

            <CourseBookingSection courseName="Laser Touch" />
            <ContactCTA />
        </AnimatedSpace>
    );
}
