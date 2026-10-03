import React, { useState, useEffect } from 'react';
import { USER_INFO } from '../data/portfolioData';
import AeroShards from './AeroShards';
import TechText from './TechText';
import StarBorder from './StarBorder';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [timeString, setTimeString] = useState('');
  const [isDay, setIsDay] = useState(true);
  const [hasGpuError, setHasGpuError] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientWidth, clientHeight } = document.documentElement;
      const x = (e.clientX / clientWidth - 0.5) * 20;
      const y = (e.clientY / clientHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const hourFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        hour12: false,
      });
      const hour = parseInt(hourFormatter.format(now), 10);
      setIsDay(hour >= 6 && hour < 18);

      setTimeString(timeFormatter.format(now) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-8 pt-28 pb-12 overflow-hidden bg-[#0c0d10] select-none"
    >
      {/* Interactive AeroShards WebGPU Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <AeroShards
          backgroundColor="#0c0d10"
          shardColor="#896ABD"
          accentColor="#A855F7"
          placement="full"
          flow="stream"
          material="chrome"
          detail="balanced"
          effect="none"
          scale={1.15}
          spread={0.9}
          depth={1.1}
          speed={0.95}
          spin={1}
          interaction="repel"
          density={1.3}
          shardSize={1.15}
          turbulence={0.75}
          glow={1.3}
          edgeSoftness={1.8}
          bloom={0.55}
          grain={0.04}
          chromaticAberration={0.006}
          interactionRadius={1.6}
          interactionStrength={0.7}
          rippleIntensity={1.2}
          holdToGather={true}
          className="w-full h-full"
          onError={(err) => {
            console.warn('AeroShards fallback active:', err.message);
            setHasGpuError(true);
          }}
        />

        {/* Fallback ambient visual field if browser environment lacks WebGPU */}
        {hasGpuError && (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-purple-900/30 via-violet-600/20 to-transparent blur-3xl animate-pulse" />
          </div>
        )}

        {/* Subtle vignette scrim to preserve typography contrast */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0c0d10]/35 to-[#0c0d10]/80 pointer-events-none" />
      </div>

      {/* Top Status Capsule */}
      <div className="relative z-10 mt-6 sm:mt-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] sm:text-xs font-mono tracking-[0.2em] text-neutral-300 uppercase shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>STATUS // AVAILABLE FOR CONTRACT</span>
          <span className="text-neutral-500">·</span>
          <span>ASSAM, INDIA</span>
        </div>
      </div>

      {/* Centerpiece Hero Headline with Interactive TechText */}
      <div
        className="relative z-10 my-auto text-center flex flex-col items-center w-full max-w-5xl px-2 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-mousePos.x * 0.25}px, ${-mousePos.y * 0.25}px, 0)`,
        }}
      >
        {/* Monogram / Category Kicker */}
        <div className="mb-2 sm:mb-4 inline-flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
          <span>PORTFOLIO</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>CREATIVE ENGINEER</span>
        </div>

        {/* Interactive TechText Display for UDDIPTA CHOUDHURY */}
        <div className="w-full flex flex-col items-center justify-center">
          {/* UDDIPTA interactive letter canvas */}
          <div className="w-full h-28 sm:h-36 md:h-44 lg:h-52 flex items-center justify-center">
            <TechText
              text="UDDIPTA"
              fontFamily="Syne, sans-serif"
              fontWeight={800}
              fontSize={140}
              letterSpacing={-0.03}
              color="#ffffff"
              accentColor="#a855f7"
              reach={190}
              softness={0.65}
              dashLength={5}
              dashGap={3}
              strokeWidth={1.8}
              lineStyle="dashed"
              reveal="letter"
              specks={18}
              selection={true}
              labels={true}
              draggable={true}
              sweep={true}
              speed={1}
              className="w-full h-full"
            />
          </div>

          {/* CHOUDHURY interactive letter canvas */}
          <div className="w-full h-24 sm:h-32 md:h-40 lg:h-44 -mt-3 sm:-mt-5 flex items-center justify-center">
            <TechText
              text="CHOUDHURY"
              fontFamily="Syne, sans-serif"
              fontWeight={800}
              fontSize={116}
              letterSpacing={-0.025}
              color="#e2e8f0"
              accentColor="#c084fc"
              reach={180}
              softness={0.65}
              dashLength={5}
              dashGap={3}
              strokeWidth={1.8}
              lineStyle="dashed"
              reveal="letter"
              specks={14}
              selection={true}
              labels={true}
              draggable={true}
              sweep={true}
              speed={0.9}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Subtitle statement */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed text-balance">
          Merging code, motion, and hand-drawn illustration into tactile digital experiences.
        </p>

        {/* Fast Action Buttons with StarBorder */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono tracking-widest uppercase">
          <StarBorder
            as="a"
            href="#work"
            color="#ffffff"
            backgroundColor="#ffffff"
            textColor="#000000"
            innerClassName="px-7 py-3.5 font-bold tracking-widest text-xs"
          >
            <span>EXPLORE ARCHIVE ↓</span>
          </StarBorder>

          <StarBorder
            as="a"
            href="#contact"
            color="#c084fc"
            backgroundColor="rgba(255, 255, 255, 0.05)"
            textColor="#ffffff"
            borderColor="rgba(255, 255, 255, 0.2)"
            innerClassName="px-7 py-3.5 font-bold tracking-widest text-xs"
          >
            <span>GET IN TOUCH ↗</span>
          </StarBorder>
        </div>
      </div>

      {/* Bottom Row: Location & 12-Hour Time with Day/Night Signal */}
      <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-400 border-t border-white/10 pt-4 px-2">
        <div>
          <span>LOCATION // GUWAHATI, INDIA</span>
        </div>

        {/* 12-Hour IST Clock with Sun/Moon Day/Night Signal */}
        <div className="flex items-center gap-3">
          {/* Day / Night Signal Badge */}
          {isDay ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] tracking-wider shadow-sm shadow-amber-400/10">
              <span className="text-xs">☀️</span>
              <span className="font-semibold">DAY</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[10px] tracking-wider shadow-sm shadow-purple-500/10">
              <span className="text-xs">🌙</span>
              <span className="font-semibold">NIGHT</span>
            </div>
          )}

          {/* 12-Hour Time with AM/PM */}
          <span className="tabular-nums text-neutral-200 font-medium">
            {timeString || '11:12:45 PM IST'}
          </span>
        </div>
      </div>
    </section>
  );
};
