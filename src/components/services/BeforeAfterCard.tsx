'use client';

import { useRef, useState } from 'react';
import { WORK } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * A work card that holds both states of the project — click to swap between the
 * finished work and what was there before it.
 *
 * ── The badge follows the pointer ────────────────────────────────────────────
 * The label that says which state you are about to get is a disc tracking the
 * cursor over the image, not a button parked in a corner. It reads as part of
 * the picture, and it means the whole image is the control rather than one small
 * target inside it.
 *
 * It is positioned from a ref + `getBoundingClientRect` on pointer move rather
 * than from React state on every pixel — state would re-render the card (and its
 * two large images) on every mouse event. Writing to `style.transform` directly
 * touches one element and stays on the compositor.
 *
 * ── Both images are always mounted ───────────────────────────────────────────
 * The before is stacked under the after and revealed by fading the after out.
 * Swapping one `src` would show a blank frame on the first click while the
 * second file downloads, which is the one moment the effect needs to feel
 * instant.
 *
 * THE BEFORE IMAGES ARE NOT REAL. They are the same photograph desaturated,
 * flattened and softened (see scripts in the handoff) so the mechanism can be
 * demonstrated. Replace `/img/before/*` with genuine client screenshots before
 * this page goes in front of anyone.
 */
const EASE = 'cubic-bezier(.22,1,.36,1)';

export function BeforeAfterCard({
  w, before, onOpen,
}: {
  w: (typeof WORK)[number];
  before: string;
  onOpen: () => void;
}) {
  const [showBefore, setShowBefore] = useState(false);
  const [on, setOn] = useState(false);
  const frame = useRef<HTMLSpanElement>(null);
  const badge = useRef<HTMLSpanElement>(null);

  const track = (e: React.MouseEvent) => {
    const f = frame.current;
    const b = badge.current;
    if (!f || !b) return;
    const r = f.getBoundingClientRect();
    b.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px) translate(-50%,-50%)`;
  };

  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.4vh,18px)', minWidth: '0' }}>
      <span
        ref={frame}
        onMouseEnter={() => setOn(true)}
        onMouseLeave={() => setOn(false)}
        onMouseMove={track}
        onClick={() => setShowBefore((v) => !v)}
        data-cursor=""
        style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '4 / 3', borderRadius: 'clamp(14px,1.4vw,22px)', overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)', cursor: 'pointer' }}
      >
        <img src={asset(before)} alt={`${w.title} — before`} style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <img
          src={asset(w.img)}
          alt={`${w.title} — after`}
          style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: showBefore ? 0 : 1, transition: `opacity .55s ${EASE}` }}
        />

        {/* which state you are looking at now */}
        <span style={{ position: 'absolute', left: 'clamp(12px,1.2vw,18px)', top: 'clamp(12px,1.2vw,18px)', padding: '6px 13px', borderRadius: '99px', background: 'rgba(9,9,12,.66)', border: '1px solid rgba(255,255,255,.28)', fontSize: 'clamp(9px,.7vw,10.5px)', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', color: '#fff' }}>
          {showBefore ? 'Before' : 'After'}
        </span>

        {/* the disc that follows the pointer */}
        <span
          ref={badge}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            display: 'grid',
            placeItems: 'center',
            gap: '1px',
            width: 'clamp(96px,9vw,132px)',
            height: 'clamp(96px,9vw,132px)',
            borderRadius: '50%',
            background: 'var(--grad)',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '1.25',
            pointerEvents: 'none',
            opacity: on ? 1 : 0,
            scale: on ? '1' : '.7',
            transition: `opacity .3s ease, scale .38s ${EASE}`,
          }}
        >
          <span style={{ fontSize: 'clamp(8.5px,.68vw,10px)', fontWeight: '700', letterSpacing: '.14em', textTransform: 'uppercase', opacity: '.86' }}>Click to see</span>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(17px,1.5vw,23px)', letterSpacing: '.03em' }}>{showBefore ? 'After' : 'Before'}</span>
        </span>
      </span>

      {/* name + link + tags, under the picture */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(9px,1.1vh,13px)' }}>
        <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(22px,2vw,30px)', lineHeight: '1.06', letterSpacing: '.02em', margin: '0' }}>{w.title}</h3>

        <button onClick={onOpen} data-cursor="Case study" style={{ alignSelf: 'start', display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'clamp(12px,.95vw,15px)', fontWeight: '600', color: 'var(--mute)' }}>
          View work
          <span aria-hidden="true" style={{ display: 'block', width: '34px', height: '1.2px', borderRadius: '2px', background: 'currentColor' }} />
        </button>

        <p style={{ fontSize: 'clamp(12.5px,.95vw,15px)', lineHeight: '1.6', color: 'var(--mute)', margin: '0', maxWidth: '46ch' }}>{w.disc}</p>

        <span style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
          {w.tags.map((t) => (
            <span key={t} style={{ padding: '7px 14px', borderRadius: '99px', border: '1px solid var(--line)', fontSize: 'clamp(10px,.75vw,11.5px)', fontWeight: '600', color: 'var(--mute)', whiteSpace: 'nowrap' }}>{t}</span>
          ))}
        </span>
      </div>
    </article>
  );
}
