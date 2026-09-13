'use client';

import { useState } from 'react';
import { asset } from '@/lib/assets';

/**
 * One service, as a full-width row in the list.
 *
 * At rest: the name, a dot, a one-line description under it, and an arrow at the
 * far right. On hover a picture opens from the LEFT, the copy slides across to
 * make room, the description swaps for the list of what the service actually
 * covers, and the arrow gains a "More Info" label.
 *
 * ── Why the picture is a width animation, not a slide ────────────────────────
 * The copy has to move over by exactly as much as the picture takes up. Sliding
 * a fixed-width picture in from off-screen would need the copy's translate kept
 * in sync with it by hand, and the two would drift at different viewport widths.
 *
 * Animating the picture's own `width` from 0 makes the row's flex layout do that
 * for free: the copy is a sibling, so it is pushed across by whatever the
 * picture currently occupies. One value drives both.
 *
 * `overflow: hidden` plus a fixed-width inner image is what makes it read as an
 * aperture opening rather than a picture being squashed — the image itself never
 * changes size, only how much of it is visible.
 *
 * ── Why both descriptions are always in the DOM ──────────────────────────────
 * They cross-fade in a grid cell they both occupy, so the row's height is the
 * taller of the two at all times and never jumps mid-hover. Swapping the text
 * of one element would reflow the row and shove everything below it.
 */
const EASE = 'cubic-bezier(.22,1,.36,1)';
const DUR = '.62s';

/** Matches the reference: the picture is about as tall as the row. */
const IMG_W = 'clamp(150px,15vw,232px)';
const IMG_H = 'clamp(112px,11.3vw,174px)';

export function ServiceRow({
  id, n, title, blurb, items, img, onOpen,
}: {
  id: string;
  n: string;
  title: string;
  blurb: string;
  items: readonly string[];
  img: string;
  onOpen: () => void;
}) {
  const [on, setOn] = useState(false);

  // Six sets two comfortable lines at this size and width. Seven tipped into a
  // third line with "+N more" dangling alone on it.
  const shown = items.slice(0, 6);
  const extra = items.length - shown.length;

  return (
    <div
      id={id}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      onClick={onOpen}
      data-cursor="More info"
      tabIndex={0}
      role="link"
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(); }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0px,0vw,0px)',
        padding: 'clamp(22px,3vh,38px) 0',
        borderTop: '1px solid var(--line)',
        cursor: 'pointer',
        // scroll-margin so the mega-menu's anchor jump doesn't park the row
        // under the fixed header
        scrollMarginTop: 'clamp(90px,13vh,130px)',
      }}
    >
      {/* the aperture */}
      <span
        aria-hidden="true"
        style={{
          flex: 'none',
          display: 'block',
          width: on ? IMG_W : '0px',
          height: IMG_H,
          borderRadius: 'clamp(8px,.8vw,12px)',
          overflow: 'hidden',
          background: 'var(--bg2)',
          transition: `width ${DUR} ${EASE}`,
        }}
      >
        <img
          src={asset(img)}
          alt=""
          style={{ width: IMG_W, height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </span>

      {/* the copy. paddingLeft is what holds the gap between picture and text,
          and it collapses with the picture so the title sits flush at rest. */}
      <div
        style={{
          flex: '1',
          minWidth: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(6px,.9vh,12px)',
          paddingLeft: on ? 'clamp(18px,2.4vw,38px)' : '0px',
          transition: `padding-left ${DUR} ${EASE}`,
        }}
      >
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,1vw,16px)', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,3.5vw,53px)', lineHeight: '1.1', letterSpacing: '.02em', margin: '0' }}>
          {title}
          <span aria-hidden="true" style={{ flex: 'none', width: 'clamp(9px,.85vw,13px)', height: 'clamp(9px,.85vw,13px)', borderRadius: '50%', background: 'var(--grad)', opacity: on ? 1 : .55, transition: 'opacity .4s' }} />
        </h3>

        {/* both descriptions share one grid cell, so the row never jumps */}
        <span style={{ display: 'grid', minWidth: '0' }}>
          <span style={{ gridArea: '1 / 1', fontSize: 'clamp(11px,calc(1.9vw - 4px),29px)', lineHeight: '1.5', color: 'var(--mute)', maxWidth: '40ch', opacity: on ? 0 : 1, transition: `opacity .3s ease ${on ? '0s' : '.16s'}` }}>
            {blurb}
          </span>
          <span style={{ gridArea: '1 / 1', fontSize: 'clamp(11px,calc(1.9vw - 4px),29px)', lineHeight: '1.5', color: 'var(--ink)', maxWidth: '54ch', opacity: on ? 1 : 0, transition: `opacity .35s ease ${on ? '.14s' : '0s'}` }}>
            {shown.join(' • ')}{extra > 0 ? ` • +${extra} more` : ''}
          </span>
        </span>
      </div>

      {/* The arrow. A plain rule plus a chevron rather than one SVG stretched to
          length — stretching the viewBox would distort the head along with the
          shaft, which is exactly what a long thin arrow makes obvious. */}
      <span style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: 'clamp(14px,2vw,32px)' }}>
        <span style={{ fontSize: 'clamp(12px,.95vw,17px)', fontWeight: '700', color: 'var(--ink)', whiteSpace: 'nowrap', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(10px)', transition: `opacity .35s ${EASE}, transform .45s ${EASE}` }}>More Info</span>
        <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', color: 'var(--ink)' }}>
          <span style={{ display: 'block', height: '1.4px', borderRadius: '2px', background: 'currentColor', width: on ? 'clamp(66px,6.6vw,104px)' : 'clamp(52px,5.2vw,84px)', transition: `width ${DUR} ${EASE}` }} />
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '-3px' }}>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{n}</span>
      </span>
    </div>
  );
}
