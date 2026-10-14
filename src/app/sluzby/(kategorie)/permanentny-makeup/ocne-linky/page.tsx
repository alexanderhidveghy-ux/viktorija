import type { Metadata } from "next";
import EyesContent from "./EyesContent";

export const metadata: Metadata = {
    title: "Permanentné očné linky Bratislava | Viktorija Kendra",
    description: "Tieňované očné linky a očné linky medzi riasy. Jemné vrstvenie pigmentu pre hĺbku a výraz pohľadu.",
    alternates: { canonical: "/sluzby/permanentny-makeup/ocne-linky" },
};

export default function EyesPage() {
    return <EyesContent />;
}
