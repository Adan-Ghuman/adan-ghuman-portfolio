import { useRef, memo } from "react";
import { Briefcase, MapPin, Calendar, Clock } from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useGsap } from "@/hooks/useGsap";
import { experiences } from "@/data/experience";
import type { Experience as ExperienceType } from "@/types";

function ExperienceCard({
    experience,
    index,
}: {
    experience: ExperienceType;
    index: number;
}) {
    const isLeft = index % 2 === 0;

    return (
        <div
            className={cn(
                "experience-item relative flex items-start gap-6 md:gap-10",
                "md:w-full",
            )}
        >
            <div
                className="hidden md:flex md:w-[calc(50%-2rem)] justify-end"
            >
                {isLeft ? (
                    <CardContent experience={experience} align="right" data-side="left" />
                ) : (
                    <div />
                )}
            </div>

            <div className="relative flex flex-col items-center z-10 shrink-0">
                <div className="experience-dot w-4 h-4 rounded-full bg-primary border-4 border-bg-elevated shadow-[0_0_12px_rgba(192,255,64,0.4)]" />
                <div
                    className={cn(
                        "experience-branch hidden md:block absolute top-1.5 w-8 h-0.5 bg-primary/40",
                        isLeft ? "right-full mr-0" : "left-full ml-0",
                    )}
                />
            </div>

            <div
                className="hidden md:flex md:w-[calc(50%-2rem)] justify-start"
            >
                {!isLeft ? (
                    <CardContent experience={experience} align="left" data-side="right" />
                ) : (
                    <div />
                )}
            </div>

            <div className="md:hidden flex-1 pb-12">
                <CardContent experience={experience} align="left" data-side="right" />
            </div>
        </div>
    );
}

