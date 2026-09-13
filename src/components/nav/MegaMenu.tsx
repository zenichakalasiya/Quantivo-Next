'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { asset } from '@/lib/assets';
import type { MegaCard, MegaMenu as MegaMenuData } from '@/lib/megaMenu';

/**
 * The header's hover menu: a list of entries down the left, a grid of cards on
 * the right that swaps as you move through them.
 *
 * ── The rail that draws around a card ────────────────────────────────────────
 * On hover a hairline travels around the card's edge, starting from two opposite
 * corners and meeting in the middle of the two remaining sides.
 *
 * That is two identical rounded rects stacked, each stroked for half the
 * perimeter. One is rotated 180° about its own centre, which — because a rect
 * maps onto itself under that rotation — leaves the shape identical but moves
 * the path's starting point to the opposite corner. Animating
 * `stroke-dashoffset` on both then draws two arcs travelling in opposite
 * directions.
 *
 * `pathLength="100"` is what makes it simple: it renormalises the path so
 * "half the perimeter" is literally `50`, with no need to measure the card or
 * recompute anything when it resizes. The rects take their size from CSS
 * (`width: 100%`) rather than a viewBox, so the corner radius stays circular
 * instead of being stretched into an ellipse by a non-uniform viewBox scale.
 *
 * ── Opening ──────────────────────────────────────────────────────────────────
 * The panel opens on pointer enter and on keyboard focus entering the group, and
 * closes when either leaves. `onFocus`/`onBlur` bubble in React, so one handler
 * on the wrapper covers every control inside.
 */
const EASE = 'cubic-bezier(.22,1,.36,1)';

export function MegaPanel({ menu, onNavigate }: { menu: MegaMenuData; onNavigate: () => void }) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const entry = menu.entries[active];

  const go = (card: MegaCard) => () => {
    onNavigate();
    router.push(card.href);
    if (card.anchor) {
      setTimeout(() => {
        const el = document.getElementById(card.anchor!);
        if (el) scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      }, 450);
    } else {
      scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(150px,196px) minmax(0,1fr)',
        gap: 'clamp(14px,1.6vw,26px)',
        padding: 'clamp(12px,1.2vw,18px)',
      }}
    >
      {/* ---- left: entries ---- */}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '2px', margin: '0', padding: '0', listStyle: 'none', minWidth: '0' }}>
        {menu.entries.map((e, i) => {
          const on = i === active;
          return (
            <li key={e.label}>
              <button
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => { onNavigate(); router.push(menu.href); scrollTo({ top: 0, behavior: 'instant' }); }}
                data-cursor="Browse"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 13px',
                  borderRadius: '10px',
                  background: on ? 'var(--bg)' : 'transparent',
                  color: on ? 'var(--ink)' : 'var(--mute)',
                  fontSize: '13px',
                  fontWeight: '600',
                  lineHeight: '1.3',
                  transition: 'background .25s, color .25s',
                }}
              >
                {e.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* ---- right: cards + footer bar ---- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.2vw,18px)', minWidth: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'clamp(10px,1vw,16px)' }}>
          {entry.cards.map((c) => (
            <Card key={c.id} card={c} onClick={go(c)} />
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: 'clamp(10px,1vw,14px)', borderTop: '1px solid var(--line)' }}>
          <span style={{ fontSize: '12.5px', color: 'var(--mute)' }}>{menu.caption}</span>
          <button
            onClick={() => { onNavigate(); router.push(menu.href); scrollTo({ top: 0, behavior: 'instant' }); }}
            data-cursor="Open"
            data-magnet=""
            style={{ padding: '10px 18px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '11px', fontWeight: '700', letterSpacing: '.13em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
          >
            {menu.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ card, onClick }: { card: MegaCard; onClick: () => void }) {
  const [on, setOn] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      data-cursor="Open"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '9px',
        padding: '7px 7px 11px',
        borderRadius: '14px',
        background: on ? 'var(--bg)' : 'transparent',
        textAlign: 'left',
        transition: 'background .3s',
      }}
    >
      {/* The rail: a faint continuous outline plus two short bright segments
          that run around it. The segments start half a lap apart, so the two
          bright points are always on opposite sides of the card.

          The whole thing fades in and out with hover rather than each stroke
          being animated separately — an unhovered card carries no outline at
          all, and the running animation is paused while it is invisible so it
          costs nothing. */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: '1px', width: 'calc(100% - 2px)', height: 'calc(100% - 2px)', pointerEvents: 'none', overflow: 'visible', opacity: on ? 1 : 0, transition: `opacity .32s ${EASE}` }}
      >
        <rect
          rx="13"
          ry="13"
          fill="none"
          stroke="rgba(255,255,255,.26)"
          strokeWidth="1"
          style={{ width: '100%', height: '100%' }}
        />
        {[0, 50].map((phase) => (
          <rect
            key={phase}
            rx="13"
            ry="13"
            pathLength="100"
            fill="none"
            stroke="rgba(255,255,255,.95)"
            strokeWidth="1.7"
            strokeLinecap="round"
            style={{
              width: '100%',
              height: '100%',
              strokeDasharray: '15 85',
              animation: 'qvRailRun 7s linear infinite',
              // Half a lap apart, so the two highlights always sit opposite each
              // other. This has to be a negative DELAY, not a starting
              // dash-offset: the keyframe animates dash-offset to -100, so an
              // inline starting value would be overridden and the two segments
              // would travel different distances and drift apart.
              animationDelay: phase === 0 ? '0s' : '-3.5s',
              animationPlayState: on ? 'running' : 'paused',
            }}
          />
        ))}
      </svg>

      <span style={{ display: 'block', position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: '9px', overflow: 'hidden', background: 'var(--bg2)' }}>
        <img
          src={asset(card.img)}
          alt=""
          style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: on ? 'scale(1.05)' : 'none', transition: `transform .6s ${EASE}` }}
        />
      </span>

      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingInline: '4px', minWidth: '0' }}>
        {/* the arrow slides in from the left, so the label shifts across to
            make room rather than the arrow appearing on top of it */}
        <span
          aria-hidden="true"
          style={{
            flex: 'none',
            display: 'grid',
            placeItems: 'center',
            width: on ? '13px' : '0px',
            opacity: on ? 1 : 0,
            color: 'var(--ink)',
            transition: `width .35s ${EASE}, opacity .3s ${EASE}`,
            overflow: 'hidden',
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
        <span style={{ fontSize: '12.5px', fontWeight: '600', color: on ? 'var(--ink)' : 'var(--mute)', transition: 'color .25s', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {card.label}
        </span>
      </span>
    </button>
  );
}
