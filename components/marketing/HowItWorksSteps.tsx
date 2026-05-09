interface Step {
  n: number;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    n: 1,
    title: 'Write a SKILL.md.',
    body:
      'Drop your blog, podcast transcripts, talks, anything. Effable distills it into a structured Anthropic-spec SKILL.md you can edit.',
  },
  {
    n: 2,
    title: 'Publish to MCP.',
    body:
      'One click and your skill is live at mcp.effable.me/{your-handle}. Agents discover it via the standard MCP directory.',
  },
  {
    n: 3,
    title: 'Get paid per call.',
    body:
      'Every query — human or agent — settles in USDC on Base via x402. You keep ≥80%. We keep the lights on.',
  },
];

export function HowItWorksSteps() {
  return (
    <section className="border-t border-[var(--color-border)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
            How it works
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-[-0.04em] text-[var(--color-fg)] md:text-6xl">
            From notebook to MCP endpoint.
          </h2>
        </div>

        <div className="grid gap-0 md:grid-cols-3 md:[&>*+*]:border-l-0">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-bg)] p-7"
            >
              <div className="font-mono text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
                {`No. ${String(step.n).padStart(2, '0')}`}
              </div>
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-fg)]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
