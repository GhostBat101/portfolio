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
          <span className={styles.kicker}>CREATIVE WEB DEVELOPMENT &amp; DIGITAL CRAFTSMANSHIP</span>

          <SplitTextReveal
            text="High impact websites built for speed, feel, and conversion."
            tag="h1"
            className={styles.headline}
          />

          <div className={styles.statementGroup}>
            <p className={styles.statement}>
              I design and develop high performance websites and digital tools for founders, brands, and creative teams. Every project is custom built, combining distinctive editorial aesthetics with robust frontend engineering.
            </p>
            <p className={styles.statementSecondary}>
              No generic templates. No agency layers. Just thoughtful design, fluid interactions, and clean code built around what your business actually needs.
            </p>
          </div>

          <div className={styles.actions}>
            <Button variant="primary" href="#projects" seed="hero-cta-works">
              Explore Featured Work
            </Button>
            <Button variant="ghost" href="#process" seed="hero-cta-process">
              How I Build
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
