import React, { useState } from 'react';
import { USER_INFO } from '../data/portfolioData';

interface NavigationProps {
  onReplayIntro?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onReplayIntro }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navLinks = [
    { id: 'hero', number: '01', label: 'HOME', href: '#hero' },
    { id: 'about', number: '02', label: 'ABOUT', href: '#about' },
    { id: 'capabilities', number: '03', label: 'SKILLS', href: '#capabilities' },
    { id: 'work', number: '04', label: 'PROJECTS', href: '#work' },
    { id: 'contact', number: '05', label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Pinned Top Bar */}
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 md:py-4 bg-[#0d0e10]/85 backdrop-blur-md border-b border-white/5 transition-all">
        {/* Brand Block */}
        <a
          href="#hero"
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          {/* Monogram Badge */}
          <div className="w-8 h-8 rounded bg-white text-black font-serif-display font-bold flex items-center justify-center text-xs tracking-wider transition-transform group-hover:scale-105">
            {USER_INFO.monogram}
          </div>
          <div>
            <div className="font-display font-bold text-xs sm:text-sm tracking-wider text-white uppercase group-hover:text-neutral-300 transition-colors">
              {USER_INFO.shortName}
            </div>
            <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              DESIGNER / DEVELOPER
            </div>
          </div>
        </a>

        {/* Center Marquee Ribbon / Pill */}
        <div className="hidden lg:flex items-center overflow-hidden max-w-xs xl:max-w-md h-7 px-3 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono tracking-widest uppercase text-neutral-300">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
            <span>✦ AVAILABLE FOR WORK</span>
            <span>✦ CONTACT FOR INFO</span>
            <span>✦ AVAILABLE FOR WORK</span>
            <span>✦ CONTACT FOR INFO</span>
          </div>
        </div>

        {/* Right Action: Menu Toggle */}
        <div className="flex items-center gap-3">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              title="Replay visual preloader"
              className="hidden sm:inline-flex items-center text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            >
              INTRO ↺
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-mono tracking-widest uppercase transition-all cursor-pointer"
            aria-label="Toggle navigation directory"
          >
            <span>{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
            <span className="text-sm font-semibold">{isMenuOpen ? '✕' : '+'}</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 z-30 flex flex-col justify-between p-6 sm:p-12 md:p-16 bg-[#0a0b0d] text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        {/* Overlay Header */}
        <div className="pt-12 sm:pt-8 flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
          <span>DIRECTORY / PORTFOLIO 2026</span>
          <span className="hidden sm:inline">SELECT DESTINATION</span>
        </div>

        {/* Big Navigation Links */}
        <div className="flex flex-col gap-2 my-auto py-8">
          {navLinks.map((link) => {
            const isHovered = hoveredNav === link.id;
            return (
              <div
                key={link.id}
                onMouseEnter={() => setHoveredNav(link.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative group py-2"
              >
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="w-full flex items-center justify-between text-left transition-all"
                >
                  {/* Left Label */}
                  <div className="relative flex items-center gap-4">
                    <span
                      className={`font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight transition-all duration-300 ${
                        isHovered ? 'text-white translate-x-3' : 'text-neutral-300'
                      }`}
                    >
                      {link.label}
                    </span>

                    {/* Dynamic Marquee Ribbon that pops in on hover! */}
                    {isHovered && (
                      <div className="hidden md:flex items-center overflow-hidden h-12 px-4 rounded-full bg-white text-black text-sm font-bold tracking-widest uppercase shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="animate-marquee-fast flex items-center gap-6 whitespace-nowrap">
                          <span>✦ {link.label}</span>
                          <span>✦ {link.label}</span>
                          <span>✦ {link.label}</span>
                          <span>✦ {link.label}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Index Number */}
                  <span className="font-mono text-xs sm:text-sm text-neutral-500 tabular-nums">
                    {link.number}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Overlay Footer: Elsewhere Social Links */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono tracking-widest uppercase text-neutral-400">
          <div>
            <span className="text-white font-semibold mr-4">ELSEWHERE:</span>
            <div className="inline-flex flex-wrap gap-4 sm:gap-6 mt-2 sm:mt-0">
              <a
                href={USER_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href={USER_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={USER_INFO.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Twitter/X ↗
              </a>
              <a
                href={`mailto:${USER_INFO.email}`}
                className="hover:text-white transition-colors"
              >
                Email ↗
              </a>
            </div>
          </div>

          <div className="text-[11px] text-neutral-500">
            {USER_INFO.location}
          </div>
        </div>
      </div>
    </>
  );
};
