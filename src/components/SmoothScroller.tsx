"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

// Next resets the window scroll on navigation, but Lenis tracks its own position
// independently. Without this the new page opens wherever the previous one was
// left and only snaps to the top once Lenis happens to settle.
function ScrollTopOnNavigate() {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        // force: true so this still applies when a modal has called lenis.stop().
        lenis?.scrollTo(0, { immediate: true, force: true });
    }, [pathname, lenis]);

    return null;
}

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
                // Drop leftover momentum when an internal link is clicked, so the
                // next page never inherits an in-flight scroll animation.
                stopInertiaOnNavigate: true,
            }}
        >
            <ScrollTopOnNavigate />
            {children}
        </ReactLenis>
    );
}
