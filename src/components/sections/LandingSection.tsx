/**
 * LandingSection: Hero masthead section with split typography, organic blob seal, and entry CTA.
 * Communicates with: SplitTextReveal.tsx, BlobMark.tsx, Button.tsx, and LandingSection.module.css.
 */
import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { BlobMark } from '@/components/ui/Blob/BlobMark';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './LandingSection.module.css';

export const LandingSection: React.FC = () => {
  const plateRadius = getAsymmetricRadius('ghostbat-hero-plate', 'large');

  return (
    <section id="hero" className={styles.landing}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.contentCol}>
          <span className={styles.kicker}>FOLIO EDITION // 2026</span>

          <SplitTextReveal
            text="Architecting expressive interfaces with tactile mechanical precision."
            tag="h1"
            className={styles.headline}
          />

          <p className={styles.statement}>
            GhostBat101 develops deliberate interactive systems where organic geometry meets industrial risograph discipline.
          </p>

          <div className={styles.actions}>
            <Button variant="primary" href="#projects" seed="hero-cta-works">
              Explore Selected Works
            </Button>
            <Button variant="ghost" href="#about" seed="hero-cta-thesis">
              Read Design Thesis
            </Button>
          </div>
        </div>

        <div className={styles.visualCol}>
          <div className={styles.stampPlate} style={{ borderRadius: plateRadius }}>
            <div className={styles.plateHeader}>
              <span className={styles.plateTitle}>SPECIMEN ARCHIVE</span>
              <span className={styles.plateBadge}>VER. 2.6</span>
            </div>

            <div className={styles.blobWrapper}>
              <BlobMark size={140} tone="cyan" variant="droplet" />
            </div>

            <div className={styles.plateFooter}>
              <span>CALIBRATED GEOMETRY // 0 BLUR // 0 GRADIENTS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
