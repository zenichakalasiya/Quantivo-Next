import { PILLARS } from '@/data/content';

/**
 * Home / How We Work. Ported from Quantivo.dc.html lines 233-259.
 *
 * A 3D flip card: the outer div supplies perspective, the inner one rotates on
 * hover, and both faces sit stacked with backface-visibility:hidden. The back
 * face is pre-rotated 180deg so it reads correctly once flipped.
 */
const FACE = { position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px', padding: 'clamp(22px,2.4vw,32px)', borderRadius: '22px', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' } as const;

export function Pillars() {
  return (
    <section data-screen-label="Home / How We Work" style={{ padding: 'clamp(52px,7vw,110px) clamp(16px,3.4vw,48px)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: '20px', marginBottom: 'clamp(26px,3.5vw,48px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>03 — How We Work</span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92' }}>Four Things We Bring.</h2>
        </div>
        <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' }}>Hover a card</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 'clamp(14px,1.4vw,20px)' }}>
        {PILLARS.map((p) => (
          <div key={p.k} style={{ perspective: '1200px', height: 'clamp(220px,22vw,300px)' }}>
            <div data-pillar-card="" style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform .55s cubic-bezier(.4,0,.2,1)' }}>
              <div style={{ ...FACE, background: 'var(--bg2)', border: '1px solid var(--line)' }}>
                <svg viewBox="0 0 48 48" width="46" height="46" fill="none" stroke="var(--a)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={p.d} /></svg>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,2.8vw,42px)', lineHeight: '1', letterSpacing: '.01em', background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{p.k}</span>
              </div>
              <div style={{ ...FACE, background: 'var(--grad)', transform: 'rotateY(180deg)' }}>
                <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: '.85' }}><path d={p.d} /></svg>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(22px,2vw,30px)', lineHeight: '1', letterSpacing: '.01em', color: '#fff' }}>{p.k}</span>
                <span style={{ fontSize: 'clamp(14px,1.05vw,17px)', lineHeight: '1.5', color: '#fff' }}>{p.v}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
