import type { Metadata } from "next";
import { Marcellus_SC, Montserrat, Alex_Brush, Prociono, EB_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import CookieConsent from "@/components/CookieConsent";
import SiteBackdrop from "@/components/SiteBackdrop";
import LightboxProvider from "@/components/lightbox/LightboxContext";
import { ACADEMY, BRAND, GEO, INSTAGRAM, PHONE, SITE_URL, openingHoursSchema, postalAddressSchema } from "@/lib/business";

const marcellus = Marcellus_SC({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const prociono = Prociono({
  variable: "--font-prociono",
  weight: "400",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viktorija.sk"),
  title: "Viktorija Kendra | Permanentný make-up a kozmetika Bratislava",
  description: "Exkluzívny kozmetický salón v Bratislave. Ponúkame permanentný make-up (PMU), estetické rituály tváre, nastreľovanie náušníc a odborné kurzy v našej akadémii.",
  keywords: ["kozmetický salón Bratislava", "permanentný make-up Bratislava", "PMU Bratislava", "estetická kozmetika", "nastreľovanie náušníc", "kurzy permanentného make-upu", "Viktorija Kendra", "Viktorija Kendra Bratislava", "Viktoria Kendra", "Viktoria Bratislava", "salón Viktoria Bratislava", "salón krásy Viktorija"],
  authors: [{ name: "Viktorija Kendra" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Viktorija Kendra | Permanent makeup • Beauty • Academy",
    description: "Profesionálny permanentný make-up a estetické služby v srdci Bratislavy.",
    url: "https://viktorija.sk",
    siteName: "Viktorija Kendra",
    locale: "sk_SK",
    type: "website",
    images: [
      {
        url: "/shared/IMG_1422.JPG",
        width: 1200,
        height: 630,
        alt: "Viktorija Kendra – permanentný make-up a kozmetika",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viktorija Kendra | Permanent makeup • Beauty • Academy",
    description: "Profesionálny permanentný make-up a estetické služby v srdci Bratislavy.",
    images: ["/shared/IMG_1422.JPG"],
  },
  icons: {
    icon: '/shared/favicon.png',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": `${SITE_URL}/#salon`,
      "name": BRAND,
      // people often type the name without the "j"
      "alternateName": ["Viktoria Kendra", "Salón krásy Viktorija", "Salón Viktoria Bratislava"],
      "url": SITE_URL,
      "image": `${SITE_URL}/shared/IMG_1422.JPG`,
      "telephone": PHONE,
      "priceRange": "€€",
      "address": postalAddressSchema,
      "geo": { "@type": "GeoCoordinates", ...GEO },
      "openingHoursSpecification": openingHoursSchema,
      "areaServed": { "@type": "City", "name": "Bratislava" },
      "founder": { "@id": `${SITE_URL}/#viktorija` },
      "sameAs": [INSTAGRAM],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#viktorija`,
      "name": BRAND,
      "alternateName": "Viktoria Kendra",
      "jobTitle": "Permanent make-up artistka a lektorka PMU",
      "url": SITE_URL,
      "image": `${SITE_URL}/shared/IMG_1422.JPG`,
      "worksFor": { "@id": `${SITE_URL}/#salon` },
      "knowsAbout": ["permanentný make-up", "PMU obočia", "PMU pier", "PMU očných liniek", "odstraňovanie PMU", "estetické nastreľovanie náušníc"],
      "sameAs": [INSTAGRAM],
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#academia`,
      "name": ACADEMY,
      "alternateName": "Viktoria Kendra Academia",
      "url": `${SITE_URL}/academia`,
      "address": postalAddressSchema,
      "founder": { "@id": `${SITE_URL}/#viktorija` },
      "parentOrganization": { "@id": `${SITE_URL}/#salon` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${marcellus.variable} ${montserrat.variable} ${alexBrush.variable} ${prociono.variable} ${ebGaramond.variable} antialiased`}
        style={{ backgroundColor: "#D4D5DE" }}
      >
        <SiteBackdrop />
        <SmoothScroller>
          <LightboxProvider>
            <div className="relative z-10 min-h-screen">
              {children}
            </div>
          </LightboxProvider>
        </SmoothScroller>
        <CookieConsent />
      </body>
    </html>
  );
}
