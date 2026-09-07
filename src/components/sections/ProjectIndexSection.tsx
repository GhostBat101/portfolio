/**
 * ProjectIndexSection: Broadsheet table-of-contents index with hover preview plate.
 * Communicates with: ProjectIndexSection.module.css, Badge.tsx, and ProjectDetailSection.tsx.
 */
import React, { useState, useCallback } from 'react';
import { Project } from '@/types/project';
import { Badge, BadgeTone } from '@/components/ui/Badge/Badge';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './ProjectIndexSection.module.css';

export interface ProjectIndexSectionProps {
  projects: Project[];
}

const BADGE_TONES: readonly BadgeTone[] = ['terracotta', 'aqua', 'ochre'];

export const ProjectIndexSection: React.FC<ProjectIndexSectionProps> = ({ projects }) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const previewRadius = getAsymmetricRadius('index-hover-preview', 'medium');

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX + 24, y: e.clientY - 40 });
  }, []);

  const handleMouseEnter = useCallback((project: Project) => {
    setHoveredProject(project);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredProject(null);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(`#project-${slug}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCleanStack = (stackStr?: string): string[] => {
    if (!stackStr) return [];
    const items = stackStr.split(',').map((s) => s.trim()).filter(Boolean);
    if (items.length === 3) {
      return items.slice(0, 2);
    }
    return items.slice(0, 4);
  };

  return (
    <section id="projects" className={styles.section} onMouseMove={handleMouseMove}>
      <span id="project-index" className="sr-only" />
      <div className="container">
        <div className={styles.headerRow}>
          <div className={styles.titleGroup}>
            <span className={styles.kicker}>SELECTED WORK</span>
            <h2 className={styles.title}>A few things I've built.</h2>
            <div className={styles.introGroup}>
              <p className={styles.introText}>
                Every project has a different reason for existing. Some are made to sell, some to inform, and some simply to explore what a website can do.
              </p>
              <p className={styles.introSub}>
                Here are a few examples.
              </p>
            </div>
          </div>
          <span className={styles.metaCount}>
            {String(projects.length).padStart(2, '0')} PROJECTS
          </span>
        </div>

        <ol className={styles.indexList}>
          {projects.map((project, index) => {
            const indexNumber = String(index + 1).padStart(2, '0');
            const stackItems = getCleanStack(project.meta.stack);

            return (
              <li
                key={project.slug}
                className={styles.indexItem}
                onMouseEnter={() => handleMouseEnter(project)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={`#project-${project.slug}`}
                  className={styles.indexLink}
                  onClick={(e) => handleSmoothScroll(e, project.slug)}
                >
                  <span className={styles.indexNumber}>{indexNumber}</span>

                  <span className={styles.indexTitle}>{project.meta.title}</span>

                  <div className={styles.stackCol}>
                    {stackItems.map((tech, techIdx) => (
                      <Badge
                        key={tech}
                        tone={BADGE_TONES[techIdx % BADGE_TONES.length]}
                        seed={`${project.slug}-${tech}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <span className={styles.yearCol}>
                    {project.meta.year || '2026'}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>

        {hoveredProject && hoveredProject.cover && (
          <div
            className={styles.previewFrame}
            style={{
              display: 'block',
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              borderRadius: previewRadius,
            }}
          >
            {hoveredProject.cover.type === 'video' ? (
              <video
                src={hoveredProject.cover.src}
                poster={hoveredProject.cover.poster}
                className={styles.previewImage}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={hoveredProject.cover.src}
                alt={hoveredProject.meta.title}
                className={styles.previewImage}
              />
            )}
            <div className={styles.previewMeta}>
              <span className={styles.previewSlug}>{hoveredProject.slug}</span>
              <span className={styles.previewSlug}>{hoveredProject.template}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
