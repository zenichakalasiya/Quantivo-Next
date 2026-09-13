'use client';

import { useState } from 'react';
import { WORK } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * A project tile. At rest it is the image with the project name beneath it;
 * everything else — the year, the description and the tags — is revealed on
 * hover, over the image, under a gradient rising from its lower edge.
 *
 * The gradient is opaque at the foot and clear at the head, so the detail has
 * somewhere to sit while the top of the image stays visible. A flat wash over
 * the whole tile would hide the picture the tile exists to show.
 *
 * `n` is the project's position in the set, printed as the tile's number the
 * way the reference does. It is passed in rather than derived here, because the
 * gallery filters the list and a tile's number should follow the project, not
 * its position in whatever subset is on screen.
 */
const EASE = 'cubic-bezier(.22,1,.36,1)';

export function ProjectCard({
  w, n, onOpen, ratio = '4 / 5',
}: {
  w: (typeof WORK)[number];
  n: number;
  onOpen: () => void;
  ratio?: string;
}) {
  const [on, setOn] = useState(false);

  return (
    <article
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '0' }}
    >
      <button
        onClick={onOpen}
        onFocus={() => setOn(true)}
        onBlur={() => setOn(false)}
        data-cursor="Case study"
        style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: ratio, borderRadius: 'clamp(10px,1vw,16px)', overflow: 'hidden', background: 'var(--bg2)', textAlign: 'left' }}
      >
        <img
          src={asset(w.img)}
          alt=""
          style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: on ? 'scale(1.04)' : 'none', transition: `transform .7s ${EASE}` }}
        />

        {/* number, always on the tile */}
        <span style={{ position: 'absolute', top: 'clamp(12px,1.4vw,20px)', left: 'clamp(12px,1.4vw,20px)', display: 'grid', gap: '1px', color: '#fff', textShadow: '0 1px 12px rgba(0,0,0,.6)' }}>
          <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '.2em', opacity: '.7' }}>NO.</span>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2vw,30px)', lineHeight: '.9' }}>{String(n).padStart(2, '0')}</span>
        </span>

        {/* the detail, under a gradient rising from the foot */}
        <span
          aria-hidden={!on}
          style={{
            position: 'absolute',
            inset: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '9px',
            padding: 'clamp(14px,1.6vw,24px)',
            background: 'linear-gradient(to top,rgba(9,9,12,.95) 8%,rgba(9,9,12,.8) 40%,rgba(9,9,12,.25) 72%,rgba(9,9,12,0) 100%)',
            opacity: on ? 1 : 0,
            transition: `opacity .42s ${EASE}`,
          }}
        >
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
              transform: on ? 'none' : 'translateY(14px)',
              transition: `transform .5s ${EASE}`,
            }}
          >
            <span style={{ fontSize: 'clamp(10px,.85vw,12px)', fontWeight: '700', letterSpacing: '.18em', color: 'rgba(255,255,255,.65)' }}>{w.year} · {w.cat}</span>
            <span style={{ fontSize: 'clamp(13.5px,1.05vw,17px)', lineHeight: '1.55', color: 'rgba(255,255,255,.93)' }}>{w.disc}</span>
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {w.tags.map((t) => (
                <span key={t} style={{ padding: '6px 13px', borderRadius: '99px', border: '1px solid rgba(255,255,255,.32)', fontSize: 'clamp(10px,.8vw,11.5px)', fontWeight: '700', letterSpacing: '.13em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap' }}>{t}</span>
              ))}
            </span>
          </span>
        </span>
      </button>

      {/* name, always beneath the image */}
      <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,1.9vw,30px)', lineHeight: '1', letterSpacing: '.02em', color: on ? 'var(--ink)' : 'var(--mute)', transition: 'color .3s', margin: '0' }}>
        {w.title}
      </h3>
    </article>
  );
}
