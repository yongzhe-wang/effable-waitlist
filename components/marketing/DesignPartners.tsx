// MOCKUP DATA — these creators have NOT signed on as design partners.
// Replace with real signed partners (or remove section) before public launch.
// Right-of-publicity risk: implying endorsement from public figures who
// haven't agreed is a real legal concern. See CLAUDE.md / PRD §6 for context.

interface Partner {
  name: string;
  handle: string;
  bio: string;
}

const PARTNERS: Partner[] = [
  {
    name: 'Simon Willison',
    handle: '@simonw',
    bio: 'Datasette, co-creator of Django',
  },
  {
    name: 'Hamel Husain',
    handle: '@HamelHusain',
    bio: 'Evals, ex-GitHub/Airbnb',
  },
  {
    name: 'Andrej Karpathy',
    handle: '@karpathy',
    bio: 'ex-Tesla, ex-OpenAI',
  },
  {
    name: 'Lilian Weng',
    handle: '@lilianweng',
    bio: 'ex-OpenAI safety',
  },
];

/**
 * Design-partner card grid for the marketing page. Avatars are proxied through
 * unavatar.io against each creator's Twitter handle so we don't need to host
 * portrait assets ourselves. `referrerPolicy="no-referrer"` prevents leaking
 * the effable.me referrer to the third-party CDN; `loading="lazy"` keeps the
 * grid out of the first paint critical path.
 */
export function DesignPartners() {
  return (
    <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-4">
      {PARTNERS.map((partner) => {
        const twitterHandle = partner.handle.replace(/^@/, '');
        const avatarSrc = `https://unavatar.io/twitter/${twitterHandle}`;
        return (
          <div
            key={partner.handle}
            className="flex flex-col items-center gap-3 border border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center transition-colors hover:bg-[var(--color-surface)]"
          >
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-fg)] text-[var(--color-bg)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarSrc}
                alt=""
                aria-hidden="true"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-display text-[20px] font-semibold leading-tight text-[var(--color-fg)]">
                {partner.name}
              </span>
              <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-muted)]">
                {partner.handle}
              </span>
            </div>
            <p className="text-[14px] leading-snug text-[var(--color-muted)]">
              {partner.bio}
            </p>
          </div>
        );
      })}
    </div>
  );
}
