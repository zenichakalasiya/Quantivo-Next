'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { HOME_TESTIMONIALS } from '@/data/content';

/**
 * Home / Testimonials — a three-card ring carousel.
 *
 * ── The ring ─────────────────────────────────────────────────────────────────
 * Three cards, three slots: centre (lit, full size) with one dimmed and shrunk
 * card either side. Advancing rotates which card holds the centre, and because
 * there are exactly three of them the set wraps — every card passes through all
 * three slots and back.
 *
 * Slot is derived, not stored: `(i - active + n) % n` gives 0 for the centre, 1
 * for the right, 2 for the left. One piece of state (`active`) drives the whole
 * thing, so the cards can never disagree with the dots about which is current.
 *
 * The cards are absolutely positioned and animate `transform` and `opacity`
 * only. Laying them out in flow and animating width or margins would relayout
 * three cards on every frame; transforms stay on the compositor.
 *
 * ── Why the DOM order never changes ──────────────────────────────────────────
 * Rotation is expressed purely as a change of transform. Reordering the DOM
 * instead would restart transitions and throw focus, and a screen reader would
 * be walked through the quotes in a different order each time.
 *
 * z-index has to be set explicitly: the centre card must paint above its
 * neighbours, and DOM order alone cannot express that when the centre moves.
 */
const N = HOME_TESTIMONIALS.length;
const AUTOPLAY_MS = 5200;
const EASE = 'cubic-bezier(.22,1,.36,1)';
/** How far the flanking cards sit from centre. */
const SPREAD = 'clamp(170px,21vw,330px)';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const hovering = useRef(false);

  useEffect(() => {
    setReduced(matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const go = useCallback((i: number) => setActive(((i % N) + N) % N), []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => { if (!hovering.current) go(active + 1); }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active, go, reduced]);

  return (
    <section data-screen-label="Home / Testimonials" style={{ padding: 'clamp(56px,7vw,112px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '16px', justifyContent: 'space-between', marginBottom: 'clamp(24px,3.4vw,48px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>05 — Testimonials</span>
          <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92' }}>What Clients Say.</h2>
        </div>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)', border: '1px dashed var(--line)', borderRadius: '99px', padding: '6px 12px' }}>Dummy copy</span>
      </div>

      {/* ---- the ring ---- */}
      <div
        onMouseEnter={() => { hovering.current = true; }}
        onMouseLeave={() => { hovering.current = false; }}
        style={{ position: 'relative', height: 'clamp(300px,40vh,380px)', overflow: 'hidden' }}
      >
        {HOME_TESTIMONIALS.map((t, i) => {
          const slot = (i - active + N) % N;        // 0 centre, 1 right, 2 left
          const side = slot === 0 ? 0 : slot === 1 ? 1 : -1;
          const centre = slot === 0;
          return (
            <article
              key={t.initial}
              aria-hidden={!centre}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 'min(100%, 480px)',
                transform: `translate(-50%,-50%) translateX(calc(${side} * ${SPREAD})) scale(${centre ? 1 : 0.84})`,
                opacity: centre ? 1 : 0.34,
                zIndex: centre ? 3 : 1,
                transition: reduced ? 'none' : `transform .7s ${EASE}, opacity .5s ${EASE}`,
                pointerEvents: centre ? 'auto' : 'none',
                background: 'var(--bg2)',
                border: '1px solid var(--line)',
                borderRadius: 'clamp(16px,1.6vw,24px)',
                padding: 'clamp(20px,2.2vw,32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(12px,1.4vh,18px)',
                boxShadow: centre ? '0 30px 70px -40px rgba(0,0,0,.9)' : 'none',
                willChange: 'transform, opacity',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span aria-hidden="true" style={{ flex: 'none', width: '38px', height: '38px', borderRadius: '50%', background: 'var(--grad)', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: "'Bebas Neue',sans-serif", fontSize: '18px', lineHeight: '1' }}>{t.initial}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--ink)' }}>{t.name}</span>
                  <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>{t.role}</span>
                </div>
              </div>

              <Stars n={t.rating} />

              <p style={{ fontSize: 'clamp(13px,1vw,15px)', lineHeight: '1.65', color: 'var(--mute)', margin: '0', flex: '1' }}>&ldquo;{t.quote}&rdquo;</p>

              <span style={{ fontSize: '11px', color: 'var(--mute)', opacity: '.75' }}>{t.when}</span>
            </article>
          );
        })}
      </div>

      {/* ---- dots ---- */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', paddingTop: 'clamp(16px,2.2vh,26px)' }}>
        {HOME_TESTIMONIALS.map((t, i) => (
          <button
            key={t.initial}
            onClick={() => go(i)}
            data-cursor="Go"
            aria-label={`Testimonial ${i + 1} of ${N}`}
            aria-current={i === active}
            style={{
              width: i === active ? '26px' : '7px',
              height: '7px',
              borderRadius: '99px',
              background: i === active ? 'var(--grad)' : 'var(--line)',
              transition: `width .45s ${EASE}, background .3s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

/** Rating row. The label carries the number so it is not a row of bare glyphs. */
function Stars({ n }: { n: number }) {
  return (
    <span role="img" aria-label={`${n} out of 5`} style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style={{ display: 'block' }}>
          <path
            d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.45l-5.8 3.05 1.1-6.47-4.7-4.58 6.5-.95z"
            fill={i < n ? 'var(--a)' : 'var(--line)'}
          />
        </svg>
      ))}
    </span>
  );
}
