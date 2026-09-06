/**
 * AsymmetricRadius: Deterministic corner profile generator enforcing the Soft Stamp hybrid geometry.
 * Communicates with: Button, Badge, Input, Checkbox, media frames, and icon containers.
 */
export type RadiusTier = 'small' | 'medium' | 'large';

interface TierRange {
  min: number;
  max: number;
}

const TIER_RANGES: Record<RadiusTier, TierRange> = {
  small: { min: 8, max: 16 },
  medium: { min: 14, max: 26 },
  large: { min: 20, max: 36 },
};

const CURATED_PROFILES: Record<string, string> = {
  'btn-primary': '22px 14px 26px 18px',
  'btn-secondary': '16px 24px 18px 26px',
  'badge-warm': '10px 15px 12px 8px',
  'badge-cyan': '14px 9px 15px 11px',
  'badge-ochre': '9px 14px 10px 16px',
  'input-primary': '18px 14px 22px 16px',
  'checkbox-primary': '9px 15px 11px 14px',
  'frame-hero': '32px 22px 36px 24px',
  'frame-card': '24px 34px 22px 28px',
  'icon-container': '26px 18px 30px 20px',
};

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getAsymmetricRadius(seed: string, tier: RadiusTier = 'medium'): string {
  if (CURATED_PROFILES[seed]) {
    return CURATED_PROFILES[seed];
  }

  const { min, max } = TIER_RANGES[tier];
  const range = max - min + 1;
  const hash = hashString(seed);

  const c1 = min + ((hash + 3) % range);
  let c2 = min + (((hash >> 3) + 7) % range);
  let c3 = min + (((hash >> 6) + 11) % range);
  let c4 = min + (((hash >> 9) + 17) % range);

  if (c2 === c1) c2 = min + ((c2 - min + 2) % range);
  if (c3 === c2 || c3 === c1) c3 = min + ((c3 - min + 3) % range);
  if (c4 === c3 || c4 === c2 || c4 === c1) c4 = min + ((c4 - min + 5) % range);

  return `${c1}px ${c2}px ${c3}px ${c4}px`;
}
