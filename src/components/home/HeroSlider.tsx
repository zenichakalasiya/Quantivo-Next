'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HERO_SLIDES } from '@/data/content';
import { asset } from '@/lib/assets';
import { goService } from '@/lib/goService';

/**
 * Hero media slider — an expanding clip-path window, NOT a scale/zoom.
 *
 * ── The mechanism ────────────────────────────────────────────────────────────
 * The image is never transformed. It sits still at full size while a rounded
 * clip window opens over it:
 *
 *     inactive  clip-path: inset(45% round 48px);  opacity: 0
 *     active    clip-path: inset(0%  round 48px);  opacity: 1
 *
 * The corner radius stays a constant 48px inside inset() — the window grows, the
 * radius does not. This is measured from klarna.com, where the resting state of
 * every queued slide is literally `inset(45% round 48px); opacity: 0`.
 *
 * NO transform: scale() anywhere on the image. That is the whole point: a scale
 * resamples the pixels and reads as cheap, whereas here the picture stays
 * pin-sharp and motionless while the frame opens around it like an aperture.
 *
 * ── Why the copy is not inside the clipped element ───────────────────────────
 * The text must lead and the media follow. If the copy lived inside the clipped
 * media it would be cut by the same window and could not animate first, so the
 * two are siblings: copy fades/rises immediately, the media reveal starts
 * COPY_LEAD_MS later.
 *
 * The lead is expressed purely as the media's transition-DELAY, with no JS
 * timing state. An earlier version flipped a `copyIn` flag inside
 * requestAnimationFrame to retrigger the copy; if that frame was cancelled by the
 * effect's own cleanup the flag never flipped back and the copy stuck part-way
 * through its fade. Deriving straight from `active` cannot get stuck.
 *
 * ── Timing ───────────────────────────────────────────────────────────────────
 * clip-path runs REVEAL_MS on a heavy ease-out so it decelerates into place;
 * opacity runs much shorter, which is how "fade over the first ~40%" is done
 * with plain CSS transitions — two properties, two durations, one trigger.
 */
const REVEAL_MS = 1050;
const COPY_LEAD_MS = 200;
const AUTOPLAY_MS = 6200;
const RADIUS = 48;
const EASE = 'cubic-bezier(.16,1,.3,1)';

const CLIP_IN = `inset(0% round ${RADIUS}px)`;
const CLIP_OUT = `inset(45% round ${RADIUS}px)`;

