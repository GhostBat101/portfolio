/**
 * SplitTextReveal: Heading text revealer splitting text into characters and animating with GSAP.
 * Communicates with: SplitTextReveal.module.css, gsap, and landing/section headings.
 */
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './SplitTextReveal.module.css';

export interface SplitTextRevealProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
  className?: string;
  delay?: number;
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  tag: Tag = 'h2',
  className = '',
  delay = 0,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(`.${styles.char}`);
    if (chars.length === 0) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
      gsap.fromTo(
        chars,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, delay }
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.02,
          ease: 'power3.out',
          delay,
        }
      );
    }, container);

    return () => ctx.revert();
  }, [text, delay]);

  const words = text.split(' ');

  return (
    <Tag ref={containerRef as any} className={`${styles.container} ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className={styles.word}>
          {word.split('').map((char, charIndex) => (
            <span key={`${char}-${charIndex}`} className={styles.char}>
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};
