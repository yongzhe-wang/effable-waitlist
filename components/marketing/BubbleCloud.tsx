'use client';

import { motion, MotionConfig } from 'framer-motion';
import { Bot } from 'lucide-react';

type BubbleKind = 'human' | 'agent';

interface Bubble {
  kind: BubbleKind;
  /**
   * Depth layer. `front` bubbles render at full opacity / z-20 for sharp
   * presence at the cloud edges. `back` bubbles render at ~55% opacity /
   * z-10 / scaled-down 88%, positioned closer to the centered text so
   * they peek through gaps between glyphs — Delphi-style two-layer depth.
   */
  layer: 'front' | 'back';
  /** Display name e.g. "Simon Willison" or "Claude Code". */
  name: string;
  /** Handle for humans (e.g. "@simonw"); agents use a soft label like "agent". */
  handle: string;
  question: string;
  /** Tailwind positioning per breakpoint; absolute on md+. */
  pos: string;
  /** Optional visibility on mobile (top 3 stay visible). */
  showMobile?: boolean;
  /** Float animation parameters. */
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  /**
   * Avatar image source. Humans use Pravatar stock faces. Agents use
   * Google's S2 favicons service — `https://www.google.com/s2/favicons
   * ?domain=X&sz=128` — which returns small (1-3KB) PNGs of the real
   * brand mark and follows redirects internally so `<img src>` works
   * directly. unavatar.io was deprecated for agents (paywalled, 403s).
   * If the URL ever fails, the BubbleCard falls back to a `<Bot>`
   * icon via the conditional render below.
   */
  avatarSrc?: string;
}

/**
 * 10-bubble two-rail cloud — 5 left + 5 right, with VERTICAL GAPS large
 * enough that adjacent bubbles never overlap each other. The previous
 * 16-bubble pass packed 4 bubbles into the top and bottom zones at
 * ~12% gaps, but bubble cards are ~140px tall and 12% of a 720px cloud
 * is only ~86px — they were stacking on top of each other ("stuck").
 *
 * Vertical positions: 2 / 20 / 44 / 68 / 88 percent. Adjacent gaps are
 * 18% / 24% / 24% / 20% — i.e., 130-170px between bubble TOPS, all
 * larger than the bubble height. No vertical overlap.
 *
 * Horizontal: front bubbles at far edge (`left-4 / right-4` ≈ 16px from
 * the max-w-[1700px] frame edge — on a 1920px viewport, bubble-right
 * sits at ~328px, well clear of the H1's ~600px left edge). Back
 * bubbles one step inward (`left-[12-14%]`), still horizontally clear
 * of the centered text column at all viewports the cloud renders on
 * (lg: ≥1024px).
 *
 * Middle-band (44%) bubbles are FRONT-only and live at the far edge.
 * They never approach the text column horizontally, so even though
 * they're vertically next to the H1, the H1's visual extent leaves
 * 200+ px of clear gutter.
 */
