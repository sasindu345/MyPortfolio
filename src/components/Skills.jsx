import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaFigma,
    FaDatabase, FaLanguage, FaMicrochip, FaCloud, FaBrain, FaChartBar
} from 'react-icons/fa';
import {
    SiTypescript, SiMongodb, SiMysql, SiTailwindcss, SiSpringboot,
    SiCplusplus, SiC, SiArduino, SiDocker, SiPython
} from 'react-icons/si';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

const iconComponents = {
    html5: FaHtml5,
    css3: FaCss3Alt,
    javascript: FaJs,
    react: FaReact,
    nodejs: FaNodeJs,
    git: FaGitAlt,
    figma: FaFigma,
    typescript: SiTypescript,
    mongodb: SiMongodb,
    mysql: SiMysql,
    tailwind: SiTailwindcss,
    spring: SiSpringboot,
    cplusplus: SiCplusplus,
    c: SiC,
    arduino: SiArduino,
    language: FaLanguage,
    database: FaDatabase,
    // New icons for Cloud, AI & Data
    cloud: FaCloud,
    docker: SiDocker,
    python: SiPython,
    ai: FaBrain,
    data: FaChartBar,
    default: FaMicrochip,
};

export default function Skills({ skills }) {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

    return (
        <section id="skills" className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-white/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-12 md:mb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <span className="inline-block px-3 md:px-4 py-2 bg-white/10 text-white/80 text-xs md:text-sm font-semibold rounded-full mb-4 md:mb-6 tracking-wider border border-white/20">
                        MY SKILLS
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                        Technologies I
                        <span className="text-white/60"> Work With</span>
                    </h2>
                </div>

                {/* Skills Categories */}
                {skills?.categories?.map((category, catIndex) => (
                    <SkillCategory key={catIndex} category={category} catIndex={catIndex} />
                ))}
            </div>
        </section>
    );
}

function SkillCategory({ category, catIndex }) {
    const { ref: catRef, isVisible: catVisible } = useScrollAnimation({ threshold: 0.2 });
    const skillCount = category.skills?.length || 0;
    const { containerRef, visibleItems } = useStaggerAnimation(skillCount, 80);

    return (
        <div
            ref={catRef}
            className={`mb-12 md:mb-16 transition-all duration-700 ${catVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
        >
            {/* Category Title */}
            <div className="flex items-center gap-4 mb-8 md:mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <h3 className="text-sm md:text-lg font-bold text-white/70 tracking-widest">
                    {category.title}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Skills Grid */}
            <div ref={containerRef} className="flex flex-wrap justify-center gap-4 md:gap-6">
                {category.skills?.map((skill, skillIndex) => {
                    const IconComponent = iconComponents[skill.icon] || iconComponents.default;
                    const isItemVisible = visibleItems.includes(skillIndex);

                    return (
                        <div
                            key={skillIndex}
                            className={`group relative transition-all duration-500 ${isItemVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                                }`}
                        >
                            <div className="w-20 h-20 md:w-28 md:h-28 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 md:gap-3 hover:border-white/40 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                                <IconComponent
                                    className="w-7 h-7 md:w-10 md:h-10 text-white/70 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                                />
                                <span className="text-[10px] md:text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                                    {skill.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
