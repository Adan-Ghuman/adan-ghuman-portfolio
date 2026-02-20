import { memo } from 'react';
import { SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs, SiMongodb, SiExpress, SiPostgresql, SiAmazonwebservices, SiGit, SiDocker, SiTailwindcss, SiDaisyui, SiBootstrap, SiRedux, SiReacthookform, SiMantine, SiChakraui, SiMui, SiSupabase, SiDrizzle } from 'react-icons/si';

const technologies = [
    { name: "React", Icon: SiReact, color: "hover:text-[#61DAFB]" },
    { name: "Next.js", Icon: SiNextdotjs, color: "hover:text-black dark:hover:text-white" },
    { name: "Node.js", Icon: SiNodedotjs, color: "hover:text-[#339933]" },
    { name: "TypeScript", Icon: SiTypescript, color: "hover:text-[#3178C6]" },
    { name: "JavaScript", Icon: SiJavascript, color: "hover:text-[#F7DF1E]" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "hover:text-[#4169E1]" },
    { name: "MongoDB", Icon: SiMongodb, color: "hover:text-[#47A248]" },
    { name: "Docker", Icon: SiDocker, color: "hover:text-[#2496ED]" },
    { name: "Git", Icon: SiGit, color: "hover:text-[#F05032]" },
    { name: "Express.js", Icon: SiExpress, color: "hover:text-black dark:hover:text-white" },
    { name: "AWS", Icon: SiAmazonwebservices, color: "hover:text-[#232F3E] dark:hover:text-[#FF9900]" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "hover:text-[#06B6D4]" },
    { name: "Bootstrap", Icon: SiBootstrap, color: "hover:text-[#7952B3]" },
    { name: "Redux Toolkit", Icon: SiRedux, color: "hover:text-[#764ABC]" },
    { name: "React Hook Form", Icon: SiReacthookform, color: "hover:text-[#EC5990]" },
    { name: "Mantine UI", Icon: SiMantine, color: "hover:text-[#339AF0]" },
    { name: "Chakra UI", Icon: SiChakraui, color: "hover:text-[#319795]" },
    { name: "DaisyUI", Icon: SiDaisyui, color: "hover:text-[#5A0EF8] dark:hover:text-[#1AD1A5]" },
    { name: "Material UI", Icon: SiMui, color: "hover:text-[#007FFF]" },
    { name: "Supabase", Icon: SiSupabase, color: "hover:text-[#3ECF8E]" },
    { name: "Drizzle ORM", Icon: SiDrizzle, color: "hover:text-[#C5F74F]" },
];

export const Expertise = memo(function Expertise() {
    const techList = [...technologies, ...technologies];

    return (
        <section className="py-24 mt-24 overflow-hidden border-y backdrop-blur-sm border-border bg-bg-sunken" id="skills">
            <div className="max-w-[88%] mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Expertise In <span className="text-primary">Modern Technologies</span>
                </h2>
                <p className="max-w-2xl mx-auto text-text-secondary">
                    A comprehensive toolbelt for building scalable, high-performance applications.
                </p>
            </div>

            <div className="relative w-full overflow-hidden group z-10 pb-12 -mb-12">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-bg-base/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-bg-base/80 to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
                    {techList.map((tech, index) => (
                        <div
                            key={`${tech.name}-${index}`}
                            className="relative flex flex-col items-center justify-center mx-8 w-16 h-16 md:w-20 md:h-20 p-2 group/icon"
                        >
                            <tech.Icon
                                className={`w-full h-full object-contain grayscale opacity-40 transition-all duration-300 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 group-hover/icon:scale-110 ${tech.color}`}
                            />
                            <span className="absolute -bottom-8 text-xs font-medium opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 whitespace-nowrap text-text-secondary">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});
