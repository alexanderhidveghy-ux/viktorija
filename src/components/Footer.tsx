"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";

import { openingHoursForDisplay as openingHours } from "@/lib/business";

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
    const isActive = pathname === href || (href.startsWith('/#') && pathname === '/');

    return (
        <a
            href={href}
            className={`transition-all duration-500 font-montserrat font-light text-sm
                ${isActive
                    ? 'text-[#EEE3CE] [text-shadow:0_0_12px_rgba(238,227,206,0.8)]'
                    : 'text-[#EEE3CE] hover:[text-shadow:0_0_15px_rgba(238,227,206,0.6)] [text-shadow:0_0_5px_rgba(238,227,206,0.1)]'
                }`}
        >
            {label}
        </a>
    );
}

export default function Footer() {
    const pathname = usePathname();
    // Na kontakt stránke má mapu s fotkou samotná stránka – vo footeri by boli duplicitné.
    // Mriežka ostáva dvojstĺpcová, aby ľavá časť zostala na rovnakom mieste ako inde.
    const showMaps = pathname !== "/kontakt";

    return (
        <footer id="kontakt" className="bg-[#1D0E22] py-16 border-t border-white/10">
            <div className="w-[95vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* LEFT SIDE - Content */}
                <div className="flex flex-col justify-between h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[minmax(0,0.75fr)_repeat(3,minmax(0,1fr))] gap-8 lg:gap-10 text-center md:text-left items-start">
                        {/* Brand */}
                        <div className="relative w-full h-24 md:h-32">
                            <Image
                                src="/shared/output-onlinepngtools-removebg-preview.png"
                                alt="Viktorija Kendra"
                                fill
                                sizes="200px"
                                className="object-contain md:object-left"
                            />
                        </div>

                        {/* Navigation */}
                        <div className="order-4 space-y-6 pt-4 md:order-2">
                            <h2 className="font-marcellus text-[#EEE3CE] tracking-[0.2em] text-sm uppercase">NAVIGÁCIA</h2>
                            <nav className="flex flex-col gap-3">
                                <NavLink href="/" label="Domov" pathname={pathname} />
                                <NavLink href="/sluzby/permanentny-makeup" label="Štúdio" pathname={pathname} />
                                <NavLink href="/#academy" label="Academy" pathname={pathname} />
                                <NavLink href="/kontakt" label="Kontakt" pathname={pathname} />
                            </nav>
                        </div>

                        {/* Contact */}
                        <div className="order-3 space-y-6 pt-4 md:order-3">
                            <h2 className="font-marcellus text-[#EEE3CE] tracking-[0.2em] text-sm uppercase">KONTAKT</h2>
                            <div className="font-montserrat text-[#EEE3CE] font-light text-sm space-y-3">
                                <p className="leading-relaxed text-[#EEE3CE]">Twin City Tower<br />Mlynské Nivy 10<br />821 09 Bratislava</p>
                                <a href="tel:+421907796562" className="block hover:text-white transition-all duration-300 text-[#EEE3CE]">+421 907 796 562</a>
                                <a href="mailto:viktorija@viktorija.sk" className="block hover:[text-shadow:0_0_10px_rgba(238,227,206,0.6)] transition-all duration-300 text-[#EEE3CE]">viktorija@viktorija.sk</a>
                            </div>
                        </div>

                        {/* Opening hours */}
                        <div className="order-2 space-y-6 pt-4 md:order-4">
                            <h2 className="font-marcellus text-[#EEE3CE] tracking-[0.2em] text-sm uppercase">OTVÁRACIE HODINY</h2>
                            <dl className="font-montserrat text-[#EEE3CE] font-light text-sm space-y-2">
                                {openingHours.map(({ day, hours }) => (
                                    <div key={day} className="flex items-baseline justify-center gap-3 md:justify-between">
                                        <dt className="uppercase tracking-[0.12em] text-[11px] text-[#EEE3CE]/70">{day}</dt>
                                        <dd className="whitespace-nowrap text-[#EEE3CE]">{hours}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>

                    {/* Bottom Links */}
                    <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 items-center justify-center md:justify-start text-[10px] text-[#EEE3CE] font-montserrat font-light uppercase tracking-widest">
                        <p>© {new Date().getFullYear()} Viktorija Kendra. Všetky práva vyhradené.</p>
                        <a href="/osobne-udaje" className="hover:text-[#EEE3CE] transition-colors hover:[text-shadow:0_0_8px_rgba(238,227,206,0.4)]">Ochrana osobných údajov</a>
                        <button
                            onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
                            className="hover:text-[#EEE3CE] transition-colors hover:[text-shadow:0_0_8px_rgba(238,227,206,0.4)]"
                        >
                            NASTAVENIA COOKIES
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE - Maps */}
                {showMaps && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full min-h-[400px]">
                    <div className="relative w-full h-full min-h-[300px] sm:min-h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="/shared/mapa.jpeg"
                            alt="Mapa prístupu"
                            fill
                            sizes="(max-width: 640px) 100vw, 25vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full h-full min-h-[300px] sm:min-h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                        <GoogleMapEmbed title="Viktorija Kendra - mapa vo footeri" />
                    </div>
                </div>
                )}
            </div>
        </footer>
    );
}
