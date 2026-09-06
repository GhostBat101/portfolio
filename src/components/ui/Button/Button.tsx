/**
 * Button: Stamped interactive button component with Framer Motion tactile press scaling.
 * Communicates with: Button.module.css, asymmetricRadius.ts, and consumer views.
 */
import React from 'react';
import { motion, HTMLMotionProps, MotionStyle } from 'framer-motion';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  seed?: string;
  fullWidth?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  seed,
  fullWidth = false,
  className = '',
  style = {},
  href,
  target,
  rel,
  ...rest
}) => {
  const isGhost = variant === 'ghost';
  const effectiveSeed = seed || `btn-${variant}`;
  const borderRadius = isGhost ? '0px' : getAsymmetricRadius(effectiveSeed, 'medium');

  const combinedClasses = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ');

  const mergedStyle: MotionStyle = {
    borderRadius,
    ...style,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={combinedClasses}
        style={mergedStyle}
        whileTap={{ scale: 0.96 }}
        {...(rest as any)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={combinedClasses}
      style={mergedStyle}
      whileTap={{ scale: 0.96 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
};
