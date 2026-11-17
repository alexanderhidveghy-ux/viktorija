// Tatra banka "Na splátky" banner (2026 legislative version from the bank – the
// "Upozornenie! Úver nie je zadarmo." line is part of the artwork, so the image is
// never cropped). Sits next to the price box(es) as one more tile of the same
// size: the bank's square 1080×1080 format, the price boxes stretch to match.
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`${IMG}-medium-zena-1080x1080.jpg`}
                width={1080}
                height={1080}
                alt="Tatra banka – Nakúpte teraz, zaplaťte postupne. Rozložte si platbu s online úverom Na splátky TB. Upozornenie! Úver nie je zadarmo."
                loading="lazy"
                className="block w-full h-auto"
            />
        </a>
    );
}
