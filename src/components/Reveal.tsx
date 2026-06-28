"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> {
    /** Extra delay (s) before this element animates in — useful for staggering siblings. */
    delay?: number;
    /** Vertical travel distance in px. */
    y?: number;
    /** Animation duration in seconds. */
    duration?: number;
}

/**
 * Fades its children up into view the first time they enter the viewport.
 * Respects the user's reduced-motion preference (fade only, no movement).
 */
export default function Reveal({
    children,
    delay = 0,
    y = 28,
    duration = 0.6,
    className,
    ...rest
}: RevealProps) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration, ease: [0.22, 0.61, 0.36, 1], delay }}
            className={className}
            {...rest}
        >
            {children}
        </motion.div>
    );
}
