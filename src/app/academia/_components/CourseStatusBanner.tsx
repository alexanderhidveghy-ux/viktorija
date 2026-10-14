"use client";

import { usePathname } from "next/navigation";
import { useNow } from "@/lib/use-now";
import { DOD, isPast } from "@/lib/academy-dates";

// Upozornenie na stránke dňa otvorených dverí, keď je termín za nami
// (počíta sa v prehliadači, aby nezostarlo medzi buildmi).
// Stav jednotlivých kurzov sa zatiaľ nezobrazuje – termíny v lib/academy-dates.ts
// nesedia s programom na stránkach kurzov, kým ich Viktorija nepotvrdí.
export default function CourseStatusBanner() {
  const pathname = usePathname();
  const now = useNow();
  if (now === null || !pathname.endsWith("/dod") || !isPast(DOD.endsAt, now)) return null;

  return (
    <div className="mb-8 rounded-2xl border border-gold/50 bg-gold/10 px-5 py-4 font-montserrat text-[#1D0E22]" role="status">
      <p className="font-marcellus text-sm uppercase tracking-[0.2em]">Tento termín už prebehol</p>
      <p className="mt-1 text-sm font-light leading-snug text-[#1D0E22]/80">
        Deň otvorených dverí sa konal {DOD.label}. Nový termín oznámime na Instagrame a tu na webe.
      </p>
    </div>
  );
}
