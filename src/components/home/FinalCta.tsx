'use client';

import { useRouter } from 'next/navigation';

/** Home / Final CTA. Ported from Quantivo.dc.html lines 649-659. */
export function FinalCta() {
  const router = useRouter();
  const goContact = () => { router.push('/contact'); scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <section data-screen-label="Home / Final CTA" style={{ position: 'relative', padding: 'clamp(70px,10vw,150px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '-30% -10% auto', height: '120%', background: 'radial-gradient(60% 50% at 30% 40%,color-mix(in oklab,var(--a) 26%,transparent),transparent 70%),radial-gradient(50% 45% at 75% 60%,color-mix(in oklab,var(--b) 24%,transparent),transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '26px', alignItems: 'center', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,8vw,140px)', lineHeight: '.86', maxWidth: '20ch' }}>Let&apos;s Create What&apos;s Next.</h2>
        <p style={{ fontSize: 'clamp(15px,1.25vw,19px)', lineHeight: '1.55', color: 'var(--mute)', maxWidth: '52ch' }}>Whether you&apos;re building a brand, growing your digital presence, launching a product, creating a website, or visualizing something in 3D — Quantivo is ready to turn your ideas into something people can experience.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <button onClick={goContact} data-magnet="" data-cursor="Start" style={{ padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Project</button>
          <button onClick={goContact} data-magnet="" data-cursor="Say hi" data-cta-outline="" style={{ padding: '16px 32px', borderRadius: '99px', border: '1px solid var(--line)', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', transition: 'border-color .3s' }}>Get in Touch</button>
        </div>
      </div>
    </section>
  );
}
