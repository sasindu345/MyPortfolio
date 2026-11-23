import { useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaCode, FaMobile, FaBrain, FaMicrochip } from 'react-icons/fa';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

// Icon mapping for project types
const categoryIcons = {
    AI: FaBrain,
    WEB: FaCode,
    MOBILE: FaMobile,
    IOT: FaMicrochip,
};

// Consistent gradient theme for all cards (Amber and Indigo)
const cardTheme = {
    gradient: 'from-amber-500/20 via-indigo-500/5 to-amber-500/20',
    accent: 'amber'
};

export default function Projects({ projects }) {
    const [activeFilter, setActiveFilter] = useState('All');
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

    const filters = projects?.filters || ['All', 'AI', 'Web', 'Mobile', 'IoT'];

    const filteredProjects = projects?.projects?.filter(project => {
        if (activeFilter.toUpperCase() === 'ALL') return true;
        return project.category?.toUpperCase() === activeFilter.toUpperCase();
    }) || [];

    const { containerRef, visibleItems } = useStaggerAnimation(filteredProjects.length, 150);

    return (
        <section id="projects" className="py-16 md:py-24 lg:py-32 bg-[#070f1d] relative overflow-hidden">
            {/* Background blur effects */}
            <div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0a1628]/40 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-10 md:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <span className="inline-block px-3 md:px-4 py-2 bg-amber-500/10 text-amber-500 text-xs md:text-sm font-bold rounded-full mb-4 md:mb-6 tracking-wider border border-amber-500/20 font-montserrat">
                        MY WORK
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-raleway">
                        Featured
                        <span className="text-amber-500 font-raleway"> Projects</span>
                    </h2>
                </div>

                {/* Filter Tabs */}
                <div className={`flex justify-center gap-2 md:gap-3 mb-8 md:mb-12 flex-wrap transition-all duration-700 delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${activeFilter === filter
                                ? 'bg-amber-500 text-[#0a1628] shadow-lg shadow-amber-500/25'
                                : 'bg-[#0f1f3d]/40 text-slate-300 hover:bg-[#0f1f3d]/70 hover:text-white border border-slate-500/15'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {filteredProjects.map((project, index) => {
                        const isItemVisible = visibleItems.includes(index);
                        const CategoryIcon = categoryIcons[project.category?.toUpperCase()] || FaCode;

                        return (
                            <div
                                key={project.id || index}
                                className={`group relative glass-card glass-card-hover overflow-hidden transition-all duration-500 h-full flex flex-col ${isItemVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                                    }`}
                            >
                                {/* Cover */}
                                <div className={`relative h-40 md:h-48 bg-gradient-to-br ${cardTheme.gradient} overflow-hidden`}>
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt=""
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 opacity-30">
                                            <div className="absolute top-4 left-4 w-20 h-20 border border-amber-500/10 rounded-full"></div>
                                            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-amber-500/10 rounded-full"></div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/25 to-transparent"></div>

                                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                                        <div className="w-10 h-10 md:w-11 md:h-11 bg-[#0a1628]/70 backdrop-blur-sm rounded-xl flex items-center justify-center border border-slate-500/20">
                                            <CategoryIcon className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                                        </div>
                                    </div>

                                    {/* Project Number */}
                                    <div className="absolute top-4 left-4 md:top-6 md:left-6 text-5xl md:text-6xl font-black text-slate-500/10 group-hover:text-amber-500/10 transition-colors duration-300 font-montserrat">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    {/* Hover Actions */}
                                    <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                        {project.demoUrl && project.demoUrl.startsWith('http') && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-[#0a1628]/70 backdrop-blur-sm rounded-xl flex items-center justify-center border border-slate-500/20 hover:bg-amber-500 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 group/btn"
                                            >
                                                <FaExternalLinkAlt className="w-4 h-4 text-slate-200 group-hover/btn:text-[#0a1628] transition-colors" />
                                            </a>
                                        )}
                                        {project.sourceUrl && project.sourceUrl.startsWith('http') && (
                                            <a
                                                href={project.sourceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-[#0a1628]/70 backdrop-blur-sm rounded-xl flex items-center justify-center border border-slate-500/20 hover:bg-amber-500 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 group/btn"
                                            >
                                                <FaGithub className="w-4 h-4 text-slate-200 group-hover/btn:text-[#0a1628] transition-colors" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 md:p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] md:text-xs font-bold tracking-wider rounded-md border border-amber-500/20 font-montserrat">
                                            {project.category || 'Project'}
                                        </span>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-amber-400 transition-colors duration-300 font-raleway">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-300/60 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3 font-opensans">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                                        {project.technologies?.slice(0, 4).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 md:px-3 py-0.5 md:py-1 bg-[#0a1628]/45 text-slate-300 text-[10px] md:text-xs rounded-full border border-slate-500/15 hover:border-amber-500/30 hover:text-amber-400 transition-all duration-300 font-opensans"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className={`h-1 bg-gradient-to-r ${cardTheme.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
