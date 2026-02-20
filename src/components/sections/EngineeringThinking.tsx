import { useRef } from "react";
import { gsap } from "gsap";
import { useGsap } from "@/hooks/useGsap";
import { insights } from "@/data/insights";

export default function EngineeringThinking() {
    const sectionRef = useRef<HTMLElement>(null);

    useGsap(
        sectionRef,
        () => {
            gsap.from("[data-thinking-heading]", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            gsap.from("[data-insight]", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "[data-insight-list]",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        },
        []
    );

    function renderTitle(title: string, accentWord: string) {
        const index = title.toLowerCase().indexOf(accentWord.toLowerCase());
        if (index === -1) return title;

        const before = title.slice(0, index);
        const match = title.slice(index, index + accentWord.length);
        const after = title.slice(index + accentWord.length);

        return (
            <>
                {before}
                <span className="text-accent">{match}</span>
                {after}
            </>
        );
    }

    return (
        <section
            ref={sectionRef}
            id="thinking"
            className="px-6 py-32 md:py-40"
        >
            <div className="mx-auto max-w-300">
                <h2
                    data-thinking-heading
                    className="font-display text-sm font-medium uppercase tracking-widest text-text-muted"
                >
                    How I Think
                </h2>

                <div
                    data-insight-list
                    className="mt-20 grid gap-16 md:grid-cols-3 md:gap-12"
                >
                    {insights.map((insight) => (
                        <div key={insight.id} data-insight>
                            <h3 className="font-display text-xl font-semibold leading-snug text-text-primary md:text-2xl">
                                {renderTitle(insight.title, insight.accentWord)}
                            </h3>
                            <p className="mt-4 text-sm leading-relaxed text-text-secondary md:text-base">
                                {insight.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
