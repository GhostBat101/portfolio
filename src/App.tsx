/**
 * App: Root application container assembling the risograph motion stack, masthead, and sections.
 * Communicates with: GrainBackground, AmbientEffects, Header, all folio sections, and Footer.
 */
import React from 'react';
import { Project } from '@/types/project';
import rawProjects from '@/data/projects.json';
import { GrainBackground } from '@/components/canvas/GrainBackground';
import { AmbientEffects } from '@/components/motion/AmbientEffects';
import { Header } from '@/components/layout/Header';
import { LandingSection } from '@/components/sections/LandingSection';
import { ProjectIndexSection } from '@/components/sections/ProjectIndexSection';
import { ProjectDetailSection } from '@/components/sections/ProjectDetailSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

const PROJECTS: Project[] = rawProjects as Project[];

export const App: React.FC = () => {
  return (
    <div className="portfolio-app">
      <GrainBackground />
      <AmbientEffects />
      <Header />
      <main>
        <LandingSection />
        <ProjectIndexSection projects={PROJECTS} />
        <ProjectDetailSection projects={PROJECTS} />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
