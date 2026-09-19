'use client';

import { useState } from 'react';
import { ABOUT_CARDS } from '@/data/content';
import { AboutCardGlyph } from './AboutCardGlyph';

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
        {/* Bebas is a condensed face — at display sizes the letters close up on
            each other, so everything in this section carries a little tracking. */}
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.6vw,72px)', lineHeight: '.94', letterSpacing: '.025em' }}>
          About <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Quantivo</span>
        </h2>
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
                // 3, not 2.4: at the larger body type the hovered card has to be
                // wide enough that card 01's two paragraphs still fit the fixed
                // height. Measured — at 2.4 they overflowed by 36px and the
                // overflow guard below quietly turned into a scrollbar.
                flex: on ? '3 1 260px' : '1 1 260px',
                minWidth: '0',
                // The glyph in the card's empty bottom is positioned against
                // this, and clipped by the overflow + radius below.
                position: 'relative',
                // Sized to card 01, which carries the most words: a long lead
                // and two full paragraphs. The height is fixed rather than
                // content-driven, or every card below would jump as the pointer
                // moved along the row — so it is the fullest card that sets it.
                height: 'clamp(350px,55vh,520px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(11px,1.5vh,18px)',
                background: 'var(--bg2)',
                border: '1px solid var(--line)',
                borderRadius: 'clamp(16px,1.6vw,24px)',
                padding: 'clamp(18px,2vw,32px)',
                overflow: 'hidden',
                transition: `flex-grow ${DUR} ${EASE}, border-color .4s`,
                borderColor: on ? 'var(--a)' : 'var(--line)',
              }}
            >
              <AboutCardGlyph index={i} on={on} />

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>{c.eyebrow}</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,3vw,50px)', lineHeight: '1', letterSpacing: '.03em', color: 'var(--line)' }}>{c.n}</span>
              </div>

              {/* Same size as the Vision / Mission / Why statement heading
                  further down the page — both are a white Bebas statement line
                  introducing a block of copy, so they should read as the same
                  level of the page, not two different ones. */}
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(21px,2.15vw,33px)', lineHeight: '1.08', letterSpacing: '.03em', margin: '0' }}>{c.title}</h3>

              {/* revealed body. min-height 0 lets the column actually scroll-clip
                  inside the fixed card height instead of overflowing it. */}
              <div
                style={{
                  flex: '1',
                  minHeight: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  // The card is mostly empty at rest, so the revealed copy can
                  // afford real separation between the lead, the point list and
                  // the paragraphs. Packed tight it read as one grey block.
                  gap: 'clamp(15px,2vh,25px)',
                  // auto, not hidden: a guard so a later copy change can never
                  // silently cut a sentence off the bottom of a fixed-height card.
                  overflowY: 'auto',
                  opacity: on ? 1 : 0,
                  transform: on ? 'none' : 'translateY(10px)',
                  transition: `opacity .45s ${EASE} ${on ? '.12s' : '0s'}, transform .55s ${EASE}`,
                }}
              >
                <p style={{ fontSize: 'clamp(14px,1.05vw,17px)', lineHeight: '1.62', color: 'var(--ink)', margin: '0' }}>{c.lead}</p>

                {c.points.length > 0 && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '0', padding: '0', listStyle: 'none' }}>
                    {c.points.map((p) => (
                      <li key={p} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(15px,1.3vw,21px)', lineHeight: '1.12', letterSpacing: '.03em', paddingBottom: '10px', borderBottom: '1px solid var(--line)' }}>{p}</li>
                    ))}
                  </ul>
                )}

                {c.paras.map((p) => (
                  <p key={p} style={{ fontSize: 'clamp(13px,.98vw,16px)', lineHeight: '1.65', color: 'var(--mute)', margin: '0' }}>{p}</p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
