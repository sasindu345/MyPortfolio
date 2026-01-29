import { FaTrophy, FaMedal, FaCertificate, FaAward, FaStar } from 'react-icons/fa';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

const iconMap = {
    trophy: FaTrophy,
    medal: FaMedal,
    certificate: FaCertificate,
    award: FaAward,
    star: FaStar,
};

export default function Achievements({ achievements }) {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const itemCount = achievements?.items?.length || 0;
    const { containerRef, visibleItems } = useStaggerAnimation(itemCount, 120);

    return (
        <section id="achievements" className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950"></div>
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
                        RECOGNITION
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                        Awards &
                        <span className="text-white/60"> Achievements</span>
                    </h2>
                </div>

                {/* Achievements Grid */}
                <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {achievements?.items?.map((achievement, index) => {
                        const Icon = iconMap[achievement.icon] || FaTrophy;
                        const isItemVisible = visibleItems.includes(index);

                        return (
                            <div
                                key={index}
                                className={`group relative bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-500 overflow-hidden ${isItemVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                                    }`}
                            >
                                {/* Image Area */}
                                {achievement.image ? (
                                    <div className="relative h-40 md:h-48 overflow-hidden">
                                        <img
                                            src={achievement.image}
                                            alt={achievement.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                // Fallback to gradient if image fails to load
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        {/* Fallback gradient (hidden by default) */}
                                        <div
                                            className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 items-center justify-center hidden"
                                        >
                                            <Icon className="w-16 h-16 text-yellow-500/50" />
                                        </div>
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                                        {/* Icon Badge */}
                                        <div className={`absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 ${isItemVisible ? 'rotate-0' : 'rotate-12'
                                            }`}>
                                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-black" />
                                        </div>

                                        {/* Year Badge on Image */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">
                                                {achievement.year}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    /* No Image - Show Icon with Gradient Background */
                                    <div className="relative h-32 md:h-40 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 flex items-center justify-center">
                                        <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 ${isItemVisible ? 'rotate-0' : 'rotate-12'
                                            }`}>
                                            <Icon className="w-8 h-8 md:w-10 md:h-10 text-black" />
                                        </div>

                                        {/* Year Badge */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="inline-block px-3 py-1 bg-white/10 text-white/70 text-xs font-semibold rounded-full">
                                                {achievement.year}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-4 md:p-6">
                                    {/* Title */}
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                        {achievement.title}
                                    </h3>

                                    {/* Organization */}
                                    <p className="text-white/50 text-sm mb-2 font-medium">
                                        {achievement.organization}
                                    </p>

                                    {/* Description */}
                                    <p className="text-white/40 text-xs md:text-sm leading-relaxed">
                                        {achievement.description}
                                    </p>
                                </div>

                                {/* Decorative Number */}
                                <div className="absolute top-4 left-4 text-4xl md:text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">
                                    #{index + 1}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
