'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WORK } from '@/data/content';
import { ImageSlot } from '@/components/ImageSlot';

/**
 * Work. Ported from Quantivo.dc.html lines 1066-1108.
 *
 * The filter was `workFilter` on the root component; it is local state here
 * since nothing outside this page read it. Cards alternate a vertical offset
 * to stagger the grid - the original computed it as `i % 2 ? clamp(...) : 0`.
 */
const FILTERS = ['All', 'Branding', 'Web', 'Marketing', '3D'] as const;

export default function WorkPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>('All');
  const goContact = () => {
    router.push('/contact');
    scrollTo({ top: 0, behavior: 'instant' });
  };

  const shown = filter === 'All' ? WORK : WORK.filter((w) => w.cat === filter);

  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      <section data-screen-label="Work / Hero" style={{ minHeight: '58svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '22px', padding: '150px clamp(16px,3.4vw,48px) clamp(40px,5vw,72px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'baseline', justifyContent: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Our Work</span>
          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)', border: '1px dashed var(--line)', borderRadius: '99px', padding: '5px 11px' }}>Placeholder projects — drop in real case studies</span>
        </div>
        <h1 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,9vw,168px)', lineHeight: '.84', maxWidth: '16ch' }}>Ideas Turned Into Experiences.</h1>
        <p data-anim="up" style={{ fontSize: 'clamp(15px,1.3vw,20px)', lineHeight: '1.55', color: 'var(--mute)', maxWidth: '56ch' }}>Every project is an opportunity to solve a problem, communicate something meaningful, and create something memorable.</p>
      </section>

      <section style={{ padding: '0 clamp(16px,3.4vw,48px) clamp(60px,8vw,120px)', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px 0 clamp(30px,4vw,56px)' }}>
          {FILTERS.map((f) => {
            const on = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)} data-cursor="Filter" style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', border: '1px solid ' + (on ? 'var(--a)' : 'var(--line)'), color: on ? '#fff' : 'var(--mute)', background: on ? 'var(--grad)' : 'transparent', borderRadius: '99px', padding: '9px 15px', transition: 'all .3s' }}>{f}</button>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(28px,5vw,90px) clamp(20px,4vw,72px)' }}>
          {shown.map((w, i) => (
            <article key={w.slot} data-anim="up" data-cursor="Case study" style={{ marginTop: i % 2 ? 'clamp(0px,7vw,110px)' : '0px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span data-work-card="" style={{ display: 'block', position: 'relative', aspectRatio: '4/5', borderRadius: '4px', overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)', transition: 'transform .6s cubic-bezier(.16,1,.3,1)' }}>
                <ImageSlot id={w.slot} placeholder={w.ph} style={{ position: 'absolute', inset: '0' }} />
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', textAlign: 'right' }}>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,3vw,48px)', lineHeight: '.98' }}>{w.title}</h3>
                <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '.1em', color: 'var(--mute)' }}>{w.disc}</span>
                <span style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', justifyContent: 'flex-end', marginTop: '4px' }}>
                  {w.tags.map((t) => (
                    <span key={t} style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.12em', textTransform: 'uppercase', border: '1px solid var(--line)', borderRadius: '99px', padding: '5px 10px', color: 'var(--mute)' }}>{t}</span>
                  ))}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(60px,9vw,130px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '22px', alignItems: 'start' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,6.8vw,124px)', lineHeight: '.88', maxWidth: '18ch' }}>Your Project Could Be Next.</h2>
        <button onClick={goContact} data-magnet="" data-cursor="Brief us" style={{ padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Project</button>
      </section>
    </main>
  );
}
