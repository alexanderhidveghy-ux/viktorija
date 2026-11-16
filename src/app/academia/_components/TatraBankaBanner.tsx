// Tatra banka "Na splátky" banner (2026 legislative version from the bank – the
// "Upozornenie! Úver nie je zadarmo." line is part of the artwork, so the image is
// never cropped). Sits full width below the price; each breakpoint gets
// the bank's own format where that warning stays most legible:
//   phone   → 800×1200 mobile hero
//   tablet  → 1080×1080 square
//   desktop → 1600×600 wide hero
const IMG = "/tatra/tb-003-2026740-naplatky-restart";

export default function TatraBankaBanner({ className = "" }: { className?: string }) {
    return (
        <a
            href="https://www.tatrabanka.sk/sk/personal/uvery/na-splatky/?utm_medium=banner&utm_campaign=naplatky2026&utm_source=viktorijakendra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tatra banka – Nakúpte teraz, zaplaťte postupne s online úverom Na splátky. Upozornenie! Úver nie je zadarmo."
            className={`block w-full max-w-md md:max-w-none mx-auto overflow-hidden rounded-2xl border border-gold/30 bg-gold/5 ${className}`}
        >
            <picture>
                <source media="(max-width: 639px)" srcSet={`${IMG}-hero-zena-800x1200.jpg`} width={800} height={1200} />
                <source media="(max-width: 1023px)" srcSet={`${IMG}-medium-zena-1080x1080.jpg`} width={1080} height={1080} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`${IMG}-hero-zena-1600x600.jpg`}
                    width={1600}
                    height={600}
                    alt="Tatra banka – Nakúpte teraz, zaplaťte postupne. Rozložte si platbu s online úverom Na splátky TB. Upozornenie! Úver nie je zadarmo."
                    loading="lazy"
                    className="block w-full h-auto"
                />
            </picture>
        </a>
    );
}
