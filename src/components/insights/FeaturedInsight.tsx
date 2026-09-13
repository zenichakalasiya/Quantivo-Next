'use client';

import { useState } from 'react';
import { ARTICLES } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * The lead article: the most-read piece, given the whole width.
 *
 * Picture on the left, everything else on the right — category and read time on
 * one line above the headline, a short standfirst, then the read control.
 *
 * The read control is a real button with a circular arrow beside the word,
 * rather than the word alone: the block is wide and mostly picture, and a bare
 * text link at that scale is easy to miss.
 *
 * The whole article shares one hover state, so pointing anywhere in it — the
 * picture included — lights the control and eases the image in. The `<button>`
 * is what is actually focusable and clickable; the outer element only listens.
 */
const EASE = 'cubic-bezier(.22,1,.36,1)';

export function FeaturedInsight({ a, onOpen }: { a: (typeof ARTICLES)[number]; onOpen: () => void }) {
  const [on, setOn] = useState(false);

  return (
    <article
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      data-anim="up"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,330px),1fr))',
        gap: 'clamp(22px,3.4vw,60px)',
        alignItems: 'center',
      }}
    >
      {/* ---- the picture ---- */}
      <span
        data-cursor="Read"
        onClick={onOpen}
        style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '4 / 3.1', borderRadius: 'clamp(14px,1.4vw,22px)', overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)', cursor: 'pointer' }}
      >
        <img
          src={asset(a.img)}
          alt=""
          style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: on ? 'scale(1.04)' : 'none', transition: `transform .9s ${EASE}` }}
        />
      </span>

      {/* ---- the copy ---- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(13px,1.5vh,20px)', minWidth: '0' }}>
        <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          <span style={{ padding: '7px 14px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: 'clamp(9.5px,.72vw,11px)', fontWeight: '700', letterSpacing: '.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{a.cat}</span>
          <span style={{ fontSize: 'clamp(10.5px,.8vw,12px)', fontWeight: '600', letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--mute)' }}>{a.read}</span>
        </span>

        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4.4vw,70px)', lineHeight: '.95', letterSpacing: '.01em', maxWidth: '19ch' }}>{a.title}</h2>

        <p style={{ fontSize: 'clamp(14px,1.1vw,18px)', lineHeight: '1.62', color: 'var(--mute)', maxWidth: '46ch' }}>{a.desc}</p>

        <button
          onClick={onOpen}
          onFocus={() => setOn(true)}
          onBlur={() => setOn(false)}
          data-cursor="Read"
          data-magnet=""
          style={{ alignSelf: 'start', display: 'flex', alignItems: 'center', gap: '13px', marginTop: 'clamp(4px,1vh,12px)', fontSize: 'clamp(13px,1vw,16px)', fontWeight: '700', color: 'var(--ink)' }}
        >
          Read
          <span
            aria-hidden="true"
            style={{ display: 'grid', placeItems: 'center', width: 'clamp(36px,3vw,44px)', height: 'clamp(36px,3vw,44px)', borderRadius: '50%', background: on ? 'var(--grad)' : 'var(--ink)', color: on ? '#fff' : 'var(--bg)', transform: on ? 'translateX(4px)' : 'none', transition: `transform .45s ${EASE}, background .4s ease, color .4s ease` }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </button>

        <span style={{ display: 'flex', alignItems: 'center', gap: '9px', marginTop: 'clamp(2px,1vh,10px)', fontSize: 'clamp(11.5px,.85vw,13px)', color: 'var(--mute)' }}>
          <span aria-hidden="true" style={{ width: '19px', height: '19px', borderRadius: '50%', background: 'var(--grad)' }} />
          {a.author}
          <span aria-hidden="true" style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--mute)' }} />
          {a.posted}
        </span>
      </div>
    </article>
  );
}
