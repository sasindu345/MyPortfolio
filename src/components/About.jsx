import { FaGraduationCap, FaCode, FaCloud, FaBullseye } from 'react-icons/fa';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

const iconMap = {
    education: FaGraduationCap,
    code: FaCode,
    cloud: FaCloud,
    target: FaBullseye,
};

export default function About({ profile }) {
    const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
    const factsCount = profile?.quickFacts?.length || 4;
    const { containerRef, visibleItems } = useStaggerAnimation(factsCount, 100);

    return (
        <section id="about" className="py-16 md:py-24 lg:py-32 bg-[#070f1d] relative overflow-hidden">
            {/* Background blur effects */}
            <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
                    
                    {/* Left Column: Narrative (5 cols) */}
                    <div 
                        ref={textRef}
                        className={`lg:col-span-5 space-y-6 transition-all duration-700 ${
                            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        <div>
                            <span className="inline-block px-4 py-2 bg-amber-500/10 text-amber-500 text-xs md:text-sm font-bold rounded-full mb-4 tracking-wider border border-amber-500/20 font-montserrat">
                                ABOUT ME
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-raleway">
                                My Academic &
                                <span className="block text-amber-500 mt-1 font-raleway">
                                    Learning Journey
                                </span>
                            </h2>
                        </div>
                        
                        <p className="text-slate-300/80 text-sm md:text-base leading-relaxed font-opensans">
                            {profile?.aboutDescription || 'Dedicated to crafting exceptional digital experiences through innovative solutions and clean, maintainable code.'}
                        </p>

                        <div className="pt-4 flex flex-wrap gap-4">
                            <a 
                                href="#projects" 
                                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-[#0a1628] font-bold rounded-lg transition-all duration-300 font-montserrat text-sm shadow-lg shadow-amber-500/20"
                            >
                                View My Projects
                            </a>
                            <a 
                                href="#contact" 
                                className="px-6 py-3 bg-[#0f1f3d]/60 hover:bg-[#0f1f3d] text-white font-bold rounded-lg transition-all duration-300 font-montserrat text-sm border border-slate-500/15 hover:border-amber-500/30"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Quick Facts / Highlights (7 cols) */}
                    <div ref={containerRef} className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                        {profile?.quickFacts?.map((fact, index) => {
                            const Icon = iconMap[fact.icon] || FaCode;
                            const isItemVisible = visibleItems.includes(index);

                            return (
                                <div
                                    key={index}
                                    className={`group glass-card glass-card-hover p-6 transition-all duration-500 ${
                                        isItemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-amber-500/10 group-hover:bg-amber-500 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 border border-amber-500/20 group-hover:border-amber-500">
                                            <Icon className="w-5 h-5 text-amber-400 group-hover:text-[#0a1628] transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-amber-500/80 font-bold uppercase tracking-wider block mb-1 font-montserrat">
                                                {fact.label}
                                            </span>
                                            <h3 className="text-sm md:text-base font-bold text-white mb-1 font-raleway group-hover:text-amber-400 transition-colors duration-300">
                                                {fact.value}
                                            </h3>
                                            <p className="text-xs md:text-sm text-slate-300/50 font-opensans leading-relaxed">
                                                {fact.detail}
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
