import { useRef } from "react";
import { gsap } from "gsap";
import { useGsap } from "@/hooks/useGsap";
import { personal } from "@/data/personal";

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useGsap(
        sectionRef,
        () => {
            gsap.from("[data-about-heading]", {
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

            gsap.from("[data-about-line]", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "[data-about-content]",
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        },
        []
    );

    return (
        <section
            ref={sectionRef}
            id="about"
            className="px-6 py-32 md:py-40"
        >
            <div className="mx-auto max-w-[1200px]">
                <h2
                    data-about-heading
                    className="font-display text-sm font-medium uppercase tracking-widest text-text-muted"
                >
                    About
                </h2>

                <div data-about-content className="mt-16 max-w-[700px] space-y-6">
                    {personal.about.map((line, i) => (
                        <p
                            key={i}
                            data-about-line
                            className="text-lg leading-relaxed text-text-secondary md:text-xl"
                        >
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
