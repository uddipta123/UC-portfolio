import React, { useState } from 'react';
import { USER_INFO } from '../data/portfolioData';
import StarBorder from './StarBorder';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(USER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    // Compose mailto link
    const subject = encodeURIComponent(`Inquiry from ${formData.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Hello Uddipta,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${USER_INFO.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative w-full pt-24 pb-12 px-4 sm:px-8 border-t border-white/10 bg-[#0c0d10]">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between pb-12 border-b border-white/10 text-xs font-mono tracking-[0.25em] uppercase text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">05 / CONTACT</span>
        </div>
        <div className="text-neutral-500">
          <span>OPEN TO SELECT COLLABORATIONS</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="max-w-7xl mx-auto pt-16 mb-16">
        <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-white leading-tight">
          Good things start with hello.
        </h2>
      </div>

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-24">
        {/* Left Column: Direct Inquiries & Email Card */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Have a thoughtful project, a creative idea, or a question? I'm available for select freelance and collaboration opportunities.
          </p>

          {/* Primary Email Card */}
          <div className="p-6 rounded-2xl bg-[#14151b] border border-white/10 shadow-xl flex flex-col gap-4">
            <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              PRIMARY EMAIL
            </div>

            <div className="flex items-center justify-between gap-4">
              <a
                href={`mailto:${USER_INFO.email}`}
                className="font-display font-bold text-base sm:text-xl text-white hover:text-cyan-400 transition-colors truncate"
              >
                {USER_INFO.email}
              </a>

              <StarBorder
                onClick={handleCopyEmail}
                color={copied ? '#22c55e' : '#c084fc'}
                backgroundColor="rgba(255, 255, 255, 0.08)"
                textColor="#ffffff"
                innerClassName="px-3.5 py-1.5 font-mono text-xs tracking-wider"
                title="Copy email address"
              >
                {copied ? 'COPIED ✓' : 'COPY'}
              </StarBorder>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>📍</span>
              <span>{USER_INFO.location}</span>
            </div>
          </div>

          {/* Social Links with StarBorder */}
          <div className="flex flex-wrap gap-4 text-xs font-mono tracking-widest uppercase">
            <StarBorder
              as="a"
              href={USER_INFO.github}
              target="_blank"
              rel="noreferrer"
              color="#b18cff"
              backgroundColor="rgba(255, 255, 255, 0.04)"
              innerClassName="px-4 py-2.5 font-mono text-xs tracking-widest uppercase"
            >
              GITHUB ↗
            </StarBorder>
            <StarBorder
              as="a"
              href={USER_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              color="#b18cff"
              backgroundColor="rgba(255, 255, 255, 0.04)"
              innerClassName="px-4 py-2.5 font-mono text-xs tracking-widest uppercase"
            >
              LINKEDIN ↗
            </StarBorder>
            <StarBorder
              as="a"
              href={USER_INFO.twitter}
              target="_blank"
              rel="noreferrer"
              color="#b18cff"
              backgroundColor="rgba(255, 255, 255, 0.04)"
              innerClassName="px-4 py-2.5 font-mono text-xs tracking-widest uppercase"
            >
              TWITTER / X ↗
            </StarBorder>
          </div>
        </div>

        {/* Right Column: Interactive Email Composer Form */}
        <div className="lg:col-span-7 bg-[#14151b] rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="text-xs font-mono tracking-widest uppercase text-neutral-400 mb-6">
            WHAT'S ON YOUR MIND?
          </div>

          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-xl mb-4">
                ✓
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Email Client Triggered
              </h3>
              <p className="text-neutral-300 text-sm max-w-md mx-auto mb-6">
                Your default email app should open with the drafted message. If it didn't open automatically, you can write directly to {USER_INFO.email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-cyan-400 underline uppercase tracking-wider cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 text-sm font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
                  TELL ME A LITTLE ABOUT IT...
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me a little about your project, timeline, or idea..."
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 text-sm font-sans resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-[11px] font-mono text-neutral-500 leading-tight">
                  This opens a pre-filled draft in your email app. Your messages are not stored remotely.
                </span>

                <StarBorder
                  type="submit"
                  color="#ffffff"
                  backgroundColor="#ffffff"
                  textColor="#000000"
                  innerClassName="px-7 py-3.5 font-bold text-xs font-mono tracking-widest uppercase shadow-lg shrink-0"
                >
                  <span>COMPOSE EMAIL ✉</span>
                </StarBorder>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Massive Editorial Footer Banner (Frame 01:04 - 01:07) */}
      <div className="max-w-7xl mx-auto pt-16 border-t border-white/15">
        <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase mb-6">
          {USER_INFO.name} / {USER_INFO.role}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16">
          <div className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white leading-tight max-w-3xl">
            Engineering, illustration, and thoughtful details — brought together on the web.
          </div>

          <div className="flex items-center gap-6 text-xs font-mono tracking-widest uppercase text-neutral-400 shrink-0">
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
            <button
              onClick={scrollToTop}
              className="text-white hover:underline transition-all cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-500 gap-4">
          <div>© 2026 {USER_INFO.name}</div>
          <div>MADE IN {USER_INFO.location}</div>
          <div>PORTFOLIO V2</div>
        </div>
      </div>
    </section>
  );
};