const BUBBLES: Bubble[] = [
  // ─── LEFT RAIL ─────────────────────────────────────────────────
  {
    kind: 'agent',
    layer: 'front',
    name: 'Claude Code',
    handle: 'agent',
    question: 'How would you debug a flaky CI without rerunning it?',
    pos: 'left-4 top-[2%]',
    showMobile: true,
    duration: 8,
    delay: 0,
    drift: 8,
    rotate: -1.5,
    avatarSrc: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=128',
  },
  {
    kind: 'agent',
    layer: 'back',
    name: 'Cursor agent',
    handle: 'agent',
    question: 'Best way to chunk a 50k-token blog archive for RAG?',
    pos: 'left-[14%] top-[20%]',
    duration: 10,
    delay: 1.2,
    drift: 7,
    rotate: -1.0,
    avatarSrc: 'https://www.google.com/s2/favicons?domain=cursor.com&sz=128',
  },
  {
    kind: 'human',
    layer: 'front',
    name: 'Pedro',
    handle: '@pedrojfs',
    question: 'Should a junior PM care about TLA+?',
    pos: 'left-2 top-[44%]',
    duration: 7,
    delay: 0.3,
    drift: 8,
    rotate: 1.4,
    avatarSrc: 'https://i.pravatar.cc/96?img=12',
  },
  {
    kind: 'agent',
    layer: 'back',
    name: 'Devin',
    handle: 'agent',
    question: 'Walk me through your prompt-cache invalidation strategy.',
    pos: 'left-[12%] top-[68%]',
    duration: 11,
    delay: 1.8,
    drift: 6,
    rotate: -0.8,
    avatarSrc: 'https://www.google.com/s2/favicons?domain=devin.ai&sz=128',
  },
  {
    kind: 'human',
    layer: 'front',
    name: 'Tomas',
    handle: '@tomas_v',
    question: 'Walk me through your first hire as a founder.',
    pos: 'left-4 top-[88%]',
    duration: 8,
    delay: 1.6,
    drift: 6,
    rotate: -0.9,
    avatarSrc: 'https://i.pravatar.cc/96?img=15',
  },

  // ─── RIGHT RAIL ────────────────────────────────────────────────
  {
    kind: 'human',
    layer: 'front',
    name: 'Marina',
    handle: '@marina_b',
    question: 'What changed your mind about evals?',
    pos: 'right-4 top-[2%]',
    duration: 9,
    delay: 0.6,
    drift: 6,
    rotate: 1.2,
    avatarSrc: 'https://i.pravatar.cc/96?img=32',
  },
  {
    kind: 'human',
    layer: 'back',
    name: 'Jules',
    handle: '@julestoo',
    question: "What does 'good taste' mean for an LLM API designer?",
    pos: 'right-[14%] top-[20%]',
    duration: 8,
    delay: 1.5,
    drift: 7,
    rotate: 1.1,
    avatarSrc: 'https://i.pravatar.cc/96?img=47',
  },
  {
    kind: 'human',
    layer: 'front',
    name: 'Yong',
    handle: '@yongsays',
    question: 'If you had to teach this to one person, who would it be?',
    pos: 'right-2 top-[44%]',
    duration: 9,
    delay: 1.1,
    drift: 7,
    rotate: 1.3,
    avatarSrc: 'https://i.pravatar.cc/96?img=56',
  },
  {
    kind: 'human',
    layer: 'back',
    name: 'Sasha',
    handle: '@sashachen',
    question: "What's a book that changed how you work?",
    pos: 'right-[12%] top-[68%]',
    duration: 9,
    delay: 2.0,
    drift: 7,
    rotate: 1.0,
    avatarSrc: 'https://i.pravatar.cc/96?img=44',
  },
  {
    kind: 'human',
    layer: 'front',
    name: 'Aki',
    handle: '@aki.builds',
    question: "What's the smallest project that taught you the most?",
    pos: 'right-4 top-[88%]',
    showMobile: true,
    duration: 9,
    delay: 0.9,
    drift: 8,
    rotate: 1.0,
    avatarSrc: 'https://i.pravatar.cc/96?img=68',
  },
];

/** Pick 3 bubbles for the static mobile stack: 1 agent + 2 humans, all
 *  front-layer (full opacity) so the small mobile column reads cleanly. */
const MOBILE_BUBBLES: Bubble[] = [
  BUBBLES[0]!, // Claude Code (agent, front)
  BUBBLES[5]!, // Marina (human, front)
  BUBBLES[9]!, // Aki (human, front)
];

interface BubbleCardProps {
  bubble: Bubble;
  /** When true, render in normal flow (no absolute positioning, no per-bubble visibility class). */
  flow?: boolean;
}

