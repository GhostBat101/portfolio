/**
 * PinnedSection: Split-scroll layout container pinning media while companion content scrolls.
 * Communicates with: gsap, ScrollTrigger, and TemplateSplitScrollPin.tsx.
 */
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface PinnedSectionProps {
  pinnedContent: React.ReactNode;
  scrollingContent: React.ReactNode;
  reverse?: boolean;
  className?: string;
}

export const PinnedSection: React.FC<PinnedSectionProps> = ({
  pinnedContent,
  scrollingContent,
  reverse = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinEl = pinRef.current;
    if (!container || !pinEl) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth <= 768;
    if (mediaQuery.matches || isMobile) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top+=80',
      end: 'bottom bottom',
      pin: pinEl,
      pinSpacing: false,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: reverse ? '1fr 1fr' : '1fr 1fr',
    gap: 'var(--gutter-desktop)',
    position: 'relative',
    alignItems: 'start',
  };

  return (
    <div ref={containerRef} className={className} style={gridStyle}>
      {reverse ? (
        <>
          <div>{scrollingContent}</div>
          <div ref={pinRef}>{pinnedContent}</div>
        </>
      ) : (
        <>
          <div ref={pinRef}>{pinnedContent}</div>
          <div>{scrollingContent}</div>
        </>
      )}
    </div>
  );
};
