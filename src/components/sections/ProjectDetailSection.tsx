/**
 * ProjectDetailSection: Master section rendering projects according to assigned layout templates.
 * Communicates with: Template components, Project.ts, and App.tsx.
 */
import React from 'react';
import { Project, LayoutTemplateType } from '@/types/project';
import { TemplateMediaLeft } from '@/components/templates/TemplateMediaLeft';
import { TemplateFullBleed } from '@/components/templates/TemplateFullBleed';
import { TemplateTextFirstParallax } from '@/components/templates/TemplateTextFirstParallax';
import { TemplateSplitScrollPin } from '@/components/templates/TemplateSplitScrollPin';
import { TemplateEditorialStack } from '@/components/templates/TemplateEditorialStack';

export interface ProjectDetailSectionProps {
  projects: Project[];
}

const TEMPLATE_MAP: Record<LayoutTemplateType, React.FC<{ project: Project; indexNumber: string }>> = {
  'media-left': TemplateMediaLeft,
  'full-bleed': TemplateFullBleed,
  'text-first-parallax': TemplateTextFirstParallax,
  'split-scroll': TemplateSplitScrollPin,
  'editorial-stack': TemplateEditorialStack,
};

export const ProjectDetailSection: React.FC<ProjectDetailSectionProps> = ({ projects }) => {
  return (
    <section id="project-showcase" aria-label="Selected Projects">
      {projects.map((project, index) => {
        const indexNumber = String(index + 1).padStart(2, '0');
        const TemplateComponent = TEMPLATE_MAP[project.template] || TemplateMediaLeft;

        return (
          <TemplateComponent
            key={project.slug}
            project={project}
            indexNumber={indexNumber}
          />
        );
      })}
    </section>
  );
};
