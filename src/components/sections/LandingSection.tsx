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
          <SplitTextReveal
            text="High-performance websites built around your brand, not around a template."
            tag="h1"
            className={styles.headline}
          />

          <div className={styles.statementGroup}>
            <p className={styles.statement}>
              I design and develop custom websites and digital tools for founders, brands, and creative teams. The visual style adapts to your brand, whether that is clean and minimal, bold and expressive, or anything in between.
            </p>
            <p className={styles.statementSecondary}>
              No agency layers, no off-the-shelf solutions. Direct collaboration, design that fits your brand, and code that serves your actual goals.
            </p>
          </div>

          <div className={styles.actions}>
            <Button variant="primary" href="#projects" seed="hero-cta-works">
              See My Work
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
