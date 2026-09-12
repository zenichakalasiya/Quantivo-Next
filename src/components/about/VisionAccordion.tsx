'use client';

import { useState } from 'react';
import { ABOUT_VMW } from '@/data/content';

/**
 * About / section 3 — Vision, Mission and Why Quantivo as one accordion.
 *
 * The sticky note draws them as a single stacked list with rules between and a
 * chevron per row, so this is one accordion with three rows rather than three
 * separate panels. One row is always open; closing the last open row would
 * leave the section as three bare lines.
 *
 * ── Why the body animates grid-template-rows ─────────────────────────────────
 * `height: auto` cannot be transitioned, and a fixed max-height has to be
 * guessed — too small clips the longest row, too large makes the short rows
 * ease for most of the duration with nothing moving. A 0fr → 1fr grid row
 * animates to the content's true height, whatever that turns out to be, so the
 * Why row (five points) and the Vision row (three) both feel the same.
 *
 * The inner wrapper needs `overflow: hidden` for that to work: the grid row is
 * what shrinks, and without it the content simply overflows the collapsed row.
 */
const EASE = 'cubic-bezier(.22,1,.36,1)';

export function VisionAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section data-screen-label="About / Vision, Mission & Why" style={{ padding: 'clamp(48px,6vw,96px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.6vw,72px)', lineHeight: '.94', marginBottom: 'clamp(22px,3vw,44px)' }}>Vision, Mission &amp; Why.</h2>

      <div style={{ borderTop: '1px solid var(--line)' }}>
        {ABOUT_VMW.map((row, i) => {
          const on = open === i;
          return (
            <div key={row.n} style={{ borderBottom: '1px solid var(--line)' }}>
              <button
                onClick={() => setOpen(i)}
                aria-expanded={on}
                data-cursor={on ? 'Open' : 'Expand'}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(14px,3vw,48px)',
                  padding: 'clamp(18px,2.4vh,30px) 0',
                  background: 'transparent',
                  textAlign: 'left',
                }}
              >
                <span style={{ flex: 'none', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2vw,32px)', lineHeight: '1', color: on ? 'var(--a)' : 'var(--mute)', transition: 'color .4s' }}>{row.n}.</span>
                <span style={{ flex: '1', minWidth: '0', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,4vw,64px)', lineHeight: '1', letterSpacing: '.01em', color: 'var(--ink)' }}>{row.title}</span>
                <span
                  aria-hidden="true"
                  style={{ flex: 'none', width: '30px', height: '30px', display: 'grid', placeItems: 'center', color: on ? 'var(--a)' : 'var(--mute)', transform: on ? 'rotate(180deg)' : 'none', transition: `transform .5s ${EASE}, color .4s` }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', transition: `grid-template-rows .6s ${EASE}` }}>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(18px,3vw,56px)', padding: '0 0 clamp(22px,3vh,38px)', opacity: on ? 1 : 0, transition: `opacity .45s ${EASE}` }}>
                    <div style={{ flex: '1 1 300px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2vw,32px)', lineHeight: '1.05', margin: '0', maxWidth: '20ch' }}>{row.head}</h3>
                      <p style={{ fontSize: 'clamp(14px,1.05vw,17px)', lineHeight: '1.65', color: 'var(--mute)', margin: '0', maxWidth: '54ch' }}>{row.body}</p>
                    </div>

                    <ol style={{ flex: '1 1 320px', minWidth: '0', margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
                      {row.points.map((p, k) => (
                        <li key={p.title} style={{ display: 'flex', gap: 'clamp(12px,1.6vw,26px)', padding: 'clamp(9px,1.4vh,14px) 0', borderTop: k === 0 ? 'none' : '1px solid var(--line)' }}>
                          <span style={{ flex: 'none', fontSize: '11px', fontWeight: '700', letterSpacing: '.14em', color: 'var(--mute)', paddingTop: '3px' }}>{String(k + 1).padStart(2, '0')}</span>
                          <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(16px,1.5vw,23px)', lineHeight: '1.05', letterSpacing: '.02em' }}>{p.title}</span>
                            <span style={{ fontSize: '13px', lineHeight: '1.55', color: 'var(--mute)' }}>{p.body}</span>
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
    </section>
  );
}
