'use client'
import React, { useState, useEffect } from 'react';

import { ArrowRight, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui'
import { siteContent } from '@/config/content'


// solari board components
const SplitFlapChar: React.FC<{ char: string; delay?: number }> = ({ char, delay = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentChar, setCurrentChar] = useState(' ');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    const flipTimer = setTimeout(() => {
      setIsFlipped(true);
      setTimeout(() => setCurrentChar(char), 150);
    }, delay + 50);
    
    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(flipTimer);
    };
  }, [char, delay]);

  const commonStyles = `
    absolute inset-0 flex items-center justify-center 
    text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl 
    font-bold text-white
  `;

  return (
    <div className="relative w-[32px] h-[48px] sm:w-[40px] sm:h-[60px] md:w-[48px] md:h-[72px] lg:w-[64px] lg:h-[96px] xl:w-[80px] xl:h-[120px]" 
         style={{ perspective: '1000px' }}>
      <div className={`
        w-full h-full relative transition-opacity duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `} style={{ transformStyle: 'preserve-3d' }}>
        {/* Top half */}
        <div 
          className="absolute inset-0 h-1/2 bg-[#0a0f1a] overflow-hidden"
          style={{ 
            borderTopLeftRadius: '2px',
            borderTopRightRadius: '2px',
            backfaceVisibility: 'hidden'
          }}
        >
          <span 
            className={commonStyles}
            style={{ transform: 'translateY(50%)' }}
          >
            {currentChar}
          </span>
        </div>
        
        {/* Bottom half */}
        <div 
          className="absolute bottom-0 inset-x-0 h-1/2 bg-[#0a0f1a] overflow-hidden"
          style={{ 
            borderBottomLeftRadius: '2px',
            borderBottomRightRadius: '2px',
            backfaceVisibility: 'hidden'
          }}
        >
          <span 
            className={commonStyles}
            style={{ transform: 'translateY(-50%)' }}
          >
            {currentChar}
          </span>
        </div>
        
        {/* Flipping top half */}
        <div 
          className="absolute inset-0 h-1/2 bg-[#0a0f1a] overflow-hidden transition-transform duration-300"
          style={{ 
            transformOrigin: 'bottom',
            transform: isFlipped ? 'rotateX(-180deg)' : 'rotateX(0)',
            borderTopLeftRadius: '2px',
            borderTopRightRadius: '2px',
            backfaceVisibility: 'hidden'
          }}
        >
          <span 
            className={commonStyles}
            style={{ transform: 'translateY(50%)' }}
          >
            {' '}
          </span>
        </div>
        
        {/* Flipping bottom half */}
        <div 
          className="absolute bottom-0 inset-x-0 h-1/2 bg-[#0a0f1a] overflow-hidden transition-transform duration-300"
          style={{ 
            transformOrigin: 'top',
            transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0)',
            transitionDelay: '150ms',
            borderBottomLeftRadius: '2px',
            borderBottomRightRadius: '2px',
            backfaceVisibility: 'hidden'
          }}
        >
          <span 
            className={commonStyles}
            style={{ transform: 'translateY(-50%)' }}
          >
            {char}
          </span>
        </div>

        {/* Split line */}
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#1a1f2a]"></div>
      </div>
    </div>
  );
};

const SplitFlapText: React.FC<{ text: string; baseDelay?: number }> = ({ text, baseDelay = 0 }) => (
  <div className="flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 xl:gap-4 justify-center">
    {text.split('').map((char, i) => (
      <SplitFlapChar 
        key={i} 
        char={char === ' ' ? '\u00A0' : char}
        delay={baseDelay + (i * 150)} 
      />
    ))}
  </div>
);

