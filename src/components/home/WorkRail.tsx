'use client';

import { useRouter } from 'next/navigation';
import { WORK } from '@/data/content';
import { ImageSlot } from '@/components/ImageSlot';

/**
 * Home / Work. Ported from Quantivo.dc.html lines 454-479.
 *
 * A horizontally scrollable rail. [data-drag] is the hook _initArtDrag binds
 * pointer drag-to-scroll to; overflow-x:auto means it still scrolls natively
 * without that. Slot ids get a "-rail" suffix, matching the original's
 * workRail mapping - slot ids must stay unique across the page.
 */
export function WorkRail() {
  const router = useRouter();
  const goWork = () => { router.push('/work'); scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <section data-screen-label="Home / Work" style={{ padding: 'clamp(60px,8vw,124px) 0', borderTop: '1px solid var(--line)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', padding: '0 clamp(16px,3.4vw,48px) clamp(30px,4vw,56px)' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>06 — Our Portfolio</span>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,6.6vw,116px)', lineHeight: '.9', maxWidth: '22ch' }}>Work That Speaks for Itself.</h2>
        <p data-anim="up" style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '52ch' }}>Every project is an opportunity to solve a problem, communicate something meaningful, and create something memorable.</p>
      </div>

      <div data-drag="" data-cursor="Drag" style={{ display: 'flex', gap: 'clamp(14px,1.6vw,26px)', overflowX: 'auto', padding: '4px clamp(16px,3.4vw,48px)', cursor: 'grab' }}>
        {WORK.map((w) => (
          <button key={w.slot} onClick={goWork} data-cursor="View" style={{ flex: '0 0 auto', width: 'clamp(230px,26vw,330px)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ display: 'block', position: 'relative', aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)' }}>
              <ImageSlot id={`${w.slot}-rail`} placeholder={w.ph} style={{ position: 'absolute', inset: '0' }} />
            </span>
            <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px' }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,1.9vw,28px)', lineHeight: '1' }}>{w.title}</span>
              <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>{w.year}</span>
            </span>
            <span style={{ display: 'block', fontSize: '12px', lineHeight: '1.45', color: 'var(--mute)' }}>{w.disc}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: 'clamp(30px,4vw,56px) clamp(16px,3.4vw,48px) 0' }}>
        <button onClick={goWork} data-magnet="" data-cursor="All work" style={{ padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>View Our Work</button>
      </div>
    </section>
  );
}
