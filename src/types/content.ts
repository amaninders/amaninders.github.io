// src/types/content.ts

import exp from "constants";

export interface SiteContent {
    meta: {
      title: string;
      description: string;
      establishedYear: string;
    };
    hero: {
      title: string;
      subtitle: string;
      ctaText: string;
    };
    about: {
      paragraphs: string[];
    };
    work: {
      title: string;
      experiences: Array<{
        company: string;
        position: string;
        duration: string;
        location: string;
        description: string[];
        companyUrl?: string;
        technologies?: string[];
      }>
      
    };
    projects: {
      title: string;
      items: Array<{
        title: string;
        description: string;
        link: string;
      }>;
    };
    tools: Array<{
      name: string;
      description: string;
      link?: string;
      github?: string;
      tech?: string[];
    }>;
    contact: {
      title: string;
      intro: string;
      social: {
        email: string;
        github: string;
        linkedin: string;
      };
    };
  }