'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { HERO_SLIDES } from '@/data/content';
import { asset } from '@/lib/assets';
import { goService } from '@/lib/goService';

/**
 * Hero media slider. The sequence is strictly TEXT FIRST, THEN IMAGE:
 *
 *     0ms     eyebrow wipes in left -> right
 *     95ms    headline follows
 *     190ms   paragraph
 *     285ms   button
 *     560ms   only now does the image start opening small -> big
 *
 * ── The text wipe ────────────────────────────────────────────────────────────
 * Left-to-right is a clip-path inset animated on its RIGHT edge:
 *
 *     hidden   inset(-.25em 100% -.35em -.25em)   right edge closed all the way
 *     shown    inset(-.25em -.25em -.35em -.25em) right edge past the text
 *
 * The em insets on the other three sides give the glyphs breathing room so
 * descenders and the button's rounded corners are not shaved by the clip. Each
 * piece gets its own transition-delay, which is what produces the stagger —
 * the block does not move as one lump.
 *
 * ── The image ────────────────────────────────────────────────────────────────
 * Unchanged mechanism: the picture never moves, a rounded window opens over it
 * from inset(45%) to inset(0%) at a constant 48px radius. No transform: scale(),
 * so the image stays pin-sharp instead of being resampled.
 *
 * ── Why the OUTGOING slide only fades ────────────────────────────────────────
 * Giving both slides the same transition made the leaving image animate its clip
 * backwards — shrinking 0% -> 45% in full view. Two images moving in opposite
 * directions read as "big turning into small", the exact opposite of the intended
 * small-to-big. So the leaving slide fades on opacity alone and its clip is reset
 * with `0ms` duration on a delay equal to the fade, i.e. it snaps back to 45%
 * only once it is already invisible. The z-index keeps the incoming slide on top
 * while that happens.
 */
const TEXT_MS = 820;
const TEXT_STAGGER = 95;
const MEDIA_DELAY = 560;
const REVEAL_MS = 1150;
const LEAVE_MS = 300;
const AUTOPLAY_MS = 6600;
const RADIUS = 48;
const EASE = 'cubic-bezier(.16,1,.3,1)';

const CLIP_OPEN = `inset(0% round ${RADIUS}px)`;
const CLIP_SMALL = `inset(45% round ${RADIUS}px)`;

const WIPE_SHOWN = 'inset(-.25em -.25em -.35em -.25em)';
const WIPE_HIDDEN = 'inset(-.25em 100% -.35em -.25em)';

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

  /** One staggered left-to-right wipe. `k` is the piece's position in the stack. */
  const wipe = (on: boolean, k: number): CSSProperties => {
    if (reduced) return {};
    const lead = k * TEXT_STAGGER;
    return {
      clipPath: on ? WIPE_SHOWN : WIPE_HIDDEN,
      opacity: on ? 1 : 0,
      transform: on ? 'none' : 'translateX(-22px)',
      transition: on
        ? `clip-path ${TEXT_MS}ms ${EASE} ${lead}ms, transform ${TEXT_MS}ms ${EASE} ${lead}ms, opacity ${Math.round(TEXT_MS * 0.55)}ms ease ${lead}ms`
        // Leaving: fade only, then snap the wipe shut once it cannot be seen.
        : `opacity ${LEAVE_MS}ms ease, clip-path 0ms linear ${LEAVE_MS}ms, transform 0ms linear ${LEAVE_MS}ms`,
      willChange: 'clip-path, transform, opacity',
    };
  };

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
                zIndex: on ? 1 : 0,
                clipPath: reduced || on ? CLIP_OPEN : CLIP_SMALL,
                opacity: reduced || on ? 1 : 0,
                transition: reduced
                  ? 'none'
                  : on
                    ? `clip-path ${REVEAL_MS}ms ${EASE} ${MEDIA_DELAY}ms, opacity 420ms linear ${MEDIA_DELAY}ms`
                    : `opacity ${LEAVE_MS}ms ease, clip-path 0ms linear ${LEAVE_MS}ms`,
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
        <div style={{ position: 'absolute', inset: '0', zIndex: 2, display: 'grid', alignContent: 'center', padding: 'clamp(24px,5vw,88px)', pointerEvents: 'none' }}>
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
                  pointerEvents: on ? 'auto' : 'none',
                }}
              >
                {[
                  <span key="eyebrow" style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: '#fff', opacity: '.75' }}>{s.eyebrow}</span>,
                  <h1 key="head" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,calc(7.4vw - 8px),116px)', lineHeight: '.88', letterSpacing: '-.005em', color: '#fff', maxWidth: '16ch' }}>{s.head}</h1>,
                  <p key="sub" style={{ fontSize: 'clamp(14px,1.25vw,19px)', lineHeight: '1.55', color: 'rgba(255,255,255,.86)', maxWidth: '46ch' }}>{s.sub}</p>,
                  <button
                    key="cta"
                    onClick={goService(router, s.target)}
                    data-magnet=""
                    data-cursor="Explore"
                    style={{ padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}
                  >
                    {s.cta}
                  </button>,
                ].map((node, k) => (
                  // Wrapper carries the wipe so each piece's own styles stay clean.
                  <div key={k} data-hero-line="" style={{ ...wipe(on, k), marginTop: k === 3 ? 'clamp(2px,1vh,10px)' : undefined }}>
                    {node}
                  </div>
                ))}
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
