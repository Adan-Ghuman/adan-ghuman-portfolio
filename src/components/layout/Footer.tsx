import { personal } from "@/data/personal";
import logo from '@/assets/images/logo-portfolio.png';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    const year = new Date().getFullYear();

    const socials = [
        {
            label: 'GitHub',
            href: 'https://github.com/Adan-Ghuman',
            icon: <Github className="w-5 h-5" />,
        },
        {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/muhammad-adan-ghuman-553740232/',
            icon: <Linkedin className="w-5 h-5" />,
        },
        {
            label: 'Email',
            href: `mailto:${personal.email}`,
            icon: <Mail className="w-5 h-5" />,
        },
    ];

    return (
        <footer className="pt-6 pb-16 md:pb-6 border-t border-border bg-bg-base text-text-primary transition-colors duration-300">
            <div className="max-w-[88%] mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="M. Adan Ghuman Logo"
                        className="h-16 w-auto md:h-20"
                    />
                    <div>
                        <p className="font-bold text-lg text-text-primary leading-tight">{personal.name}</p>
                        <p className="text-sm font-semibold text-primary">{personal.hero.role}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <p className="text-sm text-text-muted hidden md:block">
                        © {year} {personal.name}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        {socials.map(({ label, href, icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2.5 rounded-xl border border-border text-text-secondary hover:text-primary hover:border-primary/50 transition-all duration-200"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
