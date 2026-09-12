import { STATS } from '@/data/content';

/**
 * Home / Numbers. Ported from Quantivo.dc.html lines 307-320.
 *
 * The 1px grid gap over a var(--line) background is what draws the cell
 * dividers - there are no borders on the cells themselves.
 *
 * Each figure renders "0" and carries data-count; _animate() tweens it up to
 * the real value on scroll, and prints the target immediately under
 * prefers-reduced-motion. Until the motion layer lands these read 0.
 */
export function Numbers() {
  return (
    <section data-screen-label="Home / Numbers" style={{ padding: 'clamp(60px,8vw,124px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '16px', justifyContent: 'space-between', marginBottom: 'clamp(28px,4vw,56px)' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92' }}>The Numbers Speak.</h2>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)', border: '1px dashed var(--line)', borderRadius: '99px', padding: '5px 11px' }}>Placeholder figures</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden' }}>
        {STATS.map((s) => (
          <div key={s.label} style={{ background: 'var(--bg)', padding: 'clamp(24px,3vw,40px) 22px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(52px,7vw,104px)', lineHeight: '.86' }}>
              <span data-count={s.n}>0</span>{s.suffix}
            </span>
            <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
