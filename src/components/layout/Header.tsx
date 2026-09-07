/**
 * Header: Fixed editorial masthead with tactile mobile drawer, brand mark, and nav links.
 * Communicates with: Header.module.css, asymmetricRadius.ts, and section anchors.
 */
import React, { useState, useEffect, useRef } from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './Header.module.css';

interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { id: '01', label: 'Work', href: '#projects' },
  { id: '02', label: 'Process', href: '#process' },
  { id: '03', label: 'About', href: '#about' },
  { id: '04', label: 'Contact', href: '#contact' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const brandRadius = getAsymmetricRadius('ghostbat101-mark', 'small');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    window.history.pushState(null, '', href);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.brandLink} aria-label="GhostBat101 Home" onClick={() => setIsOpen(false)}>
          <span className={styles.brandMark} style={{ borderRadius: brandRadius }}>
            GB
          </span>
          <span className={styles.brandText}>GhostBat101</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary Navigation">
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

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={handleToggle}
        >
          <span className={styles.toggleText}>{isOpen ? '✕' : 'MENU'}</span>
        </button>
      </div>

      <div
        className={`${styles.drawerBackdrop} ${isOpen ? styles.drawerBackdropOpen : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="mobile-navigation"
        className={`${styles.mobileDrawer} ${isOpen ? styles.mobileDrawerOpen : ''}`}
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
      >
        <div className={styles.drawerInner}>
          <div className={styles.drawerList}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.drawerLink}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className={styles.drawerItemIndex}>{item.id}</span>
                <span className={styles.drawerItemLabel}>{item.label}</span>
              </a>
            ))}
          </div>
          <div className={styles.drawerFooter}>
            <div className={styles.drawerStatusBadge}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>Available for new projects</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
