'use client';

import { useState } from 'react';
import { ABOUT_VMW, CAPABILITIES } from '@/data/content';

/**
 * About / What We Do — the capability circles and the Vision / Mission / Why
 * accordion as ONE section, side by side.
 *
 * ── The circles pin ──────────────────────────────────────────────────────────
 * The cluster is `position: sticky` inside the flex row, so it holds in view
 * while the accordion scrolls up beside it. Sticky needs a parent taller than
 * itself to have anywhere to travel, and here that parent is the row — whose
 * height comes from the accordion column. Nothing measures or pins in JS.
 *
 * `align-items: flex-start` on the row matters: the default `stretch` would
 * make both columns the row's full height, and a sticky element that already
 * fills its parent has no travel at all.
 *
 * ── The circles flip ─────────────────────────────────────────────────────────
 * Front is the number and the capability name; the back is that capability's
 * sub-services. Deliberately NOT the lead line as well — it ends in a colon
 * introducing the list, so the list alone reads complete, and a paragraph does
 * not fit the narrow usable middle of a circle.
 *
 * A real 180deg flip here, unlike the home team cards' soft turn: the brief
 * asked for something instant and fast, so it is a short duration on a hard
 * ease with both faces backface-hidden.
 *
 * `perspective` sits on the element that DIRECTLY contains the rotating box —
 * on a grandparent it does nothing.
 */
const EASE = 'cubic-bezier(.22,1,.36,1)';
const FLIP_MS = 260;
const CIRCLE = 'clamp(126px,15vw,186px)';

/** Compass points of the diamond: 01 north, 02 east, 03 south, 04 west. */
const POS = [
  { top: '0%', left: '50%' },
  { top: '50%', left: '100%' },
  { top: '100%', left: '50%' },
  { top: '50%', left: '0%' },
] as const;

export function WhatWeDo() {
  return (
    <section data-screen-label="About / What We Do" style={{ padding: 'clamp(48px,6vw,96px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: 'clamp(24px,3.4vw,52px)' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.6vw,72px)', lineHeight: '.94' }}>What We Do.</h2>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>Hover a circle</span>
      </div>

      {/* flex-start, not stretch — see the note above about sticky travel */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'clamp(30px,5vw,86px)' }}>
        {/* ---- left: the cluster, pinned ---- */}
        <div style={{ flex: '1 1 320px', minWidth: '0', position: 'sticky', top: 'clamp(86px,13vh,132px)' }}>
          <div style={{ position: 'relative', width: 'min(100%, clamp(290px,32vw,440px))', aspectRatio: '1 / 1', margin: '0 auto' }}>
            {/* joins, behind the circles */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%' }}>
              <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="var(--line)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            </svg>

            {CAPABILITIES.map((c, i) => (
              <Circle key={c.n} c={c} pos={POS[i]} />
            ))}
          </div>
        </div>

        {/* ---- right: Vision / Mission / Why ---- */}
        <div style={{ flex: '1.15 1 360px', minWidth: '0' }}>
          <Accordion />
        </div>
      </div>
    </section>
  );
}

