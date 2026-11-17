import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogSection from "@/components/BlogSection";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Viktorija Kendra | Permanentný make-up a kozmetika Bratislava",
    description: "Profesionálny permanentný make-up, estetická kozmetika, nastreľovanie náušníc a kurzy v akadémii. Viktorija (Viktoria) Kendra – 20+ rokov skúseností v srdci Bratislavy.",
    alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <h1 className="sr-only">Viktorija Kendra – permanentný make-up, kozmetika a PMU akadémia v Bratislave</h1>
      <div className="relative isolate">
        <Hero />
        <BlogSection />
        <Reviews />
      </div>
      <Footer />
    </main>
  );
}
