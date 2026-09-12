'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HOME_TEAM } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * Home / Our Team. Three flip cards.
 *
 *   front   greyscale portrait, name and role beneath it
 *   back    the SAME portrait in colour, carrying name, quote, LinkedIn and a
 *           contact CTA over a scrim
 *
 * ── The flip ─────────────────────────────────────────────────────────────────
 * A real 3D flip: the two faces are stacked in a `preserve-3d` box, the back
 * pre-rotated 180deg, and both given `backface-visibility: hidden` so only the
 * face pointing at the viewer paints. Rotating the box 180deg swaps them.
 *
 * `perspective` sits on the OUTER element, not the rotating one — on the
 * rotating element it is applied before the rotation and the card reads flat.
 *
 * ── Why hover is React state, not CSS :hover ─────────────────────────────────
 * Nothing on this site uses CSS classes; every rule is an inline style, and a
 * `:hover` rule in globals.css would have to fight those inline styles with
 * !important (which is exactly what support.js's importantify() had to do).
 * State is simpler here and buys two things CSS :hover cannot:
 *
 *   - the flip also fires on keyboard focus, so the back is reachable by tab
 *   - the back's link and button are taken OUT of the tab order while hidden,
 *     via tabIndex -1; a backface-hidden element is still focusable, so without
 *     this, tabbing would land on controls nobody can see
 */
const FLIP_MS = 420;

export function TeamCards() {
  return (
    <section data-screen-label="Home / Team" style={{ padding: 'clamp(60px,8vw,124px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '16px', justifyContent: 'space-between', marginBottom: 'clamp(28px,4vw,56px)' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92' }}>Our Team.</h2>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>Hover a card</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(16px,2vw,30px)' }}>
        {HOME_TEAM.map((m, i) => <Card key={i} m={m} />)}
      </div>
    </section>
  );
}

function Card({ m }: { m: (typeof HOME_TEAM)[number] }) {
  const router = useRouter();
  const [on, setOn] = useState(false);
  const goContact = () => { router.push('/contact'); scrollTo({ top: 0, behavior: 'instant' }); };

  const face = {
    position: 'absolute',
    inset: '0',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: '20px',
    overflow: 'hidden',
  } as const;

  return (
    <article
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
    >
      {/* perspective lives here, on the parent of the rotating box */}
      <div style={{ perspective: '1200px' }}>
        <div
          style={{
            position: 'relative',
            aspectRatio: '3 / 4',
            transformStyle: 'preserve-3d',
            transform: on ? 'rotateY(180deg)' : 'none',
            transition: `transform ${FLIP_MS}ms cubic-bezier(.4,0,.2,1)`,
          }}
        >
          {/* ---- front ---- */}
          <div style={face}>
            <img
              src={asset(m.img)}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(1)' }}
            />
          </div>

          {/* ---- back ---- */}
          <div style={{ ...face, transform: 'rotateY(180deg)', background: 'var(--bg2)' }}>
            <img
              src={asset(m.img)}
              alt=""
              style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <span style={{ position: 'absolute', inset: '0', background: 'linear-gradient(180deg,rgba(9,9,12,.12) 0%,rgba(9,9,12,.42) 38%,rgba(9,9,12,.86) 70%,rgba(9,9,12,.95) 100%)' }} />
            <div style={{ position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 'clamp(8px,1.4vh,14px)', padding: 'clamp(16px,1.8vw,26px)' }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(22px,2vw,30px)', lineHeight: '1', letterSpacing: '.02em', color: '#fff' }}>{m.name}</span>
              <p style={{ fontSize: 'clamp(12px,.85vw,14px)', lineHeight: '1.55', color: 'rgba(255,255,255,.82)', margin: '0' }}>&ldquo;{m.quote}&rdquo;</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={on ? 0 : -1}
                  data-cursor="LinkedIn"
                  data-team-link=""
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 15px', borderRadius: '99px', border: '1px solid rgba(255,255,255,.34)', color: '#fff', fontSize: '10px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', transition: 'border-color .3s, background .3s' }}
                >
                  LinkedIn
                </a>
                <button
                  onClick={goContact}
                  tabIndex={on ? 0 : -1}
                  data-cursor="Contact"
                  style={{ padding: '9px 17px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '10px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* name + role, beneath the image */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,1.7vw,26px)', lineHeight: '1.1', letterSpacing: '.02em' }}>{m.name}</span>
        <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>{m.role}</span>
      </div>
    </article>
  );
}