function Circle({ c, pos }: { c: (typeof CAPABILITIES)[number]; pos: (typeof POS)[number] }) {
  const [on, setOn] = useState(false);

  const face = {
    position: 'absolute',
    inset: '0',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    padding: '12px',
    textAlign: 'center',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  } as const;

  return (
    <div
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      tabIndex={0}
      data-cursor={c.title}
      aria-label={`${c.title}: ${c.items.join(', ')}`}
      style={{
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        transform: 'translate(-50%,-50%)',
        width: CIRCLE,
        height: CIRCLE,
        // perspective belongs on the direct parent of the rotating box
        perspective: '900px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: on ? 'rotateY(180deg)' : 'none',
          transition: `transform ${FLIP_MS}ms ${EASE}`,
        }}
      >
        {/* front */}
        <div style={{ ...face, background: 'var(--bg2)', border: '1px solid var(--line)' }}>
          <span style={{ display: 'grid', gap: '3px' }}>
            <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.2em', color: 'var(--mute)' }}>{c.n}</span>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(15px,1.5vw,21px)', lineHeight: '1.02', letterSpacing: '.02em', color: 'var(--ink)' }}>{c.title}</span>
          </span>
        </div>

        {/* back — the sub-services */}
        <div style={{ ...face, transform: 'rotateY(180deg)', background: 'var(--grad)', border: '1px solid transparent' }}>
          <ul style={{ display: 'grid', gap: '4px', margin: '0', padding: '0', listStyle: 'none' }}>
            {c.items.map((it) => (
              <li key={it} style={{ fontSize: 'clamp(9px,.72vw,11px)', fontWeight: '600', lineHeight: '1.25', color: '#fff' }}>{it}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Vision / Mission / Why. One row always open — closing the last one would
 * leave three bare lines.
 *
 * The body animates grid-template-rows 0fr -> 1fr because `height: auto` cannot
 * be transitioned and a fixed max-height has to be guessed: too small clips the
 * five-point Why row, too large makes the three-point Vision row ease for most
 * of the duration with nothing moving. The inner wrapper needs overflow:hidden
 * or the content simply spills out of the collapsed row.
 */
function Accordion() {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ borderTop: '1px solid var(--line)' }}>
      {ABOUT_VMW.map((row, i) => {
        const on = open === i;
        return (
          <div key={row.n} style={{ borderBottom: '1px solid var(--line)' }}>
            <button
              onClick={() => setOpen(i)}
              aria-expanded={on}
              data-cursor={on ? 'Open' : 'Expand'}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 'clamp(12px,2vw,28px)', padding: 'clamp(15px,2vh,24px) 0', background: 'transparent', textAlign: 'left' }}
            >
              <span style={{ flex: 'none', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(16px,1.5vw,24px)', lineHeight: '1', color: on ? 'var(--a)' : 'var(--mute)', transition: 'color .4s' }}>{row.n}.</span>
              <span style={{ flex: '1', minWidth: '0', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(24px,2.9vw,44px)', lineHeight: '1', letterSpacing: '.01em', color: 'var(--ink)' }}>{row.title}</span>
              <span aria-hidden="true" style={{ flex: 'none', width: '26px', height: '26px', display: 'grid', placeItems: 'center', color: on ? 'var(--a)' : 'var(--mute)', transform: on ? 'rotate(180deg)' : 'none', transition: `transform .5s ${EASE}, color .4s` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </span>
            </button>

            <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', transition: `grid-template-rows .6s ${EASE}` }}>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.8vh,18px)', padding: '0 0 clamp(18px,2.6vh,30px)', opacity: on ? 1 : 0, transition: `opacity .45s ${EASE}` }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(18px,1.8vw,27px)', lineHeight: '1.05', margin: '0', maxWidth: '22ch' }}>{row.head}</h3>
                    <p style={{ fontSize: 'clamp(13px,.95vw,15px)', lineHeight: '1.62', color: 'var(--mute)', margin: '0', maxWidth: '56ch' }}>{row.body}</p>
                  </div>

                  <ol style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
                    {row.points.map((p, k) => (
                      <li key={p.title} style={{ display: 'flex', gap: 'clamp(10px,1.4vw,20px)', padding: 'clamp(8px,1.2vh,12px) 0', borderTop: k === 0 ? 'none' : '1px solid var(--line)' }}>
                        <span style={{ flex: 'none', fontSize: '10px', fontWeight: '700', letterSpacing: '.14em', color: 'var(--mute)', paddingTop: '3px' }}>{String(k + 1).padStart(2, '0')}</span>
                        <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
                          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(15px,1.35vw,20px)', lineHeight: '1.05', letterSpacing: '.02em' }}>{p.title}</span>
                          <span style={{ fontSize: '12px', lineHeight: '1.5', color: 'var(--mute)' }}>{p.body}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
