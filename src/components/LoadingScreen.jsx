import { useState, useEffect, useRef } from 'react';

export default function LoadingScreen({ onComplete }) {
    const fullName = "Sasindu Wijewardana";
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const canvasRef = useRef(null);
    const startTimeRef = useRef(null);
    const animFrameRef = useRef(null);
    const isFinishedRef = useRef(false);

    // Mouse & wave particle physics state
    const mouseRef = useRef({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
        targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        targetY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
        trail: [],
    });

    // Automatic smooth timed loading (Target: 3.2 seconds total duration)
    useEffect(() => {
        const DURATION = 3200; // 3.2 seconds duration

        const step = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const rawProgress = Math.min(100, (elapsed / DURATION) * 100);

            // Smooth cubic ease-out curve for natural loading feel
            const t = rawProgress / 100;
            const easedProgress = Math.min(100, Math.round(t * (2 - t) * 100));

            setProgress(easedProgress);

            if (rawProgress < 100) {
                animFrameRef.current = requestAnimationFrame(step);
            } else if (!isFinishedRef.current) {
                isFinishedRef.current = true;
                setProgress(100);
                setIsExiting(true);
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(() => {
                        onComplete?.();
                    }, 350);
                }, 500);
            }
        };

        animFrameRef.current = requestAnimationFrame(step);

        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [onComplete]);

    // Interactive canvas wave & curving animation in background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Ambient flowing curve lines
        const numCurves = 5;
        const curves = Array.from({ length: numCurves }, (_, i) => ({
            baseY: (height / (numCurves + 1)) * (i + 1),
            amplitude: 35 + i * 15,
            wavelength: 0.0015 + i * 0.0004,
            speed: 0.008 + i * 0.003,
            phase: i * (Math.PI / 3),
            color:
                i % 2 === 0
                    ? 'rgba(245, 158, 11, 0.12)'
                    : 'rgba(217, 119, 6, 0.07)',
            width: 1.5 + (i % 3) * 0.8,
        }));

        let animationTime = 0;
        let canvasFrameId;

        const render = () => {
            animationTime += 1;
            ctx.clearRect(0, 0, width, height);

            const m = mouseRef.current;
            m.x += (m.targetX - m.x) * 0.08;
            m.y += (m.targetY - m.y) * 0.08;

            curves.forEach((c) => {
                ctx.beginPath();
                ctx.lineWidth = c.width;
                ctx.strokeStyle = c.color;

                const step = 12;
                for (let x = 0; x <= width + step; x += step) {
                    let y =
                        c.baseY +
                        Math.sin(x * c.wavelength + animationTime * c.speed + c.phase) *
                            c.amplitude;

                    const dx = x - m.x;
                    const dy = y - m.y;
                    const dist = Math.hypot(dx, dy);
                    const influenceRadius = 260;

                    if (dist < influenceRadius) {
                        const force = Math.cos((dist / influenceRadius) * (Math.PI / 2));
                        y += (m.y - y) * force * 0.45;
                    }

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            });

            // Ambient cursor spotlight
            const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 220);
            grad.addColorStop(0, 'rgba(245, 158, 11, 0.08)');
            grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.02)');
            grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(m.x, m.y, 220, 0, Math.PI * 2);
            ctx.fill();

            canvasFrameId = requestAnimationFrame(render);
        };

        canvasFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (canvasFrameId) cancelAnimationFrame(canvasFrameId);
        };
    }, []);

    // Mouse movement listener for ambient background interaction
    const handleMouseMove = (e) => {
        mouseRef.current.targetX = e.clientX;
        mouseRef.current.targetY = e.clientY;
    };

    // Calculate how many characters of the name to reveal
    const revealedCharsCount = Math.floor((progress / 100) * fullName.length);

    // Status text based on progress
    const getStatusText = () => {
        if (progress < 40) return "INITIALIZING...";
        if (progress < 85) return "SYNCHRONIZING PORTFOLIO...";
        if (progress < 100) return "ALMOST READY...";
        return "WELCOME";
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className={`fixed inset-0 z-[9999] bg-[#070d18] flex flex-col items-center justify-center select-none transition-all duration-700 overflow-hidden ${
                isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            {/* Background Canvas with Smooth Curving Waves */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-0 opacity-85 transition-opacity duration-500"
            />

            {/* Subtle Backdrop Gradient */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 50%, rgba(10, 22, 40, 0.4) 0%, rgba(7, 13, 24, 0.85) 100%)',
                }}
            />

            {/* Main Content Area */}
            <div
                className={`relative z-10 flex flex-col items-center max-w-xl px-6 transition-all duration-700 ${
                    isExiting ? 'scale-105 opacity-90' : 'scale-100'
                }`}
            >
                {/* Minimal Portfolio Tag */}
                <div className="mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest text-amber-400/90 border border-amber-500/20 bg-amber-500/5 backdrop-blur-md">
                        PORTFOLIO 2026
                    </span>
                </div>

                {/* Name Character-by-Character Smooth Reveal */}
                <div className="flex flex-wrap justify-center items-center gap-[0.5px] md:gap-[1px] mb-8 min-h-[3rem]">
                    {fullName.split('').map((char, index) => {
                        const isRevealed = index < revealedCharsCount;
                        const isCurrent = index === revealedCharsCount;

                        if (char === ' ') {
                            return <span key={index} className="w-3 md:w-4" />;
                        }

                        return (
                            <span
                                key={index}
                                className={`text-2xl md:text-4xl font-extrabold tracking-wider font-montserrat transition-all duration-300 ${
                                    isRevealed
                                        ? 'text-white scale-100 opacity-100 drop-shadow-[0_0_14px_rgba(245,158,11,0.5)]'
                                        : isCurrent
                                        ? 'text-amber-400 scale-95 opacity-80 animate-pulse'
                                        : 'text-white/10 scale-90 opacity-20'
                                }`}
                            >
                                {char}
                            </span>
                        );
                    })}
                </div>

                {/* Sleek Minimal Progress Line */}
                <div className="w-48 md:w-64 mb-4">
                    <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                        <div
                            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 rounded-full transition-all duration-75 ease-out relative"
                            style={{
                                width: `${progress}%`,
                                boxShadow: '0 0 12px rgba(245, 158, 11, 0.8)',
                            }}
                        />
                    </div>
                </div>

                {/* Status Indicator & Percentage */}
                <div className="flex items-center justify-between w-48 md:w-64 text-[11px] font-mono text-slate-400">
                    <span className="tracking-wider text-slate-400/80 uppercase">
                        {getStatusText()}
                    </span>
                    <span className="text-amber-400 font-semibold">{progress}%</span>
                </div>
            </div>
        </div>
    );
}
