/**
 * MediaFrame: Polymorphic media component with desktop hover playback and mobile viewport autoplay.
 * Communicates with: MediaFrame.module.css, asymmetricRadius.ts, and project templates.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectAsset } from '@/types/project';
import { getAsymmetricRadius, RadiusTier } from '@/utils/asymmetricRadius';
import styles from './MediaFrame.module.css';

export interface MediaFrameProps {
  asset: ProjectAsset;
  alt?: string;
  seed?: string;
  radiusSize?: RadiusTier;
  className?: string;
  viewportClassName?: string;
  aspectRatio?: string;
  captionPrefix?: string;
  showStatusIndicator?: boolean;
}

const resolveAssetUrl = (rawPath: string): string => {
  if (rawPath.startsWith('http://') || rawPath.startsWith('https://') || rawPath.startsWith('data:')) {
    return rawPath;
  }
  const basePath = import.meta.env.BASE_URL || '/';
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const normalizedPath = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath;
  return `${normalizedBase}${normalizedPath}`;
};

export const MediaFrame: React.FC<MediaFrameProps> = ({
  asset,
  alt,
  seed,
  radiusSize = 'large',
  className = '',
  viewportClassName = '',
  aspectRatio,
  captionPrefix,
  showStatusIndicator = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHoverCapable, setIsHoverCapable] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const isVideo = asset.type === 'video';
  const computedRadius = getAsymmetricRadius(seed || asset.name, radiusSize);
  const resolvedSrc = resolveAssetUrl(asset.src);
  const resolvedPoster = asset.poster ? resolveAssetUrl(asset.poster) : undefined;
  const captionTitle = captionPrefix ? `${captionPrefix} // ${asset.name}` : asset.name;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsHoverCapable(hoverQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

    const onHoverChange = (e: MediaQueryListEvent) => {
      setIsHoverCapable(e.matches);
    };

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    hoverQuery.addEventListener('change', onHoverChange);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      hoverQuery.removeEventListener('change', onHoverChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!isVideo || isHoverCapable || prefersReducedMotion || !containerRef.current) {
      return;
    }

    const currentContainer = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            if (videoRef.current) {
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: [0, 0.35, 0.7],
      }
    );

    observer.observe(currentContainer);

    return () => {
      observer.disconnect();
    };
  }, [isVideo, isHoverCapable, prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => {
    if (!isVideo || !isHoverCapable || prefersReducedMotion || !videoRef.current) {
      return;
    }
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, [isVideo, isHoverCapable, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (!isVideo || !isHoverCapable || !videoRef.current) {
      return;
    }
    videoRef.current.pause();
    setIsPlaying(false);
  }, [isVideo, isHoverCapable]);

  return (
    <div
      ref={containerRef}
      className={`${styles.frameContainer} ${className}`}
      style={{ borderRadius: computedRadius }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${styles.mediaViewport} ${viewportClassName}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              src={resolvedSrc}
              poster={resolvedPoster}
              muted
              loop
              playsInline
              preload="metadata"
              className={styles.mediaElement}
              aria-label={alt || asset.name}
            />
            {showStatusIndicator && !prefersReducedMotion && (
              <div className={styles.statusPill}>
                <span
                  className={`${styles.liveIndicator} ${
                    isPlaying ? styles.liveIndicatorActive : ''
                  }`}
                />
                <span>
                  {isPlaying
                    ? 'PLAYING'
                    : isHoverCapable
                    ? 'HOVER TO PREVIEW'
                    : 'STANDBY'}
                </span>
              </div>
            )}
          </>
        ) : (
          <img
            src={resolvedSrc}
            alt={alt || asset.name}
            loading="lazy"
            className={styles.mediaElement}
          />
        )}
      </div>

      <div className={styles.captionBar}>
        <span className={styles.captionText}>{captionTitle}</span>
        <span className={styles.formatBadge}>
          {isVideo ? 'H.264 // 30FPS' : 'STATIC // OPTIC'}
        </span>
      </div>
    </div>
  );
};
