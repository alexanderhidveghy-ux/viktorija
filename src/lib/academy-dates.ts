// Termíny akadémie na jednom mieste. Webinár a deň otvorených dverí sa po termíne
// prestanú ponúkať samy. POZOR: termíny kurzov (COURSES) sú prevzaté z formulára a
// nesedia s programom/plagátmi na stránkach kurzov – pred použitím ich treba overiť.

export type Course = { name: string; slug: string; term: string; start: string; end: string };

export const COURSES: Course[] = [
  { name: "The Art of PMU", slug: "the-art-of-pmu", term: "2. 10. – 13. 11. 2026", start: "2026-10-02", end: "2026-11-13" },
  { name: "Tri Techniky Obočia", slug: "tri-techniky-obocia", term: "19. 10. – 27. 11. 2026", start: "2026-10-19", end: "2026-11-27" },
  { name: "Hyperrealistické Obočie", slug: "hyperrealisticke-obocie", term: "5. 10. – 20. 11. 2026", start: "2026-10-05", end: "2026-11-20" },
  { name: "Master Class: PMU Očných Liniek", slug: "pmu-ocnych-liniek", term: "28. 9. – 6. 11. 2026", start: "2026-09-28", end: "2026-11-06" },
  { name: "Master Class: PMU Pier", slug: "pmu-pier", term: "14. 9. – 23. 10. 2026", start: "2026-09-14", end: "2026-10-23" },
];

export const WEBINAR = { label: "14. 9. 2026 | 19:00 | LIVE", endsAt: "2026-09-14T21:00:00+02:00" };
export const DOD = { label: "18. 9. 2026", endsAt: "2026-09-18T23:59:00+02:00" };

export type CourseStatus = "open" | "running" | "finished";

const dayEnd = (d: string) => new Date(`${d}T23:59:59+01:00`).getTime();
const dayStart = (d: string) => new Date(`${d}T00:00:00+01:00`).getTime();

export function courseStatus(c: Course, now = Date.now()): CourseStatus {
  if (now < dayStart(c.start)) return "open";
  if (now <= dayEnd(c.end)) return "running";
  return "finished";
}

export const isPast = (iso: string, now = Date.now()) => now > new Date(iso).getTime();
