import Link from 'next/link';
import { EffableLogo } from '@/components/EffableLogo';

/**
 * Pre-launch footer — brand column + Legal column only. Product/Company
 * routes don't exist yet on the waitlist site, so they were dropped to
 * avoid dead links.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="flex flex-col gap-3 md:col-span-2">
            <Link href="/" aria-label="Effable home" className="text-[var(--color-fg)]">
              <EffableLogo size={24} />
            </Link>
            <p className="text-sm text-[var(--color-muted)]">Bottle the way you think.</p>
            <p className="text-xs text-[var(--color-muted)]">
              An Effable product, by Wish-Machine.
            </p>
            <div className="mt-2">
              <a
                href="#waitlist"
                className="text-sm font-medium text-[var(--color-fg)] underline-offset-4 transition-colors hover:text-[var(--color-accent)] hover:underline"
              >
                Join waitlist →
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)]">
              Legal
            </span>
            <a
              href="mailto:hello@effable.me"
              className="text-sm text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
            >
              Contact
            </a>
            <a
              href="https://wish-machine.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
            >
              Wish-Machine
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {new Date().getFullYear()} Wish-Machine, Inc. &middot; effable.me
          </span>
        </div>
      </div>
    </footer>
  );
}
