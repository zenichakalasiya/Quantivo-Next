'use client';

import { useRouter } from 'next/navigation';
import { DETAIL } from '@/data/content';
import { ImageSlot } from '@/components/ImageSlot';

/**
 * Services. Ported from Quantivo.dc.html lines 1001-1063.
 *
 * Each service is a position:sticky 100svh card with an increasing z-index, so
 * they stack over one another as you scroll. The z-index ladder is what makes
 * the effect work - card i must sit above card i-1.
 *
 * Values renderVals() derived per service (idx, z, tone, lead, count, numbered
 * items, project slots) are computed inline here from DETAIL.
 */
const PILL = {
  flex: '0 0 auto',
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: '7px',
  padding: '7px 13px',
  border: '1px solid var(--line)',
  borderRadius: '99px',
  whiteSpace: 'nowrap',
} as const;

export default function ServicesPage() {
  const router = useRouter();
  const goContact = () => {
    router.push('/contact');
    scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      <section data-screen-label="Services / Hero" style={{ minHeight: '62svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '24px', padding: '150px clamp(16px,3.4vw,48px) clamp(44px,5vw,80px)' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Our Services</span>
        <h1 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,8.4vw,158px)', lineHeight: '.84', maxWidth: '20ch' }}>Everything Your Brand Needs to Move Forward.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(20px,4vw,60px)', textAlign: 'center' }}>
          <p data-anim="up" style={{ fontSize: '15px', lineHeight: '1.65', color: 'var(--mute)' }}>At Quantivo Digital, we combine digital marketing, branding, web development, and 3D visualization to help businesses build stronger brands, improve their digital presence, and communicate their ideas more effectively.</p>
          <p data-anim="up" style={{ fontSize: '15px', lineHeight: '1.65', color: 'var(--mute)' }}>Our services are designed to support businesses at different stages—from building a brand and reaching the right audience to creating digital experiences and high-quality visualizations.</p>
        </div>
      </section>

      {DETAIL.map((s, i) => {
        const idx = '0' + (i + 1);
        const count = s.groups.reduce((a, g) => a + g.items.length, 0);
        const tone = i % 2 === 0 ? 'var(--bg)' : 'var(--bg2)';
        const projects = [
          { slot: s.id + '-p1', ph: 'Project image — portrait, 4:5' },
          { slot: s.id + '-p2', ph: 'Project image — portrait, 4:5' },
        ];
        return (
          <section key={s.id} id={s.id} data-screen-label={'Services / ' + s.name} data-svc-card="" style={{ position: 'sticky', top: '0', height: '100svh', overflow: 'hidden', zIndex: String(i + 1), borderTop: '1px solid var(--line)', background: tone, display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gridTemplateRows: 'auto minmax(0,1fr) auto', gap: 'clamp(12px,2vh,26px)', padding: 'clamp(84px,11vh,108px) clamp(16px,3.4vw,48px) clamp(18px,3vh,34px)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>{s.num}</span>
              <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.2em', color: 'var(--mute)' }}>{idx} / 08</span>
            </div>

            <div style={{ minHeight: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(20px,3vw,56px)', alignItems: 'stretch' }}>
              <div style={{ minWidth: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.6vh,18px)' }}>
                <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,4vw,66px)', lineHeight: '.92', maxWidth: '20ch' }}>{s.head}</h2>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(16px,1.4vw,21px)', letterSpacing: '.04em', color: 'var(--mute)' }}>{s.name}</span>
                <p style={{ fontSize: 'clamp(13px,1vw,16px)', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '48ch', textWrap: 'pretty' }}>{s.paras[0]}</p>
                <button onClick={goContact} data-magnet="" data-cursor="Enquire" data-svc-cta="" style={{ alignSelf: 'start', marginTop: 'auto', padding: '12px 22px', borderRadius: '99px', border: '1px solid var(--line)', fontSize: '11px', fontWeight: '700', letterSpacing: '.1em', lineHeight: '1.3', textTransform: 'uppercase', maxWidth: '26ch', textAlign: 'left', transition: 'border-color .3s' }}>{s.cta}</button>
              </div>
              <div style={{ minWidth: '0', minHeight: '0', display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 'clamp(10px,1.4vw,18px)' }}>
                {projects.map((pr) => (
                  <span key={pr.slot} style={{ position: 'relative', display: 'block', minHeight: '0', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--bg2)' }}>
                    <ImageSlot id={pr.slot} placeholder={pr.ph} style={{ position: 'absolute', inset: '0' }} />
                  </span>
                ))}
              </div>
            </div>

            <div style={{ minWidth: '0', display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' }}>Our services include — {count} capabilities</span>
              <div data-cursor="Drag" style={{ minWidth: '0', display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '8px', overflowX: 'auto', overscrollBehaviorX: 'contain', paddingBottom: '3px' }}>
                {s.groups.map((g, gi) => (
                  <span key={gi} style={{ display: 'flex', flex: '0 0 auto', alignItems: 'center', gap: '8px' }}>
                    {g.name ? <span style={{ flex: '0 0 auto', fontSize: '10px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--a)' }}>{g.name}</span> : null}
                    {g.items.map((label, k) => (
                      <span key={label} data-pill="" data-cursor="Enquire" style={PILL}>
                        <span data-pill-n="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '11px', letterSpacing: '.06em' }}>{(k + 1 < 10 ? '0' : '') + (k + 1)}</span>
                        <span style={{ fontSize: '12.5px', fontWeight: '600', lineHeight: '1.2' }}>{label}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section id="svc-contact" data-screen-label="Services / One team" style={{ position: 'relative', zIndex: '20', background: 'var(--bg)', borderTop: '1px solid var(--line)', padding: 'clamp(70px,10vw,150px) clamp(16px,3.4vw,48px)', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'start' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,6.8vw,124px)', lineHeight: '.88', maxWidth: '18ch' }}>One Team. Multiple Capabilities.</h2>
        <p style={{ fontSize: 'clamp(15px,1.25vw,19px)', lineHeight: '1.55', color: 'var(--mute)', maxWidth: '66ch' }}>From building your brand identity and packaging to growing your digital presence, developing your website, running advertising campaigns, and creating high-quality 3D visualizations—Quantivo Digital brings strategy, creativity, technology, and visualization together under one roof.</p>
        <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(26px,3.2vw,50px)', lineHeight: '1' }}>Have a Project in Mind? Let&apos;s create something meaningful.</p>
        <button onClick={goContact} data-magnet="" data-cursor="Start" style={{ padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Project</button>
      </section>
    </main>
  );
}
