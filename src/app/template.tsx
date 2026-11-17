"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// White fade between pages. Skipped on the very first load: there the overlay was
// server-rendered fully white and only faded once JavaScript ran, so visitors (and
// Google's LCP) saw a blank page for seconds on slower phones.
let hydrated = false;

export default function Template({ children }: { children: React.ReactNode }) {
    // decided once per mount; the flag flips in an effect, so the first render in the
    // browser matches the server (no overlay) and only later navigations fade
    const [skipFade] = useState(() => !hydrated);
    useEffect(() => {
        hydrated = true;
    }, []);

    return (
        <>
            <motion.div
                className="fixed inset-0 z-[9999] bg-white pointer-events-none"
                initial={skipFade ? false : { opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            {children}
        </>
    );
}