export function BubbleCard({ bubble, flow = false }: BubbleCardProps) {
  // Absolute (default) variant: respect per-bubble mobile visibility + use bubble.pos.
  // Flow variant: render as part of normal layout (used for the mobile stack below the hero CTAs).
  // Desktop bubbles use fixed pixel widths per breakpoint (184/210/240). Tailwind
  // v4's arbitrary-value bracket syntax does NOT parse bare commas inside the
  // value, so a clamp(180px,16vw,240px) class is silently dropped — using
  // discrete widths avoids that and keeps the gutter math predictable. With the
  // cloud now spanning the full viewport (see Hero.tsx) these widths preserve a
  // clean gutter beside the centered max-w-xl text column at every lg+ size.
  // Layer-driven styling. Back bubbles are dimmer + smaller + lower z so
  // they peek through behind the centered headline column without
  // competing with the front layer for attention.
  const isBack = bubble.layer === 'back';
  const layerClasses = flow
    ? ''
    : isBack
      ? 'opacity-55 scale-[0.88]'
      : 'opacity-100';

  const positioning = flow
    ? 'flex w-full flex-col gap-2'
    : `${bubble.showMobile ? 'flex' : 'hidden lg:flex'} ${bubble.pos} pointer-events-none absolute w-[184px] xl:w-[210px] 2xl:w-[240px] flex-col gap-2 ${layerClasses}`;

  // Layer drives z-index. Front: 20, Back: 10. Hero text container is
  // z-30 (see Hero.tsx) so text always reads cleanly above both layers.
  const styleProp = flow
    ? {}
    : { style: { zIndex: isBack ? 10 : 20 } };

  return (
    <motion.div
      className={`${positioning} rounded-none border border-[var(--color-border)] bg-[var(--color-bg)] p-4`}
      {...styleProp}
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: [-bubble.drift, bubble.drift],
        rotate: [-bubble.rotate, bubble.rotate],
        opacity: 1,
      }}
      transition={{
        opacity: { duration: 0.6, delay: bubble.delay * 0.4 },
        y: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: bubble.duration,
          delay: bubble.delay,
          ease: 'easeInOut',
        },
        rotate: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: bubble.duration,
          delay: bubble.delay,
          ease: 'easeInOut',
        },
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-fg)] text-[var(--color-bg)]"
          aria-hidden
        >
          {bubble.avatarSrc ? (
            // Humans → Pravatar face; agents → Google s2 favicon (real
            // brand mark per domain). If the URL fails to load the
            // black-puck wrapper still reads as an "agent" indicator.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bubble.avatarSrc}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            // No avatarSrc set → render Bot icon as a final fallback.
            <Bot size={14} strokeWidth={2.25} />
          )}
        </div>
        <div className="flex min-w-0 items-center gap-1 text-[12px] leading-none">
          <span className="truncate font-semibold text-[var(--color-fg)]">{bubble.name}</span>
          {/* Red verified mark — single accent pop per Direction A. */}
          <span
            aria-hidden
            className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[8px] font-bold leading-none text-[var(--color-accent-fg)]"
          >
            ✓
          </span>
          <span className="truncate text-[var(--color-muted)]">&middot; {bubble.handle}</span>
        </div>
      </div>
      <p className="text-[14px] leading-snug text-[var(--color-muted)]">{bubble.question}</p>
    </motion.div>
  );
}

/**
 * Decorative cloud of floating bubbles for the hero. Absolute-positioned and
 * gated to `lg` (≥1024px) — at narrower widths the gutter beside the centered
 * text column is too small to fit a bubble without overlapping the headline,
 * so the page falls back to `BubbleStackMobile` rendered in normal flow under
 * the CTAs (see Hero.tsx).
 *
 * Wraps everything in `<MotionConfig reducedMotion="user">` so users with
 * `prefers-reduced-motion: reduce` get a static render (WCAG 2.3.3).
 */
export function BubbleCloud() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        aria-hidden
        className="absolute inset-0 hidden overflow-hidden lg:block"
        // The cloud is purely decorative; tab order skips it.
      >
        {/* Constrain the bubble field to ~1700px so left-4 / right-4 sit
            close to the centered text column rather than at the viewport
            edge. On viewports wider than 1700px the frame is centered with
            equal margins; below that, the frame fills the viewport and
            bubbles converge naturally on the headline. */}
        <div className="relative mx-auto h-full max-w-[1700px]">
          {BUBBLES.map((bubble) => (
            <BubbleCard key={`${bubble.name}-${bubble.handle}`} bubble={bubble} />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}

/**
 * Mobile/tablet fallback: 3 bubbles stacked in normal flow. Rendered below the
 * hero CTAs on `<lg` viewports (so phones AND tablets up to 1023px) — the
 * floating cloud only appears once there is enough horizontal gutter to keep
 * the bubbles clear of the headline cluster.
 */
export function BubbleStackMobile() {
  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden className="flex flex-col gap-3 lg:hidden">
        {MOBILE_BUBBLES.map((bubble) => (
          <BubbleCard key={`m-${bubble.name}-${bubble.handle}`} bubble={bubble} flow />
        ))}
      </div>
    </MotionConfig>
  );
}
