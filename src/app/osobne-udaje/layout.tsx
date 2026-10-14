import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ochrana osobných údajov | Viktorija Kendra",
    description: "Zásady spracovania osobných údajov a súkromia – GDPR. Viktorija Kendra, Bratislava.",
    alternates: { canonical: "/osobne-udaje" },
    robots: { index: false, follow: true },
};

export default function OsobneUdajeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
