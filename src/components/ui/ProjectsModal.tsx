import { memo, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { getLenis } from '@/components/layout/SmoothScroll';

interface ProjectsModalProps {
    isOpen: boolean;
    onClose: () => void;
    projects: Project[];
}

export const ProjectsModal = memo(function ProjectsModal({ isOpen, onClose, projects }: ProjectsModalProps) {
    const { isDark } = useTheme();

    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            const lenis = getLenis();
            if (lenis) lenis.stop();
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            const lenis = getLenis();
            if (lenis) lenis.start();
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            const lenis = getLenis();
            if (lenis) lenis.start();
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-200 flex items-center justify-center p-6 animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className={cn(
                "absolute inset-0 backdrop-blur-sm",
                isDark ? "bg-black/70" : "bg-black/40"
            )} />

            {/* Floating Modal */}
            <div
                className={cn(
                    "relative w-full max-w-lg max-h-[75vh] rounded-2xl border shadow-2xl flex flex-col animate-in zoom-in-95 duration-300",
                    isDark
                        ? "bg-[#0d0d0d]/95 border-white/10 shadow-black/60"
                        : "bg-white/95 border-black/10 shadow-black/20"
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="shrink-0 px-5 pt-5 pb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-text-primary">All Projects</h2>
                        <p className="text-xs text-text-secondary mt-0.5">{projects.length} projects</p>
                    </div>
                    <button
                        onClick={onClose}
                        className={cn(
                            "p-1.5 rounded-lg transition-colors",
                            isDark ? "hover:bg-white/10" : "hover:bg-black/5"
                        )}
                        aria-label="Close modal"
                    >
                        <X className="w-4 h-4 text-text-secondary" />
                    </button>
                </div>

                {/* Divider */}
                <div className={cn("mx-5 h-px shrink-0", isDark ? "bg-white/8" : "bg-black/8")} />

                {/* List */}
                <div className="flex-1 overflow-y-auto overscroll-contain py-2">
                    {projects.map((project, i) => (
                        <ProjectRow key={project.id} project={project} index={i} isDark={isDark} />
                    ))}
                </div>
            </div>
        </div>
    );
});

const ProjectRow = memo(function ProjectRow({
    project,
    index,
    isDark,
}: {
    project: Project;
    index: number;
    isDark: boolean;
}) {
    const content = (
        <div className={cn(
            "group flex items-center gap-4 px-5 py-3.5 transition-colors",
            isDark ? "hover:bg-white/5" : "hover:bg-black/4"
        )}>
            {/* Ambient thumbnail */}
            <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-bg-subtle">
                {project.image && (
                    <>
                        <img
                            src={project.image}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover scale-125 blur-lg opacity-80"
                        />
                        <img
                            src={project.image}
                            alt={project.title}
                            className="relative w-full h-full object-contain"
                        />
                    </>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-[11px] text-text-secondary font-mono tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-sm font-semibold text-text-primary truncate">{project.title}</h3>
                </div>
                <p className="text-xs text-text-secondary truncate mt-0.5">{project.subtitle}</p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {project.tech.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-1.5 py-px rounded text-[10px] font-semibold bg-primary/10 text-primary"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className={cn(
                            "px-1.5 py-px rounded text-[10px] font-semibold",
                            isDark ? "bg-white/8 text-text-secondary" : "bg-black/6 text-text-secondary"
                        )}>
                            +{project.tech.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {/* External link indicator */}
            {project.link && (
                <ExternalLink className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isDark
                        ? "text-white/20 group-hover:text-primary"
                        : "text-black/20 group-hover:text-primary"
                )} />
            )}
        </div>
    );

    if (project.link) {
        return (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return content;
});
