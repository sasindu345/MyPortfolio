import { useEffect, useState } from 'react';
import { CardStack } from '@/components/ui/card-stack';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function useCardSize() {
    const [size, setSize] = useState({ cardWidth: 520, cardHeight: 320, narrow: false });

    useEffect(() => {
        const update = () => {
            const vw = window.innerWidth;
            if (vw < 640) {
                setSize({ cardWidth: Math.max(240, Math.min(320, vw - 56)), cardHeight: 220, narrow: true });
            } else if (vw < 1024) {
                setSize({ cardWidth: 420, cardHeight: 270, narrow: false });
            } else {
                setSize({ cardWidth: 520, cardHeight: 320, narrow: false });
            }
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return size;
}

export default function Achievements({ achievements }) {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const { cardWidth, cardHeight, narrow } = useCardSize();

    const items = (achievements?.items || []).map((achievement, index) => ({
        id: `${achievement.title}-${achievement.year}-${index}`,
        title: achievement.title,
        description: `${achievement.placement} · ${achievement.organization}`,
        imageSrc: achievement.image,
        tag: `${achievement.year} · ${achievement.placement}`,
    }));

    return (
        <section id="achievements" className="relative overflow-hidden bg-[#0a1628] py-16 md:py-24 lg:py-32">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#070f1d] to-[#0a1628]"></div>
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-indigo-500/5 blur-3xl md:h-96 md:w-96"></div>
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl md:h-96 md:w-96"></div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-12">
                <div
                    ref={headerRef}
                    className={`mb-6 text-center transition-all duration-700 md:mb-10 ${headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    <span className="mb-4 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs font-bold tracking-wider text-amber-500 font-montserrat md:mb-6 md:px-4 md:text-sm">
                        RECOGNITION
                    </span>
                    <h2 className="mb-4 text-2xl font-bold text-white font-raleway sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
                        Awards &
                        <span className="text-amber-500 font-raleway"> Achievements</span>
                    </h2>
                    <p className="mx-auto max-w-xl text-sm text-slate-400 font-opensans">
                        Drag the front card, use the arrow keys, or pick a dot.
                    </p>
                </div>

                <CardStack
                    items={items}
                    initialIndex={0}
                    maxVisible={narrow ? 3 : 5}
                    cardWidth={cardWidth}
                    cardHeight={cardHeight}
                    overlap={narrow ? 0.64 : 0.5}
                    spreadDeg={narrow ? 24 : 42}
                    autoAdvance
                    intervalMs={3200}
                    pauseOnHover
                    showDots
                    loop
                />
            </div>
        </section>
    );
}
