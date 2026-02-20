import { memo } from 'react';
import { Mail, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { personal, socialLinks } from '@/data/personal';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export const Contact = memo(function Contact() {
    const { isDark } = useTheme();

    const socialIcons: Record<string, React.ReactNode> = {
        GitHub: <Github className="w-5 h-5" />,
        LinkedIn: <Linkedin className="w-5 h-5" />,
    };

    return (
        <section className="py-20 cv-auto relative overflow-hidden" id="contact">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-primary/3 blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative">
                <div className="text-center mb-10">
                    <p className="text-primary font-mono font-semibold text-sm uppercase tracking-widest mb-4">Get in touch</p>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-text-primary">
                        Let's build something<br />
                        <span className="text-primary">great together</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-xl mx-auto">
                        Currently open to new projects and full-time opportunities. If you have something worth building, let's talk.
                    </p>
                </div>

                <div className={cn(
                    "relative rounded-3xl border p-10 mb-8 overflow-hidden",
                    isDark
                        ? "bg-surface border-border"
                        : "bg-white border-border shadow-sm"
                )}>
                    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Direct Contact</p>
                            <h3 className="text-2xl font-bold text-text-primary mb-1">Send me an email</h3>
                            <p className="text-text-secondary">{personal.email}</p>
                        </div>

                        <a
                            href={`mailto:${personal.email}`}
                            className="group shrink-0 flex items-center gap-3 px-8 py-4 bg-primary text-black font-bold rounded-2xl hover:scale-105 transition-all duration-300"
                        >
                            <Mail className="w-5 h-5" />
                            Email Me
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "group flex-1 w-full flex items-center justify-between gap-4 px-6 py-4 rounded-2xl border transition-all duration-300",
                                isDark
                                    ? "bg-surface border-border hover:border-primary/50 hover:bg-white/5"
                                    : "bg-white border-border hover:border-primary/50 hover:shadow-md"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-primary">{socialIcons[link.label]}</span>
                                <span className="font-semibold text-text-primary">{link.label}</span>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
});
