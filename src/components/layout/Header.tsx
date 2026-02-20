import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "@/data/personal";

const NAV_ITEMS = [
    { label: "Work", href: "#work" },
    { label: "Thinking", href: "#thinking" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (!headerRef.current) return;

        const showAnim = gsap
            .from(headerRef.current, {
                yPercent: -100,
                paused: true,
                duration: 0.3,
                ease: "power2.out",
            })
            .progress(1);

        const trigger = ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                if (self.direction === -1) {
                    showAnim.play();
                } else {
                    showAnim.reverse();
                }
            },
        });

        return () => {
            trigger.kill();
            showAnim.kill();
        };
    }, []);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        setMobileOpen(false);
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header
            ref={headerRef}
            className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-bg/80 backdrop-blur-md"
        >
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
                <a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, "#hero")}
                    className="font-display text-sm font-semibold tracking-wide text-text-primary"
                >
                    {personal.name}
                </a>

                <nav className="hidden gap-8 md:flex">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <button
                    className="flex flex-col gap-[5px] md:hidden"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle navigation"
                >
                    <span
                        className={`block h-[1.5px] w-5 bg-text-primary transition-transform duration-300 ${mobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
                    />
                    <span
                        className={`block h-[1.5px] w-5 bg-text-primary transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
                    />
                    <span
                        className={`block h-[1.5px] w-5 bg-text-primary transition-transform duration-300 ${mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
                    />
                </button>
            </div>

            {mobileOpen ? (
                <div className="fixed inset-0 top-[57px] z-40 flex flex-col items-center justify-center gap-8 bg-bg/95 backdrop-blur-lg md:hidden">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="font-display text-2xl font-medium text-text-primary transition-colors hover:text-accent"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            ) : null}
        </header>
    );
}
