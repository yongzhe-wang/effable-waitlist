import type { HTMLAttributes } from 'react';

type BadgeVariant = 'default' | 'outline' | 'accent';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

function variantClasses(variant: BadgeVariant): string {
  switch (variant) {
    case 'outline':
      return 'border border-[var(--color-fg)] text-[var(--color-fg)]';
    case 'accent':
      // Direction A: low-visual-weight pill — red border + red text, no fill.
      return 'border border-[var(--color-accent)] text-[var(--color-accent)]';
    case 'default':
    default:
      return 'border border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)]';
  }
}

const BASE =
  'inline-flex items-center gap-1 rounded-none px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide';

export function Badge({ variant = 'default', className = '', ...rest }: BadgeProps) {
  return <span className={`${BASE} ${variantClasses(variant)} ${className}`.trim()} {...rest} />;
}
