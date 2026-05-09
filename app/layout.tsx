import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Direction A drops the serif display face. Heavy Inter (800) plays
// the display role; the same family at 400/500/600 covers body and UI.
// JetBrains Mono is reserved for step indicators / numerics / code.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--ff-sans',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--ff-mono',
});

// `--ff-display` is aliased to `--ff-sans` since Direction A uses one
// family for both. Components using Tailwind's `font-display` utility
// still resolve via `--font-display` in globals.css.

export const metadata: Metadata = {
  title: {
    default: 'Effable — join the waitlist',
    template: '%s | Effable',
  },
  description:
    'Bottle the way you think. Effable is building a way to turn your tacit knowledge into a SKILL.md any agent can call. Join the waitlist for early access.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      // --ff-display === --ff-sans for Direction A (single typeface).
      style={{ ['--ff-display' as string]: 'var(--ff-sans)' }}
      className={`${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
