'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NAV } from '@/lib/nav';
import { QWatermark } from './QWatermark';

/**
 * The outro is TWO full-screen sections, each 100svh:
 *
 *   OutroLetsTalk   headline + CTA          — TOP half of the Q behind
 *   OutroFooter     footer + wordmark       — BOTTOM half of the Q behind
 *
 * The Q is not one element spanning a tall wrapper; it is the same letter drawn
 * in both sections at the same size, positioned so its centre lands on the shared
 * edge. Each section clips its own half, and together they read as one continuous
 * letter cut by the boundary. That keeps each section independently 100svh, which
 * is what makes the footer a true full-screen viewport.
 *
 * No divider rule any more — the section boundary IS the division.
 *
 * Dimensions clamp against vh rather than vw so neither screen can overflow on
 * short laptop displays.
 */
const LABEL = { fontSize: 'clamp(11px,1.6vh,14px)', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' } as const;
const LINK = { fontSize: 'clamp(17px,2.8vh,26px)', fontWeight: '600', color: 'var(--ink)', textAlign: 'left', lineHeight: '1.6' } as const;
const NAV_LINK = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,6vh,74px)', lineHeight: '1.1', letterSpacing: '.02em', color: 'var(--mute)', transition: 'color .3s' } as const;
const WORD = { fontFamily: "'Bebas Neue',sans-serif", fontSize: '34vh', lineHeight: '.8', letterSpacing: '.01em', color: 'var(--ink)', whiteSpace: 'nowrap', userSelect: 'none' } as const;

const SCREEN = {
  position: 'relative',
  width: '100%',
  height: '100svh',
  overflow: 'hidden',
  background: 'var(--bg2)',
} as const;

const FIELD = {
  background: 'var(--bg)',
  border: '1px solid var(--line)',
  borderRadius: '10px',
  padding: 'clamp(9px,1.5vh,13px) 14px',
  color: 'var(--ink)',
  font: 'inherit',
  fontSize: 'clamp(12px,1.7vh,15px)',
  outline: 'none',
  width: '100%',
  transition: 'border-color .3s',
} as const;

/**
 * Screen 1 — what the Q opens onto. Top half of the letter behind.
 *
 * Two columns: the pitch on the left, contact details and a short enquiry form on
 * the right. Centring a single narrow column left most of this screen empty, and
 * the Q behind it only made that more obvious.
 *
 * The form mirrors /contact: preventDefault, flip the button label. There is no
 * backend anywhere on the site, so posting it somewhere would be new behaviour
 * rather than a port.
 */
