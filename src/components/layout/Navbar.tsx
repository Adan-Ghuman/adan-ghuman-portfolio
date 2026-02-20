import { Download, Moon, Sun, User, Briefcase, Layers, FolderOpen, Mail } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import logo from '@/assets/images/logo-portfolio.png';

const navItems = [
    { id: 'about', label: 'About', Icon: User },
    { id: 'experience', label: 'Experience', Icon: Briefcase },
    { id: 'skills', label: 'Skills', Icon: Layers },
    { id: 'projects', label: 'Projects', Icon: FolderOpen },
    { id: 'contact', label: 'Contact', Icon: Mail },
];

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about');
    const [cvExpanded, setCvExpanded] = useState(false);
    const cvTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cvLinkRef = useRef<HTMLAnchorElement>(null);

    const navContainerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

    const bottomNavRef = useRef<HTMLDivElement>(null);
    const bottomItemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
    const [bottomPillStyle, setBottomPillStyle] = useState({ left: 0, width: 0 });

    const clickLockRef = useRef(false);

    const updatePill = useCallback((sectionId: string) => {
        const container = navContainerRef.current;
        const activeEl = itemRefs.current.get(sectionId);
        if (!container || !activeEl) return;

        const containerRect = container.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();

        setPillStyle({
            left: activeRect.left - containerRect.left,
            width: activeRect.width,
        });
    }, []);

    const updateBottomPill = useCallback((sectionId: string) => {
        const container = bottomNavRef.current;
        const activeEl = bottomItemRefs.current.get(sectionId);
        if (!container || !activeEl) return;

        const containerRect = container.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();

        setBottomPillStyle({
            left: activeRect.left - containerRect.left,
            width: activeRect.width,
        });
    }, []);

    useLayoutEffect(() => {
        updatePill(activeSection);
        updateBottomPill(activeSection);
    }, [activeSection, updatePill, updateBottomPill]);

    useEffect(() => {
        const handleResize = () => {
            updatePill(activeSection);
            updateBottomPill(activeSection);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeSection, updatePill, updateBottomPill]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            if (clickLockRef.current) return;

            const sections = ['about', 'experience', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && scrollPosition >= element.offsetTop) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            updatePill(activeSection);
            updateBottomPill(activeSection);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <nav className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500",
                scrolled
                    ? "border-b border-border bg-glass backdrop-blur-xl py-0"
                    : "bg-transparent border-transparent py-3"
            )}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a
                        href="#about"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-3 group"
                    >
                        <img
                            src={logo}
                            alt="M. Adan Ghuman Logo"
                            className="h-14 w-auto md:h-16 transition-transform duration-300 group-hover:scale-110"
                        />
                    </a>

                    <div
                        ref={navContainerRef}
                        className="hidden md:flex items-center relative p-1.5 rounded-full border bg-bg-subtle border-border"
                    >
                        <div
                            className="absolute top-1.5 bottom-1.5 rounded-full bg-primary transition-all duration-500 ease-in-out z-0 shadow-[0_0_20px_rgba(192,255,64,0.35)]"
                            style={{
                                left: `${pillStyle.left}px`,
                                width: `${pillStyle.width}px`,
                            }}
                        />

                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                ref={(el) => { if (el) itemRefs.current.set(item.id, el); }}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                    setActiveSection(item.id);
                                    clickLockRef.current = true;
                                    setTimeout(() => { clickLockRef.current = false; }, 800);
                                }}
                                className={cn(
                                    "relative z-10 px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-colors duration-300 select-none",
                                    activeSection === item.id
                                        ? "text-text-inverted"
                                        : "text-text-secondary hover:text-text-primary"
                                )}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="rounded-full w-10 h-10 px-0 text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
                        </Button>

                        {/* Desktop: direct download */}
                        <a href="/cv-adan-ghuman.pdf" download="cv-adan-ghuman.pdf" className="hidden sm:flex">
                            <Button
                                variant="primary"
                                size="md"
                                startIcon={Download}
                                className="rounded-full text-[13px] font-bold shadow-[0_0_20px_rgba(192,255,64,0.25)] hover:shadow-[0_0_30px_rgba(192,255,64,0.45)] transition-shadow"
                            >
                                Download CV
                            </Button>
                        </a>

                        {/* Mobile: expand-then-download */}
                        <div className="relative sm:hidden">
                            {/* Tooltip */}
                            <div className={cn(
                                "absolute -bottom-11 right-0 mb-2 whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-semibold pointer-events-none transition-all duration-300",
                                "bg-surface border border-border text-text-secondary shadow-lg",
                                cvExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                            )}>
                                Tap again to download
                            </div>
                            {/* Hidden real download anchor */}
                            <a ref={cvLinkRef} href="/cv-adan-ghuman.pdf" download="cv-adan-ghuman.pdf" className="hidden" />
                            <button
                                onClick={() => {
                                    if (cvExpanded) {
                                        cvLinkRef.current?.click();
                                        setCvExpanded(false);
                                        if (cvTimeoutRef.current) clearTimeout(cvTimeoutRef.current);
                                    } else {
                                        setCvExpanded(true);
                                        if (cvTimeoutRef.current) clearTimeout(cvTimeoutRef.current);
                                        cvTimeoutRef.current = setTimeout(() => setCvExpanded(false), 3000);
                                    }
                                }}
                                aria-label="Download CV"
                                className={cn(
                                    "flex items-center gap-2 bg-primary text-black font-bold rounded-full shadow-[0_0_20px_rgba(192,255,64,0.25)] transition-all duration-300 overflow-hidden",
                                    cvExpanded ? "px-4 py-2 text-[13px]" : "w-9 h-9 justify-center"
                                )}
                            >
                                <Download className={cn("w-4 h-4 shrink-0",
                                    cvExpanded ? "ml-0" : "ml-1.5"
                                )} />
                                <span className={cn(
                                    "whitespace-nowrap transition-all duration-300 overflow-hidden",
                                    cvExpanded ? "max-w-24 opacity-100" : "max-w-0 opacity-0"
                                )}>
                                    Download CV
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile bottom tab bar */}
            <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t backdrop-blur-xl bg-glass border-border">
                <div
                    ref={bottomNavRef}
                    className="relative flex items-center h-16 px-2"
                >
                    {/* Sliding pill indicator */}
                    <div
                        className="absolute inset-y-2 rounded-xl bg-primary transition-all duration-500 ease-in-out shadow-[0_0_16px_rgba(192,255,64,0.35)]"
                        style={{
                            left: `${bottomPillStyle.left + 4}px`,
                            width: `${bottomPillStyle.width - 8}px`,
                        }}
                    />

                    {navItems.map(({ id, label, Icon }) => {
                        const isActive = activeSection === id;
                        return (
                            <a
                                key={id}
                                ref={(el) => { if (el) bottomItemRefs.current.set(id, el); }}
                                href={`#${id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                                    setActiveSection(id);
                                    clickLockRef.current = true;
                                    setTimeout(() => { clickLockRef.current = false; }, 800);
                                }}
                                className="relative z-10 flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 transition-colors duration-300"
                            >
                                <Icon className={cn(
                                    "w-4.5 h-4.5 transition-colors duration-300",
                                    isActive ? "text-black" : "text-text-muted"
                                )} />
                                <span className={cn(
                                    "text-[9px] font-bold tracking-wide transition-colors duration-300",
                                    isActive ? "text-black" : "text-text-muted"
                                )}>
                                    {label}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}        
