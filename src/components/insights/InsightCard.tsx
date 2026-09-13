'use client';

import { useState } from 'react';
import { ARTICLES } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * An insight card.
 *
 * ── The one idea the card is built around ────────────────────────────────────
 * The cover image is NOT a thumbnail sitting beside the text. It fills the whole
 * card, edge to edge, and an opaque panel is laid over its left two-thirds — so
 * at rest you only see a vertical strip of picture down the right-hand side.
 *
 * On hover that panel's background drops to a translucent tint, and the image
 * that was there all along reads through at full width, with the copy sitting
 * over it. Nothing moves, nothing is swapped in: the picture is simply uncovered.
 *
 * Two details make it work:
 *
 *  - The panel keeps its geometry. Only its `background` transitions. Animating
 *    its width instead would reflow the text mid-hover and the lines would
 *    rewrap, which reads as a glitch rather than a reveal.
 *
 *  - The panel's RIGHT corners are rounded, so the image behind curves into view
 *    at the join. That is what gives the resting state the look of a separate,
 *    rounded picture tile without there being one.
 *
 * ── Why the hover state is TWO layers, not one changing colour ───────────────
 * The hovered state is a horizontal wash: solid at the left edge where the copy
 * starts, thinning across the card, gone by the right edge so it dissolves into
 * the photograph with no seam. The resting state is a flat opaque panel.
 *
 * A gradient and a flat colour cannot be interpolated, so a single element
 * transitioning `background` between them would snap rather than fade. Instead
 * the two states are separate layers that cross-fade on OPACITY:
 *
 *   image  — the cover, whole card
 *   wash   — the gradient, whole card, 0 → 1 on hover
 *   panel  — the flat resting cover, left portion only, 1 → 0 on hover
 *   copy   — on top of all of it, never fading
 *
 * The panel taking its rounded corners with it as it goes is the point: at rest
 * you see a rounded tile, and by the time the wash is fully in there is no tile
 * edge left anywhere — just copy on a picture that gets lighter to the right.
 *
 * ── Legibility ───────────────────────────────────────────────────────────────
 * The wash cannot be one fixed set of rgba stops, because the copy stays in
 * `var(--ink)` — over a photograph, dark ink needs a light wash and light ink
 * needs a dark one. `--ins-wash` in globals.css carries the right one per theme.
 */
const EASE = 'cubic-bezier(.22,1,.36,1)';

/** How much of the card the text panel covers at rest. */
const PANEL_W = '64%';
/** Inset of the image and the panel from the card edge. */
const PAD = 6;
const R_CARD = 20;
const R_INNER = R_CARD - PAD;

/** The date line. A monospace face is the one place the card borrows a third
 *  typeface — it is metadata, and it reads as metadata. */
const MONO = "ui-monospace,'SFMono-Regular',Menlo,Consolas,monospace";

export function InsightCard({ a, onOpen }: { a: (typeof ARTICLES)[number]; onOpen: () => void }) {
  const [on, setOn] = useState(false);

  return (
    <article
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{ display: 'flex', minWidth: '0' }}
    >
      <button
        onClick={onOpen}
        onFocus={() => setOn(true)}
        onBlur={() => setOn(false)}
        data-cursor="Read"
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          minHeight: 'clamp(232px,19vw,286px)',
          borderRadius: `${R_CARD}px`,
          border: '1px solid var(--line)',
          background: 'var(--bg2)',
          overflow: 'hidden',
          textAlign: 'left',
          transform: on ? 'translateY(-4px)' : 'none',
          boxShadow: on ? '0 18px 44px rgba(0,0,0,.28)' : '0 0 0 rgba(0,0,0,0)',
          transition: `transform .5s ${EASE}, box-shadow .5s ${EASE}, border-color .4s`,
        }}
      >
        {/* the cover, full card, always there */}
        <span style={{ position: 'absolute', inset: `${PAD}px`, borderRadius: `${R_INNER}px`, overflow: 'hidden', background: 'var(--bg)' }}>
          <img
            src={asset(a.img)}
            alt=""
            style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: on ? 'scale(1.05)' : 'none', transition: `transform .8s ${EASE}` }}
          />
        </span>

        {/* the wash: whole card, strong at the left edge, gone at the right */}
        <span
          aria-hidden="true"
          style={{ position: 'absolute', inset: `${PAD}px`, borderRadius: `${R_INNER}px`, background: 'var(--ins-wash)', opacity: on ? 1 : 0, transition: 'opacity .45s ease', pointerEvents: 'none' }}
        />

        {/* the flat panel that hides the cover at rest, corners and all */}
        <span
          aria-hidden="true"
          style={{ position: 'absolute', left: `${PAD}px`, top: `${PAD}px`, bottom: `${PAD}px`, width: PANEL_W, borderRadius: `${R_INNER}px`, background: 'var(--bg2)', opacity: on ? 0 : 1, transition: 'opacity .4s ease', pointerEvents: 'none' }}
        />

        {/* the copy, over both */}
        <span
          style={{
            position: 'absolute',
            left: `${PAD}px`,
            top: `${PAD}px`,
            bottom: `${PAD}px`,
            width: PANEL_W,
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
            padding: 'clamp(15px,1.5vw,21px)',
          }}
        >
          {/* Read time lives HERE, not over the picture. Out there it sat on
              whatever the cover happened to be, and over a light photograph
              white text with a shadow is still unreadable. */}
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: MONO, fontSize: 'clamp(10.5px,.8vw,12px)', letterSpacing: '.04em', color: 'var(--mute)' }}>
            {a.posted}
            <span aria-hidden="true" style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--mute)' }} />
            {a.read}
          </span>

          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,1.75vw,27px)', lineHeight: '1.02', letterSpacing: '.01em', color: 'var(--ink)' }}>{a.title}</h3>

          <p style={{ fontSize: 'clamp(12.5px,.95vw,14px)', lineHeight: '1.55', color: on ? 'var(--ink)' : 'var(--mute)', transition: 'color .4s' }}>{a.desc}</p>

          {/* author row, pinned to the foot the way the reference has it */}
          <span style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '9px', paddingTop: '10px' }}>
            <span aria-hidden="true" style={{ flex: 'none', width: '19px', height: '19px', borderRadius: '50%', background: 'var(--grad)' }} />
            <span style={{ flex: '1', minWidth: '0', fontSize: 'clamp(11.5px,.85vw,13px)', fontWeight: '600', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.author}</span>
            <span
              aria-hidden="true"
              style={{ flex: 'none', display: 'grid', placeItems: 'center', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--ink)', color: 'var(--bg)', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(-6px)', transition: `opacity .35s ${EASE}, transform .4s ${EASE}` }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </span>
        </span>

        {/* the category, over the strip of image on the right. It carries its
            own dark pill because it is the one label that sits on a photograph
            we do not control. */}
        <span style={{ position: 'absolute', right: 'clamp(13px,1.2vw,17px)', top: 'clamp(13px,1.2vw,17px)', padding: '5px 11px', borderRadius: '99px', background: 'rgba(9,9,12,.66)', border: '1px solid rgba(255,255,255,.26)', fontSize: 'clamp(9px,.7vw,10px)', fontWeight: '700', letterSpacing: '.14em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap' }}>{a.cat}</span>
      </button>
    </article>
  );
}
