'use client';

import { useState } from 'react';
import { CAPABILITIES } from '@/data/content';

/**
 * About / section 2 — the four capabilities as a joined cluster of circles.
 *
 * The sticky note draws four circles connected by lines, so this is a diamond:
 * one circle at each compass point, with the connecting lines drawn as an SVG
 * rhombus BEHIND them.
 *
 * ── Why the lines are one SVG and not four rotated divs ──────────────────────
 * The joins have to stay attached to the circles at every viewport width. An
 * SVG with a `viewBox` and `preserveAspectRatio="none"` scales its geometry
 * with the box, so the rhombus tracks the circles automatically; rotated divs
 * would need their angle and length recomputed on every resize.
 *
 * Hovering or focusing a circle swaps the detail panel beside the cluster.
 * `active` never goes null — a panel that empties when the pointer leaves would
 * make the section flicker as you move between circles, and it would show
 * nothing at all on load.
 */
const POS = [
  { top: '0%', left: '50%' },     // 01 north
  { top: '50%', left: '100%' },   // 02 east
  { top: '100%', left: '50%' },   // 03 south
  { top: '50%', left: '0%' },     // 04 west
] as const;

const EASE = 'cubic-bezier(.22,1,.36,1)';

export function CapabilityCircles() {
  const [active, setActive] = useState(0);
  const cap = CAPABILITIES[active];

  return (
    <section data-screen-label="About / Capabilities" style={{ padding: 'clamp(48px,6vw,96px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: 'clamp(24px,3.4vw,52px)' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.6vw,72px)', lineHeight: '.94' }}>What We Do.</h2>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>Hover a circle</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(28px,5vw,90px)', alignItems: 'center' }}>
        {/* ---- the cluster ---- */}
        <div style={{ flex: '1 1 300px', display: 'grid', placeItems: 'center', minWidth: '0' }}>
          <div style={{ position: 'relative', width: 'min(100%, clamp(280px,34vw,430px))', aspectRatio: '1 / 1' }}>
            {/* joins, behind the circles */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              style={{ position: 'absolute', inset: '0', width: '100%', height: '100%' }}
            >
              <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="var(--line)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            </svg>

            {CAPABILITIES.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.n}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-cursor={c.title}
                  aria-pressed={on}
                  style={{
                    position: 'absolute',
                    top: POS[i].top,
                    left: POS[i].left,
                    transform: `translate(-50%,-50%) scale(${on ? 1.06 : 1})`,
                    width: 'clamp(116px,13vw,168px)',
                    height: 'clamp(116px,13vw,168px)',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    gap: '2px',
                    textAlign: 'center',
                    padding: '10px',
                    background: on ? 'var(--grad)' : 'var(--bg2)',
                    border: `1px solid ${on ? 'transparent' : 'var(--line)'}`,
                    color: on ? '#fff' : 'var(--ink)',
                    transition: `transform .5s ${EASE}, background .4s, border-color .4s, color .4s`,
                  }}
                >
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '700', letterSpacing: '.2em', opacity: on ? '.85' : '.55' }}>{c.n}</span>
                  <span style={{ display: 'block', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(15px,1.5vw,22px)', lineHeight: '1', letterSpacing: '.02em' }}>{c.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- detail for the active circle ---- */}
        <div style={{ flex: '1 1 320px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.8vh,20px)' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>{cap.n} — {cap.title}</span>
          <p style={{ fontSize: 'clamp(15px,1.25vw,19px)', lineHeight: '1.55', color: 'var(--ink)', margin: '0', maxWidth: '44ch' }}>{cap.body}</p>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '0', padding: '0', listStyle: 'none' }}>
            {cap.items.map((it) => (
              <li key={it} style={{ padding: '8px 15px', borderRadius: '99px', border: '1px solid var(--line)', fontSize: '12px', fontWeight: '600', color: 'var(--ink)' }}>{it}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
