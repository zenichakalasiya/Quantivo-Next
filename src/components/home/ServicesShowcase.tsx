'use client';

import { useRouter } from 'next/navigation';
import { HOME_SERVICES } from '@/data/content';
import { bgUrl } from '@/lib/assets';
import { goService } from '@/lib/goService';

/**
 * Home / Services. Ported from Quantivo.dc.html lines 261-305.
 *
 * Three columns: two sticky 100svh side panels whose faces cross-fade, and a
 * centre column of tall slides. _initSvcTrack drives which face/slide is active
 * by measuring scroll position, keying off [data-svc-col], [data-svc-slide] and
 * [data-svc-face] - so those attributes must survive the port verbatim.
 *
 * The :not([data-ready]) rules in globals.css show the first face/slide until
 * the motion layer marks the column ready, which keeps it readable with JS off.
 */
const STICKY_COL = { flex: '1 1 200px', position: 'sticky', top: '0', height: '100svh', display: 'grid', alignContent: 'center', padding: '0 clamp(14px,2vw,32px)' } as const;

export function ServicesShowcase() {
  const router = useRouter();

  return (
    <section data-screen-label="Home / Services" style={{ borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: '24px', padding: 'clamp(56px,7vw,110px) clamp(16px,3.4vw,48px) clamp(30px,4vw,56px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>04 — Our Services</span>
          <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92', maxWidth: '20ch' }}>Everything Your Brand Needs to Move Forward.</h2>
        </div>
        <p data-anim="up" style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '40ch' }}>We combine strategy, creativity, technology, and visualization to help businesses build stronger brands and create better digital experiences.</p>
      </div>

      <div data-svc-col="" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', borderTop: '1px solid var(--line)' }}>
        <div style={{ ...STICKY_COL, borderRight: '1px solid var(--line)' }}>
          <div style={{ display: 'grid' }}>
            {HOME_SERVICES.map((s) => (
              <div key={s.num} data-svc-face="" style={{ gridArea: '1/1', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '.18em', color: 'var(--mute)' }}>[{s.num}]</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,3.4vw,58px)', lineHeight: '.94', letterSpacing: '.005em' }}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '2 1 320px', display: 'flex', flexDirection: 'column' }}>
          {HOME_SERVICES.map((s) => (
            <div key={s.num} data-svc-slide="" style={{ minHeight: '86svh', display: 'grid', placeItems: 'center', padding: 'clamp(20px,3vw,44px) clamp(14px,2vw,32px)' }}>
              <span role="img" aria-label={s.title} style={{ display: 'block', position: 'relative', width: '100%', maxWidth: '640px', aspectRatio: '4/3', borderRadius: '20px', overflow: 'hidden', backgroundColor: 'var(--bg2)', backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid var(--line)', backgroundImage: bgUrl(s.bg) }} />
            </div>
          ))}
        </div>

        <div style={{ ...STICKY_COL, flex: '1 1 220px', borderLeft: '1px solid var(--line)' }}>
          <div style={{ display: 'grid' }}>
            {HOME_SERVICES.map((s) => (
              <div key={s.num} data-svc-face="" style={{ gridArea: '1/1', display: 'flex', flexDirection: 'column', gap: '26px' }}>
                <p style={{ fontSize: 'clamp(15px,1.1vw,17px)', lineHeight: '1.6', color: 'var(--mute)', textWrap: 'pretty' }}>{s.blurb}</p>
                <button onClick={goService(router, s.target)} data-cursor="Detail" data-svc-learn="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '16px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', fontSize: '11px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', transition: 'color .3s' }}>
                  Learn more<span style={{ fontSize: '15px' }}>&#8594;</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: 'clamp(34px,5vw,72px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
        <button onClick={() => { router.push('/services'); scrollTo({ top: 0, behavior: 'instant' }); }} data-magnet="" data-cursor="All services" data-svc-all="" style={{ padding: '16px 34px', borderRadius: '99px', border: '1px solid var(--line)', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', transition: 'border-color .3s' }}>View all services</button>
      </div>
    </section>
  );
}
