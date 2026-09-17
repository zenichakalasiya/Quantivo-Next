'use client';

import { useRouter } from 'next/navigation';
import { ARTICLES } from '@/data/content';
import { bgUrl } from '@/lib/assets';

/**
 * Home / Insights. Ported from Quantivo.dc.html lines 539-627.
 *
 * The hover treatment (image scale + desaturate, gradient wash, description
 * rise) is entirely CSS on [data-art] in globals.css. [data-art-scroll],
 * [data-drag] and [data-art-next] are the hooks _initArtDrag binds to.
 */
const TAG = { fontSize: '10px', fontWeight: '600', letterSpacing: '.12em', textTransform: 'uppercase', color: '#fff', border: '1px solid rgba(255,255,255,.5)', borderRadius: '99px', padding: '5px 11px' } as const;

export function Articles() {
  const router = useRouter();
  const goBlog = () => { router.push('/blog'); scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <section data-screen-label="Home / Articles" style={{ padding: 'clamp(60px,8vw,120px) 0', borderTop: '1px solid var(--line)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: '20px', padding: '0 clamp(16px,3.4vw,48px) clamp(28px,3.5vw,48px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>08 — Insights</span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92' }}>What&apos;s Happening?</h2>
          <button onClick={goBlog} data-cursor="All articles" style={{ alignSelf: 'start', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--a)' }}>
            View all articles<span style={{ width: '38px', height: '1px', background: 'var(--a)' }} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button data-art-next="" data-cursor="Next" aria-label="Next article" style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--grad)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '19px' }}>&#8594;</button>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div data-art-scroll="" data-drag="" data-cursor="Drag" style={{ display: 'flex', gap: 'clamp(14px,1.6vw,24px)', overflowX: 'auto', padding: '4px clamp(16px,3.4vw,48px)', cursor: 'grab' }}>
          {ARTICLES.map((a) => (
            <article key={a.title} data-art="" data-cursor="Read" style={{ flex: '0 0 auto', width: 'clamp(280px,42vw,520px)', position: 'relative', aspectRatio: '4/3.3', borderRadius: '20px', overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)' }}>
              <span data-art-img="" style={{ position: 'absolute', inset: '0', backgroundImage: bgUrl(a.img), backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <span data-art-wash="" style={{ position: 'absolute', inset: '0', background: 'var(--grad)' }} />
              <span style={{ position: 'absolute', inset: '0', background: 'linear-gradient(to top,rgba(9,9,12,.88) 0%,rgba(9,9,12,.35) 48%,rgba(9,9,12,.15) 100%)' }} />
              <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(20px,2.2vw,30px)' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '.06em', color: '#fff' }}>{a.date}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(24px,2.4vw,38px)', lineHeight: '.98', color: '#fff', maxWidth: '22ch' }}>{a.title}</h3>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: '700', letterSpacing: '.18em', textTransform: 'uppercase', color: '#fff' }}>
                    Read article<span style={{ width: '34px', height: '1px', background: '#fff' }} />
                  </span>
                  <p data-art-desc="" style={{ fontSize: '14px', lineHeight: '1.5', color: 'rgba(255,255,255,.92)', maxWidth: '38ch' }}>{a.desc}</p>
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {a.tags.map((t) => <span key={t} style={TAG}>{t}</span>)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
