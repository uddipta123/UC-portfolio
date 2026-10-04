import React, { useState } from 'react';
import { DISCIPLINES } from '../data/portfolioData';

export const CapabilitiesSection: React.FC = () => {
  const [activeDisciplineId, setActiveDisciplineId] = useState(DISCIPLINES[0].id);
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(DISCIPLINES[0].skills[0].id);

  const activeDiscipline =
    DISCIPLINES.find((d) => d.id === activeDisciplineId) || DISCIPLINES[0];

  return (
    <section id="capabilities" className="relative w-full py-24 px-4 sm:px-8 border-t border-white/10 bg-[#0b0c0e]">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between pb-12 border-b border-white/10 text-xs font-mono tracking-[0.25em] uppercase text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">03 / CAPABILITIES</span>
        </div>
        <div className="text-neutral-500">
          <span>SKILLS & PRACTICE</span>
        </div>
      </div>

      {/* Main Headline & Intro */}
      <div className="max-w-7xl mx-auto pt-16">
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
          A toolkit for ideas that move.
        </h2>
        <p className="mt-4 text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          From interface craft to native development and systems fundamentals, explore the disciplines behind my work.
        </p>
      </div>

      {/* 2-Column Disciplines & Interactive Skills Explorer */}
      <div className="max-w-7xl mx-auto pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Discipline Selectors */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-2 flex items-center gap-2">
            <span>⎔</span>
            <span>CHOOSE A DISCIPLINE</span>
          </div>

          {DISCIPLINES.map((discipline) => {
            const isActive = discipline.id === activeDisciplineId;
            return (
              <button
                key={discipline.id}
                onClick={() => {
                  setActiveDisciplineId(discipline.id);
                  setExpandedSkillId(discipline.skills[0]?.id || null);
                }}
                className={`text-left p-5 rounded-xl border transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-[#181a20] border-white/25 shadow-xl'
                    : 'bg-[#101115] border-white/5 hover:border-white/15 hover:bg-[#14151a]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase mb-1.5">
                  <span className={isActive ? 'text-white font-semibold' : 'text-neutral-400'}>
                    {discipline.code}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isActive ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-transparent'
                    }`}
                  />
                </div>
                <div
                  className={`font-display text-lg sm:text-xl font-bold transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                  }`}
                >
                  {discipline.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Discipline Breakdown & Skills Meter Cards */}
        <div className="lg:col-span-7 bg-[#121419] rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Discipline Description */}
          <div className="border-b border-white/10 pb-6 mb-8">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              {activeDiscipline.title}
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              {activeDiscipline.description}
            </p>
          </div>

          {/* Skill List with Meter Bars */}
          <div className="flex flex-col gap-4">
            {activeDiscipline.skills.map((skill) => {
              const isExpanded = expandedSkillId === skill.id;

              return (
                <div
                  key={skill.id}
                  onClick={() => setExpandedSkillId(isExpanded ? null : skill.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isExpanded
                      ? 'bg-[#181a22] border-white/20 shadow-md'
                      : 'bg-[#14151b] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 text-xs">⌖</span>
                      <h4 className="font-display font-semibold text-base sm:text-lg text-white">
                        {skill.title}
                      </h4>
                    </div>

                    {/* Meter Level Indicators */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                        {skill.level}
                      </span>
                      {/* 5 blocks visual meter */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((bar) => (
                          <div
                            key={bar}
                            className={`w-3.5 h-1.5 rounded-xs transition-colors ${
                              bar <= skill.rating
                                ? 'bg-cyan-400'
                                : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Skill Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-white/10 text-xs sm:text-sm text-neutral-300 leading-relaxed font-mono animate-in fade-in slide-in-from-top-1 duration-200">
                      {skill.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
