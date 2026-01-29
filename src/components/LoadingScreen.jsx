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
            className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-all duration-500 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/3 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/3 rounded-full blur-3xl"></div>
            </div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            ></div>

            {/* Logo / Initials */}
            <div className="relative z-10 mb-12">
                <div className="relative">
                    {/* Animated ring */}
                    <div className="absolute inset-0 w-28 h-28 border-2 border-white/20 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 w-28 h-28 border border-white/10 rounded-full animate-pulse"></div>

                    {/* Main logo circle */}
                    <div className="w-28 h-28 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 relative overflow-hidden">
                        {/* Rotating border effect */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(from 0deg, transparent, white, transparent)`,
                                animation: 'spin 2s linear infinite',
                                opacity: 0.3,
                            }}
                        ></div>

                        {/* Initials */}
                        <span className="text-3xl font-bold text-white z-10">SW</span>
                    </div>
                </div>
            </div>

            {/* Loading Text */}
            <div className="relative z-10 text-center mb-8">
                <h2 className="text-xl md:text-2xl font-light text-white/80 mb-2 tracking-widest">
                    LOADING
                </h2>
                <div className="flex items-center gap-1 justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative z-10 w-64 md:w-80">
                {/* Progress background */}
                <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    {/* Progress fill */}
                    <div
                        className="h-full bg-gradient-to-r from-white/50 via-white to-white/50 rounded-full transition-all duration-100 ease-out relative"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                    </div>
                </div>

                {/* Progress percentage */}
                <div className="mt-4 text-center">
                    <span className="text-white/60 text-sm font-mono tracking-wider">
                        {progress}%
                    </span>
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
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
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
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
