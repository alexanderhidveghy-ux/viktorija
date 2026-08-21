import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Naše služby | Salón Viktória Bratislava",
    description:
        "Prehľad služieb Salónu Viktória v Bratislave – permanentný make-up, laserové odstraňovanie PMU, nastreľovanie náušníc, beauty therapy a domáca starostlivosť o pleť.",
    alternates: { canonical: "/sluzby" },
};

type Service = {
    label: string;
    sub: string;
    href: string;
    image: string;
    position?: string;
};

const SERVICES: Service[] = [
    {
        label: "Permanentný Make-up",
        sub: "Obočie, pery, očné linky a dermopigmentácia",
        href: "/sluzby/permanentny-makeup",
        image: "/sluzby/PHOTO-2026-02-10-14-41-10.jpg",
        position: "center center",
    },
    {
        label: "Odstraňovanie PMU",
        sub: "Šetrné laserové odstraňovanie pigmentu",
        href: "/sluzby/odstranovanie-pmu",
        image: "/sluzby/odstranenie.jpeg",
        position: "center 75%",
    },
    {
        label: "Nastreľovanie náušníc",
        sub: "Bezpečné a estetické nastreľovanie",
        href: "/sluzby/nastrelovanie-nausnic",
        image: "/sluzby/e38dda3c-d932-43cb-8f1d-3b15663e716d.JPG",
        position: "center 35%",
    },
    {
        label: "Beauty therapy",
        sub: "Estetické ošetrenia a rituály pleti",
        href: "/sluzby/beauty-therapy",
        image: "/sluzby/kozmetika.webp",
        position: "center center",
    },
    {
        label: "Skincare routine",
        sub: "Krémy a séra na domácu starostlivosť",
        href: "/sluzby/kremy-sera",
        image: "/sluzby/kremy-sera/serum-sidebar.jpg",
        position: "center 45%",
    },
];

export default function SluzbyPage() {
    return (
        <main className="min-h-screen text-[#1D0E22]">
            <Header />

            <section className="pt-32 md:pt-40 pb-24 w-[90vw] md:w-[95vw] max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-4">
                    <h1 className="font-marcellus text-4xl md:text-5xl uppercase tracking-widest text-[#1D0E22]">
                        Naše služby
                    </h1>
                    <p className="font-montserrat text-base font-light text-[#1D0E22]/75">
                        Vyberte si oblasť, ktorá vás zaujíma. Každej službe sa venujeme s dôrazom na
                        prirodzený výsledok, bezpečnosť a dlhodobú kvalitu.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {SERVICES.map((service) => (
                        <Link
                            key={service.href}
                            href={service.href}
                            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] block"
                        >
                            <Image
                                src={service.image}
                                alt={service.label}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                style={service.position ? { objectPosition: service.position } : undefined}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-6 space-y-1">
                                <h2 className="font-marcellus text-lg md:text-xl uppercase tracking-widest text-[#EEE3CE] group-hover:text-gold transition-colors duration-300">
                                    {service.label}
                                </h2>
                                <p className="font-montserrat text-xs font-light text-white/70 leading-snug">
                                    {service.sub}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
