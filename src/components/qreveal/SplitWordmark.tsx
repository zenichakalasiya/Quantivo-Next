'use client';

import { useEffect, useRef } from 'react';

/**
 * Oversized wordmark that splits apart as the footer scrolls in:
 *
 *     QUAN  <--- left                    right --->  TIVO
 *
 * Both halves are deliberately cropped by the viewport edges — they run
 * off-screen, which is the point (the reference does the same with BULLET|PROOF).
 * Scrubbed to scroll progress rather than played on a timer, so it tracks the
 * user's scroll exactly and reverses on the way back up.
 */
export function SplitWordmark() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          '[data-word-left]',
          { xPercent: 18 },
          {
            xPercent: -14,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 0.5 },
          },
        );
        gsap.fromTo(
          '[data-word-right]',
          { xPercent: -18 },
          {
            xPercent: 14,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 0.5 },
          },
        );
      }, el);
    })();

    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  const word = {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: 'clamp(70px,15vw,240px)',
    lineHeight: '.82',
    letterSpacing: '.01em',
    color: 'var(--ink)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  } as const;

  return (
    <div
      ref={root}
      aria-hidden="true"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg2)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 'clamp(20px,6vw,120px)',
        paddingTop: 'clamp(20px,4vw,60px)',
      }}
    >
      {/* The name splits against itself now that "Digital" is gone from the
          brand — same treatment the reference gives BULLET | PROOF. */}
      <span data-word-left="" style={word}>QUAN</span>
      <span data-word-right="" style={word}>TIVO</span>
    </div>
  );
}