function CardContent({
    experience,
    align,
    "data-side": dataSide,
}: {
    experience: ExperienceType;
    align: "left" | "right";
    "data-side"?: string;
}) {
    return (
        <div
            data-side={dataSide}
            className={cn(
                "experience-card w-full max-w-lg p-6 rounded-2xl border backdrop-blur-sm",
                "bg-surface border-border",
                "hover:border-primary/30 transition-all duration-300",
                "shadow-sm dark:shadow-none",
                align === "right" ? "text-right" : "text-left",
            )}
        >
            <div
                className={cn(
                    "flex items-start gap-4 mb-4",
                    align === "right" && "flex-row-reverse",
                )}
            >
                <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-border bg-bg-subtle flex items-center justify-center">
                    {experience.logo ? (
                        <img
                            src={experience.logo}
                            alt={`${experience.company} logo`}
                            className="w-full h-full object-contain p-1"
                        />
                    ) : (
                        <Briefcase className="w-5 h-5 text-text-muted" />
                    )}
                </div>

                <div className={cn("flex-1", align === "right" && "text-right")}>
                    <h3 className="text-lg font-bold text-text-primary leading-tight">
                        {experience.role}
                    </h3>
                    <div
                        className={cn(
                            "flex items-center gap-2 mt-1 flex-wrap",
                            align === "right" && "justify-end",
                        )}
                    >
                        <span className="text-sm font-medium text-primary">
                            {experience.company}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {experience.type}
                        </span>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    "flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted mb-4",
                    align === "right" && "justify-end",
                )}
            >
                <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {experience.startDate} – {experience.endDate}
                </span>
                <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {experience.duration}
                </span>
                <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {experience.location} · {experience.locationType}
                </span>
            </div>

            <ul className="space-y-2 mb-4">
                {experience.bullets.map((bullet, i) => (
                    <li
                        key={i}
                        className="text-sm text-text-secondary leading-relaxed flex items-start gap-2"
                    >
                        <span className="text-primary mt-0.5 shrink-0">•</span>
                        <span className="text-justify">{bullet}</span>
                    </li>
                ))}
            </ul>

            <div
                className="flex flex-wrap gap-1.5"
            >
                {experience.skills.map((skill) => (
                    <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-full bg-surface-hover text-text-secondary font-medium "
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

export const Experience = memo(function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGsap(
        containerRef,
        () => {
            const isDesktop = window.matchMedia("(min-width: 768px)").matches;

            // ── Timeline line ──────────────────────────────────────────
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        duration: 1.8,
                        ease: "power2.inOut",
                        force3D: true,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 65%",
                            toggleActions: "play none none none",
                            fastScrollEnd: true,
                        },
                    },
                );
            }

            if (isDesktop) {
                // ── Dots (desktop only — each dot has its own trigger) ─
                const dots = gsap.utils.toArray<HTMLElement>(".experience-dot");
                dots.forEach((dot) => {
                    gsap.fromTo(
                        dot,
                        { scale: 0, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            ease: "back.out(2.5)",
                            force3D: true,
                            overwrite: "auto",
                            scrollTrigger: {
                                trigger: dot,
                                start: "top 82%",
                                toggleActions: "play none none none",
                                fastScrollEnd: true,
                            },
                        },
                    );
                });

                // ── Branches ──────────────────────────────────────────
                const branches = gsap.utils.toArray<HTMLElement>(".experience-branch");
                branches.forEach((branch) => {
                    gsap.fromTo(
                        branch,
                        { scaleX: 0, transformOrigin: "left center" },
                        {
                            scaleX: 1,
                            duration: 0.45,
                            ease: "power2.out",
                            force3D: true,
                            overwrite: "auto",
                            scrollTrigger: {
                                trigger: branch,
                                start: "top 82%",
                                toggleActions: "play none none none",
                                fastScrollEnd: true,
                            },
                        },
                    );
                });

                // ── Cards (desktop: slide in from side) ───────────────
                const cards = gsap.utils.toArray<HTMLElement>(".experience-card");
                cards.forEach((card) => {
                    const side = card.getAttribute("data-side");
                    gsap.fromTo(
                        card,
                        { x: side === "left" ? -50 : 50, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.7,
                            ease: "power3.out",
                            force3D: true,
                            overwrite: "auto",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 88%",
                                toggleActions: "play none none none",
                                fastScrollEnd: true,
                            },
                        },
                    );
                });
            } else {
                // ── Mobile: one batched ScrollTrigger per card, simple fade ─
                const dots = gsap.utils.toArray<HTMLElement>(".experience-dot");
                gsap.fromTo(
                    dots,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)",
                        stagger: 0.06, force3D: true, overwrite: "auto",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 70%",
                            toggleActions: "play none none none",
                        },
                    },
                );

                const cards = gsap.utils.toArray<HTMLElement>(".experience-card");
                cards.forEach((card) => {
                    gsap.fromTo(
                        card,
                        { opacity: 0, y: 16 },
                        {
                            opacity: 1, y: 0, duration: 0.45, ease: "power2.out",
                            force3D: true, overwrite: "auto",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 92%",
                                toggleActions: "play none none none",
                            },
                        },
                    );
                });
            }
        },
        [],
    );

    return (
        <section
            className="py-32 relative overflow-hidden border-y backdrop-blur-lg bg-bg-sunken border-border"
            id="experience"
        >
            <div ref={containerRef} className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Professional <span className="text-primary">Experience</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-text-secondary text-lg">
                        A timeline of roles that shaped my engineering journey — from
                        proposal writing to full-stack development.
                    </p>
                </div>

                <div className="relative">
                    <div
                        ref={(el) => {
                            (lineRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
                        }}
                        className={cn(
                            "absolute top-0 bottom-0 w-0.5 bg-primary/30 origin-top will-change-transform",
                            "left-1.75 md:left-1/2 md:-translate-x-1/2",
                        )}
                    />

                    <div className="flex flex-col gap-12 md:gap-16">
                        {experiences.map((exp, index) => (
                            <ExperienceCard key={exp.id} experience={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});
