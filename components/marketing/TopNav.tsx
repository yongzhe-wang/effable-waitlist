import Link from 'next/link';
import { CTAButton } from './CTAButton';
import { EffableLogo } from '@/components/EffableLogo';

/**
 * Pre-launch top nav — single CTA, no nav links. The waitlist landing has
 * one section to scroll to (the form), so the bar reduces to logo + button.
 */
export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="Effable home" className="text-[var(--color-fg)]">
          <EffableLogo size={28} />
        </Link>
        <CTAButton href="#waitlist" external size="md">
          Join waitlist
        </CTAButton>
      </div>
    </header>
  );
}
