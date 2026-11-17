// Plain Google Maps embed of the salon's own Google profile ("Salón Krásy Viktórija",
// rating and reviews included). Replaces the custom styled JS map; no API key needed.
const PLACE_CID = "14631114680687225268";

export default function GoogleMapEmbed({ title = "Viktorija Kendra – mapa", className = "" }: { title?: string; className?: string }) {
    return (
        <iframe
            src={`https://maps.google.com/maps?cid=${PLACE_CID}&output=embed&hl=sk`}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className={`h-full w-full border-0 ${className}`}
        />
    );
}
