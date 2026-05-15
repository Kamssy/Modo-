import { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a0a0e] flex items-center justify-center overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(103,6,38,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(var(--color-secondary) 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
        {/* Logo Container - Matching Dashboard Style */}
        <div className="mb-12 animate-fade-up">
          <div className="relative w-24 h-24 bg-primary rounded-lg flex items-center justify-center shadow-float ring-1 ring-white/10 group">
            <span className="font-display text-white text-5xl relative z-10 select-none">
              M
            </span>
            {/* The signature dot from the dashboard logo */}
            <div className="absolute -top-3.5 -right-3.5 w-10 h-10 bg-secondary rounded-full shadow-lg border-[6px] border-[#1a0a0e]" />
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="mb-4 text-center" style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}>
          <h1 className="font-display text-5xl text-white leading-tight tracking-tight mb-2">
            Modo
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-6 bg-secondary/30" />
            <p className="font-body text-secondary text-[10px] tracking-[0.4em] uppercase font-bold">
              Personal Finance
            </p>
            <div className="h-px w-6 bg-secondary/30" />
          </div>
        </div>

        {/* Tagline */}
        <p 
          className="text-white/50 text-center text-sm max-w-xs mb-16 font-body leading-relaxed font-medium"
          style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' }}
        >
          Master your money with elegance and precision.
        </p>

        {/* Loading Bar Container */}
        <div className="w-full max-w-[260px] relative" style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' }}>
          <div className="h-[3px] bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-primary-mid via-secondary to-secondary-light rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(186,215,151,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Status Text */}
          <div className="flex justify-between items-center mt-5 px-1">
            <span className="text-white/30 text-[9px] font-bold tracking-[0.2em] uppercase animate-pulse">
              {progress < 40 ? 'Initializing System' : progress < 80 ? 'Syncing Vault' : 'Securing Session'}
            </span>
            <span className="text-secondary/80 text-[11px] font-mono font-bold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="absolute bottom-10 left-0 right-0 text-center opacity-30"
           style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s both' }}>
        <p className="text-white text-[9px] tracking-[0.25em] uppercase font-bold">
          © 2026 Modo
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1) translate(0, 0);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.15) translate(2%, 2%);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 10s infinite ease-in-out;
        }

        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;