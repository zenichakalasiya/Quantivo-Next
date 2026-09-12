'use client';

import { Fragment, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SERVICE_CARDS } from '@/data/content';
import { asset } from '@/lib/assets';
import { goService } from '@/lib/goService';

/**
 * Home / Services — the card deck.
 *
 * ── How the overlap works, and how it failed before ──────────────────────────
 * Every card is `position: sticky` and they are ALL DIRECT CHILDREN OF ONE
 * CONTAINER. That detail is the whole mechanic.
 *
 * The first attempt gave each card its own 100svh slot, and the cards never
 * overlapped — they met edge to edge and parted again. A sticky element only
 * holds within its OWN parent, so each card unstuck the instant its slot ended,
 * and that moment worked out to be exactly when the next card's top reached the
 * previous card's bottom. Sharing one container means every card sticks and
 * STAYS stuck, so the next card genuinely rides up over the one before it.
 *
 * Each card sticks STICK_STEP lower than the one before, leaving a sliver of
 * every covered card visible above the card in front — that is what reads as a
 * deck. Cards later in the DOM paint above earlier ones, so the front-to-back
 * order is free and no z-index is needed.
 *
 * The covered card does not move and does not scale. It stays exactly where it
 * is and only its opacity falls, which is what the reference shows.
 *
 * ── Spacing and triggers ─────────────────────────────────────────────────────
 * Scroll distance between cards comes from GAP spacer elements in normal flow,
 * not from margins, and each card is preceded by a zero-height marker. Both are
 * ordinary non-sticky elements, which is why they make reliable ScrollTrigger
 * triggers: a sticky element's measured position depends on where the scroll
 * happens to be, so triggering off the cards themselves is unreliable.
 *
 * ── Each card's image opens left to right ────────────────────────────────────
 * A clip-path inset opens the photograph's right edge from 100% to 0% as the
 * card arrives. The image never moves or resizes, so its framing is fixed while
 * the visible area widens, and clip-path animates on the compositor rather than
 * relaying out the card every frame.
 *
 * ── This section is deliberately several screens tall ────────────────────────
 * The height IS the effect, so it is exempt from the one-screen rule.
 */
const STICK_BASE = 'clamp(56px,8vh,92px)';
/** Vertical offset per card — this is the visible edge of the cards behind. */
const STICK_STEP = 18;
/** Scroll distance between one card and the next. */
const GAP = 'clamp(300px,52svh,560px)';
const DIM_TO = 0.32;
const CARD_RADIUS = 'clamp(20px,2.2vw,38px)';

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
        const marks = gsap.utils.toArray<HTMLElement>('[data-svc-mark]');
        const cards = gsap.utils.toArray<HTMLElement>('[data-svc-inner]');

        cards.forEach((card, i) => {
          // This card's photograph opens left -> right as the card arrives.
          const img = card.querySelector('[data-svc-img]');
          if (img && marks[i]) {
            gsap.fromTo(
              img,
              { clipPath: 'inset(0 100% 0 0)' },
              {
                clipPath: 'inset(0 0% 0 0)',
                ease: 'none',
                scrollTrigger: { trigger: marks[i], start: 'top 82%', end: 'top 38%', scrub: 0.4 },
              },
            );
          }

          // Fade this card down as the NEXT card rides up over it. Opacity only:
          // the card holds its position, per the reference.
          const nextMark = marks[i + 1];
          if (!nextMark) return;
          gsap.to(card, {
            opacity: DIM_TO,
            ease: 'none',
            scrollTrigger: { trigger: nextMark, start: 'top bottom', end: 'top top+=160', scrub: 0.3 },
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

      {/* ---- the deck. One container, every card sticky inside it. ---- */}
      <div style={{ padding: '0 clamp(16px,3.4vw,48px) clamp(60px,8vw,130px)' }}>
        {SERVICE_CARDS.map((c, i) => (
          <Fragment key={c.n}>
            {/* zero-height, non-sticky: a dependable ScrollTrigger reference */}
            <div data-svc-mark="" style={{ height: '0' }} />

            <div style={{ position: 'sticky', top: `calc(${STICK_BASE} + ${i * STICK_STEP}px)` }}>
              <div
                data-svc-inner=""
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 'clamp(20px,3vw,56px)',
                  // Opaque, or the card behind would show straight through it.
                  background: 'var(--bg2)',
                  border: '1px solid var(--line)',
                  borderRadius: CARD_RADIUS,
                  padding: 'clamp(22px,3vw,56px)',
                  boxShadow: '0 30px 70px -40px rgba(0,0,0,.9)',
                  willChange: 'opacity',
                }}
              >
                {/* left: copy */}
                <div style={{ flex: '1 1 300px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vh,22px)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.22em', color: 'var(--mute)' }}>{c.n}</span>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.6vw,76px)', lineHeight: '.92', letterSpacing: '.005em', color: 'var(--ink)', margin: '0' }}>{c.title}</h3>

                  {/* pill tags — the sub-services of this capability group */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {c.tags.map((t) => (
                      <span key={t} style={{ padding: '7px 14px', borderRadius: '99px', border: '1px solid var(--line)', fontSize: '12px', fontWeight: '600', color: 'var(--ink)', whiteSpace: 'nowrap' }}>{t}</span>
                    ))}
                  </div>

                  <p style={{ fontSize: 'clamp(13px,1vw,16px)', lineHeight: '1.65', color: 'var(--mute)', maxWidth: '48ch', margin: '0' }}>{c.body}</p>

                  <button
                    onClick={goService(router, c.target)}
                    data-magnet=""
                    data-cursor="Explore"
                    data-svc-all=""
                    style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderRadius: '99px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', fontSize: '12px', fontWeight: '700', letterSpacing: '.1em', transition: 'border-color .3s' }}
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
                      // fromTo, so if GSAP never loads — or under
                      // prefers-reduced-motion, where the effect returns early —
                      // the photograph shows rather than staying clipped away.
                      willChange: 'clip-path',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* scroll distance to the next card */}
            {i < SERVICE_CARDS.length - 1 && <div aria-hidden="true" style={{ height: GAP }} />}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
