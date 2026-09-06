/**
 * Checkbox: Stamped square toggle component with asymmetric corners and ink cross glyph.
 * Communicates with: Form.module.css, asymmetricRadius.ts, and interactive forms.
 */
import React from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './Form.module.css';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  seed?: string;
  id?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  seed,
  id,
  className = '',
}) => {
  const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const effectiveSeed = seed || checkboxId || 'checkbox-primary';
  const borderRadius = getAsymmetricRadius(effectiveSeed, 'small');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  const boxClasses = [
    styles.checkboxBox,
    checked ? styles.checkboxChecked : '',
  ].filter(Boolean).join(' ');

  return (
    <label
      htmlFor={checkboxId}
      className={`${styles.checkboxWrapper} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        onChange(!checked);
      }}
    >
      <div
        id={checkboxId}
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={boxClasses}
        style={{ borderRadius }}
      >
        {checked && <span className={styles.checkboxGlyph}>&times;</span>}
      </div>
      {label && <span className={styles.checkboxLabel}>{label}</span>}
    </label>
  );
};
