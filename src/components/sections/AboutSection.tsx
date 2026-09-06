/**
 * AboutSection: Editorial thesis section presenting GhostBat101 design principles.
 * Communicates with: AboutSection.module.css, asymmetricRadius.ts, and App.tsx.
 */
import React from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './AboutSection.module.css';

interface ThesisItem {
  readonly tag: string;
  readonly statement: string;
}

const THESIS_STATEMENTS: readonly ThesisItem[] = [
  {
    tag: 'AXIOM 01 // GEOMETRIC ASYMMETRY',
    statement: 'Interfaces must balance calculated machine precision with organic, tactile asymmetry.',
  },
  {
    tag: 'AXIOM 02 // ZERO BLUR RIGOR',
    statement: 'True physical depth is achieved through crisp 1.5px ink contours and hard unblurred offset shadows.',
  },
  {
    tag: 'AXIOM 03 // PALETTE AS PRINTED INK',
    statement: 'Terracotta, aqua, and ochre function as structural ink layers rather than superficial decorative fills.',
  },
  {
    tag: 'AXIOM 04 // MEASURED PERFORMANCE',
    statement: 'Isolated WebGL canvas noise renders with zero DOM layout penalties and halts during background tab lifecycles.',
  },
];

export const AboutSection: React.FC = () => {
  const specimenRadius = getAsymmetricRadius('ghostbat-thesis-specimen', 'medium');

  return (
    <section id="about" className={styles.about}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.leadCol}>
          <span className={styles.kicker}>PHILOSOPHY & THESIS</span>

          <h2 className={styles.title}>
            Tactile software built with printmaker discipline.
          </h2>

          <div className={styles.specimenBox} style={{ borderRadius: specimenRadius }}>
            <div className={styles.specimenHeader}>
              <span className={styles.specimenLabel}>MANIFESTO REGISTRY</span>
              <span className={styles.specimenLabel}>GHOSTBAT101</span>
            </div>
            <p className={styles.specimenText}>
              Every component is stamped with deliberate asymmetric geometry, discarding generic modern UI templates in favor of physical risograph permanence.
            </p>
          </div>
        </div>

        <div className={styles.statementsCol}>
          {THESIS_STATEMENTS.map((item, index) => {
            const cardRadius = getAsymmetricRadius(`thesis-card-${index}`, 'medium');

            return (
              <div
                key={item.tag}
                className={styles.statementCard}
                style={{ borderRadius: cardRadius }}
              >
                <span className={styles.statementTag}>{item.tag}</span>
                <p className={styles.statementContent}>{item.statement}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
