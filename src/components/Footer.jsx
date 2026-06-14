import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Footer({ profile }) {
    const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation({ threshold: 0.1 });

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
        <footer ref={footerRef} className="pt-24 pb-12 bg-[#070f1d] relative mt-16 md:mt-24">
            {/* Curved top divider */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[99%] pointer-events-none z-10">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[90px] fill-[#070f1d]">
                    <path d="M0,120 C480,0 960,0 1440,120 L1440,120 L0,120 Z"></path>
                </svg>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-[#070f1d] pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-16 md:h-32 bg-amber-500/5 blur-3xl pointer-events-none"></div>

            <div className={`container mx-auto px-4 md:px-6 lg:px-12 relative z-10 transition-all duration-700 ${
                footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                
                {/* Footer main grid columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 text-left">
                    
                    {/* Column 1: Branding & Intro (5 cols) */}
                    <div className="md:col-span-5 space-y-4">
                        <h3 className="text-xl font-bold text-white tracking-wide font-raleway flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-black font-montserrat text-sm">S</span>
                            Sasindu Wijewardana
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-opensans">
                            Software Engineering Undergraduate at the University of Moratuwa. Eager to solve real-world problems through robust full-stack development and modern DevOps workflows.
                        </p>
                        {/* Status badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs rounded-full font-semibold font-montserrat">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            Open to 6-month IT Internships
                        </div>
                    </div>

                    {/* Column 2: Quick Links (3 cols) */}
                    <div className="md:col-span-3 space-y-4">
                        <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider font-montserrat">
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
                        <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider font-montserrat">
                            Get In Touch
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-slate-400">
                                <FaMapMarkerAlt className="w-4 h-4 text-amber-500 shrink-0" />
                                <span>Sri Lanka</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <FaEnvelope className="w-4 h-4 text-amber-500 shrink-0" />
                                <a href="mailto:jayamadusasindu5@gmail.com" className="hover:text-amber-400 transition-colors">
                                    jayamadusasindu5@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <FaGraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
                                <span>University of Moratuwa</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-500/15 to-transparent mb-8"></div>

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
                                className="w-10 h-10 bg-[#0f1f3d]/45 rounded-lg flex items-center justify-center border border-slate-500/15 hover:border-amber-500/30 hover:bg-amber-500 transition-all duration-300 group"
                            >
                                <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#0a1628] transition-colors duration-300" />
                            </a>
                        ))}
                    </div>

                    {/* Back to Top */}
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 focus:outline-none order-2 md:order-3"
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
        </footer>
    );
}
