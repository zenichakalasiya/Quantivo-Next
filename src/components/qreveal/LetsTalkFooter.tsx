'use client';

import { useRouter } from 'next/navigation';
import { Q_OUTER, Q_VIEWBOX } from '@/lib/qmark';

/**
 * The two screens that sit behind the Q reveal: "Let's Talk", then the footer.
 *
 * ONE oversized Q watermark spans BOTH screens — its top half behind the Let's
 * Talk block, its bottom half behind the footer. It is a single positioned
 * element that the two screens overlay, deliberately NOT repeated per screen, so
 * the letter reads as continuous and is simply cut by the boundary between them.
 * (Same construction as the giant B behind Bulletproof's footer.)
 */
const COL_LABEL = { fontSize: '10px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' } as const;
const COL_LINK = { fontSize: '15px', fontWeight: '600', color: 'var(--ink)', textAlign: 'left' } as const;
const NAV_LINK = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,3.6vw,56px)', lineHeight: '1.08', letterSpacing: '.02em', color: 'var(--mute)', transition: 'color .3s' } as const;

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function LetsTalkFooter() {
  const router = useRouter();
  const go = (href: string) => () => { router.push(href); scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <div style={{ position: 'relative', background: 'var(--bg2)', overflow: 'hidden' }}>
      {/* ---- the single Q watermark spanning both screens ---- */}
      <svg
        viewBox={Q_VIEWBOX}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          // Sized to the CONTAINER height, not the width: the container holds both
          // screens, so this makes the letter span them and get cut roughly in half
          // by the boundary. Sizing by width overflowed ~2x and cropped to a
          // featureless block that read as nothing.
          height: '104%',
          width: 'auto',
          opacity: '.07',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <path d={Q_OUTER} fill="var(--ink)" />
      </svg>

      {/* ---- screen 1: Let's Talk ---- */}
      <section data-screen-label="Lets Talk" style={{ position: 'relative', zIndex: 1, minHeight: '72svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '24px', padding: 'clamp(70px,10vw,140px) clamp(16px,3.4vw,48px)' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Let&apos;s Talk</span>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,8vw,140px)', lineHeight: '.86', maxWidth: '18ch' }}>Tell Us What You&apos;re Building.</h2>
        <p style={{ fontSize: 'clamp(15px,1.25vw,19px)', lineHeight: '1.55', color: 'var(--mute)', maxWidth: '52ch' }}>Brand, campaign, website or a space that doesn&apos;t exist yet — start the conversation and we&apos;ll come back with a direction.</p>
        <button onClick={go('/contact')} data-magnet="" data-cursor="Start" style={{ marginTop: '4px', padding: '16px 34px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Project</button>
      </section>

      {/* ---- screen 2: footer ---- */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 'clamp(28px,4vw,60px)', alignItems: 'start', padding: 'clamp(48px,6vw,90px) clamp(16px,3.4vw,48px) clamp(28px,3vw,44px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center' }}>
            <span style={COL_LABEL}>Connect</span>
            <button onClick={go('/contact')} data-cursor="Go" data-foot-link="" style={COL_LINK}>Get in touch</button>
            <span data-foot-link="" style={COL_LINK}>Instagram</span>
            <span data-foot-link="" style={COL_LINK}>LinkedIn</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            {NAV.map((n) => (
              <button key={n.href} onClick={go(n.href)} data-cursor="Open" data-foot-nav="" style={NAV_LINK}>{n.label}</button>
            ))}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center' }}>
            <span style={COL_LABEL}>Newsletter</span>
            <span style={{ fontSize: '15px', fontWeight: '600' }}>Be in the know</span>
            <button onClick={go('/contact')} data-cursor="Subscribe" data-svc-all="" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 18px', borderRadius: '99px', border: '1px solid var(--line)', fontSize: '11px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', transition: 'border-color .3s' }}>
              Subscribe<span aria-hidden="true">&#8594;</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', padding: '18px clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)', fontSize: '11px', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>
          <span style={{ display: 'flex', gap: '22px', flexWrap: 'wrap' }}>
            <span data-foot-link="">Privacy</span>
            <span data-foot-link="">Terms</span>
            <span data-foot-link="">Cookies</span>
          </span>
          <span>© Quantivo Digital 2026. All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}
