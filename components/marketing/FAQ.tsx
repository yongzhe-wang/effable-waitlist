interface FAQEntry {
  q: string;
  a: string;
}

const ENTRIES: FAQEntry[] = [
  {
    q: 'What is Effable?',
    a:
      "Effable lets creators package their expertise as a SKILL.md — a plain-text artifact agents like Claude, Cursor, and Devin can call. Pay-per-call settles in USDC.",
  },
  {
    q: 'When does the waitlist open up?',
    a:
      "We're rolling out access in waves through the spring. Earlier signups get earlier invites.",
  },
  {
    q: 'What is MCP?',
    a:
      "Model Context Protocol — Anthropic's open standard for how LLM hosts call external tools and resources. It's how your skill talks to the agent.",
  },
  {
    q: 'How do I get paid?',
    a:
      'x402 settles per call in USDC on Base; subscriptions go through Stripe Connect. Daily payouts.',
  },
  {
    q: 'Will you use my email for anything else?',
    a:
      'Only to invite you to early access. No newsletters, no third-party sharing.',
  },
];

export function FAQ() {
  return (
    <section className="border-t border-[var(--color-border)] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
            FAQ
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-[-0.04em] text-[var(--color-fg)] md:text-6xl">
            Questions, answered.
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {ENTRIES.map((entry) => (
            <details
              key={entry.q}
              className="group [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold text-[var(--color-fg)] md:text-lg">
                <span>{entry.q}</span>
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center border border-[var(--color-fg)] text-[var(--color-fg)] transition-transform group-open:rotate-45"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 1V11M1 6H11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="pb-6 pr-12 text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
                {entry.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
