/**
 * Input: Stamped text input and textarea component with asymmetric corners and hard-offset focus.
 * Communicates with: Form.module.css, asymmetricRadius.ts, and ContactSection.tsx.
 */
import React from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './Form.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  seed?: string;
  multiline?: boolean;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  seed,
  multiline = false,
  rows = 4,
  className = '',
  style = {},
  id,
  ...rest
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const effectiveSeed = seed || inputId || 'input-primary';
  const borderRadius = getAsymmetricRadius(effectiveSeed, 'medium');

  const combinedInputClasses = [
    styles.input,
    multiline ? styles.textarea : '',
    className,
  ].filter(Boolean).join(' ');

  const mergedStyle: React.CSSProperties = {
    borderRadius,
    ...style,
  };

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={inputId}
          rows={rows}
          className={combinedInputClasses}
          style={mergedStyle}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={inputId}
          className={combinedInputClasses}
          style={mergedStyle}
          {...rest}
        />
      )}
    </div>
  );
};
