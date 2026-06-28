"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useLightbox } from "@/components/lightbox/LightboxContext";

type Review =
    | { name: string; text: string }
    | { image: string; name?: string; objectPosition?: string; caption?: { title: string; left: string; right: string } }
    | { video: string; name?: string };

const REVIEWS: Review[] = [
    { name: "Katarina Kvackajova", text: "Amazing facial treatment that makes me always look and feel at least 5 years younger:) Professional attitude, top level cosmetics procedures and products. Absolutely recommending." },
    { image: "/homepage/recenzie.jpg", objectPosition: "50% 20%", caption: { title: "Absolventky kurzu", left: "Mariya", right: "Michaela" } },
    { name: "Za Si", text: "Cosy little place with talented owner who can do miracles. Thanks for the perfect eye brows 😉 and years of service and friendship. Money and time well spent 👌🏻" },
    { name: "Dorota Paulik", text: "Viktorija je neuveriteľný profík a úžasná žena k tomu❤️ Každá návšteva je zážitok, po ktorom sa cítim ako znovuzrodená. Ďakujem🤩" },
    { image: "/homepage/recenzia1.webp", name: "Oľga Záblacká" },
    { name: "Kamila Danisova", text: "V salónu se vždy setkám s velkou profesionalitou. Po vyzkoušení několika salónů v Praze jsem se vrátila k Viktóriji, kde dostávám dlouhodobý vztah a péči." },
    { name: "Alexandra Hozakova", text: "Viktorija mi robila permanentný make up obočia a odviedla výbornú prácu. Precízna a profesionálna, určite odporúčam😊" },
    { video: "https://pub-60b685024baf4def829d5151d4dc320a.r2.dev/recenzia4.mp4", name: "Martina Shindlerova" },
    { name: "Viktoria – Jan Gerci", text: "Salón krásy Viktorija je úžasný, moderný. Majiteľka pracuje s kvalitnými materiálmi. Chodím k nej už osem rokov, moja pleť je krásna, mladá.. Viktorija je najlepšia expertka." },
    { name: "Dana Hamárová", text: "Viktorija sa stará o moju pleť už niekoľko rokov. Hneď po prvých návštevách som videla zmenu. Doporučujem hlavne masáže." },
    { image: "/homepage/recenzia2.jpg", name: "Barbora Bakošová" },
    { name: "Andrea Romanová", text: "Vyše pol roka som sa snažila inde odstrániť staré tetovanie, minula som čas a peniaze. Až u Viktorije začala moja 'nechcená ozdoba' konečne miznúť." },
    { name: "Katka Gajdošová", text: "Unavovalo ma každé ráno si kresliť obočie. Permanentný mejkap toto vyriešil a cítim sa krásna hneď ako vstanem." },
    { image: "/homepage/recenzia3.jpg", name: "David Kúdelka Key" },
    { name: "Zuzana Haasová", text: "Dobrý večer Viktorija, tento týždeň je to rok, kedy som začala robiť PMU. Vďaka vám. Všetky klientky prišli na základe toho, že videli moju prácu (váš tréning)." },
];

const REVIEW_IMAGES = REVIEWS.filter(
    (r): r is { image: string; name?: string; objectPosition?: string } => "image" in r
).map((r) => r.image);

