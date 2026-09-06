/**
 * TemplateEditorialStack: Project layout with stacked wide media frame and multi-column metadata ribbon.
 * Communicates with: Templates.module.css, Button.tsx, Badge.tsx, and Project.ts.
 */
import React from 'react';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/Button/Button';
import { Badge, BadgeTone } from '@/components/ui/Badge/Badge';
import { ExternalLinkIcon } from '@/components/ui/Icons/CustomIcons';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './Templates.module.css';

export interface TemplateProps {
  project: Project;
  indexNumber: string;
}

const BADGE_TONES: readonly BadgeTone[] = ['ochre', 'terracotta', 'aqua'];

export const TemplateEditorialStack: React.FC<TemplateProps> = ({ project, indexNumber }) => {
  const stackMediaRadius = getAsymmetricRadius(`${project.slug}-stack-media`, 'large');
  const stackItems = project.meta.stack
    ? project.meta.stack.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
  const displayStack = stackItems.length === 3 ? stackItems.slice(0, 2) : stackItems.slice(0, 4);

  return (
    <article id={`project-${project.slug}`} className={styles.projectArticle}>
      <div className="container">
        <header className={styles.projectHeader}>
          <div className={styles.titleArea}>
            <span className={styles.projectIndex}>{indexNumber}</span>
            <h2 className={styles.projectTitle}>{project.meta.title}</h2>
          </div>
          <div className={styles.metaRibbon}>
            <span className={styles.metaItem}>{project.meta.role || 'Design Engineer'}</span>
            <span className={styles.metaItem}>{project.meta.year || '2026'}</span>
            <span className={styles.metaItem}>Template 05 // Editorial-Stack</span>
            <span className={styles.metaItem}>GhostBat101 Folio</span>
          </div>
        </header>

        <div className={styles.editorialStackContainer}>
          {project.cover && (
            <div className={styles.mediaFrame} style={{ borderRadius: stackMediaRadius }}>
              <img
                src={project.cover.src}
                alt={project.meta.title}
                className={styles.mediaImage}
              />
              <div className={styles.mediaCaption}>
                EDITORIAL PLATE // {project.cover.name}
              </div>
            </div>
          )}

          <div className={styles.editorialDetailsGrid}>
            <div className={styles.statementList}>
              {project.overview.map((statement) => (
                <p key={statement} className={styles.statementLead}>
                  {statement}
                </p>
              ))}

              <div className={styles.badgeStack}>
                {displayStack.map((tech, i) => (
                  <Badge
                    key={tech}
                    tone={BADGE_TONES[i % BADGE_TONES.length]}
                    seed={`${project.slug}-${tech}`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className={styles.statementList}>
                {project.details.map((detail) => (
                  <p key={detail} className={styles.statementBody}>
                    {detail}
                  </p>
                ))}
              </div>

              <div className={styles.actionsRow}>
                {project.meta.live && (
                  <Button
                    variant="primary"
                    href={project.meta.live}
                    target="_blank"
                    seed={`${project.slug}-editorial-live`}
                  >
                    Launch Interactive Experience <ExternalLinkIcon size={14} />
                  </Button>
                )}
                {project.meta.repo && (
                  <Button
                    variant="secondary"
                    href={project.meta.repo}
                    target="_blank"
                    seed={`${project.slug}-editorial-repo`}
                  >
                    Inspect Source Code
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