export function HeroSlider() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const hovering = useRef(false);

  useEffect(() => {
    setReduced(matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const go = useCallback((i: number) => {
    setActive(((i % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => { if (!hovering.current) go(active + 1); }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active, go, reduced]);

  return (
    <section
      data-screen-label="Home / Hero"
      style={{ position: 'relative', padding: 'clamp(86px,11vh,120px) clamp(10px,1.6vw,24px) clamp(20px,3vh,34px)' }}
    >
      <div
        onMouseEnter={() => { hovering.current = true; }}
        onMouseLeave={() => { hovering.current = false; }}
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(440px,78vh,900px)',
          borderRadius: `${RADIUS}px`,
          // overflow VISIBLE — the clip-path does the containing, not the box.
          overflow: 'visible',
          background: 'var(--bg2)',
        }}
      >
        {HERO_SLIDES.map((s, i) => {
          const on = i === active;
          return (
            <div
              key={s.target}
              data-hero-media=""
              aria-hidden={!on}
              style={{
                position: 'absolute',
                inset: '0',
                clipPath: reduced ? CLIP_IN : on ? CLIP_IN : CLIP_OUT,
                opacity: reduced ? 1 : on ? 1 : 0,
                transition: reduced
                  ? 'none'
                  : `clip-path ${REVEAL_MS}ms ${EASE} ${COPY_LEAD_MS}ms, opacity ${Math.round(REVEAL_MS * 0.4)}ms linear ${COPY_LEAD_MS}ms`,
                willChange: 'clip-path, opacity',
                pointerEvents: on ? 'auto' : 'none',
              }}
            >
              {/* 105% and object-fit:cover so the growing window never exposes an
                  edge of the picture. Never scaled. */}
              <img
                src={asset(s.img)}
                alt=""
                style={{ position: 'absolute', top: '-2.5%', left: '-2.5%', width: '105%', height: '105%', objectFit: 'cover', display: 'block' }}
              />
              {/* Legibility scrim. Two layers, and it needs both: these service
                  photos are bright (white laptop, pale desk) where Klarna's are
                  dark, so a single left-edge gradient left the headline washed
                  out over the middle of the frame. A flat wash carries the whole
                  card, the gradient then deepens the copy column. */}
              <span style={{ position: 'absolute', inset: '0', background: 'rgba(9,9,12,.42)', pointerEvents: 'none' }} />
              <span style={{ position: 'absolute', inset: '0', background: 'linear-gradient(90deg,rgba(9,9,12,.9) 0%,rgba(9,9,12,.78) 34%,rgba(9,9,12,.42) 62%,rgba(9,9,12,0) 88%)', pointerEvents: 'none' }} />
            </div>
          );
        })}

        {/* ---- copy: leads the media ---- */}
        <div style={{ position: 'absolute', inset: '0', display: 'grid', alignContent: 'center', padding: 'clamp(24px,5vw,88px)', pointerEvents: 'none' }}>
          {HERO_SLIDES.map((s, i) => {
            const on = i === active;
            return (
              <div
                key={s.target}
                data-hero-copy=""
                aria-hidden={!on}
                style={{
                  gridArea: '1/1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 'clamp(12px,2vh,22px)',
                  // In px, not ch: `ch` here resolves against this container's
                  // 16px font, not the headline's, so a ch cap throttled the h1
                  // into a thin stack regardless of its own max-width.
                  maxWidth: 'min(100%, 660px)',
                  opacity: on ? 1 : 0,
                  transform: on ? 'none' : 'translateY(18px)',
                  transition: reduced ? 'none' : `opacity 620ms ease, transform 760ms ${EASE}`,
                  pointerEvents: on ? 'auto' : 'none',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: '#fff', opacity: '.75' }}>{s.eyebrow}</span>
                <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(42px,7.4vw,124px)', lineHeight: '.88', letterSpacing: '-.005em', color: '#fff', maxWidth: '16ch' }}>{s.head}</h1>
                <p style={{ fontSize: 'clamp(14px,1.25vw,19px)', lineHeight: '1.55', color: 'rgba(255,255,255,.86)', maxWidth: '46ch' }}>{s.sub}</p>
                <button
                  onClick={goService(router, s.target)}
                  data-magnet=""
                  data-cursor="Explore"
                  style={{ marginTop: 'clamp(2px,1vh,10px)', padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}
                >
                  {s.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* ---- prev / next ---- */}
        {[-1, 1].map((dir) => (
          <button
            key={dir}
            onClick={() => go(active + dir)}
            data-cursor={dir < 0 ? 'Prev' : 'Next'}
            data-hero-arrow=""
            aria-label={dir < 0 ? 'Previous slide' : 'Next slide'}
            style={{
              position: 'absolute',
              top: '50%',
              [dir < 0 ? 'left' : 'right']: 'clamp(-10px,-.6vw,0px)',
              transform: 'translateY(-50%)',
              width: 'clamp(38px,3vw,48px)',
              height: 'clamp(38px,3vw,48px)',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.35)',
              background: 'rgba(9,9,12,.45)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontSize: '16px',
              transition: 'border-color .3s, background .3s',
              zIndex: 3,
            }}
          >
            {dir < 0 ? '←' : '→'}
          </button>
        ))}
      </div>

      {/* ---- dots ---- */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', paddingTop: 'clamp(14px,2vh,22px)' }}>
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.target}
            onClick={() => go(i)}
            data-cursor="Go"
            aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
            aria-current={i === active}
            style={{
              width: i === active ? '26px' : '7px',
              height: '7px',
              borderRadius: '99px',
              background: i === active ? 'var(--grad)' : 'var(--line)',
              transition: 'width .45s cubic-bezier(.4,0,.2,1), background .3s',
            }}
          />
        ))}
      </div>
    </section>
  );
}
