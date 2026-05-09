import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

type Variant = 'primary' | 'ghost';
type Size = 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-none font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-50 disabled:pointer-events-none';

function variantClasses(variant: Variant): string {
  switch (variant) {
    case 'ghost':
      // Direction A ghost: black border + black text on white; invert on hover.
      return 'border border-[var(--color-fg)] bg-transparent text-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]';
    case 'primary':
    default:
      // Direction A primary: black fill, red on hover.
      return 'border border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]';
  }
}

function sizeClasses(size: Size): string {
  switch (size) {
    case 'lg':
      return 'h-12 px-6 text-base';
    case 'md':
    default:
      return 'h-10 px-5 text-sm';
  }
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

// Discriminated union so internal links keep typedRoutes safety while
// external/anchor links accept any string. Avoids `as Route` casts.
type CTAButtonAsInternalLink = CommonProps & {
  href: Route;
  external?: false;
};

type CTAButtonAsExternalLink = CommonProps & {
  href: string;
  external: true;
};

type CTAButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined;
  };

type CTAButtonProps = CTAButtonAsInternalLink | CTAButtonAsExternalLink | CTAButtonAsButton;

export function CTAButton(props: CTAButtonProps) {
  const variant = props.variant ?? 'primary';
  const size = props.size ?? 'md';
  const cls = `${BASE} ${variantClasses(variant)} ${sizeClasses(size)} ${props.className ?? ''}`.trim();

  if ('href' in props && props.href !== undefined) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {props.children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls}>
        {props.children}
      </Link>
    );
  }

  const { variant: _v, size: _s, children, className: _c, ...rest } = props as CTAButtonAsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
