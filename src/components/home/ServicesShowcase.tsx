'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SERVICE_CARDS } from '@/data/content';
import { asset } from '@/lib/assets';
import { goService } from '@/lib/goService';

/**
 * Home / Services. Rebuilt from the client's scroll-effect reference.
 *
 * ── The card stack ───────────────────────────────────────────────────────────
 * The reference is explicit about something easy to get wrong: the outgoing card
 * DOES NOT scroll up and away. It stays exactly where it is and the next card
 * rises from below to cover it, while the covered card's content greys out.
 *
 * That is `position: sticky` doing the work, not a tween. Each card sits in a
 * SLOT one viewport tall; the card itself sticks at STICK_TOP. Once a card
 * reaches that offset it holds there while the rest of its slot scrolls past,
 * and the next slot's card slides up over it. No JS decides any of this, so it
 * tracks the scroll exactly and cannot drift out of sync.
 *
 * Cards later in the DOM paint above earlier ones without needing z-index —
 * which is exactly the covering order the reference shows.
 *
 * GSAP does ONE thing here: greys the covered card. Each card's inner content
 * fades and shrinks slightly, scrubbed against the arrival of the NEXT card's
 * slot, so the fade is tied to the covering rather than to a timer.
 *
 * ── The header image band ────────────────────────────────────────────────────
 * "On scroll it gradually expands from left to right." The image never resizes
 * and never moves — a clip-path inset opens its right edge from 72% to 0%. That
 * holds the photograph's scale and framing fixed while the visible band widens,
 * and it runs on the compositor instead of thrashing layout the way an animated
 * `width` would.
 *
 * ── This section is deliberately several screens tall ────────────────────────
 * Four cards, one viewport of scroll each. The height IS the effect, so this
 * section is exempt from the one-screen rule the others follow.
 */
const STICK_TOP = 'clamp(64px,9vh,104px)';
const CARD_RADIUS = 'clamp(20px,2.2vw,38px)';

/** Light cards on the brand gradient — the section inverts against the dark page. */
const GRADIENT = 'linear-gradient(150deg,#4461C8 0%,#5750B4 38%,#6B3FA0 72%,#4F3F96 100%)';

const INK = '#0F0F12';
const MUTE = '#55555F';

export function ServicesShowcase() {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);

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
        // The header band opens left -> right as the section arrives.
        gsap.fromTo(
          '[data-svc-band]',
          { clipPath: 'inset(0 72% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
            scrollTrigger: { trigger: '[data-svc-band]', start: 'top 88%', end: 'bottom 42%', scrub: 0.4 },
          },
        );

        // Grey out each card as the NEXT card's slot rises to cover it.
        const slots = gsap.utils.toArray<HTMLElement>('[data-svc-slot]');
        slots.forEach((slot, i) => {
          const next = slots[i + 1];
          if (!next) return;
          gsap.to(slot.querySelector('[data-svc-inner]'), {
            opacity: 0.28,
            scale: 0.975,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: 0.3 },
          });
        });
      }, el);
    })();

    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section data-screen-label="Home / Services" ref={root} style={{ borderTop: '1px solid var(--line)' }}>
      {/* ---- header ---- */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: '24px', padding: 'clamp(56px,7vw,110px) clamp(16px,3.4vw,48px) clamp(24px,3vw,44px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>04 — Our Services</span>
          <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92', maxWidth: '20ch' }}>Everything Your Brand Needs to Move Forward.</h2>
        </div>
        <p data-anim="up" style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '40ch' }}>We combine strategy, creativity, technology, and visualization to help businesses build stronger brands and create better digital experiences.</p>
      </div>

      {/* ---- the band that opens left -> right ---- */}
      <div style={{ padding: '0 clamp(16px,3.4vw,48px) clamp(30px,4vw,56px)' }}>
        <div
          data-svc-band=""
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(120px,22vh,240px)',
            borderRadius: 'clamp(14px,1.4vw,22px)',
            overflow: 'hidden',
            clipPath: 'inset(0 72% 0 0)',
            willChange: 'clip-path',
          }}
        >
          <img src={asset('/img/q-cat-growth.jpg')} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <span style={{ position: 'absolute', inset: '0', background: 'linear-gradient(90deg,rgba(9,9,12,.55) 0%,rgba(9,9,12,.12) 60%,rgba(9,9,12,0) 100%)' }} />
        </div>
      </div>

      {/* ---- the stack. Gradient ground, light cards. ---- */}
      <div style={{ background: GRADIENT, padding: 'clamp(24px,3vw,48px) clamp(16px,3.4vw,48px) clamp(60px,8vw,130px)' }}>
        {SERVICE_CARDS.map((c) => (
          <div
            key={c.n}
            data-svc-slot=""
            // One viewport of scroll per card — this is what gives each card its
            // turn on screen before the next one covers it.
            style={{ height: '100svh' }}
          >
            <div style={{ position: 'sticky', top: STICK_TOP }}>
              <div
                data-svc-inner=""
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 'clamp(20px,3vw,56px)',
                  background: '#fff',
                  borderRadius: CARD_RADIUS,
                  padding: 'clamp(22px,3vw,56px)',
                  boxShadow: '0 30px 70px -30px rgba(9,9,12,.55)',
                  willChange: 'opacity, transform',
                }}
              >
                {/* left: copy */}
                <div style={{ flex: '1 1 300px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vh,22px)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.22em', color: MUTE }}>{c.n}</span>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.6vw,76px)', lineHeight: '.92', letterSpacing: '.005em', color: INK, margin: '0' }}>{c.title}</h3>

                  {/* pill tags — the sub-services of this capability group */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {c.tags.map((t) => (
                      <span key={t} style={{ padding: '7px 14px', borderRadius: '99px', border: '1px solid rgba(15,15,18,.22)', fontSize: '12px', fontWeight: '600', color: INK, whiteSpace: 'nowrap' }}>{t}</span>
                    ))}
                  </div>

                  <p style={{ fontSize: 'clamp(13px,1vw,16px)', lineHeight: '1.65', color: MUTE, maxWidth: '48ch', margin: '0' }}>{c.body}</p>

                  <button
                    onClick={goService(router, c.target)}
                    data-magnet=""
                    data-cursor="Explore"
                    style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderRadius: '99px', border: '1px solid rgba(15,15,18,.28)', background: 'transparent', color: INK, fontSize: '12px', fontWeight: '700', letterSpacing: '.1em' }}
                  >
                    Find out more
                    <span aria-hidden="true" style={{ fontSize: '14px', lineHeight: '1' }}>&#8594;</span>
                  </button>
                </div>

                {/* right: image */}
                <div style={{ flex: '1 1 280px', minWidth: '0' }}>
                  <img
                    src={asset(c.img)}
                    alt=""
                    style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', maxHeight: '46svh', objectFit: 'cover', borderRadius: 'clamp(12px,1.2vw,20px)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
