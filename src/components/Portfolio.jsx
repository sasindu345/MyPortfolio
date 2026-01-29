import { useState } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export default function Portfolio({ projects }) {
    const [activeFilter, setActiveFilter] = useState('ALL');

    const filters = projects?.filters || ['ALL', 'CODED', 'DESIGNED'];

    const filteredProjects = projects?.projects?.filter(project => {
        if (activeFilter === 'ALL') return true;
        return project.category?.toUpperCase() === activeFilter;
    }) || [];

    return (
        <section id="portfolio" className="py-16 md:py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-white/3 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-block px-3 md:px-4 py-2 bg-white/10 text-white/80 text-xs md:text-sm font-semibold rounded-full mb-4 md:mb-6 tracking-wider border border-white/20">
                        MY WORK
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                        Featured
                        <span className="text-white/60"> Projects</span>
                    </h2>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center gap-2 md:gap-3 mb-8 md:mb-12 flex-wrap">
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id || index}
                            className="group relative bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative h-40 md:h-56 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 flex items-center justify-center gap-3 md:gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors group/btn"
                                    >
                                        <FaExternalLinkAlt className="w-4 h-4 md:w-5 md:h-5 text-white group-hover/btn:text-black" />
                                    </a>
                                    <a
                                        href={project.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors group/btn"
                                    >
                                        <FaGithub className="w-4 h-4 md:w-5 md:h-5 text-white group-hover/btn:text-black" />
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 md:p-6">
                                <span className="text-white/50 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                                    {project.subtitle}
                                </span>
                                <h3 className="text-lg md:text-xl font-bold text-white mt-1 md:mt-2 mb-2 md:mb-3 group-hover:text-white/80 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                                    {project.description?.substring(0, 80)}...
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {project.technologies?.slice(0, 3).map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-2 md:px-3 py-0.5 md:py-1 bg-white/5 text-white/50 text-[10px] md:text-xs rounded-full border border-white/10"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Text */}
                <div className="text-center mt-10 md:mt-16">
                    <p className="text-white/40 text-base md:text-lg">
                        And many more to come ✨
                    </p>
                </div>
            </div>
        </section>
    );
}
