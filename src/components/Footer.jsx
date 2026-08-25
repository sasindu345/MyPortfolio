import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Footer({ profile }) {
    const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation({ threshold: 0.1 });
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current.targetX = e.clientX - rect.left;
        mouseRef.current.targetY = e.clientY - rect.top;
        mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
        mouseRef.current.active = false;
    };

    // Interactive Dynamic Grid Canvas with mouse curvature & wave physics
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = canvas.parentElement.clientWidth);
        let height = (canvas.height = canvas.parentElement.clientHeight);

        const handleResize = () => {
            if (!canvas || !canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.clientWidth;
            height = canvas.height = canvas.parentElement.clientHeight;
        };

        window.addEventListener('resize', handleResize);

        let animFrameId;
        let time = 0;

        const render = () => {
            time += 0.02;
            ctx.clearRect(0, 0, width, height);

            const m = mouseRef.current;
            // Smooth mouse follow
            m.x += (m.targetX - m.x) * 0.1;
            m.y += (m.targetY - m.y) * 0.1;

            const gridSize = 48;
            const influenceRadius = 180;

            // Dynamic Horizontal Lines
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(245, 158, 11, 0.08)';
                ctx.lineWidth = 1;

                for (let x = 0; x <= width; x += 12) {
                    let curY = y + Math.sin(x * 0.005 + time) * 2;

                    if (m.active) {
                        const dist = Math.hypot(x - m.x, curY - m.y);
                        if (dist < influenceRadius) {
                            const force = 1 - dist / influenceRadius;
                            curY += (m.y - curY) * force * 0.35;
                        }
                    }

                    if (x === 0) ctx.moveTo(x, curY);
                    else ctx.lineTo(x, curY);
                }
                ctx.stroke();
            }

            // Dynamic Vertical Lines
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(245, 158, 11, 0.08)';
                ctx.lineWidth = 1;

                for (let y = 0; y <= height; y += 12) {
                    let curX = x + Math.cos(y * 0.005 + time) * 2;

                    if (m.active) {
                        const dist = Math.hypot(curX - m.x, y - m.y);
                        if (dist < influenceRadius) {
                            const force = 1 - dist / influenceRadius;
                            curX += (m.x - curX) * force * 0.35;
                        }
                    }

                    if (y === 0) ctx.moveTo(curX, y);
                    else ctx.lineTo(curX, y);
                }
                ctx.stroke();
            }

            // Spotlight glow under cursor
            if (m.active && m.x > 0 && m.y > 0) {
                const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 220);
                glow.addColorStop(0, 'rgba(245, 158, 11, 0.15)');
                glow.addColorStop(0.5, 'rgba(245, 158, 11, 0.04)');
                glow.addColorStop(1, 'rgba(245, 158, 11, 0)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(m.x, m.y, 220, 0, Math.PI * 2);
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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { href: profile?.social?.github, icon: FaGithub },
        { href: profile?.social?.linkedin, icon: FaLinkedin },
        { href: profile?.social?.facebook, icon: FaFacebook },
    ];

    const quickLinks = [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Timeline', href: '#timeline' },
        { label: 'Projects', href: '#projects' },
        { label: 'Achievements', href: '#achievements' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="relative mt-20 md:mt-28 select-none">
            {/* Highly Prominent Curved Top Wave Shape with Glowing Amber Edge */}
            <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mb-[2px] relative z-20">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-14 sm:h-20 md:h-28 block"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,120 C360,10 1080,10 1440,120 L1440,120 L0,120 Z"
                        fill="#050c18"
                    />
                    <path
                        d="M0,120 C360,10 1080,10 1440,120"
                        stroke="url(#footerGlowCrest)"
                        strokeWidth="3"
                    />
                    <defs>
                        <linearGradient id="footerGlowCrest" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(245, 158, 11, 0)" />
                            <stop offset="25%" stopColor="rgba(245, 158, 11, 0.4)" />
                            <stop offset="50%" stopColor="rgba(245, 158, 11, 1)" />
                            <stop offset="75%" stopColor="rgba(245, 158, 11, 0.4)" />
                            <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Footer Main Body */}
            <div
                ref={footerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="pt-10 pb-12 bg-[#050c18] relative overflow-hidden"
            >
                {/* Base Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#091527] via-[#070f1d] to-[#050c18] pointer-events-none" />

                {/* Dynamic Mouse-Interactive Curving Grid Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none z-0 opacity-85"
                />

                {/* Ambient Lighting Orbs */}
                <div className="absolute top-0 left-1/3 w-[500px] h-[350px] bg-amber-500/8 rounded-full blur-[140px] pointer-events-none animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

                {/* Main Content Container */}
                <div className={`container mx-auto px-4 md:px-6 lg:px-12 relative z-10 transition-all duration-700 ${
                    footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                    
                    {/* Footer main grid columns */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 text-left">
                        
                        {/* Column 1: Branding & Intro (5 cols) */}
                        <div className="md:col-span-5 space-y-4">
                            <h3 className="text-xl font-bold text-white tracking-wide font-raleway flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-black font-montserrat text-sm shadow-[0_0_12px_rgba(245,158,11,0.5)]">S</span>
                                Sasindu Wijewardana
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-opensans">
                                Software Engineering Undergraduate at the University of Moratuwa. Eager to solve real-world problems through robust full-stack development and modern DevOps workflows.
                            </p>
                            {/* Status badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-full font-semibold font-montserrat">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                                Open to 6-month IT Internships
                            </div>
                        </div>

                        {/* Column 2: Quick Links (3 cols) */}
                        <div className="md:col-span-3 space-y-4">
                            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-montserrat">
                                Navigation
                            </h4>
                            <ul className="grid grid-cols-2 gap-2 text-sm font-opensans">
                                {quickLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <a 
                                            href={link.href}
                                            className="text-slate-400 hover:text-amber-400 transition-colors duration-200 block py-1"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Contact & Info (4 cols) */}
                        <div className="md:col-span-4 space-y-4 text-sm font-opensans">
                            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-montserrat">
                                Get In Touch
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <FaMapMarkerAlt className="w-4 h-4 text-amber-400 shrink-0" />
                                    <span>Sri Lanka</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <FaEnvelope className="w-4 h-4 text-amber-400 shrink-0" />
                                    <a href="mailto:jayamadusasindu5@gmail.com" className="hover:text-amber-400 transition-colors">
                                        jayamadusasindu5@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <FaGraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                                    <span>University of Moratuwa</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-8"></div>

                    {/* Footer Bottom elements */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <p className="text-slate-500 text-xs md:text-sm font-opensans order-3 md:order-1">
                            © {currentYear} Sasindu Wijewardana. All Rights Reserved.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3 order-1 md:order-2">
                            {socialLinks.map(({ href, icon: Icon }, index) => (
                                <a
                                    key={index}
                                    href={href || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-[#0f1f3d]/60 backdrop-blur-md rounded-lg flex items-center justify-center border border-slate-700/60 hover:border-amber-500 hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 group"
                                >
                                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#0a1628] transition-colors duration-300" />
                                </a>
                            ))}
                        </div>

                        {/* Back to Top */}
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-2 focus:outline-none order-2 md:order-3 cursor-pointer"
                        >
                            <span className="text-slate-400 text-xs font-bold tracking-wider group-hover:text-amber-400 transition-colors font-montserrat">
                                BACK TO TOP
                            </span>
                            <div className="w-8 h-8 bg-amber-500 hover:bg-amber-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-amber-500/20 group-hover:-translate-y-1">
                                <HiArrowUp className="w-4 h-4 text-black" />
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
}
