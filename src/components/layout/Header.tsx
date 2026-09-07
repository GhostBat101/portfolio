/**
 * Header: Fixed editorial masthead with brand mark, issue ribbon, and nav links.
 * Communicates with: Header.module.css, asymmetricRadius.ts, and main sections.
 */
import React from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './Header.module.css';

interface NavItem {
  readonly label: string;
  readonly href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Work', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC = () => {
  const brandRadius = getAsymmetricRadius('ghostbat101-mark', 'small');

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.brandLink} aria-label="GhostBat101 Home">
          <span className={styles.brandMark} style={{ borderRadius: brandRadius }}>
            GB
          </span>
          <span className={styles.brandText}>GhostBat101</span>
        </a>

        <nav className={styles.nav} aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={(e) => handleSmoothScroll(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <span className={styles.issueTag}>Available for new projects</span>
        </nav>
      </div>
    </header>
  );
};