export function OutroLetsTalk() {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const goContact = () => { router.push('/contact'); scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <div data-outro-screen="lets-talk" style={SCREEN}>
      <QWatermark half="top" />
      {/* alignContent centres the single row in the screen; alignItems:start then
          lines the two columns up on the SAME top edge, so "Let's Talk" and
          "Contact Us" sit on one horizontal line instead of each column being
          independently centred against the other. */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', alignContent: 'center', alignItems: 'stretch', gap: 'clamp(24px,4vw,80px)', padding: 'clamp(80px,12vh,150px) clamp(16px,3.4vw,48px) clamp(24px,4vh,54px)' }}>

        {/* ---- the pitch ---- */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(16px,3vh,34px)', alignItems: 'flex-start', textAlign: 'left', minWidth: '0' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Let&apos;s Talk</span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,9vh,120px)', lineHeight: '.86', maxWidth: '14ch' }}>Let&apos;s Create What&apos;s Next.</h2>
          <p style={{ fontSize: 'clamp(13px,1.9vh,18px)', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '46ch' }}>Whether you&apos;re building a brand, growing your digital presence, launching a product or visualizing something in 3D — we&apos;re ready to turn it into something people can experience.</p>
          <button onClick={goContact} data-magnet="" data-cursor="Start" style={{ marginTop: 'clamp(2px,1vh,10px)', padding: 'clamp(12px,1.9vh,18px) clamp(24px,2.6vw,38px)', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: 'clamp(11px,1.4vh,13px)', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Project</button>
        </div>

        {/* ---- enquiry form ---- */}
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.7vh,16px)', border: '1px solid var(--line)', borderRadius: '20px', padding: 'clamp(18px,3vh,34px)', background: 'var(--bg)', boxShadow: '0 30px 70px -40px rgba(0,0,0,.85)', minWidth: '0' }}
        >
          <span style={{ fontSize: 'clamp(9px,1.2vh,11px)', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' }}>Contact Us</span>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(22px,3.6vh,42px)', lineHeight: '1', letterSpacing: '.01em' }}>Tell us about it.</span>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 'clamp(10px,1.6vh,14px)' }}>
            <input type="text" placeholder="Your name" data-field="" aria-label="Your name" style={FIELD} />
            <input type="email" placeholder="Email" data-field="" aria-label="Email" style={FIELD} />
          </div>
          <textarea rows={3} placeholder="A few lines about the project." data-field="" aria-label="Project details" style={{ ...FIELD, resize: 'vertical' }} />

          <button type="submit" data-magnet="" data-cursor="Send" style={{ alignSelf: 'start', padding: 'clamp(11px,1.8vh,16px) clamp(22px,2.4vw,34px)', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: 'clamp(10px,1.3vh,12px)', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>
            {sent ? 'Thanks — we’ll be in touch' : 'Send Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}

/** Screen 2 — the footer, full viewport. Bottom half of the letter behind. */
export function OutroFooter() {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const go = (href: string) => () => { router.push(href); scrollTo({ top: 0, behavior: 'instant' }); };

  // The wordmark halves slide apart as this screen scrolls in. It lives outside
  // the pinned reveal now, so it can drive itself off its own position again.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const trigger = { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 0.5 } as const;
        gsap.fromTo('[data-word-left]', { xPercent: 26 }, { xPercent: -20, ease: 'none', scrollTrigger: trigger });
        gsap.fromTo('[data-word-right]', { xPercent: -26 }, { xPercent: 20, ease: 'none', scrollTrigger: trigger });
      }, el);
    })();

    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <div ref={root} data-outro-screen="footer" style={SCREEN}>
      <QWatermark half="bottom" />

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* columns */}
        <div style={{ flex: '1', minHeight: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 'clamp(18px,2.6vw,56px)', alignItems: 'center', padding: 'clamp(18px,3vh,44px) clamp(16px,3.4vw,48px) clamp(14px,2.4vh,30px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px,1.1vh,11px)', alignItems: 'center', textAlign: 'center' }}>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1.2vh,13px)', alignItems: 'center', textAlign: 'center' }}>
            <span style={LABEL}>Newsletter</span>
            <span style={{ fontSize: 'clamp(17px,2.8vh,26px)', fontWeight: '600' }}>Be in the know</span>
            <button onClick={go('/contact')} data-cursor="Subscribe" data-svc-all="" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: 'clamp(8px,1.3vh,12px) clamp(16px,1.6vw,24px)', borderRadius: '99px', border: '1px solid var(--line)', fontSize: 'clamp(11px,1.5vh,14px)', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', transition: 'border-color .3s' }}>
              Subscribe<span aria-hidden="true">&#8594;</span>
            </button>
          </div>
        </div>

        {/* legal bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', padding: 'clamp(10px,1.6vh,18px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)', fontSize: 'clamp(9px,1.2vh,11px)', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>
          <span style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span data-foot-link="">Privacy</span>
            <span data-foot-link="">Terms</span>
            <span data-foot-link="">Cookies</span>
          </span>
          <span>© Quantivo 2026. All rights reserved</span>
        </div>

        {/* Split wordmark, cropped by the viewport edges. */}
        <div aria-hidden="true" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'clamp(12px,4vw,80px)', overflow: 'hidden' }}>
          <span data-word-left="" style={WORD}>QUANTIVO</span>
          <span data-word-right="" style={WORD}>DIGITAL</span>
        </div>
      </div>
    </div>
  );
}
