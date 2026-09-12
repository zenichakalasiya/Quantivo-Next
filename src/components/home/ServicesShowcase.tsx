'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SERVICE_CARDS } from '@/data/content';
import { asset } from '@/lib/assets';
import { goService } from '@/lib/goService';

/**
 * Home / Services. Built from the client's reference and kota.co.uk.
 *
 * ── The deck ─────────────────────────────────────────────────────────────────
 * The outgoing card does NOT scroll away. It stays where it is, the next card
 * rises from below to cover it, and the covered card settles BEHIND the new one
 * — a deck, not a queue.
 *
 * Two things together sell the depth, and both are needed:
 *
 *   1. Each card sticks LOWER than the one before it (STICK_STEP per index), so
 *      every covered card leaves a visible sliver of its top edge above the card
 *      in front. That sliver is what makes it read as a stack of cards rather
 *      than one card replacing another.
 *   2. As the next card arrives, the covered card scales down and dims — but
 *      only to DIM_TO, not to nothing. Fading it out entirely (the first attempt
 *      used .28) destroyed the effect: a card you cannot see is not behind
 *      anything, it has just gone.
 *
 * The stacking order is free: cards later in the DOM paint above earlier ones,
 * which is already front-to-back, so no z-index is needed.
 *
 * The positioning is `position: sticky`, not a pinned tween. Each card sits in a
 * slot one viewport tall and holds at its offset while the rest of its slot
 * scrolls past. Nothing in JS decides where a card sits, so it tracks the scroll
 * exactly and cannot drift. (kota.co.uk pins with GSAP instead — same result,
 * more machinery.)
 *
 * ── Each card's image opens left to right ────────────────────────────────────
 * As a card comes forward its photograph is revealed by a clip-path inset
 * opening its right edge from 100% to 0%. The image itself never moves or
 * resizes, so its framing is fixed while the visible area widens — and clip-path
 * animates on the compositor, unlike an animated width, which would relayout the
 * card on every frame.
 *
 * ── This section is deliberately several screens tall ────────────────────────
 * Four cards, one viewport of scroll each. The height IS the effect, so this
 * section is exempt from the one-screen rule the others follow.
 */
const STICK_BASE = 'clamp(56px,8vh,92px)';
/** Vertical offset per card — this is the visible edge of the cards behind. */
const STICK_STEP = 18;
const DIM_TO = 0.55;
const SCALE_TO = 0.93;
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
        const slots = gsap.utils.toArray<HTMLElement>('[data-svc-slot]');

        slots.forEach((slot, i) => {
          // This card's photograph opens left -> right as the card comes forward.
          const img = slot.querySelector('[data-svc-img]');
          if (img) {
            gsap.fromTo(
              img,
              { clipPath: 'inset(0 100% 0 0)' },
              {
                clipPath: 'inset(0 0% 0 0)',
                ease: 'none',
                scrollTrigger: { trigger: slot, start: 'top 82%', end: 'top 34%', scrub: 0.4 },
              },
            );
          }

          // Settle this card behind the next one as that next card rises.
          const next = slots[i + 1];
          if (!next) return;
          gsap.to(slot.querySelector('[data-svc-inner]'), {
            opacity: DIM_TO,
            scale: SCALE_TO,
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
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: '24px', padding: 'clamp(56px,7vw,110px) clamp(16px,3.4vw,48px) clamp(28px,3.6vw,52px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>04 — Our Services</span>
          <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92', maxWidth: '20ch' }}>Everything Your Brand Needs to Move Forward.</h2>
        </div>
        <p data-anim="up" style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '40ch' }}>We combine strategy, creativity, technology, and visualization to help businesses build stronger brands and create better digital experiences.</p>
      </div>

      {/* ---- the deck. Gradient ground, light cards. ---- */}
      <div style={{ background: GRADIENT, padding: 'clamp(24px,3vw,48px) clamp(16px,3.4vw,48px) clamp(60px,8vw,130px)' }}>
        {SERVICE_CARDS.map((c, i) => (
          <div
            key={c.n}
            data-svc-slot=""
            // One viewport of scroll per card — this is what gives each card its
            // turn on screen before the next one covers it.
            style={{ height: '100svh' }}
          >
            <div style={{ position: 'sticky', top: `calc(${STICK_BASE} + ${i * STICK_STEP}px)` }}>
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
                  // Scale about the top edge so a shrinking card sinks back
                  // rather than lifting away from the card in front of it.
                  transformOrigin: 'center top',
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

                {/* right: image, revealed left -> right */}
                <div style={{ flex: '1 1 280px', minWidth: '0' }}>
                  <img
                    data-svc-img=""
                    src={asset(c.img)}
                    alt=""
                    style={{
                      display: 'block',
                      width: '100%',
                      aspectRatio: '4 / 3',
                      maxHeight: '46svh',
                      objectFit: 'cover',
                      borderRadius: 'clamp(12px,1.2vw,20px)',
                      // Default VISIBLE. The closed state is applied by the
                      // fromTo below, so the failure mode when GSAP never loads
                      // — or under prefers-reduced-motion, where the effect
                      // returns early — is a plainly visible photograph rather
                      // than one clipped to nothing forever.
                      willChange: 'clip-path',
                    }}
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
