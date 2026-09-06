/**
 * AmbientEffects: Ambient pointer ink follower driven by anime.js micro-interaction loops.
 * Communicates with: AmbientEffects.module.css, animejs, and App.tsx.
 */
import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import styles from './AmbientEffects.module.css';

export const AmbientEffects: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (mediaQuery.matches || isTouch) return;

    let mouseX = -100;
    let mouseY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      anime({
        targets: cursor,
        left: mouseX,
        top: mouseY,
        duration: 250,
        easing: 'easeOutQuad',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursorFollower} ${styles.cursorPrimary}`}
      aria-hidden="true"
    />
  );
};
