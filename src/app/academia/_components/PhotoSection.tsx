import LightboxImage from "@/components/LightboxImage";
import PlayableVideo from "@/components/PlayableVideo";
import CoursePoster from "./CoursePoster";

function getVideoType(src: string) {
    if (/\.webm$/i.test(src)) return "video/webm";
    if (/\.mp4$/i.test(src)) return "video/mp4";
    return "video/quicktime";
}

// Shared two-column media + content block used across the academia course pages.
// Supports photos (LightboxImage), autoplaying videos or a course poster with its
// date drawn as text (`poster`), an optional caption overlay, custom aspect ratio, object-position and content-column tweaks.
export default function PhotoSection({
    photo = "",
    poster,
    flip = false,
    aspectClass,
    objectPosition,
    photoLabel,
    videoFallback,
    playable = false,
    portrait = false,
    imageClass = "object-cover",
    contentClassName = "md:px-12",
    contentBottomPadding = "pb-10",
    children,
}: {
    photo?: string;
    /** Course slug: shows that course's poster with the current term (see CoursePoster). */
    poster?: string;
    flip?: boolean;
    aspectClass?: string;
    objectPosition?: string;
    photoLabel?: string;
    videoFallback?: string;
    playable?: boolean;
    /** 9:16 video shown whole: as tall as a square frame would be, right-aligned (centred on phones). */
    portrait?: boolean;
    imageClass?: string;
    contentClassName?: string;
    contentBottomPadding?: string;
    children: React.ReactNode;
}) {
    const isVideo = /\.(mp4|mov|webm)$/i.test(photo);
    const isPortraitPNG = /\.png$/i.test(photo);
    const containerClass = aspectClass || (poster || isPortraitPNG ? "aspect-[4/5]" : "min-h-[400px] md:min-h-[520px]");
    const posStyle = objectPosition ? { objectPosition } : undefined;

    const media = (
        <div className={`relative overflow-hidden rounded-2xl ${portrait ? "aspect-[9/16] w-[70%] md:w-auto md:h-full" : containerClass}`}>
            {poster ? (
                <CoursePoster slug={poster} />
            ) : isVideo && playable ? (
                <PlayableVideo src={photo} style={posStyle} />
            ) : isVideo ? (
                <video
                    aria-hidden="true"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={posStyle}
                >
                    {videoFallback && <source src={videoFallback} type={getVideoType(videoFallback)} />}
                    <source src={photo} type={getVideoType(photo)} />
                </video>
            ) : (
                <LightboxImage src={photo} alt="" fill className={imageClass} style={posStyle} />
            )}
            {photoLabel && (
                <>
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <p className="absolute bottom-6 left-6 font-marcellus text-base md:text-lg uppercase tracking-widest text-[#EEE3CE]">
                        {photoLabel}
                    </p>
                </>
            )}
        </div>
    );

    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-start ${
                flip ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""
            }`}
        >
            {portrait ? (
                <div className="flex justify-center md:justify-end md:aspect-square">{media}</div>
            ) : (
                media
            )}
            <div className={`flex flex-col justify-start px-0 ${contentClassName} pt-6 md:pt-0 ${contentBottomPadding}`}>
                {children}
            </div>
        </div>
    );
}
