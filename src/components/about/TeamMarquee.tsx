'use client';

import { useEffect, useRef, useState } from 'react';
import { TEAM } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * About / Our Team — a continuously scrolling row of team cards.
 *
 * Hovering a card darkens the portrait from the bottom up and brings in that
 * person's quote; the name and role beneath the card are always visible.
 *
 * ── The scroll is a GSAP tween on x in PIXELS ────────────────────────────────
 * Same reason as the Work marquee: the site's `qvMarquee` keyframe translates a
 * doubled track by -50%, and that 50% resolves against the track's own width.
 * Anything that changes a card's size mid-animation would shift the whole row.
 * A measured pixel distance is immune to that.
 *
 * The row renders its cards TWICE and travels exactly one copy's width per
 * cycle, so the seam never shows. The distance is measured after layout and
 * re-measured on resize, because the cards are sized in clamp() units.
 *
 * ── Hover pauses the row ─────────────────────────────────────────────────────
 * Not a nicety. A card sliding out from under the pointer would open and close
 * its quote repeatedly, and the quote would never be readable.
 *
 * Duplicate cards are aria-hidden — they are the same six people a second time,
 * and a screen reader should not meet them twice.
 */
const CARD_W = 'clamp(190px,19vw,272px)';
const EASE = 'cubic-bezier(.22,1,.36,1)';
/** Pixels per second the row drifts. */
const SPEED = 30;

export function TeamMarquee() {
  const track = useRef<HTMLDivElement>(null);
  const tween = useRef<{ pause: () => void; resume: () => void; kill: () => void } | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let gsapRef: typeof import('gsap')['gsap'] | null = null;

    const build = () => {
      if (!gsapRef || !track.current) return;
      tween.current?.kill();
      gsapRef.set(track.current, { x: 0 });
      const span = track.current.scrollWidth / 2;
      if (!span) return;
      tween.current = gsapRef.fromTo(
        track.current,
        { x: 0 },
        { x: -span, duration: span / SPEED, ease: 'none', repeat: -1 },
      );
    };

    (async () => {
      const { gsap } = await import('gsap');
      if (cancelled) return;
      gsapRef = gsap;
      build();
    })();

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(build, 180); };
    addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      clearTimeout(t);
      removeEventListener('resize', onResize);
      tween.current?.kill();
      tween.current = null;
    };
  }, []);

  return (
    <section data-screen-label="About / Team" style={{ padding: 'clamp(48px,6vw,96px) 0', borderTop: '1px solid var(--line)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', padding: '0 clamp(16px,3.4vw,48px)', marginBottom: 'clamp(24px,3.4vw,48px)' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.6vw,72px)', lineHeight: '.94' }}>Our Team.</h2>
      </div>

      <div
        style={{ overflow: 'hidden' }}
        onMouseEnter={() => tween.current?.pause()}
        onMouseLeave={() => { tween.current?.resume(); setOpen(null); }}
      >
        <div ref={track} style={{ display: 'flex', gap: 'clamp(10px,1.2vw,18px)', width: 'max-content', willChange: 'transform' }}>
          {[0, 1].map((copy) =>
            TEAM.map((m) => {
              const key = `${copy}-${m.slot}`;
              return (
                <Card
                  key={key}
                  m={m}
                  dup={copy === 1}
                  open={open === key}
                  onEnter={() => setOpen(key)}
                />
              );
            }),
          )}
        </div>
      </div>
    </section>
  );
}

function Card({
  m, dup, open, onEnter,
}: {
  m: (typeof TEAM)[number];
  dup: boolean;
  open: boolean;
  onEnter: () => void;
}) {
  return (
    <article
      onMouseEnter={onEnter}
      aria-hidden={dup || undefined}
      style={{ flex: '0 0 auto', width: CARD_W, display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 'clamp(12px,1.2vw,18px)', overflow: 'hidden', background: 'var(--bg2)' }}>
        <img
          src={asset(m.img)}
          alt=""
          style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* The portrait darkens from the bottom up. The gradient is opaque at the
            foot and clear at the head, so the fade has a direction rather than
            being a flat wash over the whole card. */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '0',
            background: 'linear-gradient(to top,rgba(9,9,12,.97) 22%,rgba(9,9,12,.86) 58%,rgba(9,9,12,.3) 100%)',
            opacity: open ? 1 : 0,
            transition: `opacity .5s ${EASE}`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: '0',
            right: '0',
            bottom: '0',
            padding: 'clamp(12px,1.1vw,18px)',
            opacity: open ? 1 : 0,
            transform: open ? 'none' : 'translateY(16px)',
            transition: `opacity .45s ${EASE} ${open ? '.1s' : '0s'}, transform .55s ${EASE}`,
            pointerEvents: 'none',
          }}
        >
          <p style={{ fontSize: 'clamp(11px,.85vw,13px)', lineHeight: '1.55', color: 'rgba(255,255,255,.92)', margin: '0' }}>&ldquo;{m.bio}&rdquo;</p>
        </div>
      </div>

      {/* name + role, always visible beneath the card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--ink)' }}>{m.name}</span>
        <span style={{ fontSize: '11px', lineHeight: '1.35', color: 'var(--mute)' }}>{m.role}</span>
      </div>
    </article>
  );
}
