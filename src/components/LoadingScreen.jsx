import { useState, useEffect, useRef, useCallback } from 'react';

export default function LoadingScreen({ onComplete }) {
    const fullName = "Sasindu Wijewardana";
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const canvasRef = useRef(null);
    const progressRef = useRef(0);
    const targetProgressRef = useRef(0);
    const lastPosRef = useRef({ x: 0, y: 0, time: Date.now() });
    const animFrameRef = useRef(null);
    const isFinishedRef = useRef(false);

    // Mouse & wave particle physics state
    const mouseRef = useRef({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
        targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        targetY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
        trail: [],
        speed: 0,
    });

    // Interactive canvas wave & curving animation
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

            // Clear with slight trail for motion fluidity
            ctx.clearRect(0, 0, width, height);

            const m = mouseRef.current;
            // Smooth mouse follow (lerp)
            m.x += (m.targetX - m.x) * 0.08;
            m.y += (m.targetY - m.y) * 0.08;

            // Draw organic curving ribbons reacting to cursor
            curves.forEach((c) => {
                ctx.beginPath();
                ctx.lineWidth = c.width;
                ctx.strokeStyle = c.color;

                const step = 12;
                for (let x = 0; x <= width + step; x += step) {
                    // Base sinusoidal wave
                    let y =
                        c.baseY +
                        Math.sin(x * c.wavelength + animationTime * c.speed + c.phase) *
                            c.amplitude;

                    // Mouse curving magnetic deflection
                    const dx = x - m.x;
                    const dy = y - m.y;
                    const dist = Math.hypot(dx, dy);
                    const influenceRadius = 260;

                    if (dist < influenceRadius) {
                        const force = Math.cos((dist / influenceRadius) * (Math.PI / 2));
                        // Push/pull curve smoothly towards mouse movement
                        y += (m.y - y) * force * 0.45;
                    }

                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            });

            // Draw smooth fluid cursor ribbon / curve trail
            const trail = m.trail;
            if (trail.length > 2) {
                ctx.beginPath();
                ctx.moveTo(trail[0].x, trail[0].y);

                for (let i = 1; i < trail.length - 1; i++) {
                    const xc = (trail[i].x + trail[i + 1].x) / 2;
                    const yc = (trail[i].y + trail[i + 1].y) / 2;
                    ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
                }

                ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.stroke();
            }

            // Decay trail points
            for (let i = 0; i < trail.length; i++) {
                trail[i].age += 1;
            }
            m.trail = trail.filter((pt) => pt.age < 22);

            // Ambient cursor glow spotlight
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

    // Smooth progress interpolation (adjusted for slightly slower, deliberate pacing)
    useEffect(() => {
        const loop = () => {
            if (isFinishedRef.current) return;

            const diff = targetProgressRef.current - progressRef.current;
            if (Math.abs(diff) > 0.02) {
                progressRef.current += diff * 0.08; // Gentle smooth transition
            } else {
                progressRef.current = targetProgressRef.current;
            }

            const clamped = Math.min(100, Math.max(0, Math.round(progressRef.current)));
            setProgress(clamped);

            if (clamped >= 100 && !isFinishedRef.current) {
                isFinishedRef.current = true;
                setIsExiting(true);
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(() => {
                        onComplete?.();
                    }, 400);
                }, 800);
                return;
            }

            animFrameRef.current = requestAnimationFrame(loop);
        };

        animFrameRef.current = requestAnimationFrame(loop);
        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [onComplete]);

    // Handle mouse movement (calibrated for gradual, enjoyable pacing)
    const handleMouseMove = useCallback((e) => {
        if (isFinishedRef.current) return;

        const now = Date.now();
        const prev = lastPosRef.current;
        const dx = e.clientX - prev.x;
        const dy = e.clientY - prev.y;
        const dist = Math.hypot(dx, dy);

        // Update mouse positions for background curving ribbon canvas
        mouseRef.current.targetX = e.clientX;
        mouseRef.current.targetY = e.clientY;
        mouseRef.current.trail.push({ x: e.clientX, y: e.clientY, age: 0 });
        if (mouseRef.current.trail.length > 25) {
            mouseRef.current.trail.shift();
        }

        // Add progress proportionally (slower pacing: ~0.08 per pixel)
        const gain = dist * 0.075;
        targetProgressRef.current = Math.min(100, targetProgressRef.current + gain);
        lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };
    }, []);

    // Handle wheel / scroll (calibrated)
    const handleWheel = useCallback((e) => {
        if (isFinishedRef.current) return;
        const delta = Math.abs(e.deltaY) + Math.abs(e.deltaX);
        const gain = Math.max(0.6, delta * 0.06);
        targetProgressRef.current = Math.min(100, targetProgressRef.current + gain);
    }, []);

    // Handle touch move (mobile)
    const handleTouchMove = useCallback((e) => {
        if (isFinishedRef.current || !e.touches[0]) return;
        const touch = e.touches[0];
        const prev = lastPosRef.current;
        const dx = touch.clientX - prev.x;
        const dy = touch.clientY - prev.y;
        const dist = Math.hypot(dx, dy);

        mouseRef.current.targetX = touch.clientX;
        mouseRef.current.targetY = touch.clientY;
        mouseRef.current.trail.push({ x: touch.clientX, y: touch.clientY, age: 0 });

        const gain = Math.max(0.8, dist * 0.09);
        targetProgressRef.current = Math.min(100, targetProgressRef.current + gain);
        lastPosRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    }, []);

    // Handle click to accelerate gently
    const handleClick = useCallback(() => {
        if (isFinishedRef.current) return;
        targetProgressRef.current = Math.min(100, targetProgressRef.current + 15);
    }, []);

    // Event listeners & very subtle idle trickle
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('click', handleClick);

        // Very slow passive trickle so the user takes their time interacting
        const timer = setInterval(() => {
            if (!isFinishedRef.current) {
                targetProgressRef.current = Math.min(100, targetProgressRef.current + 0.35);
            }
        }, 150);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('click', handleClick);
            clearInterval(timer);
        };
    }, [handleMouseMove, handleWheel, handleTouchMove, handleClick]);

    // Calculate how many characters of the name to reveal
    const revealedCharsCount = Math.floor((progress / 100) * fullName.length);

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-[#070d18] flex flex-col items-center justify-center select-none transition-all duration-700 overflow-hidden ${
                isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            {/* Background Canvas with Smooth Curving Waves & Magnetic Ribbon Motion */}
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

            {/* Main Content Area - Unaffected by background motion */}
            <div
                className={`relative z-10 flex flex-col items-center max-w-xl px-6 transition-all duration-700 ${
                    isExiting ? 'scale-105 opacity-90' : 'scale-100'
                }`}
                onClick={handleClick}
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
                            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 rounded-full transition-all duration-150 ease-out relative"
                            style={{
                                width: `${progress}%`,
                                boxShadow: '0 0 12px rgba(245, 158, 11, 0.8)',
                            }}
                        />
                    </div>
                </div>

                {/* Status Indicator & Percentage */}
                <div className="flex items-center justify-between w-48 md:w-64 text-[11px] font-mono text-slate-400">
                    <span className="tracking-wider text-slate-400/80">
                        {progress < 100 ? 'EXPLORE TO ENTER' : 'WELCOME'}
                    </span>
                    <span className="text-amber-400 font-semibold">{progress}%</span>
                </div>
            </div>
        </div>
    );
}
