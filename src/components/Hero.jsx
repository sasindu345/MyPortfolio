import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaDownload } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

export default function Hero({ profile }) {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

    // Interactive Dynamic Grid Canvas with mouse curvature & wave physics
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

        let animFrameId;
        let time = 0;

        const render = () => {
            time += 0.02;
            ctx.clearRect(0, 0, width, height);

            const m = mouseRef.current;
            // Smooth mouse interpolation
            m.x += (m.targetX - m.x) * 0.1;
            m.y += (m.targetY - m.y) * 0.1;

            const gridSize = 52;
            const influenceRadius = 220;

            // Draw Dynamic Horizontal Grid Lines
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(245, 158, 11, 0.09)';
                ctx.lineWidth = 1;

                for (let x = 0; x <= width; x += 14) {
                    let curY = y + Math.sin(x * 0.004 + time) * 2;

                    if (m.active) {
                        const dist = Math.hypot(x - m.x, curY - m.y);
                        if (dist < influenceRadius) {
                            const force = 1 - dist / influenceRadius;
                            curY += (m.y - curY) * force * 0.38;
                        }
                    }

                    if (x === 0) ctx.moveTo(x, curY);
                    else ctx.lineTo(x, curY);
                }
                ctx.stroke();
            }

            // Draw Dynamic Vertical Grid Lines
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(245, 158, 11, 0.09)';
                ctx.lineWidth = 1;

                for (let y = 0; y <= height; y += 14) {
                    let curX = x + Math.cos(y * 0.004 + time) * 2;

                    if (m.active) {
                        const dist = Math.hypot(curX - m.x, y - m.y);
                        if (dist < influenceRadius) {
                            const force = 1 - dist / influenceRadius;
                            curX += (m.x - curX) * force * 0.38;
                        }
                    }

                    if (y === 0) ctx.moveTo(curX, y);
                    else ctx.lineTo(curX, y);
                }
                ctx.stroke();
            }

            // Glowing cursor node spotlight
            if (m.active && m.x > 0 && m.y > 0) {
                const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 250);
                glow.addColorStop(0, 'rgba(245, 158, 11, 0.16)');
                glow.addColorStop(0.5, 'rgba(245, 158, 11, 0.04)');
                glow.addColorStop(1, 'rgba(245, 158, 11, 0)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(m.x, m.y, 250, 0, Math.PI * 2);
                ctx.fill();
            }

            animFrameId = requestAnimationFrame(render);
        };

        animFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animFrameId) cancelAnimationFrame(animFrameId);
        };
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        mouseRef.current.targetX = clientX;
        mouseRef.current.targetY = clientY;
        mouseRef.current.active = true;

        setMousePos({
            x: ((e.clientX) / window.innerWidth) * 100,
            y: ((e.clientY) / window.innerHeight) * 100,
        });
    };

    const handleMouseLeave = () => {
        mouseRef.current.active = false;
    };

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToAchievements = () => {
        document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-screen overflow-hidden bg-[#070e1b]"
        >
            {/* Base Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#070f1d] to-[#040810]" />

            {/* Dynamic Mouse-Interactive Curving Grid Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-0 opacity-80"
            />

            {/* Dynamic Interactive Cursor Radial Spotlight */}
            <div
                className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
                style={{
                    background: `radial-gradient(750px circle at ${mousePos.x}% ${mousePos.y}%, rgba(245, 158, 11, 0.12), transparent 70%)`,
                }}
            />

            {/* Animated Ambient Light Orbs */}
            <div className="absolute top-[-10%] left-[-5%] w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-400/8 rounded-full blur-[120px] pointer-events-none" />

            {/* Profile Image - Desktop only */}
            <div className="hidden lg:flex absolute inset-0 justify-end items-center overflow-hidden pointer-events-none">
                {profile?.profileImage && (
                    <>
                        <img
                            src={profile.profileImage}
                            alt={profile.name || "Sasindu Wijewardana"}
                            className="h-[85%] w-auto object-contain object-bottom mr-[5%] opacity-95 relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        />
                        {/* Gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/60 to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628] z-10" />
                    </>
                )}
            </div>

            {/* Main Hero Content */}
            <div className="relative z-20 container mx-auto px-4 md:px-6 lg:px-12 min-h-screen flex items-center justify-center lg:justify-start">
                <div className="w-full lg:max-w-2xl">
                    {/* Left Content */}
                    <div className="pt-20 pb-12 lg:pt-0 lg:pb-0 text-center lg:text-left animate-fade-in">
                        {/* Profile Image - Mobile only (Enlarged Natural Portrait) */}
                        {profile?.profileImage && (
                            <div className="block lg:hidden mb-8 w-full flex justify-center">
                                <div className="relative w-64 sm:w-72 md:w-80 max-w-[85vw] flex justify-center items-end">
                                    {/* Ambient Backlight Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                                    
                                    {/* Main Enlarged Portrait */}
                                    <img
                                        src={profile.profileImage}
                                        alt={profile.name || "Sasindu Wijewardana"}
                                        className="relative z-10 w-full h-auto max-h-[360px] sm:max-h-[420px] object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.75)]"
                                    />

                                    {/* Soft bottom blend to section background */}
                                    <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#070e1b] to-transparent z-20 pointer-events-none" />
                                </div>
                            </div>
                        )}

                        <p className="text-amber-400 text-sm md:text-base font-bold font-montserrat mb-3 md:mb-4 tracking-widest uppercase inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                            Hi, I am
                        </p>

                        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-raleway mb-4 md:mb-6 leading-tight drop-shadow-2xl">
                            {profile?.name || 'Sasindu Wijewardana'}
                        </h1>

                        <p className="text-xl md:text-xl lg:text-2xl font-medium mb-6 md:mb-8">
                            <span className="text-white drop-shadow-md">
                                {profile?.title || 'Undergraduate | Full-Stack Developer'}
                            </span>
                            <span className="text-amber-500/80 font-bold"> / </span>
                            <span className="text-slate-300 font-normal">{profile?.subtitle || 'React • Node.js • Spring Boot'}</span>
                        </p>

                        <p className="hidden sm:block text-slate-300/80 text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed font-opensans">
                            {profile?.bio || 'Software engineering undergraduate at the University of Moratuwa. I specialize in building responsive, clean full-stack web applications and scalable cloud systems.'}
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 justify-center lg:justify-start mb-8">
                            {[
                                { href: profile?.social?.github, icon: FaGithub },
                                { href: profile?.social?.linkedin, icon: FaLinkedin },
                                { href: profile?.social?.facebook, icon: FaFacebook },
                            ].map(({ href, icon: Icon }, index) => (
                                <a
                                    key={index}
                                    href={href || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-12 h-12 md:w-14 md:h-14 bg-[#0f1f3d]/60 backdrop-blur-md rounded-xl flex items-center justify-center border border-slate-700/60 hover:bg-amber-500 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-300 group-hover:text-[#0a1628] transition-colors" />
                                </a>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {/* Download CV Button */}
                            <a
                                href={`${import.meta.env.BASE_URL}cv/Sasindu_Wijewardana_CV.pdf`}
                                download="Sasindu_Wijewardana_CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-6 py-3 md:px-8 md:py-4 bg-amber-500 text-black font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center gap-3 justify-center">
                                    <FaDownload className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-bounce" />
                                    <span className="text-sm md:text-base tracking-wide uppercase font-montserrat">Download CV</span>
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#0a1628]/10 to-transparent" />
                            </a>

                            {/* My Achievements Button */}
                            <button
                                onClick={scrollToAchievements}
                                className="group relative px-6 py-3 md:px-8 md:py-4 bg-[#0f1f3d]/40 text-slate-200 font-semibold rounded-xl border border-slate-600/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-amber-500/60 hover:text-amber-400 hover:shadow-lg hover:shadow-amber-500/15 hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center gap-3 justify-center">
                                    <span className="text-sm md:text-base tracking-wide uppercase font-montserrat">My Achievements</span>
                                </span>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-amber-500/20 rounded-full group-hover:w-32 group-hover:h-32 transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={scrollToAbout}
                className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer group z-20 focus:outline-none"
            >
                <span className="text-xs md:text-sm font-medium tracking-wider uppercase font-montserrat">Scroll Down</span>
                <HiArrowDown className="w-4 h-4 md:w-5 md:h-5 animate-bounce text-amber-500" />
            </button>
        </section>
    );
}
