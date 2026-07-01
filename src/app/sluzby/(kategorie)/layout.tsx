import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ServicesSidebar from "./_components/ServicesSidebar";

export default function SluzbyLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen text-white">
            <Header />
            <div className="pt-32 pb-24 w-[90vw] md:w-[95vw] mx-auto min-h-screen">
                <Link
                    href="/sluzby"
                    className="inline-flex items-center gap-2 text-[#1D0E22]/60 hover:text-[#1D0E22] transition-colors mb-6 font-montserrat text-sm uppercase tracking-widest"
                >
                    <span aria-hidden="true">←</span> Všetky služby
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
                    <ServicesSidebar />
                    <div className="min-h-[600px] relative">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
