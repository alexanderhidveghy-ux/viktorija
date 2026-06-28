"use client";

import { useRef } from "react";
import { useLightbox } from "@/components/lightbox/LightboxContext";

/**
 * Renders an article's HTML and makes every <img> inside it open in the
 * fullscreen lightbox (with prev/next across all images in the article).
 */
export default function BlogArticleContent({ html }: { html: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { open } = useLightbox();

    const handleClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== "IMG" || !ref.current) return;
        const imgs = Array.from(ref.current.querySelectorAll("img"));
        const srcs = imgs.map((img) => img.getAttribute("src") || "").filter(Boolean);
        const index = imgs.indexOf(target as HTMLImageElement);
        open(srcs, Math.max(index, 0));
    };

    return (
        <div
            ref={ref}
            className="blog-content"
            onClick={handleClick}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
