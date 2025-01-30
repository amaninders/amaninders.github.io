'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const NavLink = ({ 
  href, 
  children, 
  isActive 
}: { 
  href: string; 
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <a
    href={href}
    className={`
      relative px-4 py-2 text-lg transition-all duration-300
      ${isActive ? 'text-amber-600' : 'text-zinc-600 hover:text-zinc-900'}
    `}
  >
    {children}
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 transform origin-left transition-transform duration-300" />
    )}
  </a>
);

const FloatingNav = ({ 
  sections, 
  activeSection,
  show 
}: { 
  sections: string[];
  activeSection: string;
  show: boolean;
}) => (
  <div className={`
    fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50
    transition-all duration-300
    ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
  `}>
    <div className="bg-white/80 backdrop-blur-lg px-6 py-3 rounded-full shadow-lg border border-zinc-200">
      <nav className="flex space-x-2">
        {sections.map((section) => (
          <NavLink 
            key={section} 
            href={`#${section}`}
            isActive={activeSection === section}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </NavLink>
        ))}
      </nav>
    </div>
  </div>
);

const CircleNav = ({ 
  sections,
  activeSection,
  isOpen,
  onToggle,
  show 
}: { 
  sections: string[];
  activeSection: string;
  isOpen: boolean;
  onToggle: () => void;
  show: boolean;
}) => (
  <div className={`
    fixed right-8 top-1/2 transform -translate-y-1/2 z-50
    transition-all duration-300
    ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
  `}>
    <div className="relative">
      <button
        onClick={onToggle}
        className="bg-amber-500 hover:bg-amber-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-zinc-200 py-4 min-w-[160px]">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`
                block px-6 py-2 transition-all duration-300
                ${activeSection === section ? 'text-amber-600 bg-amber-50' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'}
              `}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              {activeSection === section && (
                <ArrowRight className="inline-block ml-2" size={16} />
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);

const ProgressIndicator = ({ progress, show }: { progress: number; show: boolean }) => (
  <div className={`
    fixed left-0 top-0 h-1 bg-amber-500 transition-all duration-300
    ${show ? 'opacity-100' : 'opacity-0'}
  `} 
  style={{ width: `${progress}%` }} 
  />
);

export default function Navigation({ sections }: { sections: string[] }) {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);

      // Check if home section is out of view
      const homeSection = document.getElementById(sections[0]);
      if (homeSection) {
        const rect = homeSection.getBoundingClientRect();
        setShowNav(rect.bottom <= 0);
      }

      // Update active section
      const sectionElements = sections.map(section => 
        document.getElementById(section)
      );

      const currentSection = sectionElements.find(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= windowHeight/3 && rect.bottom >= windowHeight/3;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <>
      <ProgressIndicator progress={scrollProgress} show={showNav} />
      
      {/* Show floating nav on larger screens */}
      <div className="hidden md:block">
        <FloatingNav 
          sections={sections} 
          activeSection={activeSection}
          show={showNav}
        />
      </div>

      {/* Show circle nav on mobile */}
      <div className="block md:hidden">
        <CircleNav 
          sections={sections}
          activeSection={activeSection}
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
          show={showNav}
        />
      </div>
    </>
  );
}