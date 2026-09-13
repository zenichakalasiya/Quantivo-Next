'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WORK } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * Home / Work — two continuously-scrolling rows, drifting opposite ways, where
 * hovering a tile expands it Klarna-style.
 *
 * ── Why the marquee is a GSAP tween in PIXELS, not a CSS percentage ──────────
 * The obvious approach is the site's existing `qvMarquee` keyframe, which
 * translates a doubled track by -50%. It cannot work here: that 50% resolves
 * against the track's OWN width, so the moment a hovered tile widens, the
 * translation distance changes underneath the animation and the whole row jumps
 * sideways.
 *
 * Tweening `x` to a measured pixel distance instead keeps the offset fixed no
 * matter what the content does. The row then reflows around the expanding tile —
 * tiles to its right slide along, which is exactly the accordion behaviour the
 * reference shows — while the track itself stays put.
 *
 * ── The loop ─────────────────────────────────────────────────────────────────
 * Each row renders its tiles TWICE and travels exactly one copy's width before
 * repeating, so the seam never shows. The distance is measured after layout
 * rather than assumed, and re-measured on resize, because the tiles are sized in
 * clamp() units that change with the viewport.
 *
 * ── Hover ────────────────────────────────────────────────────────────────────
 * Hovering pauses that row's tween and expands the tile. Pausing is not a nicety:
 * a tile sliding out from under the pointer would expand and collapse
 * repeatedly, and its buttons could not be clicked.
 *
 * Duplicated tiles are aria-hidden and taken out of the tab order — they are the
 * same six projects a second time, and a screen reader should not meet them
 * twice.
 */
const ROW_H = 'clamp(175px,25vh,290px)';
const TILE_W = 'clamp(190px,19vw,300px)';
const TILE_W_OPEN = 'clamp(320px,38vw,600px)';
const EASE = 'cubic-bezier(.22,1,.36,1)';
/** Pixels per second the rows drift. */
const SPEED = 34;

/** Row two runs the projects in a different order so the rows do not mirror. */
const ROW_A = WORK;
const ROW_B = [...WORK].slice(3).concat([...WORK].slice(0, 3));

export function WorkRail() {
  const router = useRouter();
  const goWork = () => { router.push('/work'); scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <section data-screen-label="Home / Work" style={{ padding: 'clamp(44px,5.5vw,88px) 0', borderTop: '1px solid var(--line)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px', padding: '0 clamp(16px,3.4vw,48px) clamp(20px,2.6vw,38px)' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>06 — Our Portfolio</span>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,6.6vw,116px)', lineHeight: '.9', maxWidth: '22ch' }}>Work That Speaks for Itself.</h2>
        <p data-anim="up" style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '52ch' }}>Every project is an opportunity to solve a problem, communicate something meaningful, and create something memorable.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.2vw,18px)' }}>
        <Row items={ROW_A} dir={-1} onOpen={goWork} />
        <Row items={ROW_B} dir={1} onOpen={goWork} />
      </div>
    </section>
  );
}

function Row({ items, dir, onOpen }: { items: typeof WORK; dir: 1 | -1; onOpen: () => void }) {
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
      // One copy's width — measured, not assumed, because the tiles are sized in
      // clamp() units that change with the viewport.
      const span = track.current.scrollWidth / 2;
      if (!span) return;
      tween.current = gsapRef.fromTo(
        track.current,
        { x: dir < 0 ? 0 : -span },
        { x: dir < 0 ? -span : 0, duration: span / SPEED, ease: 'none', repeat: -1 },
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
  }, [dir]);

  return (
    <div
      style={{ overflow: 'hidden' }}
      onMouseEnter={() => tween.current?.pause()}
      onMouseLeave={() => { tween.current?.resume(); setOpen(null); }}
    >
      <div ref={track} style={{ display: 'flex', gap: 'clamp(10px,1.2vw,18px)', width: 'max-content', willChange: 'transform' }}>
        {[0, 1].map((copy) =>
          items.map((w) => {
            const key = `${copy}-${w.slot}`;
            return (
              <Tile
                key={key}
                w={w}
                dup={copy === 1}
                open={open === key}
                onEnter={() => setOpen(key)}
                onOpen={onOpen}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

function Tile({
  w, dup, open, onEnter, onOpen,
}: {
  w: (typeof WORK)[number];
  dup: boolean;
  open: boolean;
  onEnter: () => void;
  onOpen: () => void;
}) {
  return (
    <article
      onMouseEnter={onEnter}
      aria-hidden={dup || undefined}
      style={{
        position: 'relative',
        flex: '0 0 auto',
        width: open ? TILE_W_OPEN : TILE_W,
        height: ROW_H,
        borderRadius: 'clamp(14px,1.4vw,22px)',
        overflow: 'hidden',
        background: 'var(--bg2)',
        transition: `width .6s ${EASE}`,
        willChange: 'width',
      }}
    >
      <img
        src={asset(w.img)}
        alt=""
        style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <span style={{ position: 'absolute', inset: '0', background: 'linear-gradient(180deg,rgba(9,9,12,.05) 0%,rgba(9,9,12,.35) 52%,rgba(9,9,12,.88) 100%)', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px', padding: 'clamp(12px,1.1vw,18px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          {/* the chip is always on the tile */}
          <span style={{ padding: '6px 12px', borderRadius: '99px', background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.24)', color: '#fff', fontSize: '11px', fontWeight: '700', letterSpacing: '.08em', whiteSpace: 'nowrap' }}>{w.title}</span>
          <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.16em', color: 'rgba(255,255,255,.6)', opacity: open ? 1 : 0, transition: `opacity .4s ${EASE}` }}>{w.year}</span>
        </div>

        {/* revealed by the expansion. Kept mounted and clipped so it can animate;
            min-width:0 on the inner text stops it wrapping as the tile grows. */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: open ? '1fr' : '0fr',
            opacity: open ? 1 : 0,
            transition: `grid-template-rows .6s ${EASE}, opacity .4s ${EASE}`,
          }}
        >
          <div style={{ overflow: 'hidden', minWidth: '0' }}>
            <p style={{ margin: '0 0 10px', fontSize: '12px', lineHeight: '1.5', color: 'rgba(255,255,255,.85)', maxWidth: '44ch' }}>{w.disc}</p>
            <button
              onClick={onOpen}
              tabIndex={open && !dup ? 0 : -1}
              data-cursor="View"
              data-magnet=""
              style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '9px 16px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '10px', fontWeight: '700', letterSpacing: '.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
            >
              View case study
              <span aria-hidden="true" style={{ fontSize: '12px', lineHeight: '1' }}>&#8594;</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
