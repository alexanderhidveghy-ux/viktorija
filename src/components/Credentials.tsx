import Image from "next/image";

// The three credential badges under the hero intro. The source artwork is transparent
// gold line art, trimmed and downscaled to 256px so it stays sharp on retina without
// shipping the 1254px originals.
const CREDENTIALS = [
    {
        src: "/new-home/artistka.png",
        title: "ARTISTKA",
        lines: ["Estetický permanentný make-up", "od roku 2006"],
    },
    {
        src: "/new-home/kozmeticka.png",
        title: "KOZMETIČKA",
        lines: ["Odborná starostlivosť o pleť", "od roku 2001"],
    },
    {
        src: "/new-home/skolitelka.png",
        title: "ŠKOLITEĽKA",
        lines: ["Vlastná akadémia a výučba PMU", "od roku 2012"],
    },
];

export default function Credentials() {
    return (
        <div className="rounded-2xl border border-[#1D0E22]/15 px-4 py-7 md:px-8 md:py-8">
            <ul className="grid grid-cols-3 gap-3 md:gap-6">
                {CREDENTIALS.map(({ src, title, lines }) => (
                    <li key={title} className="flex flex-col items-center text-center">
                        <Image
                            src={src}
                            alt=""
                            width={256}
                            height={256}
                            aria-hidden="true"
                            className="w-14 h-14 md:w-16 md:h-16 object-contain mb-3"
                        />
                        <h3 className="font-marcellus text-[11px] md:text-sm text-[#1D0E22] uppercase tracking-[0.18em]">
                            {title}
                        </h3>
                        <p className="mt-1.5 font-montserrat text-[10px] md:text-xs font-light leading-snug text-[#1D0E22]/65">
                            {lines.map((line) => (
                                <span key={line} className="block">
                                    {line}
                                </span>
                            ))}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
