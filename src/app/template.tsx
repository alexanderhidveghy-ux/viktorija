"use client";

import { motion } from "framer-motion";

// White fade between pages. Skipped on the very first load: there the overlay was
// server-rendered fully white and only faded once JavaScript ran, so visitors (and
// Google's LCP) saw a blank page for seconds on slower phones.
let firstRender = true;

export default function Template({ children }: { children: React.ReactNode }) {
    // on the server (every request) and on the first client render: no overlay
    const isServer = typeof window === "undefined";
    const initial = isServer || firstRender ? false : { opacity: 1 };
    if (!isServer) firstRender = false;
    return (
        <>
            <motion.div
                className="fixed inset-0 z-[9999] bg-white pointer-events-none"
                initial={initial}
                animate={{ opacity: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            {children}
        </>
    );
}
