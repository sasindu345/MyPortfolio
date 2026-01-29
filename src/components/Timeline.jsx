import { FaBriefcase, FaGraduationCap, FaCode, FaRocket } from 'react-icons/fa';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

const iconMap = {
    work: FaBriefcase,
    education: FaGraduationCap,
    project: FaCode,
    milestone: FaRocket,
};

export default function Timeline({ timeline }) {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const itemCount = timeline?.items?.length || 0;
    const { containerRef, visibleItems } = useStaggerAnimation(itemCount, 200);

    return (
        <section id="timeline" className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
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
                        MY JOURNEY
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                        Experience &
                        <span className="text-white/60"> Education</span>
                    </h2>
                </div>

                {/* Timeline */}
                <div ref={containerRef} className="relative max-w-4xl mx-auto">
                    {/* Center Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/30 via-white/20 to-white/30 md:-translate-x-1/2"></div>

                    {/* Timeline Items */}
                    <div className="space-y-8 md:space-y-12">
                        {timeline?.items?.map((item, index) => {
                            const Icon = iconMap[item.type] || FaBriefcase;
                            const isLeft = index % 2 === 0;
                            const isItemVisible = visibleItems.includes(index);

                            return (
                                <div
                                    key={index}
                                    className={`relative flex md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} transition-all duration-700 ${isItemVisible
                                            ? 'opacity-100 translate-x-0'
                                            : `opacity-0 ${isLeft ? '-translate-x-10 md:-translate-x-20' : 'translate-x-10 md:translate-x-20'}`
                                        }`}
                                >
                                    {/* Icon */}
                                    <div className={`absolute left-0 md:left-1/2 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center md:-translate-x-1/2 shadow-lg z-10 transition-all duration-500 ${isItemVisible ? 'scale-100' : 'scale-0'
                                        }`}>
                                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-black" />
                                    </div>

                                    {/* Content Card */}
                                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                                        <div className="p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 group">
                                            {/* Year Badge */}
                                            <span className="inline-block px-3 py-1 bg-white/10 text-white/70 text-xs font-semibold rounded-full mb-3">
                                                {item.year}
                                            </span>

                                            <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-white/90">
                                                {item.title}
                                            </h3>

                                            <p className="text-white/50 text-sm mb-2 font-medium">
                                                {item.organization}
                                            </p>

                                            <p className="text-white/40 text-xs md:text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
