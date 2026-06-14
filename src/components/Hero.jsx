import { FaGithub, FaLinkedin, FaFacebook, FaDownload } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

export default function Hero({ profile }) {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToAchievements = () => {
        document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen overflow-hidden bg-[#0a1628]">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#070f1d] to-[#0a1628]"></div>

            {/* Profile Image - Top on mobile, right-aligned on desktop */}
            <div className="absolute inset-0 flex justify-center lg:justify-end items-start lg:items-center overflow-hidden">
                {profile?.profileImage && (
                    <>
                        <img
                            src={profile.profileImage}
                            alt=""
                            className="h-[45%] sm:h-[50%] md:h-[55%] lg:h-[85%] w-auto max-w-[90%] lg:max-w-full object-contain object-top lg:object-bottom mt-16 lg:mt-0 lg:mr-[5%] opacity-90 relative z-10"
                        />
                        {/* Gradient overlays matching Navy Base instead of Black */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/70 via-transparent to-[#0a1628]/70 lg:from-[#0a1628] lg:via-[#0a1628]/70 lg:to-transparent z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-transparent lg:from-[#0a1628] lg:via-transparent lg:to-transparent z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628] lg:from-[#0a1628]/60 lg:via-transparent lg:to-transparent z-10"></div>
                    </>
                )}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(245, 158, 11, 0.1) 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>

            {/* Floating Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 md:px-6 lg:px-12 min-h-screen flex items-center">
                <div className="w-full lg:max-w-2xl">
                    {/* Left Content */}
                    <div className="pt-24 pb-20 lg:pt-0 lg:pb-0 text-center lg:text-left animate-fade-in">
                        <p className="text-amber-500 text-sm md:text-base font-bold font-montserrat mb-3 md:mb-4 tracking-widest uppercase">
                            Hi, I am
                        </p>

                        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-raleway mb-4 md:mb-6 leading-tight drop-shadow-2xl">
                            {profile?.name || 'Sasindu Wijewardana'}
                        </h1>

                        <p className="text-xl md:text-xl lg:text-2xl font-medium mb-6 md:mb-8">
                            <span className="text-white drop-shadow-md">
                                {profile?.title || 'Undergraduate | Full-Stack Developer'}
                            </span>
                            <span className="text-amber-500/60 font-bold"> / </span>
                            <span className="text-slate-300">{profile?.subtitle || 'React • Node.js • Spring Boot'}</span>
                        </p>

                        <p className="hidden sm:block text-slate-300/80 text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed font-opensans">
                            {profile?.bio || 'Software engineering undergraduate at the University of Moratuwa. I specialize in building responsive, clean full-stack web applications.'}
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
                                    className="group relative w-12 h-12 md:w-14 md:h-14 bg-[#0f1f3d]/40 backdrop-blur-md rounded-xl flex items-center justify-center border border-slate-500/20 hover:bg-amber-500 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-300 group-hover:text-[#0a1628] transition-colors" />
                                </a>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {/* Download CV Button */}
                            <a
                                href="/cv/resume.pdf"
                                download
                                className="group relative px-6 py-3 md:px-8 md:py-4 bg-amber-500 text-black font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105"
                            >
                                {/* Animated background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                {/* Button content */}
                                <span className="relative flex items-center gap-3 justify-center">
                                    <FaDownload className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-bounce" />
                                    <span className="text-sm md:text-base tracking-wide uppercase font-montserrat">Download CV</span>
                                </span>

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#0a1628]/10 to-transparent"></div>
                            </a>

                            {/* My Achievements Button */}
                            <button
                                onClick={scrollToAchievements}
                                className="group relative px-6 py-3 md:px-8 md:py-4 bg-[#0f1f3d]/20 text-slate-200 font-semibold rounded-xl border border-slate-500/30 overflow-hidden transition-all duration-300 hover:border-amber-500/50 hover:text-amber-400 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-105"
                            >
                                {/* Animated gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Button content */}
                                <span className="relative flex items-center gap-3 justify-center">
                                    <span className="text-sm md:text-base tracking-wide uppercase font-montserrat">My Achievements</span>
                                </span>

                                {/* Glow effect on hover */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-amber-500/20 rounded-full group-hover:w-32 group-hover:h-32 transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl"></div>
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
