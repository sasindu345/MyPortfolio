import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Footer({ profile }) {
    const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation({ threshold: 0.3 });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { href: profile?.social?.github, icon: FaGithub },
        { href: profile?.social?.linkedin, icon: FaLinkedin },
        { href: profile?.social?.facebook, icon: FaFacebook },
    ];

    return (
        <footer ref={footerRef} className="py-12 md:py-16 bg-[#070f1d] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-[#070f1d]"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-16 md:h-32 bg-amber-500/5 blur-3xl"></div>

            <div className={`container mx-auto px-4 md:px-6 lg:px-12 relative z-10 transition-all duration-700 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                {/* Back to Top */}
                <div className="flex justify-center mb-8 md:mb-12">
                    <button
                        onClick={scrollToTop}
                        className="group flex flex-col items-center gap-2 md:gap-3 focus:outline-none"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500 hover:bg-amber-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-amber-500/20 group-hover:-translate-y-1">
                            <HiArrowUp className="w-4 h-4 md:w-5 md:h-5 text-black" />
                        </div>
                        <span className="text-slate-400 text-xs md:text-sm font-bold tracking-wider group-hover:text-amber-400 transition-colors font-montserrat">
                            BACK TO TOP
                        </span>
                    </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-500/15 to-transparent mb-8 md:mb-12"></div>

                {/* Social Icons */}
                <div className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-12">
                    {socialLinks.map(({ href, icon: Icon }, index) => (
                        <a
                            key={index}
                            href={href || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-10 h-10 md:w-12 md:h-12 bg-[#0f1f3d]/45 rounded-lg md:rounded-xl flex items-center justify-center border border-slate-500/15 hover:border-amber-500/30 hover:bg-amber-500 transition-all duration-300 group ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                                }`}
                            style={{ transitionDelay: `${index * 100 + 300}ms` }}
                        >
                            <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-[#0a1628] transition-colors duration-300" />
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-slate-400/50 text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2 flex-wrap font-opensans">
                        © {currentYear} {profile?.name || 'Sasindu Wijewardana'}.
                        All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
