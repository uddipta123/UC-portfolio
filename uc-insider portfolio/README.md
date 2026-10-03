# Uddipta Choudhury — Creative Developer Portfolio

An interactive, brutalist creative portfolio for **Uddipta Choudhury** featuring:
- **AeroShards**: Procedural WebGPU floating chrome shards & bloom simulation.
- **TechText**: Interactive canvas with draggable harmonic spring letters, inspection frames, and telemetry.
- **ScrollExpand**: Dynamic scroll-to-expand clip-path & counter-zoom photo component.
- **3D Card Tilt**: Aceternity UI 3D perspective mouse-tilt card stack with layered depth.
- **3D Wave Slides**: Curved ribbon slides archive carousel with gesture drag and project modal previews.
- **12-Hour IST Clock & Day/Night Signal**: Real-time Asia/Kolkata clock with golden Sun ☀️ (Day) and violet Moon 🌙 (Night) indicator badges.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 📁 Project Structure

```text
uc-portfolio/
├── index.html                   # HTML entry point with Syne & JetBrains Mono typography
├── package.json                 # Project dependencies (vgpu, motion, lucide-react)
├── vite.config.ts               # Vite configuration with Tailwind CSS v4 plugin
├── tsconfig.json                # TypeScript compiler configuration
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Main portfolio orchestrator
│   ├── types.ts                 # TypeScript data contracts & interfaces
│   ├── index.css                # Tailwind CSS v4 imports & custom styles
│   ├── data/
│   │   └── portfolioData.ts     # Portfolio copy, disciplines, project repositories
│   └── components/
│       ├── Preloader.tsx        # High-contrast compass emblem & loading progress counter
│       ├── Navigation.tsx       # Fixed header, marquee ribbon & fullscreen directory overlay
│       ├── Hero.tsx             # Hero section integrating AeroShards & TechText
│       ├── TechText.tsx         # Interactive canvas with draggable spring letters
│       ├── TechText.css         # TechText canvas styling
│       ├── AeroShards.tsx       # Procedural WebGPU floating chrome shards & bloom
│       ├── AeroShards.css       # AeroShards canvas styling
│       ├── AboutSection.tsx     # 02 / ABOUT with 3D Card Stack
│       ├── ScrollExpand.tsx     # Scroll-to-expand clip-path photo component
│       ├── ScrollExpand.css     # ScrollExpand clip-path styling
│       ├── CapabilitiesSection.tsx # 03 / CAPABILITIES discipline browser & level meters
│       ├── WorkSection.tsx      # 04 / SELECTED WORK 3D curved wave slides carousel
│       ├── ContactSection.tsx   # 05 / CONTACT interactive email composer & colophon
│       ├── ProjectModal.tsx     # Detailed case study drawer
│       └── ui/
│           └── 3d-card.tsx      # Aceternity UI 3D perspective card tilt component
```
