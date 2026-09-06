/**
 * Footer: Broadside metadata ribbon with GhostBat101 attribution, colophon, and top anchor.
 * Communicates with: Footer.module.css, asymmetricRadius.ts, and App.tsx.
 */
import React from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const topRadius = getAsymmetricRadius('footer-top-btn', 'small');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandGroup}>
          <span className={styles.brandText}>GhostBat101</span>
          <span className={styles.colophon}>
            FOLIO EDITION 2.6 // REGISTERED 2026 // ZERO BLUR & OFFSET GRAIN
          </span>
        </div>

        <div className={styles.metaRibbon}>
          <a
            href="https://github.com/GhostBat101"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.metaLink}
          >
            GitHub
          </a>
          <a href="#project-index" className={styles.metaLink}>
            Index
          </a>
          <a href="#about" className={styles.metaLink}>
            Thesis
          </a>
          <a href="#contact" className={styles.metaLink}>
            Dispatch
          </a>
        </div>

        <button
          type="button"
          className={styles.topButton}
          style={{ borderRadius: topRadius }}
          onClick={scrollToTop}
          aria-label="Scroll back to top of folio"
        >
          <span>TOP</span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
};
