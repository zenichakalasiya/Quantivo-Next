import { Fragment } from 'react';
import { TESTIMONIALS, type Testimonial } from '@/data/content';

/**
 * Home / Testimonials. Ported from Quantivo.dc.html lines 322-452.
 *
 * Three vertically scrolling columns. Direction and speed come from the
 * [data-marq-track][data-dir] rules already in globals.css (marq-up 52s /
 * marq-down 46s), and [data-marq]:hover pauses the track - so the columns
 * animate with no JS at all. Each list is rendered twice because the keyframes
 * translate -50%; that second copy is what hides the seam.
 */
function Card({ t }: { t: Testimonial }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 'clamp(15px,1.6vw,20px)', border: '1px solid var(--line)', borderRadius: '18px', background: 'var(--bg2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
        <span style={{ flex: '0 0 auto', display: 'grid', placeItems: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--grad)', color: '#fff', fontFamily: "'Bebas Neue',sans-serif", fontSize: '16px' }}>{t.initial}</span>
        <span style={{ display: 'flex', flexDirection: 'column', minWidth: '0' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', lineHeight: '1.2' }}>{t.name}</span>
          <span style={{ fontSize: '11px', lineHeight: '1.3', color: 'var(--mute)' }}>{t.role}</span>
        </span>
      </div>
      <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--ink)', textWrap: 'pretty' }}>{t.quote}</p>
      {t.metric && (
        <span style={{ display: 'flex', alignItems: 'baseline', gap: '9px', paddingTop: '11px', borderTop: '1px solid var(--line)' }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2vw,28px)', lineHeight: '1', color: 'var(--a)' }}>{t.metric}</span>
          <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>{t.metricLabel}</span>
        </span>
      )}
    </div>
  );
}

export function Testimonials() {
  return (
    <section data-screen-label="Home / Testimonials" style={{ padding: 'clamp(56px,7.5vw,120px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: '18px', marginBottom: 'clamp(26px,3.5vw,50px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>05 — Testimonials</span>
          <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92' }}>What Clients Say.</h2>
        </div>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)', border: '1px dashed var(--line)', borderRadius: '99px', padding: '6px 12px' }}>Dummy copy — hover a column to hold it</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 'clamp(12px,1.4vw,18px)', maskImage: 'linear-gradient(180deg,transparent,#000 9%,#000 91%,transparent)', WebkitMaskImage: 'linear-gradient(180deg,transparent,#000 9%,#000 91%,transparent)' }}>
        {TESTIMONIALS.map((col, ci) => (
          <div key={ci} data-marq="" data-cursor="Hold" style={{ position: 'relative', height: 'clamp(400px,62vh,640px)', overflow: 'hidden' }}>
            <div data-marq-track="" data-dir={col.dir} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.4vw,18px)' }}>
              {[0, 1].map((copy) => (
                <Fragment key={copy}>
                  {col.items.map((t, i) => <Card key={`${copy}-${i}`} t={t} />)}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
