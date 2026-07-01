export type ScheduleBlock = { num: string; title: string; date?: string | null; items: string[] };

// Renders the "Program kurzu" heading + numbered schedule list. The wrapper
// (standalone, inside a PhotoSection, or beside a video) stays on the page;
// only the heading + list markup is shared here.
export default function CourseProgram({
    schedule,
    heading = "Program kurzu",
}: {
    schedule: ScheduleBlock[];
    heading?: string;
}) {
    return (
        <>
            <h2 className="font-marcellus text-2xl uppercase tracking-widest text-[#1D0E22]">{heading}</h2>
            <div className="space-y-4">
                {schedule.map((block) => (
                    <div key={block.num} className="flex gap-3">
                        <span className="font-marcellus text-3xl text-[#1D0E22]/15 leading-none shrink-0">{block.num}</span>
                        <div className="space-y-0.5">
                            <div>
                                <p className="font-marcellus text-base uppercase tracking-widest text-[#1D0E22] leading-tight">{block.title}</p>
                                {block.date && (
                                    <p className="font-montserrat text-xs text-[#1D0E22]/45 leading-tight mb-[3px]">{block.date}</p>
                                )}
                            </div>
                            <ul className="font-montserrat text-base font-light text-[#1D0E22]/70 leading-tight">
                                {block.items.map((item, i) => (
                                    <li key={i} className="flex gap-1.5">
                                        <span className="text-gold shrink-0">✦</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
