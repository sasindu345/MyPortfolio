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
            ? 'bg-[#070f1d]/95 backdrop-blur-xl shadow-2xl border-b border-slate-800/50'
            : 'bg-[#0a1628]/60 backdrop-blur-md'
            }`}>
            <div className="h-14 md:h-16 px-4 md:px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo/Name */}
                <button
                    onClick={() => scrollToSection('hero')}
                    className="group flex items-center gap-2 cursor-pointer animate-fade-in"
                >
                    {/* Animated Initial */}
                    <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-lg bg-amber-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md group-hover:shadow-amber-500/30">
                        <span className="text-[#0a1628] font-bold text-lg md:text-xl font-montserrat">S</span>
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-lg bg-amber-400 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"></div>
                    </div>

                    {/* Name Text */}
                    <div className="relative overflow-hidden">
                        <span className="text-white font-bold text-lg md:text-xl font-raleway tracking-wide group-hover:text-amber-400 transition-colors duration-300">
                            Sasindu
                        </span>
                        {/* Animated underline */}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 group-hover:w-full transition-all duration-500 ease-out"></span>
                    </div>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="relative px-3 xl:px-4 py-2 text-slate-300 font-medium font-montserrat text-xs xl:text-sm uppercase tracking-wider hover:text-amber-400 transition-colors duration-300 group"
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button (Hamburger) */}
                <button
                    className="lg:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`w-7 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2 bg-amber-500' : ''}`}></span>
                    <span className={`w-7 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-7 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-amber-500' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`lg:hidden absolute top-14 left-0 right-0 bg-[#070f1d]/98 backdrop-blur-2xl transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[400px] opacity-100 border-b border-slate-800' : 'max-h-0 opacity-0'
                }`}>
                <div className="flex flex-col py-2">
                    {navItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`py-3.5 px-6 text-left text-slate-300 font-medium font-montserrat text-sm uppercase tracking-wider hover:bg-[#0f1f3d]/50 hover:text-amber-400 transition-colors border-b border-slate-800/40 ${index === navItems.length - 1 ? 'bg-amber-500 !text-black font-bold border-none mx-6 my-2 rounded-lg text-center py-2.5 shadow-md shadow-amber-500/20 hover:bg-amber-400 hover:text-black' : ''
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
