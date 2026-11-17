"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { GraduationCap, Sparkles } from "lucide-react";
import { courseBySlug } from "@/lib/academy-dates";

// The one floating call-to-action on every page: on the academy it opens the course
// application ("Chcem kurz"), everywhere else the booking form ("Chcem procedúru").
// The popups are loaded on the first tap/hover, so they cost nothing on page load.
const loadBooking = () => import("@/app/sluzby/(kategorie)/_components/BookingModal");
const loadCourse = () => import("@/app/academia/_components/CourseApplicationModal");
const BookingModal = dynamic(loadBooking, { ssr: false });
const CourseApplicationModal = dynamic(loadCourse, { ssr: false });

export default function FloatingCta() {
    const pathname = usePathname();
    // remembered per page, so a popup left open never follows the visitor to another page
    const [openPath, setOpenPath] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);
    const isOpen = openPath === pathname;
    const close = () => setOpenPath(null);

    const isAcademy = pathname.startsWith("/academia");
    // on a course page the application opens with that course selected
    const courseName = courseBySlug(pathname.split("/")[2] ?? "")?.name ?? "";
    const Icon = isAcademy ? GraduationCap : Sparkles;
    const warmUp = () => void (isAcademy ? loadCourse() : loadBooking());

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setLoaded(true);
                    setOpenPath(pathname);
                }}
                onPointerEnter={warmUp}
                onFocus={warmUp}
                className="group fixed bottom-5 right-4 md:bottom-8 md:right-8 z-50 flex items-center gap-3 rounded-full border border-gold/40 bg-[#1D0E22] px-6 py-3.5 font-marcellus text-sm uppercase tracking-widest text-gold shadow-2xl transition-all duration-300 hover:scale-105 hover:border-gold hover:text-white active:scale-95"
            >
                {isAcademy ? "Chcem kurz" : "Chcem procedúru"}
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>

            {loaded &&
                (isAcademy ? (
                    <CourseApplicationModal isOpen={isOpen} onClose={close} courseName={courseName} />
                ) : (
                    <BookingModal isOpen={isOpen} onClose={close} />
                ))}
        </>
    );
}
