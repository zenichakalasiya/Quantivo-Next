'use client';

import { useRouter } from 'next/navigation';
import { NAV } from '@/lib/nav';
import { Q_DOT, Q_OUTER, Q_RING, Q_VIEWBOX } from '@/lib/qmark';

/**
 * The single screen the Q opens onto. Everything lives in ONE viewport:
 *
 *     Let's Talk  (headline + CTA)
 *     ───────────── divider ─────────────
 *     Connect / nav / Newsletter columns
 *     legal bar
 *     QUANTIVO ←   → DIGITAL
 *
 * ── Watermark alignment ──────────────────────────────────────────────────────
 * The background Q is a light STROKE (outer, ring, arrow, dot) rather than a
 * filled silhouette, so the arrow inside the mark stays readable.
 *
 * It is positioned so the ARROW ends exactly on the divider: the arrow's lower
 * edge sits at y≈533.26 in the mark, and the mark's ink bounds are y 497.34 →
 * 583.81, which puts the arrow end at 41.5% of the letter's height. With the
 * watermark at height:112% / top:0.5%, 0.005 + 0.415×1.12 ≈ 0.47 — so the
 * divider at 47% of the screen lands on it. Change one of those three numbers
 * and the other two have to move with it.
 *
 * Every dimension is clamped against vh rather than vw so the screen cannot
 * overflow on short laptop displays, where vw-scaled type would push the footer
 * out of frame.
 */
const DIVIDER_AT = '47%';

const LABEL = { fontSize: 'clamp(9px,1.1vh,11px)', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' } as const;
const LINK = { fontSize: 'clamp(12px,1.6vh,15px)', fontWeight: '600', color: 'var(--ink)', textAlign: 'left', lineHeight: '1.5' } as const;
const NAV_LINK = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(17px,2.7vh,30px)', lineHeight: '1.08', letterSpacing: '.02em', color: 'var(--mute)', transition: 'color .3s' } as const;
const WORD = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(56px,15vh,210px)', lineHeight: '.8', letterSpacing: '.01em', color: 'var(--ink)', whiteSpace: 'nowrap', userSelect: 'none' } as const;

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
      {/* Light-stroke Q behind everything — the letter that just opened, at rest.
          Stroked, not filled, so the arrow survives. See the note above for why
          these numbers are what they are. */}
      <svg
        viewBox={Q_VIEWBOX}
        aria-hidden="true"
        style={{ position: 'absolute', left: '50%', top: '0.5%', transform: 'translateX(-50%)', height: '112%', width: 'auto', pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}
      >
        <g fill="none" stroke="var(--ink)" strokeOpacity=".13" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round">
          <path d={Q_OUTER} />
          <path d={Q_RING} />
          <circle cx={Q_DOT.cx} cy={Q_DOT.cy} r={Q_DOT.r} />
        </g>
      </svg>

      {/* ───────── Let's Talk ───────── */}
      <div style={{ position: 'relative', zIndex: 1, flex: `0 0 ${DIVIDER_AT}`, minHeight: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 'clamp(10px,1.8vh,20px)', padding: 'clamp(56px,8vh,90px) clamp(16px,3.4vw,48px) clamp(14px,2.4vh,28px)', borderBottom: '1px solid var(--line)' }}>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,8vh,104px)', lineHeight: '.88', maxWidth: '20ch' }}>Let&apos;s Create What&apos;s Next.</h2>
        <p style={{ fontSize: 'clamp(12px,1.7vh,17px)', lineHeight: '1.5', color: 'var(--mute)', maxWidth: '54ch' }}>Whether you&apos;re building a brand, growing your digital presence, launching a product or visualizing something in 3D — we&apos;re ready to turn it into something people can experience.</p>
        <button onClick={go('/contact')} data-magnet="" data-cursor="Start" style={{ padding: 'clamp(10px,1.6vh,16px) clamp(22px,2.4vw,34px)', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: 'clamp(10px,1.3vh,12px)', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Project</button>
      </div>

      {/* ───────── footer ───────── */}
      <div style={{ position: 'relative', zIndex: 1, flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(10px,2vh,24px)', padding: 'clamp(14px,2.6vh,30px) clamp(16px,3.4vw,48px) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 'clamp(14px,2.4vw,48px)', alignItems: 'start' }}>
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
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', paddingTop: 'clamp(8px,1.4vh,16px)', borderTop: '1px solid var(--line)', fontSize: 'clamp(9px,1.2vh,11px)', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>
          <span style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span data-foot-link="">Privacy</span>
            <span data-foot-link="">Terms</span>
            <span data-foot-link="">Cookies</span>
          </span>
          <span>© Quantivo Digital 2026. All rights reserved</span>
        </div>
      </div>

      {/* ───────── split wordmark, cropped by the viewport edges ───────── */}
      <div aria-hidden="true" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'clamp(12px,4vw,80px)', overflow: 'hidden' }}>
        <span data-word-left="" style={WORD}>QUANTIVO</span>
        <span data-word-right="" style={WORD}>DIGITAL</span>
      </div>
    </div>
  );
}
