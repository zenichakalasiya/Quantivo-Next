'use client';

import { useState } from 'react';
import { ABOUT_VMW, CAPABILITIES } from '@/data/content';

/**
 * About / What We Do — the capability cluster and the Vision / Mission / Why
 * accordion, side by side under one heading.
 *
 * ── The cluster overlaps ─────────────────────────────────────────────────────
 * The four circles sit on a diamond whose radius is SMALLER than a circle, so
 * neighbours overlap into a clover. Everything is expressed as a percentage of
 * the square container, which is what keeps the overlap identical at every size:
 *
 *   circle diameter   48% of the box
 *   centre offset     26% of the box from the middle
 *
 * 26% + 24% = 50%, so the circles reach the box edge exactly and never overhang
 * it. That is why this version needs no padding to stop the top circle colliding
 * with the section heading — the previous layout put the circles ON the compass
 * points, where each hung half its own diameter outside the box.
 *
 * Each circle carries a ring of the PAGE background rather than a border, which
 * is what reads as the white gap between overlapping petals in the reference.
 * A border would sit inside the circle and the petals would touch.
 *
 * The arc now draws just inside the circle's edge instead of orbiting outside
 * it, because an outer ring would be sliced by whichever neighbour overlaps it.
 *
 * ── The sections stack as you scroll ─────────────────────────────────────────
 * Each section sticks AS A WHOLE — title and body together — one title-height
 * below the section above. So a body is never pushed behind its own title;
 * instead the next section rides up over it, leaving the previous title showing.
 *
 * An earlier version made only the HEADER sticky, which produced exactly the
 * wrong thing: the body scrolled up behind its own title and reappeared above
 * it. Sticking the whole section is the fix.
 */
const EASE = 'cubic-bezier(.22,1,.36,1)';
const FLIP_MS = 260;
/** Where the first header parks, clear of the fixed site header. */
const STICK_TOP = 'clamp(82px,12vh,122px)';
/**
 * The title row's height, measured: 81px of content plus its 1px divider. Each
 * section parks one of these below the one above, so if this is short the title
 * above gets clipped by the section covering it.
 */
const ROW_H = 82;

/** Diamond positions, tight enough that neighbours overlap. */
const POS = [
  { top: '24%', left: '50%' },   // 01 north
  { top: '50%', left: '76%' },   // 02 east
  { top: '76%', left: '50%' },   // 03 south
  { top: '50%', left: '24%' },   // 04 west
] as const;

