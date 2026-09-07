/**
 * LandingSection: Hero masthead section with split typography, WebGL risograph portrait, and entry CTA.
 * Communicates with: SplitTextReveal.tsx, ShadedPortrait.tsx, Button.tsx, and LandingSection.module.css.
 */
import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { ShadedPortrait } from '@/components/ui/ShadedPortrait/ShadedPortrait';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import styles from './LandingSection.module.css';

export const LandingSection: React.FC = () => {
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
          <ShadedPortrait
            seed="ghostbat-hero-portrait"
            captionTitle="CREATOR SPECIMEN // GHOSTBAT101"
            specBadge="RISO // 4-INK"
            radiusTier="large"
          />
        </div>
      </div>
    </section>
  );
};
