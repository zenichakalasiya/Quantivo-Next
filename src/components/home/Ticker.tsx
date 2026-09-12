/**
 * Scrolling capability ticker. Ported from Quantivo.dc.html lines 188-194.
 *
 * The list is deliberately doubled: the qvMarquee keyframe translates the track
 * -50%, so the second copy is what makes the loop seamless. Matches the original
 * tickerLoop, which was Array.from({length:2}).flatMap(...).
 */
const WORDS = ['Digital Marketing', 'Branding', 'Packaging', 'Web Development', '3D Visualization', 'Strategy'];
const TICKER = [...WORDS, ...WORDS];

export function Ticker() {
  return (
    <div data-marquee="" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '14px 0', overflow: 'hidden', background: 'var(--bg2)' }}>
      <div style={{ display: 'flex', width: 'max-content', gap: '0', animation: 'qvMarquee 26s linear infinite' }}>
        {TICKER.map((t, i) => (
          <span key={`${t}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '26px', padding: '0 26px', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2vw,30px)', letterSpacing: '.04em', whiteSpace: 'nowrap', color: 'var(--ink)' }}>
            {t}
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--grad)' }} />
          </span>
        ))}
      </div>
    </div>
  );
}
