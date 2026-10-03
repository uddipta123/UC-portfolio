import React, { useEffect, useState } from 'react';
import './Navigation.css';

interface NavigationProps {
  onReplayIntro?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onReplayIntro }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    {
      id: 'hero',
      number: '// 01',
      symbol: '✦',
      label: 'Overview',
      description: 'INTRO & CORE MISSION',
      href: '#hero'
    },
    {
      id: 'about',
      number: '// 02',
      symbol: '◈',
      label: 'Biography',
      description: 'BACKGROUND & ETHOS',
      href: '#about'
    },
    {
      id: 'capabilities',
      number: '// 03',
      symbol: '⬡',
      label: 'Capabilities',
      description: 'TECHNICAL DISCIPLINES',
      href: '#capabilities'
    },
    {
      id: 'work',
      number: '// 04',
      symbol: '✺',
      label: 'Selected Works',
      description: 'CURATED ARCHIVE // 2024-2026',
      href: '#work'
    },
    {
      id: 'contact',
      number: '// 05',
      symbol: '↗',
      label: 'Transmission',
      description: 'GET IN TOUCH & SOCIALS',
      href: '#contact'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'capabilities', 'work', 'contact'];
      const scrollY = window.scrollY + 250;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Top Left Brand */}
      <a href="#hero" className="floating-brand" aria-label="Go to top">
        <div className="floating-brand-monogram">UC</div>
        <div className="floating-brand-info">
          <strong>UDDIPTA CHOUDHURY</strong>
          <small>CREATIVE DEVELOPER // 2026</small>
        </div>
      </a>

      {/* Floating Top Right 3D Menu Button */}
      <div className="floating-menu-wrapper">
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={`floating-menu-button ${isMenuOpen ? 'is-open' : ''}`}
          aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          <div className="floating-menu-ring" />
          <div className="floating-menu-inner">
            <div className="floating-menu-lines">
              <i />
              <i />
              <i />
            </div>
            <span className="floating-menu-label">{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
          </div>
          <span className="floating-menu-status">LIVE</span>
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`floating-nav-backdrop ${isMenuOpen ? 'is-visible' : ''}`}
        aria-hidden="true"
      />

      {/* Floating 3D Navigation Panel */}
      <nav
        className={`floating-navigation ${isMenuOpen ? 'is-visible' : ''}`}
        aria-label="Main Floating Navigation"
      >
        <div className="floating-nav-glow" />

        {/* Floating 3D Core */}
        <div className="floating-nav-core" aria-hidden="true">
          <div className="floating-nav-core-ring" />
          <span className="floating-nav-core-monogram">UC</span>
          <span className="floating-nav-core-caption">SYSTEM CORE</span>
        </div>

        {/* 3D Floating Navigation Items */}
        <div className="floating-nav-items">
          {navLinks.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className={`floating-nav-item item-${index + 1} ${isActive ? 'is-active' : ''}`}
              >
                <span className="floating-nav-number">{item.number}</span>
                <span className="floating-nav-symbol">{item.symbol}</span>
                <div className="floating-nav-content">
                  <span className="floating-nav-label">{item.label}</span>
                  <span className="floating-nav-description">{item.description}</span>
                </div>
                <span className="floating-nav-arrow">↗</span>
                {isActive && <span className="floating-nav-active-dot" />}
                <span className="floating-nav-item-glass" />
              </button>
            );
          })}
        </div>

        {/* Floating Nav Footer */}
        <div className="floating-nav-footer">
          <div>
            <span>STATUS</span>
            <strong>AVAILABLE // 2026</strong>
          </div>
          <div>
            <span>COORDINATES</span>
            <strong>26°08' N 91°46' E</strong>
          </div>
          <div>
            <span>TIMEZONE</span>
            <strong>GUWAHATI, IN</strong>
          </div>
        </div>
      </nav>
    </>
  );
};
