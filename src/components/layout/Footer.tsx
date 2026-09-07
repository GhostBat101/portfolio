/**
 * Footer: Editorial footer with GhostBat101 attribution, plain-English summary, links, and top anchor.
 * Communicates with: Footer.module.css, asymmetricRadius.ts, and App.tsx.
 */
import React from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './Footer.module.css';

interface FooterLink {
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
}

const FOOTER_LINKS: readonly FooterLink[] = [
  { label: 'Work', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'GitHub', href: 'https://github.com/GhostBat101', isExternal: true },
];

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
          <span className={styles.tagline}>Web design &amp; development.</span>
          <p className={styles.subline}>
            Building websites with care, from the first idea to the final launch.
          </p>
          <span className={styles.colophon}>© 2026 GhostBat101</span>
        </div>

        <div className={styles.actionGroup}>
          <nav className={styles.metaRibbon} aria-label="Footer Navigation">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.metaLink}
                {...(link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={styles.topButton}
            style={{ borderRadius: topRadius }}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
