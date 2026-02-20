import { memo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { ProjectsModal } from '@/components/ui/ProjectsModal';

export const Projects = memo(function Projects() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ProjectsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projects={projects}
            />
            <section className="py-32 relative backdrop-blur-lg border-y bg-bg-sunken border-border cv-auto" id="projects">
                <div className="max-w-[88%] mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-4">Featured <span className="text-primary">Projects</span></h2>
                        <p className="max-w-lg text-text-secondary">
                            A selection of high-impact full-stack applications built with performance and user experience in mind.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {projects.slice(0, 3).map((project) => (
                            <div
                                key={project.id}
                                className="project-card-container relative h-110"
                                style={{ perspective: '1500px' }}
                            >
                                <div className="project-card-inner relative w-full h-full">
                                    {/* Front Face */}
                                    <div
                                        className="absolute inset-0 backdrop-blur-sm border rounded-2xl overflow-hidden border-border shadow-sm dark:shadow-none bg-surface hover:border-primary/30 transition-colors flex flex-col"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden'
                                        }}
                                    >
                                        <div className="aspect-video overflow-hidden bg-bg-subtle relative">
                                            <img
                                                src={project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"}
                                                alt=""
                                                aria-hidden="true"
                                                className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-90"
                                            />
                                            <img
                                                src={project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"}
                                                alt={project.title}
                                                className="relative w-full h-full object-contain transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex gap-2 mb-3 flex-wrap">
                                                {project.tech.slice(0, 3).map((tag) => (
                                                    <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-surface-hover text-text-secondary">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-bold mb-1 text-text-primary">{project.title}</h3>
                                            <p className="line-clamp-2 text-sm text-text-secondary">{project.subtitle}</p>
                                            <div className="mt-auto pt-4 inline-flex items-center gap-2 text-primary font-bold text-sm">
                                                Hover to read more <ArrowUpRight className="h-3.5 w-3.5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back Face */}
                                    <div
                                        className="absolute inset-0 backdrop-blur-sm border rounded-2xl overflow-hidden border-primary/50 shadow-lg bg-surface"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)'
                                        }}
                                    >
                                        <div className="p-5 h-full flex flex-col justify-between overflow-y-auto">
                                            <div>
                                                <h3 className="text-xl font-bold mb-3 text-text-primary">{project.title}</h3>
                                                <div className="flex gap-2 mb-4 flex-wrap">
                                                    {project.tech.map((tag) => (
                                                        <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-text-secondary leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline mt-4"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    View Live Project <ArrowUpRight className="h-3.5 w-3.5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <Button
                            variant="ghost"
                            className="text-primary font-bold hover:underline gap-2"
                            endIcon={ArrowUpRight}
                            onClick={() => setIsModalOpen(true)}
                        >
                            View all projects
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
});
