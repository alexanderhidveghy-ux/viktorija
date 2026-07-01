import Image from "next/image";

// Tatra banka "Online podnikateľský úver" promo banner shown next to the price
// on every course page. Natural ratio / full width so it isn't side-cropped.
export default function TatraBankaBanner() {
    return (
        <a
            href="https://www.tatrabanka.sk/sk/business/uvery-financovanie/online-podnikatelsky-uver/?utm_medium=banner&utm_campaign=opu2026&utm_source=viktorijakendra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tatra banka – Online podnikateľský úver"
            className="block self-center overflow-hidden rounded-2xl border border-gold/30 bg-gold/5"
        >
            <Image
                src="/academia/tb-opu-banner.jpg"
                alt="Tatra banka – Online podnikateľský úver"
                width={1000}
                height={450}
                className="w-full h-auto"
            />
        </a>
    );
}
