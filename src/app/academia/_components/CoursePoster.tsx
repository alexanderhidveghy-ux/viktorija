import Image from "next/image";
import { Abril_Fatface } from "next/font/google";
import { courseBySlug } from "@/lib/academy-dates";

// Course posters keep the designer's artwork, but the date is no longer part of the
// picture: public/academia/<kurz>/poster.png is the original poster with the date
// removed, and the text from lib/academy-dates.ts (`poster`) is drawn over the same
// spot. Changing a date is a text edit, not a new graphic.
// Coordinates are in the posters' own pixels (2250 × 2813).

// The serif of the dates in the "Termíny" boxes.
const abril = Abril_Fatface({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-poster-display", preload: false });

const W = 2250;
const H = 2813;
const GOLD = "#DDA85B";

type Slot = { x: number; y: number; size: number; maxWidth: number; anchor?: "start" | "middle" };
type Layout = {
    src: string;
    font: "sans" | "display";
    fill: string;
    /** one line (a date range, or "INDIVIDUÁLNE") */
    one: Slot;
    /** small gold line + big line */
    two?: [Slot, Slot];
    /** three dates above the labels of a three-column box */
    three?: [Slot, Slot, Slot];
};

const LAYOUTS: Record<string, Layout> = {
    "the-art-of-pmu": {
        src: "/academia/kurz-art-of-pmu/poster.png",
        font: "sans",
        fill: "#F7F6F5",
        one: { x: 757, y: 1722, size: 107, maxWidth: 730 },
        two: [
            { x: 757, y: 1668, size: 36, maxWidth: 700 },
            { x: 757, y: 1740, size: 80, maxWidth: 720 },
        ],
    },
    "tri-techniky-obocia": {
        src: "/academia/kurz-obocie/poster.png",
        font: "sans",
        fill: "#F7F6F5",
        one: { x: 775, y: 2615, size: 120, maxWidth: 1150, anchor: "start" },
    },
    "hyperrealisticke-obocie": {
        src: "/academia/kurz-hyperrealisticke-obocie/poster.png",
        font: "display",
        fill: "#E8DACD",
        one: { x: 1126, y: 2562, size: 112, maxWidth: 1500 },
        three: [
            { x: 631, y: 2562, size: 112, maxWidth: 470 },
            { x: 1174, y: 2562, size: 112, maxWidth: 470 },
            { x: 1719, y: 2562, size: 112, maxWidth: 470 },
        ],
    },
    "pmu-ocnych-liniek": {
        src: "/academia/kurz-linky/poster.png",
        font: "display",
        fill: "#E8DACD",
        one: { x: 1146, y: 2366, size: 104, maxWidth: 1500 },
        three: [
            { x: 621, y: 2366, size: 104, maxWidth: 470 },
            { x: 1192, y: 2366, size: 104, maxWidth: 470 },
            { x: 1765, y: 2366, size: 104, maxWidth: 470 },
        ],
    },
    "pmu-pier": {
        src: "/academia/kurz-pery/poster.png",
        font: "display",
        fill: "#E8DACD",
        one: { x: 1124, y: 2526, size: 98, maxWidth: 1400 },
        three: [
            { x: 596, y: 2526, size: 98, maxWidth: 450 },
            { x: 1152, y: 2526, size: 98, maxWidth: 450 },
            { x: 1697, y: 2526, size: 98, maxWidth: 450 },
        ],
    },
};

// Rough advance widths (in em), on the wide side, so a longer text shrinks to fit
// its slot instead of running over the artwork.
const WIDTHS = {
    sans: { upper: 0.78, lower: 0.62, digit: 0.67, space: 0.3, other: 0.36 },
    display: { upper: 0.78, lower: 0.58, digit: 0.62, space: 0.28, other: 0.34 },
};

function fitSize(text: string, slot: Slot, font: Layout["font"], tracking = 0) {
    const w = WIDTHS[font];
    let em = 0;
    for (const ch of text) {
        if (ch === " ") em += w.space;
        else if (/\d/.test(ch)) em += w.digit;
        else if (/\p{Lu}/u.test(ch)) em += w.upper;
        else if (/\p{Ll}/u.test(ch)) em += w.lower;
        else em += w.other;
        em += tracking;
    }
    return Math.min(slot.size, slot.maxWidth / Math.max(em, 1));
}

export default function CoursePoster({ slug }: { slug: string }) {
    const layout = LAYOUTS[slug];
    const course = courseBySlug(slug);
    if (!layout || !course) return null;

    const lines = course.poster ?? [];
    const family = layout.font === "display" ? "var(--font-poster-display), serif" : "var(--font-montserrat), sans-serif";

    let texts: { text: string; slot: Slot; fill: string; weight: number; tracking: number }[] = [];
    if (lines.length === 3 && layout.three) {
        texts = lines.map((text, i) => ({ text, slot: layout.three![i], fill: layout.fill, weight: 400, tracking: 0 }));
    } else if (lines.length === 2 && layout.two) {
        texts = [
            { text: lines[0], slot: layout.two[0], fill: GOLD, weight: 500, tracking: 0.14 },
            { text: lines[1], slot: layout.two[1], fill: layout.fill, weight: 400, tracking: 0 },
        ];
    } else if (lines.length) {
        texts = [{ text: lines.join(" "), slot: layout.one, fill: layout.fill, weight: 400, tracking: 0 }];
    }

    return (
        <>
            <Image
                src={layout.src}
                alt={`${course.name} – ${course.term}`}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
            />
            <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="xMidYMid slice"
                className={`absolute inset-0 h-full w-full pointer-events-none ${abril.variable}`}
                aria-hidden="true"
            >
                {texts.map(({ text, slot, fill, weight, tracking }) => (
                    <text
                        key={text}
                        x={slot.x}
                        y={slot.y}
                        textAnchor={slot.anchor ?? "middle"}
                        fill={fill}
                        fontSize={fitSize(text, slot, layout.font, tracking)}
                        fontWeight={weight}
                        letterSpacing={tracking ? `${tracking}em` : undefined}
                        style={{ fontFamily: family }}
                    >
                        {text}
                    </text>
                ))}
            </svg>
        </>
    );
}
