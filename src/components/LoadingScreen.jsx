import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Speed up as we get closer to 100
                const increment = prev < 50 ? 3 : prev < 80 ? 5 : 8;
                return Math.min(prev + increment, 100);
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            // Small delay before hiding
            setTimeout(() => {
                setIsComplete(true);
                setTimeout(() => {
                    onComplete?.();
                }, 500);
            }, 300);
        }
    }, [progress, onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-[#0a1628] flex flex-col items-center justify-center transition-all duration-500 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/3 rounded-full blur-3xl"></div>
            </div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(245, 158, 11, 0.15) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            ></div>

            {/* Logo / Initials */}
            <div className="relative z-10 mb-12">
                <div className="relative">
                    {/* Animated ring */}
                    <div className="absolute inset-0 w-28 h-28 border-2 border-amber-500/20 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 w-28 h-28 border border-amber-500/10 rounded-full animate-pulse"></div>

                    {/* Main logo circle */}
                    <div className="w-28 h-28 bg-[#0f1f3d]/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-500/30 relative overflow-hidden">
                        {/* Rotating border effect */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(from 0deg, transparent, #f59e0b, transparent)`,
                                animation: 'spin 2s linear infinite',
                                opacity: 0.4,
                            }}
                        ></div>

                        {/* Initials */}
                        <span className="text-3xl font-bold text-white z-10 tracking-wider font-montserrat">
                            S<span className="text-amber-500">W</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Loading Text */}
            <div className="relative z-10 text-center mb-8">
                <h2 className="text-xl md:text-2xl font-light text-white/80 mb-2 tracking-widest font-montserrat">
                    LOADING
                </h2>
                <div className="flex items-center gap-1 justify-center">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative z-10 w-64 md:w-80">
                {/* Progress background */}
                <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 backdrop-blur-sm">
                    {/* Progress fill */}
                    <div
                        className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-full transition-all duration-100 ease-out relative"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent animate-shimmer"></div>
                    </div>
                </div>

                {/* Progress percentage */}
                <div className="mt-4 text-center">
                    <span className="text-amber-400 text-sm font-mono tracking-wider font-semibold">
                        {progress}%
                    </span>
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-500/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    ></div>
                ))}
            </div>

            {/* CSS Animations */}
            <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 0.7;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
