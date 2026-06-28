"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import React from "react";

/**
 * Wraps each direct child so it fades up the first time it scrolls into view.
 * Keeps the parent's spacing utilities (space-y-*, grid gaps) working because
 * the wrappers become the direct children.
 */
export default function RevealGroup({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const reduceMotion = useReducedMotion();

    const item: Variants = {
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
        },
    };

    return (
        <div className={className}>
            {React.Children.map(children, (child) =>
                child == null || child === false ? null : (
                    <motion.div
                        variants={item}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    >
                        {child}
                    </motion.div>
                )
            )}
        </div>
    );
}
