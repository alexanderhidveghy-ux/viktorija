// Jediný zdroj údajov o prevádzke – pätička aj štruktúrované údaje (JSON-LD) čerpajú odtiaľto,
// aby sa hodiny a adresa pre ľudí a pre vyhľadávače už nikdy nerozišli.

export const SITE_URL = "https://viktorija.sk";
export const BRAND = "Viktorija Kendra";
export const ACADEMY = "Viktorija Kendra Academia";
export const PHONE = "+421907796562";
export const INSTAGRAM = "https://www.instagram.com/viktorija_kendra_pmu_academy/";

export const ADDRESS = {
  building: "Twin City Tower",
  street: "Mlynské Nivy 10",
  postalCode: "821 09",
  city: "Bratislava",
  country: "SK",
};

export const GEO = { latitude: 48.14622752109185, longitude: 17.124899473013688 };

// Otváracie hodiny podľa pútača na prevádzke (Twin City Tower).
type Day = { short: string; schema: string; opens?: string; closes?: string };
export const OPENING_HOURS: Day[] = [
  { short: "Po", schema: "Monday" },
  { short: "Ut", schema: "Tuesday", opens: "08:00", closes: "12:00" },
  { short: "St", schema: "Wednesday", opens: "10:00", closes: "19:00" },
  { short: "Št", schema: "Thursday", opens: "10:00", closes: "19:00" },
  { short: "Pi", schema: "Friday", opens: "09:00", closes: "13:00" },
  { short: "So", schema: "Saturday" },
  { short: "Ne", schema: "Sunday" },
];

const hm = (t: string) => t.replace(/^0/, "");
export const openingHoursForDisplay = OPENING_HOURS.map((d) => ({
  day: d.short,
  hours: d.opens && d.closes ? `${hm(d.opens)} – ${hm(d.closes)}` : "zatvorené",
}));

export const openingHoursSchema = OPENING_HOURS.filter((d) => d.opens).map((d) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: d.schema,
  opens: d.opens,
  closes: d.closes,
}));

export const postalAddressSchema = {
  "@type": "PostalAddress",
  streetAddress: `${ADDRESS.street}, ${ADDRESS.building}`,
  addressLocality: ADDRESS.city,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.country,
};
