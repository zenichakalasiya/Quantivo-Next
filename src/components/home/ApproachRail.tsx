import { APPROACH } from '@/data/content';

/**
 * Home / Approach. Ported from Quantivo.dc.html lines 481-537.
 *
 * The tallest construction in the file: a calc(100svh + 2700px) section whose
 * inner panel is sticky, so page scroll becomes horizontal travel along a
 * 3600px track. _initRail translates [data-rail-track], toggles .on per
 * [data-rail-step], and drives [data-rail-prog] / [data-rail-count].
 *
 * Step geometry is strictly regular - one every 640px starting at x=340,
 * alternating above and below the path - so it is generated rather than
 * transcribed five times. Positions verified against the original:
 * odd steps top:232 (rule top:134, diamond top:175), even bottom:212
 * (rule top:354, diamond top:395).
 */
const STEP_X = [340, 980, 1620, 2260, 2900];
const PATH = 'M0 180 H340 C660 180 660 400 980 400 C1300 400 1300 180 1620 180 C1940 180 1940 400 2260 400 C2580 400 2580 180 2900 180 H3600';

export function ApproachRail() {
  return (
    <section data-rail-sec="" data-screen-label="Home / Approach" style={{ position: 'relative', height: 'calc(100svh + 2700px)', borderTop: '1px solid var(--line)', background: 'var(--bg2)' }}>
      <div style={{ position: 'sticky', top: '0', height: '100svh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: '18px', padding: 'clamp(88px,10vh,120px) clamp(16px,3.4vw,48px) 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>07 — Our Approach</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92' }}>From Vision to Execution.</h2>
          </div>
        </div>

        <div style={{ position: 'relative', flex: '1', overflow: 'hidden' }}>
          <div data-rail-track="" style={{ position: 'absolute', left: '0', top: '50%', width: '3600px', height: '560px', marginTop: '-280px', willChange: 'transform' }}>
            <svg viewBox="0 0 3600 560" width="3600" height="560" fill="none" aria-hidden="true" style={{ position: 'absolute', inset: '0' }}>
              <path d={PATH} stroke="var(--mute)" strokeOpacity=".55" strokeWidth="1.25" />
            </svg>

            {APPROACH.map((step, i) => {
              const x = STEP_X[i];
              const above = i % 2 === 0;
              const n = String(i + 1).padStart(2, '0');
              return (
                <div key={step.title}>
                  <div data-rail-step="" style={{ position: 'absolute', left: `${x}px`, ...(above ? { top: '232px' } : { bottom: '212px' }), width: '330px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.2em', color: 'var(--a)' }}>{n}</span>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '52px', lineHeight: '.96' }}>{step.title}</span>
                    <span style={{ fontSize: '15px', lineHeight: '1.55', color: 'var(--mute)', textWrap: 'pretty' }}>{step.body}</span>
                  </div>
                  <span style={{ position: 'absolute', left: `${x}px`, top: above ? '134px' : '354px', width: '1px', height: '92px', background: 'var(--line)' }} />
                  <span style={{ position: 'absolute', left: `${x - 5}px`, top: above ? '175px' : '395px', width: '10px', height: '10px', background: 'var(--a)', transform: 'rotate(45deg)' }} />
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '0 clamp(16px,3.4vw,48px) clamp(30px,5vh,54px)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ position: 'relative', flex: '1', height: '1px', background: 'var(--line)' }}>
            <span data-rail-prog="" style={{ position: 'absolute', left: '0', top: '0', height: '1px', width: '0', background: 'var(--a)' }} />
          </span>
          <span data-rail-count="" style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.2em', color: 'var(--mute)' }}>01 / 05</span>
        </div>
      </div>
    </section>
  );
}
