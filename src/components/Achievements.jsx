import { FaTrophy, FaMedal, FaCertificate, FaAward, FaStar } from 'react-icons/fa';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

const iconMap = {
    trophy: FaTrophy,
    medal: FaMedal,
    certificate: FaCertificate,
    award: FaAward,
    star: FaStar,
};

// Placement badge configurations - subtle but attractive
const getPlacementStyle = (placement) => {
    const normalizedPlacement = placement?.toLowerCase() || '';

    if (normalizedPlacement.includes('winner') || normalizedPlacement.includes('1st')) {
        return {
            bg: 'bg-yellow-500/20',
            text: 'text-yellow-200',
            border: 'border-yellow-400/30',
            glow: 'shadow-yellow-500/20',
            icon: FaTrophy,
            accentGradient: 'from-yellow-500/40 via-amber-500/20 to-yellow-500/40'
        };
    } else if (normalizedPlacement.includes('runner') || normalizedPlacement.includes('2nd')) {
        return {
            bg: 'bg-slate-300/20',
            text: 'text-slate-200',
            border: 'border-slate-300/30',
            glow: 'shadow-slate-400/20',
            icon: FaMedal,
            accentGradient: 'from-slate-400/40 via-slate-300/20 to-slate-400/40'
        };
    } else if (normalizedPlacement.includes('finalist') || normalizedPlacement.includes('3rd')) {
        return {
            bg: 'bg-orange-600/20',
            text: 'text-orange-200',
            border: 'border-orange-400/30',
            glow: 'shadow-orange-600/20',
            icon: FaMedal,
            accentGradient: 'from-orange-500/40 via-orange-400/20 to-orange-500/40'
        };
    } else if (normalizedPlacement.includes('participant') || normalizedPlacement.includes('participation')) {
        return {
            bg: 'bg-blue-500/20',
            text: 'text-blue-200',
            border: 'border-blue-400/30',
            glow: 'shadow-blue-500/20',
            icon: FaStar,
            accentGradient: 'from-blue-500/40 via-blue-400/20 to-blue-500/40'
        };
    } else {
        // Default style for other achievements
        return {
            bg: 'bg-white/15',
            text: 'text-white/70',
            border: 'border-white/20',
            glow: 'shadow-white/10',
            icon: FaAward,
            accentGradient: 'from-yellow-500/20 via-amber-500/10 to-orange-500/20'
        };
    }
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
                    className={`text-center mb-10 md:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {achievements?.items?.map((achievement, index) => {
                        const Icon = iconMap[achievement.icon] || FaTrophy;
                        const isItemVisible = visibleItems.includes(index);
                        const placementStyle = achievement.placement ? getPlacementStyle(achievement.placement) : null;
                        const PlacementIcon = placementStyle?.icon || FaTrophy;

                        return (
                            <div
                                key={index}
                                className={`group relative bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden h-full flex flex-col ${isItemVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
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

                                        {/* Year Badge on Image */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full border border-white/20">
                                                {achievement.year}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    /* No Image - Show Icon with Gradient Background */
                                    <div className="relative h-40 md:h-48 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 flex items-center justify-center">
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
                                <div className="p-4 md:p-6 flex-1 flex flex-col">
                                    {/* Placement Badge - Now in content area */}
                                    {achievement.placement && placementStyle && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className={`${placementStyle.bg} ${placementStyle.text} ${placementStyle.border} ${placementStyle.glow} backdrop-blur-md rounded-lg px-2.5 py-1 md:px-3 md:py-1.5 border shadow-md flex items-center gap-1.5 md:gap-2`}>
                                                <PlacementIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                                <span className="text-xs md:text-sm font-bold tracking-wide whitespace-nowrap">
                                                    {achievement.placement}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-white/80 transition-colors">
                                        {achievement.title}
                                    </h3>

                                    {/* Organization */}
                                    <p className="text-white/50 text-sm mb-2 font-medium">
                                        {achievement.organization}
                                    </p>

                                    {/* Description */}
                                    <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                                        {achievement.description}
                                    </p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className={`h-1 bg-gradient-to-r ${placementStyle?.accentGradient || 'from-yellow-500/20 via-amber-500/10 to-orange-500/20'} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
