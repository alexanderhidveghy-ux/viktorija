// Termíny akadémie na jednom mieste. Zmena termínu kurzu = prepísať `term` a `poster`
// tu; prihláška, e-maily aj text v plagáte na stránke kurzu sa zmenia samy.
// Webinár a deň otvorených dverí sa po termíne prestanú ponúkať samy.

export type Course = {
  name: string;
  slug: string;
  /** Veta v prihláške a v e-mailoch („Termín: …“). */
  term: string;
  /**
   * Text, ktorý sa kreslí do plagátu kurzu na mieste dátumu (plagát je obrázok
   * s prázdnym miestom, pozri CoursePoster):
   *   1 riadok  – napr. ["2. 2. – 15. 3. 2027"] alebo ["INDIVIDUÁLNE TERMÍNY"]
   *   2 riadky  – malý zlatý + veľký biely, napr. ["ŠTART ZAČIATKOM", "FEBRUÁRA 2027"]
   *   3 dátumy  – pri plagátoch s tromi stĺpcami (príprava / prax / korekcia)
   */
  poster?: string[];
};

const INDIVIDUAL = "Individuálne termíny";

export const COURSES: Course[] = [
  { name: "The Art of PMU", slug: "the-art-of-pmu", term: "Štart začiatkom februára 2027", poster: ["ŠTART ZAČIATKOM", "FEBRUÁRA 2027"] },
  { name: "Tri Techniky Obočia", slug: "tri-techniky-obocia", term: INDIVIDUAL, poster: ["INDIVIDUÁLNE TERMÍNY"] },
  { name: "Hyperrealistické Obočie", slug: "hyperrealisticke-obocie", term: INDIVIDUAL, poster: ["INDIVIDUÁLNE"] },
  { name: "Master Class: PMU Očných Liniek", slug: "pmu-ocnych-liniek", term: INDIVIDUAL, poster: ["INDIVIDUÁLNE"] },
  { name: "Master Class: PMU Pier", slug: "pmu-pier", term: INDIVIDUAL, poster: ["INDIVIDUÁLNE"] },
  { name: "Laser Touch", slug: "laser-touch", term: "Termíny podľa dohody" },
  { name: "Nastreľovanie Náušníc", slug: "esteticke-nastrelovanie-nausnic", term: INDIVIDUAL },
];

/** Riadok pod nadpisom „Program kurzu“ pri kurzoch bez pevného termínu. */
export const INDIVIDUAL_NOTE = "Termíny individuálne, po dohode";

export const courseBySlug = (slug: string) => COURSES.find((c) => c.slug === slug);

export const WEBINAR = { label: "14. 9. 2026 | 19:00 | LIVE", endsAt: "2026-09-14T21:00:00+02:00" };
export const DOD = { label: "18. 9. 2026", endsAt: "2026-09-18T23:59:00+02:00" };

export const isPast = (iso: string, now = Date.now()) => now > new Date(iso).getTime();
