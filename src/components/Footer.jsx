import { FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaHeart } from 'react-icons/fa';
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
        { href: '#', icon: FaTwitter },
    ];

    return (
        <footer ref={footerRef} className="py-12 md:py-16 bg-zinc-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-zinc-950"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-16 md:h-32 bg-white/5 blur-3xl"></div>

            <div className={`container mx-auto px-4 md:px-6 lg:px-12 relative z-10 transition-all duration-700 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                {/* Back to Top */}
                <div className="flex justify-center mb-8 md:mb-12">
                    <button
                        onClick={scrollToTop}
                        className="group flex flex-col items-center gap-2 md:gap-3"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:-translate-y-1">
                            <HiArrowUp className="w-4 h-4 md:w-5 md:h-5 text-black" />
                        </div>
                        <span className="text-white/50 text-xs md:text-sm font-medium tracking-wider group-hover:text-white transition-colors">
                            BACK TO TOP
                        </span>
                    </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8 md:mb-12"></div>

                {/* Social Icons */}
                <div className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-12">
                    {socialLinks.map(({ href, icon: Icon }, index) => (
                        <a
                            key={index}
                            href={href || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-lg md:rounded-xl flex items-center justify-center border border-white/10 hover:border-white/40 hover:bg-white/10 transition-all duration-300 group ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                                }`}
                            style={{ transitionDelay: `${index * 100 + 300}ms` }}
                        >
                            <Icon className="w-4 h-4 md:w-5 md:h-5 text-white/50 group-hover:text-white transition-colors" />
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-white/40 text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2 flex-wrap">
                        © {currentYear} {profile?.name || 'Sasindu Wijewardana'}.
                        All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
