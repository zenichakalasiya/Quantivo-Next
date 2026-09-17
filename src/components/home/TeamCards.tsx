'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HOME_TEAM } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * Home / Our Team. Three cards.
 *
 *   front   greyscale portrait, name and role beneath it
 *   back    the SAME portrait in colour, carrying name, quote, LinkedIn and a
 *           contact CTA over a scrim
 *
 * ── A soft turn, not a full flip ─────────────────────────────────────────────
 * This started as a true 180deg flip (two backface-hidden faces in a preserve-3d
 * box) and it was far too much motion for a hover — the card swooped.
 *
 * Now the two faces CROSS-FADE while each rotates only TILT degrees: the front
 * turns away to -14deg as it fades out, the back comes from +14deg to flat as it
 * fades in. You read it as a card turning over, but nothing sweeps across the
 * layout. Because the faces overlap mid-transition, the greyscale front blends
 * into the colour back, which does the "photo comes to colour" part for free.
 *
 * `perspective` sits on the element that DIRECTLY contains the faces — it
 * applies to the transforms of its own children, so on a grandparent it would do
 * nothing here. It is also deliberately loose (1600px); a tighter value
 * exaggerates the rotation, which is the opposite of what this wants.
 *
 * Visibility is opacity, NOT backface-visibility, so `pointerEvents` has to be
 * switched by hand — an element at opacity 0 still takes clicks.
 *
 * ── Why hover is React state, not CSS :hover ─────────────────────────────────
 * Nothing on this site uses CSS classes; every rule is an inline style, and a
 * `:hover` rule in globals.css would have to fight those inline styles with
 * !important (which is exactly what support.js's importantify() had to do).
 * State is simpler here and buys two things CSS :hover cannot:
 *
 *   - the turn also fires on keyboard focus, so the back is reachable by tab
 *   - the back's link and button are taken OUT of the tab order while hidden,
 *     via tabIndex -1; without it, tabbing lands on controls nobody can see
 */
const FLIP_MS = 380;
const TILT = 14;

/**
 * The three cards share the section's full width — no cap, each grows equally.
 *
 * The crop is SQUARE rather than the 3:4 portrait it started as, and that is
 * what makes the full width affordable: at ~450px across, a 3:4 card stands
 * ~590px tall and the section no longer fits on one screen once the heading,
 * captions and padding are counted. A square card at the same width is ~450px
 * tall, so the row gets wider and shorter at the same time.
 */
const CARD_ASPECT = '1 / 1';

export function TeamCards() {
  return (
    <section data-screen-label="Home / Team" style={{ padding: 'clamp(48px,6vw,96px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '16px', justifyContent: 'space-between', marginBottom: 'clamp(20px,3vw,44px)' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,5.4vw,86px)', lineHeight: '.92' }}>Our Team.</h2>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: 'clamp(16px,2vw,28px)',
        }}
      >
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
    borderRadius: '18px',
    overflow: 'hidden',
    transition: `transform ${FLIP_MS}ms cubic-bezier(.4,0,.2,1), opacity ${FLIP_MS}ms ease`,
  } as const;

  return (
    <article
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      style={{ flex: '1 1 240px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      {/* perspective belongs on the direct parent of the rotating faces */}
      <div style={{ position: 'relative', aspectRatio: CARD_ASPECT, maxHeight: 'min(52vh,520px)', perspective: '1600px' }}>
        {/* ---- front ---- */}
        <div
          style={{
            ...face,
            transform: on ? `rotateY(-${TILT}deg)` : 'none',
            opacity: on ? 0 : 1,
            pointerEvents: on ? 'none' : 'auto',
          }}
        >
          <img
            src={asset(m.img)}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(1)' }}
          />
        </div>

        {/* ---- back ---- */}
        <div
          style={{
            ...face,
            background: 'var(--bg2)',
            transform: on ? 'none' : `rotateY(${TILT}deg)`,
            opacity: on ? 1 : 0,
            pointerEvents: on ? 'auto' : 'none',
          }}
        >
          <img
            src={asset(m.img)}
            alt=""
            style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <span style={{ position: 'absolute', inset: '0', background: 'linear-gradient(180deg,rgba(9,9,12,.12) 0%,rgba(9,9,12,.42) 34%,rgba(9,9,12,.86) 68%,rgba(9,9,12,.95) 100%)' }} />
          <div style={{ position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '9px', padding: '18px' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '22px', lineHeight: '1', letterSpacing: '.02em', color: '#fff' }}>{m.name}</span>
            <p style={{ fontSize: '12px', lineHeight: '1.5', color: 'rgba(255,255,255,.82)', margin: '0' }}>&ldquo;{m.quote}&rdquo;</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={on ? 0 : -1}
                data-cursor="LinkedIn"
                data-team-link=""
                style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 13px', borderRadius: '99px', border: '1px solid rgba(255,255,255,.34)', color: '#fff', fontSize: '9px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', transition: 'border-color .3s, background .3s' }}
              >
                LinkedIn
              </a>
              <button
                onClick={goContact}
                tabIndex={on ? 0 : -1}
                data-cursor="Contact"
                style={{ padding: '8px 15px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '9px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* name + role, beneath the image */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '21px', lineHeight: '1.1', letterSpacing: '.02em' }}>{m.name}</span>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>{m.role}</span>
      </div>
    </article>
  );
}
