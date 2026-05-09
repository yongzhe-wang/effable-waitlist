import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

// `primary` is kept as an alias for `default` for backward compatibility with
// existing call sites. New code should prefer `default`.
type Variant = 'default' | 'outline' | 'ghost' | 'primary' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

function variantClasses(variant: Variant): string {
  switch (variant) {
    case 'outline':
      return 'border border-[var(--color-fg)] bg-[var(--color-bg)] text-[var(--color-fg)] hover:bg-[var(--color-surface)]';
    case 'ghost':
      return 'border border-transparent bg-transparent text-[var(--color-fg)] hover:bg-[var(--color-surface)]';
    case 'destructive':
      return 'border border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)]';
    case 'default':
    case 'primary':
    default:
      return 'border border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]';
  }
}

function sizeClasses(size: Size): string {
  switch (size) {
    case 'sm':
      return 'h-8 px-3 text-xs';
    case 'lg':
      return 'h-12 px-6 text-base';
    case 'md':
    default:
      return 'h-10 px-4 text-sm';
  }
}

const BASE =
  'inline-flex items-center justify-center rounded-none font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-50 disabled:pointer-events-none';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'default', size = 'md', className = '', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${BASE} ${variantClasses(variant)} ${sizeClasses(size)} ${className}`.trim()}
      {...rest}
    />
  );
});
