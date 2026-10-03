/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ClickSpark from './components/ClickSpark';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { WorkSection } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleReplayIntro = () => {
    setShowPreloader(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <ClickSpark
      sparkColor="#c084fc"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
      easing="ease-out"
      extraScale={1.2}
    >
      <main className="relative min-h-screen bg-[#0c0d10] text-[#e5e7eb] font-sans overflow-x-hidden selection:bg-white selection:text-black">
        {/* Visual Preloader Screen */}
        {showPreloader && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}

        {/* Persistent Navigation Top Bar & Fullscreen Menu */}
        <Navigation onReplayIntro={handleReplayIntro} />

        {/* 01. Hero with 3D Metallic Slashes Curtain */}
        <Hero />

        {/* 02. About Section with 3D Interactive Card Stack */}
        <AboutSection />

        {/* 03. Capabilities Section with Interactive Disciplines & Level Meters */}
        <CapabilitiesSection />

        {/* 04. Selected Work with 3D Wave Ribbon Slides Carousel */}
        <WorkSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 05. Contact Section & Massive Editorial Footer Banner */}
        <ContactSection />

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </main>
    </ClickSpark>
  );
}
