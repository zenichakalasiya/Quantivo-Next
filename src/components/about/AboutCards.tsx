'use client';

import { useState } from 'react';
import { ABOUT_CARDS } from '@/data/content';

/**
 * About / section 1 — three cards side by side, one widening on hover.
 *
 * ── Why flex-grow and not width ──────────────────────────────────────────────
 * The three cards share one row, and the row's width must not change as one of
 * them expands. Animating `flex-grow` does exactly that: the growth one card
 * takes is the growth the other two give up, so the row's total stays put and
 * nothing outside it reflows. Animating `width` instead would need the shrink
 * to be computed and kept in sync by hand.
 *
 * Card height is fixed for the same reason — if the hovered card grew taller,
 * every card below the section would jump as the pointer moved along the row.
 * The body copy is revealed inside that fixed height.
 *
 * At rest all three are equal and show eyebrow + title. Hovering reveals the
 * lead, the paragraphs and (on card 02) the belief lines.
 */
const EASE = 'cubic-bezier(.22,1,.36,1)';
const DUR = '.6s';

export function AboutCards() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section data-screen-label="About / About Quantivo" style={{ padding: 'clamp(48px,6vw,96px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: 'clamp(22px,3vw,42px)' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.6vw,72px)', lineHeight: '.94' }}>
          About <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Quantivo</span>
        </h2>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>Hover a card</span>
      </div>

      <div
        onMouseLeave={() => setOpen(null)}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,1.4vw,20px)', alignItems: 'stretch' }}
      >
        {ABOUT_CARDS.map((c, i) => {
          const on = open === i;
          return (
            <article
              key={c.n}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              tabIndex={0}
              style={{
                flex: on ? '2.4 1 260px' : '1 1 260px',
                minWidth: '0',
                // Tall enough for card 02, which carries the most: a lead, three
                // belief lines and two paragraphs. Sized to the fullest card so
                // none of them clips mid-sentence.
                height: 'clamp(360px,60vh,570px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(10px,1.4vh,16px)',
                background: 'var(--bg2)',
                border: '1px solid var(--line)',
                borderRadius: 'clamp(16px,1.6vw,24px)',
                padding: 'clamp(18px,2vw,32px)',
                overflow: 'hidden',
                transition: `flex-grow ${DUR} ${EASE}, border-color .4s`,
                borderColor: on ? 'var(--a)' : 'var(--line)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>{c.eyebrow}</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,3vw,50px)', lineHeight: '1', color: 'var(--line)' }}>{c.n}</span>
              </div>

              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(22px,2.2vw,36px)', lineHeight: '1', maxWidth: '18ch', margin: '0' }}>{c.title}</h3>

              {/* revealed body. min-height 0 lets the column actually scroll-clip
                  inside the fixed card height instead of overflowing it. */}
              <div
                style={{
                  flex: '1',
                  minHeight: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  overflow: 'hidden',
                  opacity: on ? 1 : 0,
                  transform: on ? 'none' : 'translateY(10px)',
                  transition: `opacity .45s ${EASE} ${on ? '.12s' : '0s'}, transform .55s ${EASE}`,
                }}
              >
                <p style={{ fontSize: 'clamp(13px,1vw,16px)', lineHeight: '1.6', color: 'var(--ink)', margin: '0' }}>{c.lead}</p>

                {c.points.length > 0 && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '0', padding: '0', listStyle: 'none' }}>
                    {c.points.map((p) => (
                      <li key={p} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(16px,1.5vw,24px)', lineHeight: '1.1', paddingBottom: '8px', borderBottom: '1px solid var(--line)' }}>{p}</li>
                    ))}
                  </ul>
                )}

                {c.paras.map((p) => (
                  <p key={p} style={{ fontSize: 'clamp(12px,.92vw,15px)', lineHeight: '1.6', color: 'var(--mute)', margin: '0' }}>{p}</p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
