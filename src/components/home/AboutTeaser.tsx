'use client';

import { useRouter } from 'next/navigation';
import { PARTNERS } from '@/data/content';
import { ImageSlot } from '@/components/ImageSlot';

/** Home / About. Ported from Quantivo.dc.html lines 196-232. */
const PARTNER_ROW = { display: 'flex', alignItems: 'center', gap: 'clamp(40px,5vw,72px)', paddingRight: 'clamp(40px,5vw,72px)' } as const;
const PARTNER_NAME = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,1.8vw,26px)', letterSpacing: '.05em', whiteSpace: 'nowrap', color: 'var(--mute)', transition: 'color .35s' } as const;
const SIDE_CARD = { flex: '1 1 190px', position: 'relative', borderRadius: '24px', overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)', minHeight: 'clamp(300px,38vw,470px)' } as const;
const INNER_RING = { position: 'absolute', inset: '14px', border: '1px solid rgba(244,244,246,.28)', borderRadius: '16px', pointerEvents: 'none', zIndex: '1' } as const;

export function AboutTeaser() {
  const router = useRouter();

  return (
    <section data-screen-label="Home / About" style={{ padding: 'clamp(64px,9vw,140px) clamp(16px,3.4vw,48px) clamp(28px,4vw,52px)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px,1.6vw,24px)', alignItems: 'stretch' }}>
        <div style={SIDE_CARD}>
          <ImageSlot id="qv-about-left" placeholder="Team at work — left portrait image" style={{ position: 'absolute', inset: '0' }} />
          <span style={INNER_RING} />
        </div>

        <div style={{ flex: '1.5 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '22px', padding: 'clamp(30px,4vw,56px) clamp(22px,3vw,44px)', borderRadius: '24px', background: 'var(--bg2)', border: '1px solid var(--line)' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>02 — About</span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,4.6vw,74px)', lineHeight: '.92', letterSpacing: '-.005em' }}>
            About <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Quantivo</span>
          </h2>
          <p style={{ fontSize: 'clamp(15px,1.15vw,18px)', lineHeight: '1.65', color: 'var(--mute)', maxWidth: '42ch', textWrap: 'pretty' }}>In a digital world where every brand is competing for attention, being visible isn&apos;t enough. Quantivo combines strategy, creativity, technology, and 3D to help businesses communicate their value and connect with the right audience.</p>
          <button onClick={() => { router.push('/about'); scrollTo({ top: 0, behavior: 'instant' }); }} data-magnet="" data-cursor="About" style={{ marginTop: '4px', padding: '16px 34px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Learn More</button>
        </div>

        <div style={SIDE_CARD}>
          <ImageSlot id="qv-about-right" placeholder="Studio detail — right portrait image" style={{ position: 'absolute', inset: '0' }} />
          <span style={INNER_RING} />
        </div>
      </div>

      <div style={{ marginTop: 'clamp(16px,1.6vw,24px)', borderRadius: '24px', background: 'var(--bg2)', border: '1px solid var(--line)', padding: 'clamp(26px,3vw,40px) 0' }}>
        <p style={{ textAlign: 'center', fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--mute)' }}>Trusted by leading brands</p>
        <div style={{ marginTop: '24px', position: 'relative', width: '100%', overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)', maskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)' }}>
          <div data-partner-track="" style={{ height: '48px', display: 'flex', alignItems: 'center', width: 'max-content', animation: 'qvMarquee 40s linear infinite' }}>
            <div style={PARTNER_ROW}>
              {PARTNERS.map((c) => (
                <span key={c} data-partner="" style={PARTNER_NAME}>{c}</span>
              ))}
            </div>
            {/* Duplicate copy: qvMarquee translates -50%, so this is what makes the loop seamless. */}
            <div aria-hidden="true" style={PARTNER_ROW}>
              {PARTNERS.map((c) => (
                <span key={c} style={{ ...PARTNER_NAME, transition: undefined }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
