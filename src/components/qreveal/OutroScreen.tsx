'use client';

import { useRouter } from 'next/navigation';
import { SERVICES } from '@/data/content';
import { NAV } from '@/lib/nav';
import { Q_OUTER, Q_VIEWBOX } from '@/lib/qmark';

/**
 * The single screen the Q opens onto. Everything lives in ONE viewport:
 *
 *     headline + CTA
 *     Connect / nav / Newsletter columns
 *     legal bar
 *     QUANTIVO ←  → DIGITAL
 *
 * Sized to 100svh with overflow hidden and vh-based type, because the whole
 * point is that the Q expands and this is simply *there* — nothing scrolls in
 * behind it and nothing follows it. The page ends here.
 *
 * Every dimension is clamped against vh rather than vw so it cannot overflow on
 * short laptop screens, where a vw-scaled headline would push the footer out.
 */
const LABEL = { fontSize: 'clamp(9px,1.1vh,11px)', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' } as const;
const LINK = { fontSize: 'clamp(12px,1.6vh,15px)', fontWeight: '600', color: 'var(--ink)', textAlign: 'left', lineHeight: '1.5' } as const;
const NAV_LINK = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(18px,3vh,34px)', lineHeight: '1.1', letterSpacing: '.02em', color: 'var(--mute)', transition: 'color .3s' } as const;
const WORD = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(42px,11vh,150px)', lineHeight: '.82', letterSpacing: '.01em', color: 'var(--ink)', whiteSpace: 'nowrap', userSelect: 'none' } as const;

export function OutroScreen() {
  const router = useRouter();
  const go = (href: string) => () => { router.push(href); scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <div
      data-outro-screen=""
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        background: 'var(--bg2)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Faint Q behind everything — the letter that just opened, now at rest. */}
      <svg
        viewBox={Q_VIEWBOX}
        aria-hidden="true"
        style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', height: '116%', width: 'auto', opacity: '.07', pointerEvents: 'none', zIndex: 0 }}
      >
        <path d={Q_OUTER} fill="var(--ink)" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(14px,3vh,34px)', padding: 'clamp(60px,9vh,96px) clamp(16px,3.4vw,48px) 0' }}>
        {/* ---- Let's Talk ---- */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'clamp(10px,1.8vh,20px)' }}>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,8vh,104px)', lineHeight: '.88', maxWidth: '20ch' }}>Let&apos;s Create What&apos;s Next.</h2>
          <p style={{ fontSize: 'clamp(12px,1.7vh,17px)', lineHeight: '1.5', color: 'var(--mute)', maxWidth: '54ch' }}>Whether you&apos;re building a brand, growing your digital presence, launching a product or visualizing something in 3D — we&apos;re ready to turn it into something people can experience.</p>
          <button onClick={go('/contact')} data-magnet="" data-cursor="Start" style={{ padding: 'clamp(10px,1.6vh,16px) clamp(22px,2.4vw,34px)', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: 'clamp(10px,1.3vh,12px)', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Project</button>
        </div>

        {/* ---- footer columns ---- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 'clamp(16px,2.4vw,48px)', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,.8vh,9px)', alignItems: 'center', textAlign: 'center' }}>
            <span style={LABEL}>Connect</span>
            <button onClick={go('/contact')} data-cursor="Go" data-foot-link="" style={LINK}>Get in touch</button>
            <span data-foot-link="" style={LINK}>Instagram</span>
            <span data-foot-link="" style={LINK}>LinkedIn</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {NAV.map((n) => (
              <button key={n.href} onClick={go(n.href)} data-cursor="Open" data-foot-nav="" style={NAV_LINK}>{n.label}</button>
            ))}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px,1vh,11px)', alignItems: 'center', textAlign: 'center' }}>
            <span style={LABEL}>Newsletter</span>
            <span style={{ fontSize: 'clamp(12px,1.6vh,15px)', fontWeight: '600' }}>Be in the know</span>
            <button onClick={go('/contact')} data-cursor="Subscribe" data-svc-all="" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: 'clamp(7px,1.1vh,10px) clamp(14px,1.4vw,20px)', borderRadius: '99px', border: '1px solid var(--line)', fontSize: 'clamp(9px,1.2vh,11px)', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', transition: 'border-color .3s' }}>
              Subscribe<span aria-hidden="true">&#8594;</span>
            </button>
            <span style={{ ...LABEL, marginTop: 'clamp(4px,1vh,10px)' }}>Our Services</span>
            <span style={{ fontSize: 'clamp(10px,1.3vh,12px)', lineHeight: '1.5', color: 'var(--mute)', maxWidth: '30ch' }}>{SERVICES.slice(0, 4).map((s) => s.title).join(' · ')}</span>
          </div>
        </div>
      </div>

      {/* ---- legal bar ---- */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', padding: 'clamp(8px,1.4vh,16px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)', fontSize: 'clamp(9px,1.2vh,11px)', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>
        <span style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <span data-foot-link="">Privacy</span>
          <span data-foot-link="">Terms</span>
          <span data-foot-link="">Cookies</span>
        </span>
        <span>© Quantivo Digital 2026. All rights reserved</span>
      </div>

      {/* ---- split wordmark, cropped by the viewport edges ---- */}
      <div aria-hidden="true" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'clamp(16px,5vw,100px)', overflow: 'hidden' }}>
        <span data-word-left="" style={WORD}>QUANTIVO</span>
        <span data-word-right="" style={WORD}>DIGITAL</span>
      </div>
    </div>
  );
}