export function WhatWeDo() {

  return (
    <section data-screen-label="About / What We Do" style={{ padding: 'clamp(48px,6vw,96px) clamp(16px,3.4vw,48px) clamp(60px,8vw,120px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: 'clamp(30px,4vw,56px)' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.6vw,72px)', lineHeight: '.94' }}>What We Do.</h2>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>Hover to explore</span>
      </div>

      {/* flex-start so both columns begin on the same line, and so the sticky
          cluster has somewhere to travel — `stretch` would size it to the row
          and leave it nothing to do. */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'clamp(30px,4.5vw,72px)' }}>
        {/* ---- left: the overlapping cluster ---- */}
        <div style={{ flex: '1 1 300px', minWidth: '0', position: 'sticky', top: STICK_TOP }}>
          <div style={{ position: 'relative', width: 'min(100%, clamp(320px,36vw,500px))', aspectRatio: '1 / 1', margin: '0 auto' }}>
            {CAPABILITIES.map((c, i) => (
              <Circle key={c.n} c={c} pos={POS[i]} spin={i * 90} depth={i} carve={i === 3} />
            ))}
          </div>
        </div>

        {/* ---- right: Vision / Mission / Why ---- */}
        <div style={{ flex: '1.25 1 360px', minWidth: '0' }}>
          <div>
            {ABOUT_VMW.map((row, i) => (
              <Row key={row.n} row={row} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Circle({ c, pos, spin, depth, carve }: { c: (typeof CAPABILITIES)[number]; pos: (typeof POS)[number]; spin: number; depth: number; carve: boolean }) {
  const [on, setOn] = useState(false);

  const face = {
    position: 'absolute',
    inset: '0',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    padding: '16%',
    textAlign: 'center',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  } as const;

  return (
    <div
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      tabIndex={0}
      data-cursor={c.title}
      aria-label={`${c.title}: ${c.items.join(', ')}`}
      style={{
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        transform: 'translate(-50%,-50%)',
        width: '48%',
        aspectRatio: '1 / 1',
        borderRadius: '50%',
        // The gap between overlapping petals is a ring of the page background,
        // painted OUTSIDE the circle. A border would sit inside it and the
        // petals would meet with no separation.
        boxShadow: '0 0 0 7px var(--bg)',
        // Hovered circle comes to the front; otherwise they stack in order.
        zIndex: on ? 10 : depth + 1,
        // A pinwheel overlap is a CYCLE — each circle covers the next and is
        // covered by another — and z-index cannot express a cycle. With a plain
        // 1<2<3<4 order the bottom circle ends up bitten on BOTH sides while the
        // top one is bitten on none.
        //
        // So the top circle has its neighbour's disc masked out of it, which
        // closes the loop: each circle is now cut on exactly one side. The
        // geometry is in the circle's own percentages (its neighbour sits at
        // 104.17%/-4.17% of its width, with a radius of 53% of it — half the width for the neighbour, plus the ring gap) so it
        // holds at every size. The radii are percentages, not calc(): a calc()
        // mixing % and px is rejected outright in a gradient radius, and the
        // declaration is then dropped silently. The mask is dropped while hovered, since the
        // hovered circle rises above everything anyway.
        ...(carve && !on
          ? {
              maskImage: 'radial-gradient(ellipse 53% 53% at 104.17% -4.17%, transparent 99%, #000 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 53% 53% at 104.17% -4.17%, transparent 99%, #000 100%)',
            }
          : null),
      }}
    >
      {/* The arc, drawn just inside the circle's edge. Outside it would be
          sliced by whichever neighbour overlaps this one. pathLength=100 makes
          the dash values plain percentages, so nothing needs measuring. */}
      <svg viewBox="0 0 100 100" aria-hidden="true" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', transform: `rotate(${spin - 90}deg)`, zIndex: 2, pointerEvents: 'none' }}>
        <circle
          cx="50"
          cy="50"
          r="48"
          pathLength="100"
          fill="none"
          stroke="url(#qvArc)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray={on ? '100 0' : '25 75'}
          style={{ transition: `stroke-dasharray ${on ? 620 : 420}ms ${EASE}` }}
        />
        <defs>
          <linearGradient id="qvArc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--a)" />
            <stop offset="100%" stopColor="var(--b)" />
          </linearGradient>
        </defs>
      </svg>

      <div style={{ position: 'absolute', inset: '0', perspective: '900px' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: on ? 'rotateY(180deg)' : 'none',
            transition: `transform ${FLIP_MS}ms ${EASE}`,
          }}
        >
          <div style={{ ...face, background: 'var(--bg2)', border: '1px solid var(--line)' }}>
            <span style={{ display: 'grid', gap: '3px' }}>
              <span style={{ fontSize: '9.5px', fontWeight: '700', letterSpacing: '.2em', color: 'var(--mute)' }}>{c.n}</span>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(14px,1.45vw,20px)', lineHeight: '1.02', letterSpacing: '.02em', color: 'var(--ink)' }}>{c.title}</span>
            </span>
          </div>

          <div style={{ ...face, transform: 'rotateY(180deg)', background: 'var(--grad)', border: '1px solid transparent' }}>
            <ul style={{ display: 'grid', gap: '3px', margin: '0', padding: '0', listStyle: 'none' }}>
              {c.items.map((it) => (
                <li key={it} style={{ fontSize: 'clamp(8.5px,.68vw,10.5px)', fontWeight: '600', lineHeight: '1.25', color: '#fff' }}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One section of the stack.
 *
 * Each section is sticky AS A WHOLE — title and body together — parked one
 * title-height below the section above it. Scrolling therefore never pushes a
 * body behind its own title. Instead the NEXT section rides up, opaque, and
 * covers the previous body while leaving its title showing. The titles end up
 * stacked and exactly one body is visible at a time.
 *
 * Every section is expanded. A collapsed one would arrive with nothing to show,
 * which is the opposite of the intent: each section is meant to come up with its
 * details already open.
 *
 * The opaque background is what makes the covering work. A transparent section
 * would let the one beneath read straight through it.
 *
 * The divider sits on the TOP of each section, so it separates one section from
 * the next. A border under the title as well put a second rule between a title
 * and its own body, which read as a split where there is none.
 */
function Row({ row, i }: { row: (typeof ABOUT_VMW)[number]; i: number }) {
  const [on, setOn] = useState(false);

  return (
    <div
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        position: 'sticky',
        top: `calc(${STICK_TOP} + ${i * ROW_H}px)`,
        zIndex: i + 1,
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,2vw,28px)', padding: 'clamp(15px,2vh,22px) 0' }}>
        <span style={{ flex: 'none', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(16px,1.5vw,24px)', lineHeight: '1', color: on ? 'var(--a)' : 'var(--mute)', transition: 'color .4s' }}>{row.n}.</span>
        <span style={{ flex: '1', minWidth: '0', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(24px,2.9vw,44px)', lineHeight: '1', letterSpacing: '.01em', color: 'var(--ink)' }}>{row.title}</span>
        <span aria-hidden="true" style={{ flex: 'none', width: '24px', height: '24px', display: 'grid', placeItems: 'center', color: on ? 'var(--a)' : 'var(--mute)', transition: 'color .4s' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M17 7L7 17M7 9v8h8" /></svg>
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(13px,1.8vh,18px)', padding: '0 0 clamp(26px,4vh,44px)' }}>
        <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(19px,1.9vw,29px)', lineHeight: '1.05', margin: '0' }}>{row.head}</h3>
        <p style={{ fontSize: 'clamp(13.5px,1vw,16px)', lineHeight: '1.7', color: 'var(--mute)', margin: '0' }}>{row.body}</p>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 10px', margin: '2px 0 0', padding: '0', listStyle: 'none' }}>
          {row.points.map((p) => (
            <li key={p} style={{ padding: '8px 15px', borderRadius: '99px', border: '1px solid var(--line)', background: 'var(--bg2)', fontSize: '11.5px', fontWeight: '700', letterSpacing: '.11em', textTransform: 'uppercase', color: 'var(--ink)', whiteSpace: 'nowrap' }}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
