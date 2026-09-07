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
          <span className={styles.kicker}>WEB DESIGN &amp; DEVELOPMENT</span>

          <SplitTextReveal
            text="Websites that look good and work even better."
            tag="h1"
            className={styles.headline}
          />

          <div className={styles.statementGroup}>
            <p className={styles.statement}>
              I design and build websites for businesses, products, and ideas. I care about how a site looks, how it feels to use, and whether it actually does its job.
            </p>
            <p className={styles.statementSecondary}>
              From a simple business website to a more interactive project, I build each one around what you actually need.
            </p>
          </div>

          <div className={styles.actions}>
            <Button variant="primary" href="#projects" seed="hero-cta-works">
              See my work
            </Button>
            <Button variant="ghost" href="#process" seed="hero-cta-process">
              How I work
            </Button>
          </div>
        </div>

        <div className={styles.visualCol}>
          <ShadedPortrait
            seed="ghostbat-hero-portrait"
            captionTitle="GhostBat101"
            specBadge="Design & Code"
            radiusTier="large"
          />
        </div>
      </div>
    </section>
  );
};
