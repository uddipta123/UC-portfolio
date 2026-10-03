import React, { useState } from 'react';
import { PROFILE_CARDS } from '../data/portfolioData';
import { ScrollExpand } from './ScrollExpand';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import StarBorder from './StarBorder';

export const AboutSection: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const nextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % PROFILE_CARDS.length);
  };

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + PROFILE_CARDS.length) % PROFILE_CARDS.length);
  };

  return (
    <section id="about" className="relative w-full py-24 px-4 sm:px-8 border-t border-white/10 bg-[#0d0e11]">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between pb-12 border-b border-white/10 text-xs font-mono tracking-[0.25em] uppercase text-neutral-400 gap-2">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">02 / ABOUT</span>
          <span className="text-neutral-600">·</span>
          <span>A little context.</span>
        </div>
        <div className="flex items-center gap-3 text-neutral-500">
          <span>GUWAHATI, ASSAM</span>
          <span className="text-neutral-600">·</span>
          <span>ENGINEERING MEETS EXPRESSION</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Interactive 3D Profile Carousel Cards */}
        <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
          {/* Card Stack Container */}
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] h-[460px] preserve-3d perspective-container">
            {PROFILE_CARDS.map((card, index) => {
              // Calculate relative offset from active card
              const offset = (index - activeCardIndex + PROFILE_CARDS.length) % PROFILE_CARDS.length;
              const isFront = offset === 0;

              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCardIndex(index)}
                  className={`absolute inset-0 transition-all duration-500 cursor-pointer ${
                    isFront
                      ? 'z-20 scale-100 translate-y-0 rotate-0'
                      : offset === 1
                      ? 'z-10 scale-95 translate-y-4 -rotate-3 opacity-75'
                      : offset === 2
                      ? 'z-0 scale-90 translate-y-8 rotate-3 opacity-40'
                      : 'opacity-0 scale-85 pointer-events-none'
                  }`}
                  style={{
                    transformOrigin: 'bottom center',
                  }}
                >
                  <CardContainer className="w-full h-full" containerClassName="w-full h-full">
                    <CardBody
                      className={`relative w-full h-[460px] rounded-2xl p-6 overflow-hidden border transition-all duration-300 ${
                        isFront
                          ? 'bg-[#16181d] border-white/20 shadow-2xl hover:shadow-cyan-500/[0.1] hover:border-white/40'
                          : 'bg-[#121317] border-white/10 shadow-lg'
                      }`}
                    >
                      {/* Card Top Pill Badge */}
                      <CardItem
                        translateZ={35}
                        className="flex items-center justify-between w-full text-[11px] font-mono tracking-widest uppercase mb-4 text-neutral-400"
                      >
                        <span className="text-white font-medium">{card.label}</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">
                          {card.badge}
                        </span>
                      </CardItem>

                      {/* Card Main Body */}
                      {card.image ? (
                        <CardItem
                          translateZ={65}
                          className="relative w-full h-[300px] rounded-xl overflow-hidden mb-4 group bg-black/40 border border-white/5 shadow-xl"
                        >
                          <ScrollExpand
                            src={card.image}
                            alt="Uddipta Choudhury portrait"
                            title=""
                            scrollHint="SCROLL TO EXPAND ↓"
                            startWidth={70}
                            startHeight={78}
                            startRadius={18}
                            endRadius={8}
                            mediaZoom={1.3}
                            scrollDistance={0.7}
                            holdDistance={0.25}
                            overlayScrim={0.6}
                            useWindowScroll={false}
                            className="w-full h-full"
                          >
                            <div className="flex flex-col items-center justify-end h-full w-full pb-4">
                              <span className="text-white font-serif-display text-base tracking-wider drop-shadow-md">
                                {card.title}
                              </span>
                              <a
                                href={card.linkUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs font-mono text-cyan-300 underline mt-1.5 hover:text-white transition-colors"
                              >
                                {card.linkText} ↗
                              </a>
                            </div>
                          </ScrollExpand>
                        </CardItem>
                      ) : (
                        <CardItem
                          translateZ={50}
                          className="w-full h-[300px] rounded-xl bg-gradient-to-br from-neutral-800/60 to-black/80 border border-white/5 p-6 flex flex-col justify-between mb-4 shadow-xl"
                        >
                          <div className="font-display font-bold text-2xl text-white">
                            {card.title}
                          </div>
                          <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                            {card.subtitle}
                          </p>
                          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 border-t border-white/10 pt-3">
                            {card.highlightText}
                          </div>
                        </CardItem>
                      )}

                      {/* Card Footer Microtext */}
                      <CardItem
                        translateZ={25}
                        className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 truncate w-full"
                      >
                        {card.highlightText}
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </div>
              );
            })}
          </div>

          {/* Carousel Controls */}
          <div className="mt-8 flex items-center justify-between w-full max-w-[360px] text-xs font-mono tracking-widest text-neutral-400">
            <span className="uppercase">PROFILE CAROUSEL</span>
            
            <div className="flex items-center gap-3">
              <span className="tabular-nums">
                0{activeCardIndex + 1} / 0{PROFILE_CARDS.length}
              </span>
              <div className="flex items-center gap-1.5">
                <StarBorder
                  onClick={prevCard}
                  color="#b18cff"
                  backgroundColor="#121317"
                  borderColor="rgba(255, 255, 255, 0.15)"
                  className="rounded-full overflow-hidden"
                  innerClassName="w-8 h-8 !p-0 rounded-full flex items-center justify-center text-white text-sm"
                  aria-label="Previous profile card"
                >
                  ←
                </StarBorder>
                <StarBorder
                  onClick={nextCard}
                  color="#b18cff"
                  backgroundColor="#121317"
                  borderColor="rgba(255, 255, 255, 0.15)"
                  className="rounded-full overflow-hidden"
                  innerClassName="w-8 h-8 !p-0 rounded-full flex items-center justify-center text-white text-sm"
                  aria-label="Next profile card"
                >
                  →
                </StarBorder>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Headline & Bio Copy */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Big Editorial Headline */}
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08] tracking-tight text-balance">
            I build useful things with a human point of view.
          </h2>

          {/* Paragraph 1 */}
          <p className="mt-8 text-neutral-300 text-sm sm:text-base leading-relaxed">
            I'm an Electronics and Communication Engineering student at Assam Skill University, Mangaldai, Assam, with a growing focus on building meaningful digital products. My work spans web development, Android development, and creative interface design, with a strong interest in responsive experiences, polished UI systems, and user-centered product thinking.
          </p>

          {/* Paragraph 2 */}
          <p className="mt-6 text-neutral-300 text-sm sm:text-base leading-relaxed">
            I enjoy turning ideas into practical, visually expressive applications across web and mobile platforms. While I work confidently with modern frontend workflows, I am also actively developing Android experiences using Kotlin and React Native, with an emphasis on clean architecture, intuitive UX, and polished interaction design. My practice brings together engineering discipline, creative illustration, and a product mindset rooted in both function and detail.
          </p>

          {/* Bottom Discipline Badges */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-2.5">
            {['ILLUSTRATION', 'ANDROID', 'CREATIVE CODE', 'PRODUCT THINKING'].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-[11px] font-mono tracking-widest text-neutral-300 uppercase hover:border-white/30 hover:text-white transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
