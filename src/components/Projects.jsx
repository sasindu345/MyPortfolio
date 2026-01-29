import { useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaCode, FaServer, FaMobile, FaDatabase, FaPalette, FaRocket } from 'react-icons/fa';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

// Icon mapping for project types
const categoryIcons = {
    WEB: FaCode,
    MOBILE: FaMobile,
    BACKEND: FaServer,
    DATABASE: FaDatabase,
    DESIGN: FaPalette,
    OTHER: FaRocket,
};

// Gradient themes for cards
const cardThemes = [
    { gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20', accent: 'violet' },
    { gradient: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20', accent: 'cyan' },
    { gradient: 'from-emerald-500/20 via-green-500/10 to-teal-500/20', accent: 'emerald' },
    { gradient: 'from-orange-500/20 via-amber-500/10 to-yellow-500/20', accent: 'orange' },
    { gradient: 'from-rose-500/20 via-pink-500/10 to-red-500/20', accent: 'rose' },
    { gradient: 'from-sky-500/20 via-cyan-500/10 to-blue-500/20', accent: 'sky' },
];

export default function Projects({ projects }) {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

    const filters = projects?.filters || ['ALL', 'WEB', 'MOBILE', 'OTHER'];

    const filteredProjects = projects?.projects?.filter(project => {
        if (activeFilter === 'ALL') return true;
        return project.category?.toUpperCase() === activeFilter;
    }) || [];

    const { containerRef, visibleItems } = useStaggerAnimation(filteredProjects.length, 150);

    return (
        <section id="projects" className="py-16 md:py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-10 md:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <span className="inline-block px-3 md:px-4 py-2 bg-white/10 text-white/80 text-xs md:text-sm font-semibold rounded-full mb-4 md:mb-6 tracking-wider border border-white/20">
                        MY WORK
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                        Featured
                        <span className="text-white/60"> Projects</span>
                    </h2>
                </div>

                {/* Filter Tabs */}
                <div className={`flex justify-center gap-2 md:gap-3 mb-8 md:mb-12 flex-wrap transition-all duration-700 delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${activeFilter === filter
                                    ? 'bg-white text-black shadow-lg'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredProjects.map((project, index) => {
                        const isItemVisible = visibleItems.includes(index);
                        const theme = cardThemes[index % cardThemes.length];
                        const CategoryIcon = categoryIcons[project.category?.toUpperCase()] || FaCode;

                        return (
                            <div
                                key={project.id || index}
                                className={`group relative bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 ${isItemVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                                    }`}
                            >
                                {/* Decorative Header with Gradient */}
                                <div className={`relative h-40 md:h-48 bg-gradient-to-br ${theme.gradient} overflow-hidden`}>
                                    {/* Animated Pattern */}
                                    <div className="absolute inset-0 opacity-30">
                                        <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-full"></div>
                                        <div className="absolute top-8 left-8 w-32 h-32 border border-white/10 rounded-full"></div>
                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-white/10 rounded-full"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                                    </div>

                                    {/* Floating Code Lines */}
                                    <div className="absolute top-6 right-6 space-y-2 opacity-40">
                                        <div className="w-16 h-1.5 bg-white/30 rounded-full"></div>
                                        <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
                                        <div className="w-20 h-1.5 bg-white/30 rounded-full"></div>
                                        <div className="w-8 h-1.5 bg-white/20 rounded-full"></div>
                                    </div>

                                    {/* Large Icon */}
                                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-black/30 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                            <CategoryIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Project Number */}
                                    <div className="absolute top-4 left-4 md:top-6 md:left-6 text-5xl md:text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    {/* Hover Actions */}
                                    <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                        {project.demoUrl && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white transition-colors group/btn"
                                            >
                                                <FaExternalLinkAlt className="w-4 h-4 text-white group-hover/btn:text-black" />
                                            </a>
                                        )}
                                        {project.sourceUrl && (
                                            <a
                                                href={project.sourceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white transition-colors group/btn"
                                            >
                                                <FaGithub className="w-4 h-4 text-white group-hover/btn:text-black" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 md:p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 bg-white/10 text-white/60 text-[10px] md:text-xs font-semibold uppercase tracking-wider rounded-md">
                                            {project.category || 'Project'}
                                        </span>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-white/80 transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4">
                                        {project.description?.substring(0, 100)}...
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {project.technologies?.slice(0, 4).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 md:px-3 py-0.5 md:py-1 bg-white/5 text-white/50 text-[10px] md:text-xs rounded-full border border-white/10 hover:border-white/30 hover:text-white/70 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className={`h-1 bg-gradient-to-r ${theme.gradient} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
