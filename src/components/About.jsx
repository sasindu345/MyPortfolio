import { FaPaintBrush, FaCode, FaWrench } from 'react-icons/fa';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

const iconMap = {
    design: FaPaintBrush,
    code: FaCode,
    maintenance: FaWrench,
};

export default function About({ profile }) {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const { containerRef, visibleItems } = useStaggerAnimation(profile?.services?.length || 3, 150);

    return (
        <section id="about" className="py-16 md:py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-white/3 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-12 md:mb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <span className="inline-block px-3 md:px-4 py-2 bg-white/10 text-white/80 text-xs md:text-sm font-semibold rounded-full mb-4 md:mb-6 tracking-wider border border-white/20">
                        ABOUT ME
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                        Passionate About Creating
                        <span className="block text-white/60">
                            Digital Excellence
                        </span>
                    </h2>
                    <p className="text-white/50 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-4">
                        {profile?.aboutDescription || 'Dedicated to crafting exceptional digital experiences through innovative solutions and clean, maintainable code.'}
                    </p>
                </div>

                {/* Services Grid */}
                <div ref={containerRef} className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {profile?.services?.map((service, index) => {
                        const Icon = iconMap[service.icon] || FaCode;
                        const isItemVisible = visibleItems.includes(index);

                        return (
                            <div
                                key={index}
                                className={`group relative p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-500 ${isItemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <Icon className="w-5 h-5 md:w-7 md:h-7 text-black" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 tracking-wide">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/50 text-sm md:text-base leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Number Badge */}
                                <div className="absolute top-4 md:top-6 right-4 md:right-6 text-4xl md:text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                                    0{index + 1}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
