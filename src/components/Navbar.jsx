import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    const navItems = [
        { id: 'about', label: 'About Me' },
        { id: 'skills', label: 'Skills' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'projects', label: 'Projects' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'contact', label: 'Contact Me' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-black/95 backdrop-blur-xl shadow-2xl'
            : 'bg-black/50 backdrop-blur-sm'
            }`}>
            <div className="h-14 md:h-16 px-4 md:px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo/Name */}
                <button
                    onClick={() => scrollToSection('hero')}
                    className="group flex items-center gap-2 cursor-pointer"
                >
                    {/* Animated Initial */}
                    <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-white/30">
                        <span className="text-black font-bold text-lg md:text-xl font-montserrat">S</span>
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300"></div>
                    </div>

                    {/* Name Text */}
                    <div className="relative overflow-hidden">
                        <span className="text-white font-bold text-lg md:text-xl font-raleway tracking-wide group-hover:text-white transition-colors duration-300">
                            Sasindu
                        </span>
                        {/* Animated underline */}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white via-gray-300 to-white group-hover:w-full transition-all duration-500 ease-out"></span>
                    </div>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="relative px-3 xl:px-4 py-2 text-white/70 font-medium font-montserrat text-xs xl:text-sm uppercase tracking-wider hover:text-white transition-colors duration-300 group"
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button (Hamburger) */}
                <button
                    className="lg:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className={`w-7 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-7 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-7 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`lg:hidden absolute top-14 left-0 right-0 bg-black/95 backdrop-blur-xl transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="flex flex-col">
                    {navItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`py-4 text-white/80 font-medium font-montserrat text-sm uppercase tracking-wider hover:bg-white/10 transition-colors border-b border-white/10 ${index === navItems.length - 1 ? 'bg-white !text-black font-bold border-none' : ''
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
