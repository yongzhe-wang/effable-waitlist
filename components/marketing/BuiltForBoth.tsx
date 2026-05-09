import { Bot, Users } from 'lucide-react';

interface Column {
  icon: 'humans' | 'agents';
  eyebrow: string;
  title: string;
  bullets: string[];
}

const COLUMNS: Column[] = [
  {
    icon: 'humans',
    eyebrow: '01 / Humans',
    title: 'Subscribe and chat at effable.me/{you}.',
    bullets: [
      'Long-form chat with the creator-trained skill, with citations back to the source.',
      'Monthly subscription via Stripe, billed in your local currency.',
      'New ideas published by the creator update the skill automatically.',
      'Cancel any time — your conversation history stays exportable.',
    ],
  },
  {
    icon: 'agents',
    eyebrow: '02 / Agents',
    title: 'Discover and pay per call via MCP + x402.',
    bullets: [
      'List skills through the standard MCP directory; no custom integration.',
      'HTTP 402 challenge → USDC settlement on Base in under 5 seconds.',
      'Per-call pricing the creator sets — $0.001 to $1.00, your call.',
      'Stable tool semantics so agents can chain skills without surprise breakage.',
    ],
  },
];

function ColumnIcon({ kind }: { kind: Column['icon'] }) {
  const Icon = kind === 'agents' ? Bot : Users;
  return (
    <div className="flex h-11 w-11 items-center justify-center border border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)]">
      <Icon size={20} strokeWidth={2} />
    </div>
  );
}

export function BuiltForBoth() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Built for both
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-[-0.04em] text-[var(--color-fg)] md:text-6xl">
            Humans and agents, same artifact.
          </h2>
          <p className="max-w-xl text-base text-[var(--color-muted)]">
            One SKILL.md powers a public chat for fans and a per-call MCP endpoint for agents. You
            write it once.
          </p>
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          {COLUMNS.map((col) => (
            <div
              key={col.eyebrow}
              className="flex flex-col gap-5 border border-[var(--color-border)] bg-[var(--color-bg)] p-7"
            >
              <ColumnIcon kind={col.icon} />
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
                {col.eyebrow}
              </span>
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-fg)]">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted)]"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 bg-[var(--color-accent)]"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
