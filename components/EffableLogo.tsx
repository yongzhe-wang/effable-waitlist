import type { CSSProperties } from 'react';

/**
 * Effable wordmark — Direction A (Stark).
 *
 * Bold geometric block letters "EF" + a single red square as the period.
 * Reads at any size from favicon (16px) to billboard.
 *
 * - `size`: target height in CSS pixels. Width auto-derives from the
 *   built-in 220:70 aspect ratio (~3.14:1).
 * - `tone`: "default" uses currentColor for the letterforms (so wrap it
 *   in a black or white element to invert); "inverted" forces white
 *   strokes for use on dark surfaces. The red square is always
 *   var(--color-accent).
 */

interface Props {
  size?: number;
  tone?: 'default' | 'inverted';
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

export function EffableLogo({
  size = 32,
  tone = 'default',
  className,
  style,
  ariaLabel = 'Effable',
}: Props) {
  const stroke = tone === 'inverted' ? '#FFFFFF' : 'currentColor';
  return (
    <svg
      viewBox="0 0 220 70"
      role="img"
      aria-label={ariaLabel}
      height={size}
      width={(size * 220) / 70}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* E */}
      <path d="M0 0 H78 V14 H18 V28 H68 V42 H18 V56 H78 V70 H0 Z" fill={stroke} />
      {/* F */}
      <path d="M100 0 H178 V14 H118 V28 H168 V42 H118 V70 H100 Z" fill={stroke} />
      {/* red square period — always accent */}
      <rect x="190" y="56" width="14" height="14" fill="var(--color-accent)" />
    </svg>
  );
}

/**
 * Compact "EF" mark only (no period). For tight spaces — favicons,
 * sidebar collapsed states. Square aspect for icon use.
 */
export function EffableMark({
  size = 32,
  tone = 'default',
  className,
  style,
  ariaLabel = 'Effable',
}: Props) {
  const stroke = tone === 'inverted' ? '#FFFFFF' : 'currentColor';
  return (
    <svg
      viewBox="0 0 178 70"
      role="img"
      aria-label={ariaLabel}
      height={size}
      width={(size * 178) / 70}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0 H78 V14 H18 V28 H68 V42 H18 V56 H78 V70 H0 Z" fill={stroke} />
      <path d="M100 0 H178 V14 H118 V28 H168 V42 H118 V70 H100 Z" fill={stroke} />
    </svg>
  );
}
