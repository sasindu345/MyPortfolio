import { FaGithub, FaLinkedin, FaFacebook, FaDownload, FaTrophy } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

export default function Hero({ profile }) {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToAchievements = () => {
        document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen overflow-hidden bg-black">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900"></div>

            {/* Profile Image - Positioned on right side */}
            <div className="absolute inset-0 flex justify-end items-center overflow-hidden">
                {profile?.profileImage && (
                    <>
                        <img
                            src={profile.profileImage}
                            alt=""
                            className="h-[90%] lg:h-[85%] w-auto object-contain object-bottom mr-[-5%] lg:mr-[5%] opacity-90"
                        />
                        {/* Gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
                    </>
                )}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/3 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>

            {/* Floating Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12 min-h-screen flex items-center">
                <div className="w-full lg:max-w-2xl">
                    {/* Left Content */}
                    <div className="pt-24 pb-20 lg:pt-0 lg:pb-0 text-center lg:text-left">


                        <p className="text-white/70 text-lg md:text-xl font-semibold font-raleway mb-3 md:mb-4 tracking-wider">
                            Hi, I am
                        </p>

                        <h1 className="text-white text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold font-raleway mb-4 md:mb-6 leading-tight drop-shadow-2xl">
                            {profile?.name || 'Sasindu Wijewardana'}
                        </h1>

                        <p className="text-xl md:text-xl lg:text-2xl font-medium mb-6 md:mb-8">
                            <span className="text-white drop-shadow-md">
                                {profile?.title || 'Full-Stack Developer'}
                            </span>
                            <span className="text-white/50"> / </span>
                            <span className="text-white/70">{profile?.subtitle?.split('|')[0]?.trim() || 'React Specialist'}</span>
                        </p>

                        <p className="hidden sm:block text-white/60 text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed">
                            {profile?.bio?.substring(0, 120) || 'Crafting digital experiences with modern technologies and clean code.'}...
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
                                    className="group relative w-12 h-12 md:w-14 md:h-14 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 hover:bg-white hover:border-white transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
                                </a>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {/* Download CV Button */}
                            <a
                                href="/cv/resume.pdf"
                                download
                                className="group relative px-6 py-3 md:px-8 md:py-4 bg-white text-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:scale-105"
                            >
                                {/* Animated background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                {/* Button content */}
                                <span className="relative flex items-center gap-3 justify-center">
                                    <FaDownload className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-bounce" />
                                    <span className="text-sm md:text-base tracking-wide">Download My CV</span>
                                </span>

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
                            </a>

                            {/* My Achievements Button */}
                            <button
                                onClick={scrollToAchievements}
                                className="group relative px-6 py-3 md:px-8 md:py-4 bg-transparent text-white font-semibold rounded-xl border border-white/30 overflow-hidden transition-all duration-300 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10 hover:scale-105"
                            >
                                {/* Animated gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Button content */}
                                <span className="relative flex items-center gap-3 justify-center">

                                    <span className="text-sm md:text-base tracking-wide group-hover:text-yellow-50">My Achievements</span>
                                </span>

                                {/* Sparkle particles on hover */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-yellow-400/20 rounded-full group-hover:w-32 group-hover:h-32 transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={scrollToAbout}
                className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group"
            >
                <span className="text-xs md:text-sm font-medium tracking-wider">Scroll Down</span>
                <HiArrowDown className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
            </button>
        </section>
    );
}
