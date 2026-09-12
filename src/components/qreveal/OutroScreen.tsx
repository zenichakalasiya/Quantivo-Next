'use client';

import { useEffect, useRef } from 'react';
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

/** Screen 1 — what the Q opens onto. Top half of the letter behind. */
export function OutroLetsTalk() {
  const router = useRouter();
  const goContact = () => { router.push('/contact'); scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <div data-outro-screen="lets-talk" style={SCREEN}>
      <QWatermark half="top" />
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 'clamp(14px,2.6vh,30px)', padding: 'clamp(70px,10vh,120px) clamp(16px,3.4vw,48px)' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Let&apos;s Talk</span>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,11vh,150px)', lineHeight: '.86', maxWidth: '20ch' }}>Let&apos;s Create What&apos;s Next.</h2>
        <p style={{ fontSize: 'clamp(14px,2vh,19px)', lineHeight: '1.55', color: 'var(--mute)', maxWidth: '54ch' }}>Whether you&apos;re building a brand, growing your digital presence, launching a product or visualizing something in 3D — we&apos;re ready to turn it into something people can experience.</p>
        <button onClick={goContact} data-magnet="" data-cursor="Start" style={{ marginTop: 'clamp(2px,1vh,10px)', padding: 'clamp(12px,1.9vh,18px) clamp(24px,2.6vw,38px)', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: 'clamp(11px,1.4vh,13px)', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Project</button>
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
        <div style={{ flex: '1', minHeight: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 'clamp(18px,2.6vw,56px)', alignItems: 'center', padding: 'clamp(60px,9vh,110px) clamp(16px,3.4vw,48px) clamp(14px,2.4vh,30px)' }}>
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

        {/* Split wordmark, cropped by the viewport edges.
            With "Digital" dropped from the brand there is no second word to put on
            the right, so the name splits against itself — QUAN | TIVO — which is
            exactly how the reference treats BULLET | PROOF. */}
        <div aria-hidden="true" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'clamp(12px,4vw,80px)', overflow: 'hidden' }}>
          <span data-word-left="" style={WORD}>QUAN</span>
          <span data-word-right="" style={WORD}>TIVO</span>
        </div>
      </div>
    </div>
  );
}
