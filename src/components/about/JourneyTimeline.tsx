'use client';

import { useEffect, useRef } from 'react';
import { JOURNEY } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * About / Our Journey — a vertical timeline, 2021 to 2025.
 *
 * Rows alternate either side of a centre rail: image left / text right, then
 * text left / image right. Content in both columns is pushed toward the rail
 * (justify-self end on the left, start on the right) so the eye follows a
 * single line down the middle rather than the page's outer edges.
 *
 * ── The rail fills as you scroll ─────────────────────────────────────────────
 * Two lines are stacked: a faint static one the full height, and a gradient one
 * over it scaled from scaleY(0) with `transform-origin: top`, scrubbed to the
 * section's scroll progress. Scaling a transform is free on the compositor,
 * where animating `height` would relayout the section every frame.
 *
 * The static line is what makes this safe to fail: if GSAP never loads, or
 * under prefers-reduced-motion where the effect returns early, the timeline
 * still reads as a timeline — it just does not fill.
 *
 * ── The alternation needs a media query ──────────────────────────────────────
 * Below ~860px two columns cannot hold both a legible image and a paragraph, so
 * the layout collapses to one column with the rail on the left. That rule lives
 * in globals.css (with !important, since these values are also set inline) —
 * there is no inline equivalent of a media query.
 */
const RAIL = 'clamp(28px,6vw,120px)';
/** Both columns share one width so the image and text edges line up down the page. */
const COL = 'clamp(220px,30vw,420px)';

export function JourneyTimeline() {
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
          '[data-journey-progress]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 72%', end: 'bottom 78%', scrub: 0.4 },
          },
        );

        gsap.utils.toArray<HTMLElement>('[data-journey-row]').forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 34,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 86%' },
          });
        });
      }, el);
    })();

    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section data-screen-label="About / Journey" style={{ padding: 'clamp(48px,6vw,96px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: 'clamp(26px,4vw,58px)' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.6vw,72px)', lineHeight: '.94' }}>Our Journey.</h2>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>2021 — 2025</span>
      </div>

      <div ref={root} style={{ position: 'relative' }}>
        {/* the rail: a faint full-height line, and a gradient one that fills */}
        <span data-journey-line="" aria-hidden="true" style={{ position: 'absolute', top: '0', bottom: '0', left: '50%', width: '1px', marginLeft: '-.5px', background: 'var(--line)' }} />
        <span data-journey-progress="" aria-hidden="true" style={{ position: 'absolute', top: '0', bottom: '0', left: '50%', width: '2px', marginLeft: '-1px', background: 'var(--grad)', transformOrigin: 'top', willChange: 'transform' }} />

        {JOURNEY.map((j, i) => {
          const imageLeft = i % 2 === 0;
          return (
            <div
              key={j.year}
              data-journey-row=""
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: RAIL,
                alignItems: 'center',
                paddingBottom: 'clamp(26px,4.5vh,58px)',
              }}
            >
              {/* dot on the rail, level with the row's content */}
              <span data-journey-dot="" aria-hidden="true" style={{ position: 'absolute', top: 'clamp(46px,7vh,78px)', left: '50%', width: '9px', height: '9px', marginLeft: '-4.5px', borderRadius: '50%', background: 'var(--a)', boxShadow: '0 0 0 4px var(--bg)' }} />

              {/* media */}
              <div style={{ gridColumn: imageLeft ? 1 : 2, justifySelf: imageLeft ? 'end' : 'start', width: '100%', maxWidth: COL }}>
                <img
                  src={asset(j.img)}
                  alt=""
                  style={{ display: 'block', width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: 'clamp(10px,1vw,16px)', border: '1px solid var(--line)' }}
                />
              </div>

              {/* text */}
              <div style={{ gridColumn: imageLeft ? 2 : 1, justifySelf: imageLeft ? 'start' : 'end', width: '100%', maxWidth: COL, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,3.2vw,52px)', lineHeight: '1', letterSpacing: '.02em', color: 'var(--ink)' }}>{j.year}</span>
                <p style={{ fontSize: 'clamp(13px,1vw,16px)', lineHeight: '1.65', color: 'var(--mute)', margin: '0' }}>{j.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
