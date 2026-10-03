import React from 'react';
import { Project } from '../types';
import StarBorder from './StarBorder';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#13151b] border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-10 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with StarBorder */}
        <div className="absolute top-5 right-5 z-20">
          <StarBorder
            onClick={onClose}
            color="#b18cff"
            backgroundColor="#1a1c24"
            borderColor="rgba(255, 255, 255, 0.2)"
            className="rounded-full overflow-hidden"
            innerClassName="w-9 h-9 !p-0 rounded-full flex items-center justify-center text-sm font-mono text-neutral-300 hover:text-white"
            aria-label="Close project modal"
          >
            ✕
          </StarBorder>
        </div>

        {/* Modal Top Metadata */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
          <span>{project.type}</span>
          <span>·</span>
          <span>★ {project.stars} STARS</span>
          <span>·</span>
          <span>⑂ {project.forks} FORKS</span>
        </div>

        <h3 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-white mb-2">
          {project.title}
        </h3>

        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-6">
          {project.tagline}
        </div>

        {/* Project Image */}
        <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6 border border-white/10 bg-black/40">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Detailed Narrative */}
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {project.metrics && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400 uppercase tracking-wider">KEY PERFORMANCE METRIC:</span>
            <span className="text-emerald-400 font-semibold">{project.metrics}</span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-neutral-200"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons with StarBorder */}
        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
          {project.github && (
            <StarBorder
              as="a"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              color="#ffffff"
              backgroundColor="#ffffff"
              textColor="#000000"
              innerClassName="px-6 py-3 font-semibold text-xs font-mono tracking-widest uppercase"
            >
              VIEW ON GITHUB ↗
            </StarBorder>
          )}
          <StarBorder
            onClick={onClose}
            color="#b18cff"
            backgroundColor="rgba(255, 255, 255, 0.05)"
            textColor="#d1d5db"
            borderColor="rgba(255, 255, 255, 0.2)"
            innerClassName="px-6 py-3 font-semibold text-xs font-mono tracking-widest uppercase"
          >
            CLOSE PREVIEW
          </StarBorder>
        </div>
      </div>
    </div>
  );
};
