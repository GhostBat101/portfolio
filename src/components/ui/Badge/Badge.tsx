/**
 * Badge: Stamped chip component with asymmetric corners and optional dismiss action.
 * Communicates with: Badge.module.css, asymmetricRadius.ts, and project metadata views.
 */
import React from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './Badge.module.css';

export type BadgeTone = 'terracotta' | 'aqua' | 'ochre';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  children: React.ReactNode;
  seed?: string;
  onDismiss?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  tone = 'terracotta',
  children,
  seed,
  onDismiss,
  className = '',
  style = {},
  ...rest
}) => {
  const effectiveSeed = seed || `badge-${tone}`;
  const borderRadius = getAsymmetricRadius(effectiveSeed, 'small');

  const combinedClasses = [
    styles.badge,
    styles[tone],
    className,
  ].filter(Boolean).join(' ');

  const mergedStyle: React.CSSProperties = {
    borderRadius,
    ...style,
  };

  return (
    <span className={combinedClasses} style={mergedStyle} {...rest}>
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={styles.dismissButton}
          aria-label="Dismiss badge"
        >
          [x]
        </button>
      )}
    </span>
  );
};
