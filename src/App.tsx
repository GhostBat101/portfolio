/**
 * App: Root application container assembling the risograph motion stack, masthead, and lazy sections.
 * Communicates with: GrainBackground, AmbientEffects, Header, folio sections, and Footer.
 */
import React, { Suspense, lazy } from 'react';
import { Project } from '@/types/project';
import rawProjects from '@/data/projects.json';
import { GrainBackground } from '@/components/canvas/GrainBackground';
import { AmbientEffects } from '@/components/motion/AmbientEffects';
import { Header } from '@/components/layout/Header';
import { LandingSection } from '@/components/sections/LandingSection';
import { ProjectIndexSection } from '@/components/sections/ProjectIndexSection';
import { Footer } from '@/components/layout/Footer';

const ProjectDetailSection = lazy(() =>
  import('@/components/sections/ProjectDetailSection').then((m) => ({ default: m.ProjectDetailSection }))
);
const AboutSection = lazy(() =>
  import('@/components/sections/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const ContactSection = lazy(() =>
  import('@/components/sections/ContactSection').then((m) => ({ default: m.ContactSection }))
);

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
        <Suspense fallback={null}>
          <ProjectDetailSection projects={PROJECTS} />
          <AboutSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