// hero section
export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-white overflow-hidden px-4 sm:px-6 md:px-8">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-15 pointer-events-none">
      {/* Map background */}
      <div className="col-span-12 absolute inset-0 bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: `url('background.png')`  // Replace with your image path
        }}
      />
    </div>
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col justify-center">
        <div className="max-w-screen-lg mx-auto w-full">
          {/* Role */}
          <div className="mb-8 md:mb-12">
            <p className={`
              font-mono text-xs sm:text-base tracking-wider text-gray-500 text-center
              transition-all duration-1000 delay-300
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              {siteContent.hero.role.toUpperCase()}
            </p>
          </div>

          {/* Name Display */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8 mb-12 md:mb-16">
            <SplitFlapText text={siteContent.hero.firstName.toUpperCase()} baseDelay={500} />
            <SplitFlapText text={siteContent.hero.lastName.toUpperCase()} baseDelay={1500} />
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto text-center">
            <p className={`
              text-base sm:text-lg md:text-4xl font-serif italic text-gray-600 mb-8 md:mb-12
              transition-all duration-1000 delay-2000 
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              {siteContent.hero.subtitle}
            </p>

            {/* Navigation */}
            <div className={`
              flex gap-6 md:gap-8 items-center justify-center
              transition-all duration-1000 delay-2500
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              <a href="#about" className="group inline-flex items-center text-sm sm:text-base md:text-lg">
                About Me
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-2" />
              </a>
              <a href="#work" className="group inline-flex items-center text-sm sm:text-base md:text-lg">
                View Work
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-2" />
              </a>
              <a href="#tools" className="group inline-flex items-center text-sm sm:text-base md:text-lg">
                Free Tools
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// about section
export const AboutSection = () => (
  <Section id="about" className="bg-gradient-to-br from-amber-50/30 via-zinc-50/50 to-amber-50/20 mt-32">
    <div className="max-w-4xl mx-auto mt-32">
      <SectionHeading>About</SectionHeading>
      <div className="space-y-8">
        {siteContent.about.paragraphs.map((paragraph, index) => (
          <div key={index}>
            <p className="text-xl leading-relaxed">
              {paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

interface ExperienceCardProps {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  companyUrl: string;
  technologies?: string[];
}

// work experience card 
export const ExperienceCard = ({
  company,
  position,
  duration,
  location,
  description,
  companyUrl,
  technologies
}: ExperienceCardProps) => {
  return (
    <div className="group relative bg-white border-l-8 border-l-transparent hover:border-l-amber-600 pl-6 py-8 transition-all duration-300">
      {/* Position and Company */}
      <div className="space-y-1">
      <h3 className="font-mono text-sm tracking-wider text-amber-600 uppercase">
        {position}
      </h3>
      <a 
        href={companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block font-sans text-2xl font-light hover:text-amber-600 transition-colors"
      >
        {company}
      </a>
      </div>

      {/* Duration and Location */}
      <div className="mt-4 flex gap-4 text-sm text-zinc-500">
      <div className="flex items-center gap-1.5">
        <Calendar className="w-4 h-4" />
        <span className="font-mono">{duration}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <MapPin className="w-4 h-4" />
        <span className="font-mono">{location}</span>
      </div>
      </div>

      {/* Description */}
      <div className="mt-6 space-y-3">
      {description.map((point, index) => (
        <p 
        key={index} 
        className="text-zinc-600 leading-relaxed font-light"
        >
        {point}
        </p>
      ))}
      </div>

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
      <div className="mt-6">
        <div className="flex flex-wrap gap-2 font-mono text-xs">
        {technologies.map((tech, index) => (
          <span
          key={index}
          className="px-3 py-1 bg-zinc-50 text-zinc-600"
          >
          {tech}
          </span>
        ))}
        </div>
      </div>
      )}
    </div>
  );
};

// work section
export const WorkSection = () => (
  <Section id="work">
    <div className="max-w-4xl mx-auto">
      <SectionHeading>{siteContent.work.title}</SectionHeading>
      <div className="space-y-16">
        {siteContent.work.experiences.map((item, index) => (
          <div className="max-w-4xl mx-auto" key={index} >
            <ExperienceCard {...item} />
          </div>
        ))}
      </div>
    </div>
  </Section>
);

interface Project {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  description: string;
  language: string;
  html_url: string;
}

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStarredProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/amaninders/starred');
        if (!response.ok) {
          throw new Error('Failed to fetch starred projects');
        }
        const data = await response.json();
        setProjects(data.slice(0, 12)); // Get first 6 starred projects
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchStarredProjects();
  }, []);

  if (loading) {
    return (
      <Section id="projects" className="bg-gradient-to-tl from-amber-50/30 via-zinc-50/50 to-amber-50/20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Projects</SectionHeading>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section id="projects" className="bg-gradient-to-tl from-amber-50/30 via-zinc-50/50 to-amber-50/20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Projects</SectionHeading>
          <div className="text-center text-red-600">
            Error loading projects: {error}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects" className="bg-gradient-to-tl from-amber-50/30 via-zinc-50/50 to-amber-50/20">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>Projects</SectionHeading>       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((project) => (
              <ReusableCard key={project.id} tool={project} />
            ))}
        </div>
      </div>
    </Section>
  );
};

interface Tool {
  name: string;
  description: string;
  svn_url?: string;
  url?: string;
  language?: string;
}

const ReusableCard = ({ tool }: { tool: Tool }) => (
  <div className="group block p-6 h-full rounded-xl bg-gradient-to-br from-white/90 to-white/70 border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">
        {tool.name}
      </h3>
      <div className="flex gap-2">
        {(tool.svn_url || tool.url) && (
          <a
            href={(tool.svn_url || (tool.url && `https://amaninder.com${tool.url}`))}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-900 transition-colors"
            aria-label={`View ${tool.name} source code`}
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
    <p className="mt-2 text-sm text-zinc-600 flex-grow">
      {tool.description || 'No description provided'}
    </p>
    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-100">
      <span className="px-2 py-1 text-xs font-medium text-zinc-600 bg-zinc-100 rounded-full">
        {tool.language || 'Unknown'}
      </span>
    </div>
  </div>
);

export const ToolsSection = () => {
  return (
    <Section id="tools" className="bg-gradient-to-tl from-amber-50/30 via-zinc-50/50 to-amber-50/20">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>Tools</SectionHeading>       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {siteContent.tools.map((tool) => (
              <ReusableCard key={tool.name} tool={tool} />
            ))}
        </div>
      </div>
    </Section>
  );
};


const SocialLinks = () => (
  <div className="space-y-4">
    <p className="text-base font-normal">+ Connect</p>
    <div className="space-y-2">
      {siteContent.contact.social.map((item, index) => (
        <a key={index} href={item.link} className="block text-base hover:text-orange-700">
          {item.title}
        </a>
      ))}
    </div>
  </div>
);

const ContactForm = () => (
  <form className="space-y-8 bg-white p-6 rounded-lg shadow-md">
    <div>
      <p className="text-base text-orange-900 mb-8">Hi, I am interested in working together.</p>
      
      <div className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-sm text-orange-800">My name is</label>
          <input
            type="text"
            id="name"
            className="mt-2 w-full px-0 py-1 bg-transparent border-b border-gray-300 focus:border-gray-600 focus:outline-none text-base"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-orange-800">I am reaching out because</label>
          <textarea
            id="message"
            rows={3}
            className="mt-2 w-full px-0 py-1 bg-transparent border-b border-gray-300 focus:border-gray-600 focus:outline-none text-base resize-none"
            placeholder="Tell me about your project"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-orange-800">Please contact me via</label>
          <input
            type="email"
            id="email"
            className="mt-2 w-full px-0 py-1 bg-transparent border-b border-gray-300 focus:border-gray-600 focus:outline-none text-base"
            placeholder="Your email"
          />
        </div>
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-orange-700 text-white py-2 px-4 text-base hover:bg-orange-800 transition-colors"
    >
      Send
    </button>
  </form>
);

export const ContactSection = () => (
  <Section id="contact">
    <div className="max-w-6xl mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-normal border-b border-black pb-1 inline-block">Contact</h2>
            <p className="mt-8 text-base">
              Interested in discussing technical solutions? Lets connect.
            </p>
          </div>
          
          <SocialLinks />
          
          <div className="space-y-4">
            <p className="text-base font-normal">+ Global just like you</p>
            <div className="space-y-1">
              <p className="text-base">Ottawa, Canada</p>
              <p className="text-base">Jalandhar, India</p>
            </div>
          </div>
        </div>
        
        <ContactForm />
      </div>
    </div>
  </Section>
);