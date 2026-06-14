import { FaTrophy, FaMedal, FaCertificate, FaAward, FaStar } from 'react-icons/fa';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

const iconMap = {
    trophy: FaTrophy,
    medal: FaMedal,
    certificate: FaCertificate,
    award: FaAward,
    star: FaStar,
};

// Placement badge configurations - styled to pop nicely on deep navy background
const getPlacementStyle = (placement) => {
    const normalizedPlacement = placement?.toLowerCase() || '';

    if (normalizedPlacement.includes('winner') || normalizedPlacement.includes('1st') || normalizedPlacement.includes('runner-up')) {
        // Gold / Amber accents for top positions
        return {
            bg: 'bg-amber-500/20',
            text: 'text-amber-300',
            border: 'border-amber-500/30',
            glow: 'shadow-amber-500/20',
            icon: FaTrophy,
            accentGradient: 'from-amber-500/40 via-indigo-500/10 to-amber-500/40'
        };
    } else if (normalizedPlacement.includes('finalist') || normalizedPlacement.includes('3rd') || normalizedPlacement.includes('2nd')) {
        // Silver/White accents
        return {
            bg: 'bg-slate-500/20',
            text: 'text-slate-200',
            border: 'border-slate-400/30',
            glow: 'shadow-slate-500/15',
            icon: FaMedal,
            accentGradient: 'from-slate-400/30 via-indigo-500/10 to-slate-400/30'
        };
    } else if (normalizedPlacement.includes('participant') || normalizedPlacement.includes('participation')) {
        // Bright blue/indigo accents
        return {
            bg: 'bg-indigo-500/20',
            text: 'text-indigo-300',
            border: 'border-indigo-400/30',
            glow: 'shadow-indigo-500/20',
            icon: FaStar,
            accentGradient: 'from-indigo-500/40 via-indigo-400/20 to-indigo-500/40'
        };
    } else {
        // Default style for other achievements
        return {
            bg: 'bg-[#0f1f3d]/60',
            text: 'text-slate-300',
            border: 'border-slate-500/20',
            glow: 'shadow-slate-500/10',
            icon: FaAward,
            accentGradient: 'from-amber-500/30 via-indigo-500/10 to-amber-500/30'
        };
    }
};

export default function Achievements({ achievements }) {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const itemCount = achievements?.items?.length || 0;
    const { containerRef, visibleItems } = useStaggerAnimation(itemCount, 120);

    return (
        <section id="achievements" className="py-16 md:py-24 lg:py-32 bg-[#0a1628] relative overflow-hidden">
            {/* Background blur effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#070f1d] to-[#0a1628]"></div>
            <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-10 md:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <span className="inline-block px-3 md:px-4 py-2 bg-amber-500/10 text-amber-500 text-xs md:text-sm font-bold rounded-full mb-4 md:mb-6 tracking-wider border border-amber-500/20 font-montserrat">
                        RECOGNITION
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-raleway">
                        Awards &
                        <span className="text-amber-500 font-raleway"> Achievements</span>
                    </h2>
                </div>

                {/* Achievements Grid */}
                <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {achievements?.items?.map((achievement, index) => {
                        const Icon = iconMap[achievement.icon] || FaTrophy;
                        const isItemVisible = visibleItems.includes(index);
                        const placementStyle = achievement.placement ? getPlacementStyle(achievement.placement) : getPlacementStyle('');
                        const PlacementIcon = placementStyle?.icon || FaTrophy;

                        return (
                            <div
                                key={index}
                                className={`group relative glass-card glass-card-hover overflow-hidden transition-all duration-500 h-full flex flex-col ${isItemVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                                    }`}
                            >
                                {/* Image Area */}
                                {achievement.image ? (
                                    <div className="relative h-40 md:h-48 overflow-hidden bg-[#070f1d]">
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
                                            className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-indigo-500/10 items-center justify-center hidden"
                                        >
                                            <Icon className="w-16 h-16 text-amber-500/30" />
                                        </div>
                                        {/* Gradient Overlay for Navy Integration */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent"></div>

                                        {/* Year Badge on Image */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="inline-block px-3 py-1 bg-[#070f1d]/75 backdrop-blur-sm text-amber-400 text-xs font-bold rounded-full border border-amber-500/25 font-montserrat">
                                                {achievement.year}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    /* No Image - Show Icon with Gradient Background */
                                    <div className="relative h-40 md:h-48 bg-gradient-to-br from-amber-500/15 to-indigo-500/10 flex items-center justify-center">
                                        <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 ${isItemVisible ? 'rotate-0' : 'rotate-12'
                                            }`}>
                                            <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#0a1628]" />
                                        </div>

                                        {/* Year Badge */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold rounded-full border border-amber-500/20 font-montserrat">
                                                {achievement.year}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-4 md:p-6 flex-1 flex flex-col">
                                    {/* Placement Badge */}
                                    {achievement.placement && placementStyle && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className={`${placementStyle.bg} ${placementStyle.text} ${placementStyle.border} ${placementStyle.glow} backdrop-blur-md rounded-lg px-2.5 py-1 md:px-3 md:py-1 border shadow-md flex items-center gap-1.5 md:gap-2`}>
                                                <PlacementIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                                <span className="text-xs md:text-sm font-bold tracking-wide whitespace-nowrap font-montserrat">
                                                    {achievement.placement}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-amber-400 transition-colors duration-300 font-raleway">
                                        {achievement.title}
                                    </h3>

                                    {/* Organization */}
                                    <p className="text-slate-300/80 text-sm mb-2 font-semibold font-opensans">
                                        {achievement.organization}
                                    </p>

                                    {/* Description */}
                                    <p className="text-slate-300/60 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3 flex-1 font-opensans">
                                        {achievement.description}
                                    </p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className={`h-1 bg-gradient-to-r ${placementStyle?.accentGradient || 'from-amber-500/20 via-indigo-500/10 to-amber-500/20'} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
