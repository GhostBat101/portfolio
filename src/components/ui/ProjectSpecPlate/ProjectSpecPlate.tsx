/**
 * ProjectSpecPlate: Risograph editorial dossier plate rendering project technical specifications.
 * Communicates with: ProjectSpecPlate.module.css, asymmetricRadius.ts, project.ts, and project layout templates.
 */
import React from 'react';
import { ProjectSpec } from '@/types/project';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './ProjectSpecPlate.module.css';

export interface ProjectSpecPlateProps {
  specs?: readonly ProjectSpec[];
  seed?: string;
  title?: string;
  className?: string;
}

const DEFAULT_TITLE = 'TECHNICAL DOSSIER';
const DEFAULT_SEED = 'spec-plate';
const STATUS_LABEL = 'VERIFIED';

export const ProjectSpecPlate: React.FC<ProjectSpecPlateProps> = ({
  specs,
  seed,
  title = DEFAULT_TITLE,
  className = '',
}) => {
  if (!specs || specs.length === 0) {
    return null;
  }

  const effectiveSeed = seed || DEFAULT_SEED;
  const asymmetricRadius = getAsymmetricRadius(effectiveSeed, 'small');

  const containerClasses = [
    styles.plateContainer,
    className,
  ].filter(Boolean).join(' ');

  return (
    <section
      className={containerClasses}
      style={{ borderRadius: asymmetricRadius }}
      aria-label={title}
    >
      <header className={styles.headerRibbon}>
        <span className={styles.dossierLabel}>{title}</span>
        <div className={styles.statusGroup}>
          <span className={styles.liveBeacon} aria-hidden="true" />
          <span className={styles.statusText}>{STATUS_LABEL}</span>
        </div>
      </header>

      <dl className={styles.specGrid}>
        {specs.map((spec, index) => (
          <div key={`${spec.label}-${index}`} className={styles.specCell}>
            <dt className={styles.specLabel}>{spec.label}</dt>
            <dd className={styles.specValue}>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
