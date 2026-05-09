import { WaitlistForm } from './WaitlistForm';
import { BubbleCloud, BubbleStackMobile } from './BubbleCloud';

interface Props {
  /**
   * Total visible waitlist count (= 286 base offset + real DB rows).
   * Server-fetched at request time in app/page.tsx and passed in so
   * each render reflects the live number — every real signup makes
   * the next visitor's page show a higher count.
   */
  waitlistCount: number;
}

export function Hero({ waitlistCount }: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 md:pb-28 md:pt-20">
        {/* Floating bubble cloud sits behind the centered headline (lg+ only).
            Below 1024px the gutter is too narrow for a bubble without overlap,
            so the cloud is gated to lg and BubbleStackMobile renders inline. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[640px] md:block md:h-[720px]">
          <BubbleCloud />
        </div>

        <div className="relative z-30 mx-auto flex max-w-2xl flex-col items-center gap-6 pt-12 text-center md:pt-40">
          <h1 className="font-display text-[64px] font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--color-fg)] md:text-[120px]">
            Effable<span className="text-[var(--color-accent)]"> me.</span>
          </h1>
          <p className="text-[20px] font-medium leading-snug text-[var(--color-muted)] md:text-[30px]">
            Bottle the way you think.
          </p>
          <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            Turn your tacit knowledge into a SKILL.md any agent can call. Get paid in USDC per query.
          </p>

          <div id="waitlist" className="mt-2 w-full max-w-md scroll-mt-20">
            <WaitlistForm />
            <p className="mt-3 font-mono text-[12px] uppercase tracking-widest text-[var(--color-muted)]">
              {waitlistCount.toLocaleString()} creators on the waitlist · effable me.
            </p>
          </div>

          {/* Mobile/tablet static stack: 3 bubbles below the form. */}
          <div className="mt-8 w-full lg:hidden">
            <BubbleStackMobile />
          </div>
        </div>
      </div>
    </section>
  );
}
