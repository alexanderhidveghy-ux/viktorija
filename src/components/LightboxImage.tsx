"use client";

import Image, { type ImageProps } from "next/image";
import { useLightbox } from "@/components/lightbox/LightboxContext";

interface LightboxImageProps extends ImageProps {
    /** Optional gallery this image belongs to; enables prev/next navigation in the lightbox. */
    group?: string[];
    /** Index of this image within `group`. */
    groupIndex?: number;
}

/**
 * A next/image that opens a fullscreen lightbox when clicked.
 * Use only for real content/gallery photos — not logos, icons, nav thumbnails,
 * decorative hero backgrounds, or images already wrapped in a link/button.
 */
export default function LightboxImage({
    group,
    groupIndex,
    className,
    onClick,
    src,
    ...rest
}: LightboxImageProps) {
    const { open } = useLightbox();
    const images = group ?? [typeof src === "string" ? src : ""];
    const index = group ? groupIndex ?? 0 : 0;

    return (
        <Image
            src={src}
            {...rest}
            onClick={(e) => {
                onClick?.(e);
                open(images, index);
            }}
            className={`${className ?? ""} cursor-zoom-in`.trim()}
        />
    );
}
