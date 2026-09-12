'use client';

import { useState } from 'react';
import { FAQS } from '@/data/content';

/**
 * Home / FAQ. Ported from Quantivo.dc.html lines 628-647.
 *
 * Accordion state was `faq` on the root component; it is local here since
 * nothing else read it. Open index starts at 0 and -1 means all closed,
 * matching the original's toggle (st.faq === i ? -1 : i).
 *
 * The panel animates max-height 0 -> 340px rather than height:auto, which is
 * the original's approach - keep the 340px or long answers clip.
 */
export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section data-screen-label="Home / FAQ" style={{ padding: 'clamp(60px,8vw,124px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(28px,5vw,72px)', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', top: '110px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>09 — FAQ</span>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92', maxWidth: '14ch' }}>Questions, Answered.</h2>
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)' }}>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.num} style={{ borderBottom: '1px solid var(--line)' }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} data-cursor={isOpen ? 'Close' : 'Open'} data-faq-q="" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'baseline', gap: '16px', padding: '22px 4px', transition: 'color .3s' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.18em', color: 'var(--mute)', flex: '0 0 auto' }}>{f.num}</span>
                <span style={{ flex: '1', fontSize: 'clamp(16px,1.4vw,21px)', fontWeight: '600', lineHeight: '1.35' }}>{f.q}</span>
                <span style={{ flex: '0 0 auto', fontFamily: "'Bebas Neue',sans-serif", fontSize: '26px', lineHeight: '1', color: 'var(--a)', transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)', transition: 'transform .4s cubic-bezier(.16,1,.3,1)' }}>+</span>
              </button>
              <div style={{ overflow: 'hidden', maxHeight: isOpen ? '340px' : '0px', opacity: isOpen ? 1 : 0, transition: 'max-height .55s cubic-bezier(.16,1,.3,1),opacity .4s' }}>
                <p style={{ padding: '0 4px 24px 43px', fontSize: '15px', lineHeight: '1.65', color: 'var(--mute)', maxWidth: '60ch' }}>{f.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
