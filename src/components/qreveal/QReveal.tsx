'use client';

import { useEffect, useRef } from 'react';
import { Q_BBOX, Q_DOT, Q_OUTER, Q_RING, Q_VIEWBOX } from '@/lib/qmark';

/**
 * "Draw the Q, then open the page out of it."
 *
 * One pinned, scrubbed timeline so it reverses cleanly on the way back up:
 *
 *   0.00 - 0.55  DRAW  stroke-dashoffset runs to 0 on the outer silhouette, the
 *                      ring and the centre dot, staggered. Outlines only, so the
 *                      arrow inside the Q actually reads.
 *   0.55 - 1.00  OPEN  the linework fades and a full-viewport panel clipped to
 *                      the Q is revealed as the CLIP GROWS past the screen edge.
 *
 * The clip uses clipPathUnits="userSpaceOnUse" and we animate a transform on the
 * clip PATH — not on the panel. That is deliberate: scaling the panel would scale
 * its text too. Here the content never moves a pixel; only the window onto it
 * opens. Same reason Klarna's inset reveal reads as expensive — nothing resamples.
 */
const BBOX_CX = Q_BBOX.x + Q_BBOX.w / 2;
const BBOX_CY = Q_BBOX.y + Q_BBOX.h / 2;

export function QReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const clipPath = el.querySelector<SVGPathElement>('[data-q-clip]');
    const panel = el.querySelector<HTMLElement>('[data-q-panel]');
    const art = el.querySelector<HTMLElement>('[data-q-art]');
    const watermark = el.querySelector<HTMLElement>('[data-q-watermark]');

    /** Places the clip letter centred on screen at `height` px tall. */
    const setClip = (height: number) => {
      const k = height / Q_BBOX.h;
      const cx = innerWidth / 2;
      const cy = innerHeight / 2;
      clipPath?.setAttribute(
        'transform',
        `translate(${cx} ${cy}) scale(${k}) translate(${-BBOX_CX} ${-BBOX_CY})`,
      );
    };

    // Big enough that the clip edge is off-screen on any viewport.
    const fullHeight = () => Math.hypot(innerWidth, innerHeight) * 1.35;
    const startHeight = () => Math.min(innerHeight * 0.48, 520);

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (panel) { panel.style.clipPath = 'none'; panel.style.opacity = '1'; }
      if (art) art.style.display = 'none';
      if (watermark) watermark.style.opacity = '1';
      return;
    }

    setClip(startHeight());

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const strokes = gsap.utils.toArray<SVGPathElement>('[data-q-stroke]');
        strokes.forEach((s) => {
          const len = s.getTotalLength();
          gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
        });

        // Proxy the clip size so GSAP can scrub it and we re-emit the transform.
        const clip = { h: startHeight() };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=2600',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ---- phase 1: draw the letter ----
        tl.to(strokes, { strokeDashoffset: 0, ease: 'none', stagger: 0.1, duration: 0.55 }, 0);

        // ---- handoff ----
        tl.to('[data-q-art]', { opacity: 0, ease: 'none', duration: 0.08 }, 0.52);
        tl.to('[data-q-panel]', { opacity: 1, ease: 'none', duration: 0.08 }, 0.52);

        // ---- phase 2: open the window ----
        // The watermark stays hidden (see QWatermark.tsx) until the window is
        // almost fully open, then fades in — by then the clip covers the whole
        // viewport so there is nothing left for it to peek through unevenly.
        tl.to('[data-q-watermark]', { opacity: 1, ease: 'none', duration: 0.12 }, 0.85);

        // Once the window is bigger than the screen the clip costs compositing
        // for no visual difference, so drop it at the very end.
        tl.set('[data-q-panel]', { clipPath: 'none' }, 0.995);

        tl.to(clip, {
          h: fullHeight(),
          ease: 'power2.in',
          duration: 0.45,
          onUpdate: () => setClip(clip.h),
        }, 0.55);


        const onResize = () => setClip(clip.h);
        addEventListener('resize', onResize);
        return () => removeEventListener('resize', onResize);
      }, el);
    })();

    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section
      ref={root}
      data-screen-label="Q Reveal"
      style={{ position: 'relative', height: '100svh', overflow: 'hidden', background: 'var(--bg)' }}
    >
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          {/* userSpaceOnUse: the transform below is animated, so the WINDOW grows
              while the panel it clips stays perfectly still. */}
          <clipPath id="q-mask" clipPathUnits="userSpaceOnUse">
            <path data-q-clip="" d={Q_OUTER} />
          </clipPath>
        </defs>
      </svg>

      {/* phase 1 — the outline being drawn */}
      <div data-q-art="" style={{ position: 'absolute', inset: '0', display: 'grid', placeItems: 'center', pointerEvents: 'none', zIndex: 2 }}>
        <svg viewBox={Q_VIEWBOX} style={{ height: 'clamp(200px,48vh,520px)', width: 'auto', overflow: 'visible' }} aria-hidden="true">
          <g fill="none" stroke="var(--ink)" strokeOpacity=".72" strokeWidth="0.9" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round">
            <path data-q-stroke="" d={Q_OUTER} />
            <path data-q-stroke="" d={Q_RING} />
            <circle data-q-stroke="" cx={Q_DOT.cx} cy={Q_DOT.cy} r={Q_DOT.r} />
          </g>
        </svg>
      </div>

      {/* phase 2 — content revealed through the growing Q. Never scaled. */}
      <div
        data-q-panel=""
        style={{
          position: 'absolute',
          inset: '0',
          clipPath: 'url(#q-mask)',
          opacity: 0,
          display: 'grid',
          placeItems: 'center',
          willChange: 'clip-path',
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </section>
  );
}
