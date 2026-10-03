import React, { useState, useRef } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'all' | 'originals' | 'fresh'>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - scrollOffset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newOffset = e.clientX - startX;
    setScrollOffset(newOffset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section id="work" className="relative w-full py-24 px-4 sm:px-8 border-t border-white/10 bg-[#0a0b0d] overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between pb-12 border-b border-white/10 gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] uppercase text-neutral-400 mb-2">
            <span className="text-white font-semibold">04 / SELECTED WORK</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
            A moving archive of work.
          </h2>
          <p className="mt-2 text-neutral-400 text-sm max-w-xl">
            Drag, scroll, or hover a project to explore the collection.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 border border-white/10 self-start md:self-end">
          <button
            onClick={() => {
              setFilter('all');
              setActiveIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-black font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            EVERYTHING [{PROJECTS.length}]
          </button>
          <button
            onClick={() => {
              setFilter('originals');
              setActiveIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
              filter === 'originals'
                ? 'bg-white text-black font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ORIGINALS [3]
          </button>
          <button
            onClick={() => {
              setFilter('fresh');
              setActiveIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
              filter === 'fresh'
                ? 'bg-white text-black font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            FRESH [2]
          </button>
        </div>
      </div>

      {/* 3D Curved Wave Ribbon Slides Carousel Area */}
      <div className="relative max-w-7xl mx-auto pt-16 pb-8">
        {/* Navigation Arrows & Mode Indicator */}
        <div className="flex items-center justify-between mb-6 text-xs font-mono tracking-widest uppercase text-neutral-400 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>3D WAVE SLIDES VIEW</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="tabular-nums">
              PROJECT {activeIndex + 1} OF {filteredProjects.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevProject}
                className="w-8 h-8 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                onClick={nextProject}
                className="w-8 h-8 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* 3D Cylindrical Curved Track */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full h-[400px] sm:h-[450px] perspective-container flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden"
        >
          {filteredProjects.map((project, index) => {
            // Calculate rotational angle & displacement relative to active project
            const relativeOffset = index - activeIndex;
            const angle = relativeOffset * 22; // Degrees around curved cylinder
            const translateZ = Math.cos((angle * Math.PI) / 180) * 260 - 260;
            const translateX = relativeOffset * 320 + scrollOffset * 0.2;
            const rotateY = -relativeOffset * 18;
            const isCenter = index === activeIndex;

            return (
              <div
                key={project.id}
                onClick={() => {
                  setActiveIndex(index);
                  if (isCenter) {
                    onSelectProject(project);
                  }
                }}
                className={`absolute w-[280px] sm:w-[320px] h-[340px] sm:h-[380px] rounded-2xl p-6 transition-all duration-500 preserve-3d shadow-2xl flex flex-col justify-between cursor-pointer border ${
                  isCenter
                    ? 'bg-[#ffffff] text-[#121316] border-white shadow-2xl shadow-white/10 z-20 scale-105'
                    : 'bg-[#181a20] text-white border-white/15 opacity-70 hover:opacity-95 z-10'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                {/* Card Header: Repository Name */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase mb-3 opacity-70">
                    <span className="truncate">{project.type}</span>
                    <span>★ {project.stars}</span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight line-clamp-2 leading-tight">
                    {project.repoName}
                  </h3>
                </div>

                {/* Card Mid: Project Thumbnail Preview & Description */}
                <div className="my-auto py-2">
                  <div className="w-full h-24 rounded-lg overflow-hidden mb-3 bg-black/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-xs line-clamp-3 leading-relaxed font-sans opacity-85">
                    {project.description}
                  </p>
                </div>

                {/* Card Bottom: Stats & Quick Link */}
                <div className="pt-3 border-t border-current/15 flex items-center justify-between text-[11px] font-mono tracking-wider">
                  <div className="flex items-center gap-3 opacity-75">
                    <span>★ {project.stars}</span>
                    <span>⑂ {project.forks}</span>
                  </div>
                  <span className="font-semibold underline hover:opacity-100">
                    VIEW DETAILS →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Project Showcase Panel (Frame 00:59 - 01:01) */}
      <div className="max-w-5xl mx-auto mt-12 bg-[#121419] rounded-2xl border border-white/15 p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center justify-between text-xs font-mono tracking-[0.25em] uppercase text-neutral-400 pb-6 border-b border-white/10">
          <span>CHAPTER 02 / 2026</span>
          <span className="text-white font-semibold">{activeProject.type}</span>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              {activeProject.title}
            </h3>
            <div className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-widest">
              {activeProject.tagline}
            </div>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              {activeProject.description}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => onSelectProject(activeProject)}
              className="px-6 py-3.5 rounded bg-white text-black font-semibold text-xs font-mono tracking-widest uppercase hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer text-center"
            >
              EXPLORE PROJECT ↗
            </button>
            {activeProject.github && (
              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded border border-white/20 hover:border-white/40 text-white text-xs font-mono tracking-widest uppercase hover:bg-white/5 transition-colors text-center"
              >
                SOURCE CODE ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
