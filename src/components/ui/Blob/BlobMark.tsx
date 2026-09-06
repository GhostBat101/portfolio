/**
 * BlobMark: Expressive-tier organic SVG blob element for deliberate editorial hero marks.
 * Communicates with: LandingSection.tsx, tokens.css, and AmbientEffects.tsx.
 */
import React from 'react';

export type BlobVariant = 'petal' | 'pebble' | 'droplet';
export type BlobTone = 'coral' | 'cyan' | 'ochre' | 'ink';

export interface BlobMarkProps {
  variant?: BlobVariant;
  tone?: BlobTone;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const BLOB_PATHS: Record<BlobVariant, string> = {
  petal: 'M48,12 C72,8 92,28 88,54 C84,80 62,94 36,88 C10,82 4,58 14,32 C22,12 32,14 48,12 Z',
  pebble: 'M52,16 C78,12 90,36 86,64 C82,88 56,92 32,86 C12,80 8,56 16,34 C24,16 34,18 52,16 Z',
  droplet: 'M46,8 C68,14 86,34 84,62 C82,86 58,94 34,88 C14,82 8,58 18,36 C28,18 36,6 46,8 Z',
};

const COLOR_MAP: Record<BlobTone, string> = {
  coral: '#DB977F',
  cyan: '#80D0DB',
  ochre: '#DBB77F',
  ink: '#42595C',
};

export const BlobMark: React.FC<BlobMarkProps> = ({
  variant = 'petal',
  tone = 'cyan',
  size = 64,
  className = '',
  style = {},
}) => {
  const pathData = BLOB_PATHS[variant];
  const fillColor = COLOR_MAP[tone];
  const shadowOffset = 3;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ display: 'inline-block', overflow: 'visible', ...style }}
      aria-hidden="true"
    >
      <g transform={`translate(${shadowOffset}, ${shadowOffset})`}>
        <path d={pathData} fill="#42595C" opacity="1" />
      </g>
      <path
        d={pathData}
        fill={fillColor}
        stroke="#42595C"
        strokeWidth="2"
      />
    </svg>
  );
};