function ReviewCard({ review }: { review: Review }) {
    const { open } = useLightbox();

    if ("image" in review) {
        return (
            <div
                className="relative self-stretch w-[350px] md:w-[450px] flex-shrink-0 rounded-xl overflow-hidden border border-white/10 cursor-zoom-in"
                onClick={() => open(REVIEW_IMAGES, Math.max(REVIEW_IMAGES.indexOf(review.image), 0))}
            >
                <Image
                    src={review.image}
                    alt="Recenzia"
                    fill
                    className="object-cover"
                    style={{ objectPosition: review.objectPosition ?? "50% 40%" }}
                    sizes="(max-width: 768px) 350px, 450px"
                />
                {review.caption ? (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-8 pb-6 pt-20">
                        <p className="font-marcellus text-white tracking-wider text-sm text-center">
                            {review.caption.title.toUpperCase()}
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                            <p className="font-marcellus text-white tracking-wider text-sm">
                                {review.caption.left.toUpperCase()}
                            </p>
                            <p className="font-marcellus text-white tracking-wider text-sm">
                                {review.caption.right.toUpperCase()}
                            </p>
                        </div>
                    </div>
                ) : review.name && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-8 pb-6 pt-20">
                        <p className="font-marcellus text-white tracking-wider text-sm">
                            {review.name.toUpperCase()}
                        </p>
                    </div>
                )}
            </div>
        );
    }

    if ("video" in review) {
        return (
            <div className="relative self-stretch w-[350px] md:w-[450px] flex-shrink-0 rounded-xl overflow-hidden border border-white/10">
                <video
                    src={review.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "50% 40%" }}
                />
                {review.name && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-8 pb-6 pt-20">
                        <p className="font-marcellus text-white tracking-wider text-sm">
                            {review.name.toUpperCase()}
                        </p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl w-[350px] md:w-[450px] flex-shrink-0 hover:bg-white/10 transition-colors">
            <p className="font-montserrat font-light text-[#1D0E22] italic mb-6 leading-relaxed">
                &ldquo;{review.text}&rdquo;
            </p>
            <div className="border-t border-white/10 pt-4">
                <p className="font-marcellus text-[#1D0E22] tracking-wider text-sm">
                    {review.name.toUpperCase()}
                </p>
            </div>
        </div>
    );
}

// Seconds for one full pass through all reviews (matches the old 60s/-50% pace).
const LOOP_SECONDS = 40;

// Wraps `v` into the half-open range [min, max) — the conveyor's modulo.
const wrapValue = (min: number, max: number, v: number) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
};

/**
 * Infinite marquee with no duplicate nodes: the 14 cards are rendered once and
 * each one is teleported to the far-right end the instant it exits the left,
 * while it's off-screen — so the belt is seamless with zero visible jump.
 */
function ReviewsMarquee() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const metrics = useRef({ step: 0, period: 0 });
    const offset = useRef(0);

    // step = one card's width + gap (cards are fixed width, so this is stable).
    useEffect(() => {
        const measure = () => {
            const first = cardRefs.current[0];
            const second = cardRefs.current[1];
            if (!first || !second) return;
            const step = second.offsetLeft - first.offsetLeft;
            metrics.current = { step, period: step * REVIEWS.length };
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    useAnimationFrame((_, delta) => {
        const { step, period } = metrics.current;
        if (!period) return;
        offset.current = (offset.current + (period / (LOOP_SECONDS * 1000)) * delta) % period;
        for (let i = 0; i < cardRefs.current.length; i++) {
            const el = cardRefs.current[i];
            if (!el) continue;
            const base = i * step;
            const x = wrapValue(-step, period - step, base - offset.current) - base;
            el.style.transform = `translate3d(${x}px, 0, 0)`;
        }
    });

    return (
        <div className="relative w-full overflow-hidden mask-fade-sides">
            <div className="flex items-stretch gap-8 px-4" style={{ width: "max-content" }}>
                {REVIEWS.map((review, i) => (
                    <div
                        key={i}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        className="flex flex-shrink-0"
                        style={{ willChange: "transform" }}
                    >
                        <ReviewCard review={review} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Reviews() {
    return (
        <section id="referencie" className="pt-14 pb-24 overflow-hidden">
            <Reveal className="w-[95vw] mx-auto mb-8 text-center">
                <h2 className="font-marcellus text-4xl mb-4 text-[#1D0E22] tracking-widest">
                    REFERENCIE
                </h2>
                <p className="font-montserrat text-[#1D0E22] text-lg uppercase tracking-wider">
                    Čo hovoria naše klientky
                </p>
            </Reveal>

            <ReviewsMarquee />
        </section>
    );
}
