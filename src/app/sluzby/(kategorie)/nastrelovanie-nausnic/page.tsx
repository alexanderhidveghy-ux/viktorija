import type { Metadata } from "next";
import NausniceContent from "./NausniceContent";

export const metadata: Metadata = {
    title: "Nastreľovanie náušníc Bratislava | Viktorija Kendra",
    description: "Profesionálne nastreľovanie náušníc pre deti aj dospelých. Estetické umiestnenie, maximálna hygiena a sterilita.",
    alternates: { canonical: "/sluzby/nastrelovanie-nausnic" },
};

export default function PiercingPage() {
    return <NausniceContent />;
}
