/**
 * CustomIcons: Bespoke SVG icons (external-link, play, close, menu) inside stamped containers.
 * Communicates with: Icons.module.css, asymmetricRadius.ts, and application navigation.
 */
import React from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './Icons.module.css';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number;
  className?: string;
}

export interface IconBadgeProps {
  children: React.ReactNode;
  seed?: string;
  accent?: boolean;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export const ExternalLinkIcon: React.FC<IconProps> = ({ size, width, height, className = '', ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size ?? width}
    height={size ?? height}
    className={`${styles.iconGlyph} ${className}`}
    {...rest}
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ size, width, height, className = '', ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size ?? width}
    height={size ?? height}
    className={`${styles.iconGlyph} ${className}`}
    {...rest}
  >
    <polygon points="6,4 20,12 6,20" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size, width, height, className = '', ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size ?? width}
    height={size ?? height}
    className={`${styles.iconGlyph} ${className}`}
    {...rest}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size, width, height, className = '', ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size ?? width}
    height={size ?? height}
    className={`${styles.iconGlyph} ${className}`}
    {...rest}
  >
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="16" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

export const IconBadge: React.FC<IconBadgeProps> = ({
  children,
  seed = 'icon-container',
  accent = false,
  className = '',
  onClick,
  title,
}) => {
  const borderRadius = getAsymmetricRadius(seed, 'large');

  const containerClasses = [
    styles.iconContainer,
    accent ? styles.iconContainerAccent : '',
    className,
  ].filter(Boolean).join(' ');

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={containerClasses}
        style={{ borderRadius }}
        title={title}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={containerClasses} style={{ borderRadius }} title={title}>
      {children}
    </div>
  );
};
