import React, { useEffect, useState } from 'react';
import './Preloader.css';
import LatticeLoader from './LatticeLoader';
import MaskedHeading from './MaskedHeading';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'working' | 'done'>('working');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 4.5s load duration as requested (4-5 sec)
    const TOTAL_DURATION_MS = 4500;
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / TOTAL_DURATION_MS) * 100));
      setProgress(currentProgress);

      if (elapsed >= TOTAL_DURATION_MS) {
        clearInterval(interval);
        setProgress(100);
        setStatus('done');
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 750);
        }, 500);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setStatus('done');
    setIsExiting(true);
    setTimeout(onComplete, 750);
  };

  return (
    <aside
      aria-label="System Loading Screen"
      className={`premium-preloader ${isExiting ? 'premium-preloader--exit' : ''}`}
    >
      {/* Atmosphere Layers */}
      <div className="preloader-noise" />
      <div className="preloader-grid" />
      <div className="preloader-vignette" />
      <div className="preloader-reveal" />

      {/* Top Header */}
      <header className="preloader-top">
        <div className="preloader-brand">
          <div className="preloader-live-dot" />
          <span>UDDIPTA CHOUDHURY</span>
        </div>
        <div className="preloader-top-right">
          <span>INITIALIZING SYSTEM</span>
          <span>26°08' N 91°46' E</span>
        </div>
      </header>

      {/* Centerpiece Monogram System & Title */}
      <div className="preloader-center">
        {/* Monogram System */}
        <div className="preloader-system">
          <div className="preloader-orbit preloader-orbit--one" />
          <div className="preloader-orbit preloader-orbit--two" />
          <div className="preloader-crosshair preloader-crosshair--horizontal" />
          <div className="preloader-crosshair preloader-crosshair--vertical" />
          <div className="preloader-scan" />
          <div className="preloader-orbit-dot preloader-orbit-dot--one" />
          <div className="preloader-orbit-dot preloader-orbit-dot--two" />
          <div className="preloader-monogram">
            <span>UC</span>
            <i />
          </div>
        </div>

        {/* Kicker */}
        <div className="preloader-kicker">
          <span>CREATIVE DEVELOPER</span>
          <b>//</b>
          <span>SYSTEM ARCHITECT</span>
        </div>

        {/* Cinematic Masked Brand Display Title for UDDIPTA CHOUDHURY */}
        <div className="w-full max-w-5xl px-4 my-2 flex justify-center">
          <MaskedHeading
            text="UDDIPTA CHOUDHURY"
            tag="h1"
            mediaType="image"
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            fillScale={1.35}
            parallax={25}
            drift={16}
            brightness={1.15}
            saturation={1.3}
            reveal="rise"
            duration={1.2}
            stagger={0.12}
            trigger="view"
            align="center"
            weight={800}
            tracking={-0.02}
            textScale={0.068}
            className="font-display uppercase text-white drop-shadow-2xl"
          />
        </div>

        {/* Status Row */}
        <div className="preloader-status-row">
          <div className="preloader-status-line" />
          <span>LOADING CORE ASSETS & SHADERS</span>
          <div className="preloader-status-line" />
        </div>
      </div>

      {/* Bottom Progress & Footer */}
      <div className="preloader-bottom">
        {/* Lattice Loader instead of line bar */}
        <div className="flex items-center justify-between py-2.5 border-y border-white/10 my-2">
          <LatticeLoader
            label="INITIALIZING CORE ASSETS"
            doneLabel="SYSTEMS FULLY LOADED IN"
            status={status}
            pattern="orbit"
            grid={3}
            shape="round"
            color="#b18cff"
            doneColor="#22c55e"
            cellSize={6}
            gap={2.5}
            fontSize={10}
            glow={true}
            glowColor="#8b5cf6"
            showTimer={true}
            className="tracking-wider uppercase text-neutral-300"
          />

          <span className="preloader-percent tabular-nums font-mono text-xs text-white">
            {progress}%
          </span>
        </div>

        {/* Footer */}
        <footer className="preloader-footer">
          <span>EST. 2026 // GUWAHATI, INDIA</span>
          <button type="button" onClick={handleSkip}>
            SKIP SEQUENCE <span>↗</span>
          </button>
          <span>ALL SYSTEMS OPERATIONAL</span>
        </footer>
      </div>
    </aside>
  );
};

