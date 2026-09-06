/**
 * ParallaxLayer: Scroll-driven parallax wrapper leveraging GSAP ScrollTrigger scrub.
 * Communicates with: gsap, ScrollTrigger, and project layout templates.
 */
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.15,
  className = '',
  style = {},
}) => {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const yDistance = speed * 100;

    const tween = gsap.fromTo(
      el,
      { y: -yDistance * 0.5 },
      {
        y: yDistance * 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={layerRef} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </div>
  );
};
