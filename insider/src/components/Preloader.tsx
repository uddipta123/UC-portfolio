import React, { useEffect, useState } from 'react';
import { USER_INFO } from '../data/portfolioData';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 350);
          return 100;
        }
        // Rapid acceleration curve
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-12 bg-[#ececee] text-[#1a1b1e] transition-all duration-700 ease-in-out ${
        isExiting ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '25% 100%',
      }}
    >
      {/* Top Bar */}
      <div className="flex items-start justify-between w-full text-[11px] md:text-xs font-mono uppercase tracking-widest text-[#4b4d52]">
        <div className="font-semibold tracking-[0.2em]">{USER_INFO.name}</div>
        <div className="text-right tracking-[0.2em]">{USER_INFO.role}</div>
      </div>

      {/* Centerpiece Compass Emblem & Giant Logotype */}
      <div className="flex flex-col items-center justify-center my-auto text-center px-4">
        {/* Animated Compass Circle */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 mb-6 flex items-center justify-center">
          {/* Subtle Outer dashed/solid circle */}
          <div className="absolute inset-0 rounded-full border border-black/20" />
          
          {/* Crosshair lines */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/20 -translate-y-1/2" />
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-black/20 -translate-x-1/2" />
          
          {/* Orbiting Dot */}
          <div
            className="absolute w-2 h-2 rounded-full bg-black top-1 left-1/2 -translate-x-1/2 shadow-sm"
            style={{
              animation: 'spin 6s linear infinite',
              transformOrigin: '50% 3.5rem',
            }}
          />

          {/* Monogram in Center */}
          <div className="relative z-10 font-serif-display text-2xl md:text-3xl font-bold tracking-widest text-black flex items-center justify-center">
            <span>{USER_INFO.monogram}</span>
            <span className="absolute -top-1 w-full h-[1px] bg-black/40" />
          </div>
        </div>

        {/* Micro Kicker */}
        <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#6b6e76] uppercase mb-2">
          <span>DESIGN</span>
          <span>/</span>
          <span>ENGINEERING</span>
        </div>
        
        <div className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-[#71747d] uppercase mb-5">
          {USER_INFO.coordinates}
        </div>

        {/* Big Brutalist Brand Name */}
        <div className="font-display font-extrabold uppercase leading-[0.88] tracking-[-0.03em] text-[#121316] select-none">
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl">{USER_INFO.name.split(' ')[0]}</div>
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1">{USER_INFO.name.split(' ')[1]}</div>
        </div>

        {/* Descriptor */}
        <p className="mt-6 text-xs md:text-sm text-[#4b4f58] max-w-md font-normal leading-relaxed">
          Bringing ideas to life through thoughtful design and code.
        </p>
      </div>

      {/* Bottom Loading Progress & Footer Details */}
      <div className="w-full">
        {/* Progress Bar Container */}
        <div className="max-w-md mx-auto mb-8 w-full">
          <div className="flex justify-between items-center text-[10px] md:text-xs font-mono tracking-widest uppercase text-[#5a5c64] mb-2">
            <span>PREPARING EXPERIENCE</span>
            <span className="tabular-nums font-semibold">{progress}%</span>
          </div>
          
          <div className="relative w-full h-[2px] bg-black/15 overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-black transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="flex items-center justify-between text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-[#666973]">
          <div>INDEPENDENT DIGITAL STUDIO</div>
          <button
            onClick={() => {
              setIsExiting(true);
              setTimeout(onComplete, 700);
            }}
            className="hover:text-black transition-colors underline cursor-pointer"
          >
            SKIP INTRO →
          </button>
          <div>PORTFOLIO / 2026</div>
        </div>
      </div>
    </div>
  );
};
