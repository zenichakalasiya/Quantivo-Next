'use client';

import { useRouter } from 'next/navigation';
import { PARTNERS } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * Home / About. Rebuilt from the FigJam reference
 * ("Printeve -QUantivo_Home-About section.png").
 *
 * ── Layout ───────────────────────────────────────────────────────────────────
 * One borderless card. A thin top row (an outlined circle at the left, the
 * founding year at the right), then two columns: three enormous stacked words on
 * the left, and image -> paragraph -> pill CTA on the right. The left column is
 * deliberately the narrower of the two, matching the reference.
 *
 * ── The stacked words, and why they are SVG ──────────────────────────────────
 * In the reference all three words are set to the SAME width regardless of how
 * many letters each has — so the six-letter word has visibly fatter glyphs than
 * the ten-letter one. That is not something font-size can do; it needs the glyph
 * advances themselves stretched to a target width.
 *
 * `<text textLength="100" lengthAdjust="spacingAndGlyphs">` inside a 100-unit
 * viewBox does exactly that: the browser forces the run to occupy the full width
 * and distributes the difference across both the letters and the gaps between
 * them. Because the SVG then scales to its container, the words stay
 * flush-justified at every screen size, with no measuring in JS and no
 * dependence on the webfont having loaded before layout.
 *
 * The proportions are read off the reference: cap height is roughly half the
 * word's width and the line pitch a little over the cap height. Hence fontSize
 * 68 (Bebas' cap height is ~.75em, so ~51 units tall) inside a 58-unit-tall box.
 */
const WORDS = ['Strategize', 'Create', 'Deliver'];
const SINCE = '2021';

const PARTNER_ROW = { display: 'flex', alignItems: 'center', gap: 'clamp(40px,5vw,72px)', paddingRight: 'clamp(40px,5vw,72px)' } as const;
const PARTNER_NAME = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,1.8vw,26px)', letterSpacing: '.05em', whiteSpace: 'nowrap', color: 'var(--mute)', transition: 'color .35s' } as const;

/** Visually hidden but still read aloud — the SVG words expose no text to a11y. */
const SR_ONLY = { position: 'absolute', width: '1px', height: '1px', margin: '-1px', padding: '0', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: '0' } as const;

function Word({ children }: { children: string }) {
  return (
    <svg viewBox="0 0 100 58" preserveAspectRatio="xMinYMid meet" aria-hidden="true" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <text
        x="0"
        y="54"
        textLength="100"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="'Bebas Neue',sans-serif"
        fontSize="68"
        style={{ fill: 'url(#qvAboutGrad)' }}
      >
        {children.toUpperCase()}
      </text>
    </svg>
  );
}

export function AboutTeaser() {
  const router = useRouter();
  const goAbout = () => { router.push('/about'); scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <section data-screen-label="Home / About" style={{ padding: 'clamp(56px,8vw,120px) clamp(16px,3.4vw,48px) clamp(28px,4vw,52px)' }}>
      {/* Gradient the SVG words fill with. Declared once; stop-color goes through
          `style` because var() is not reliable in a presentation attribute. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="qvAboutGrad" x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--a)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--b)' }} />
          </linearGradient>
        </defs>
      </svg>

      <div style={{ background: 'var(--bg2)', borderRadius: 'clamp(18px,2vw,30px)', padding: 'clamp(22px,3.2vw,58px)' }}>
        {/* ---- top row: marker + year ---- */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: 'clamp(20px,3vw,46px)' }}>
          <span aria-hidden="true" style={{ width: 'clamp(26px,2.4vw,36px)', height: 'clamp(26px,2.4vw,36px)', borderRadius: '50%', border: '1px solid var(--line)', flex: 'none' }} />
          <span style={{ fontSize: 'clamp(10px,.85vw,12px)', fontWeight: '700', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--mute)' }}>Since {SINCE}</span>
        </div>

        {/* ---- two columns ---- */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(26px,3.4vw,66px)', alignItems: 'flex-start' }}>
          {/* left: the stacked wordmark */}
          <h2 style={{ flex: '1 1 240px', maxWidth: '360px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(2px,.4vw,7px)', margin: '0' }}>
            <span style={SR_ONLY}>{WORDS.join('. ')}.</span>
            {WORDS.map((w) => <Word key={w}>{w}</Word>)}
          </h2>

          {/* right: image, copy, CTA */}
          <div style={{ flex: '1.6 1 320px', maxWidth: '560px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,28px)' }}>
            <img
              src={asset('/img/q-cat-web.jpg')}
              alt="The Quantivo studio"
              style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '12px' }}
            />
            <p style={{ fontSize: 'clamp(14px,1.05vw,17px)', lineHeight: '1.7', color: 'var(--mute)', textWrap: 'pretty', margin: '0' }}>
              In a digital world where every brand is competing for attention, being visible isn&apos;t enough. Quantivo combines strategy, creativity, technology and 3D to help businesses communicate their value and connect with the right audience.
            </p>
            <button
              onClick={goAbout}
              data-magnet=""
              data-cursor="About"
              style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(26px,3vw,54px)', padding: '15px 22px 15px 30px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}
            >
              More About Us
              <span aria-hidden="true" style={{ fontSize: '15px', lineHeight: '1' }}>&#8594;</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---- trusted by: no card, no border, no background ---- */}
      <div style={{ marginTop: 'clamp(30px,4.5vw,70px)' }}>
        <p style={{ textAlign: 'center', fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--mute)' }}>Trusted by leading brands</p>
        <div style={{ marginTop: '24px', position: 'relative', width: '100%', overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)', maskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)' }}>
          <div data-partner-track="" style={{ height: '48px', display: 'flex', alignItems: 'center', width: 'max-content', animation: 'qvMarquee 40s linear infinite' }}>
            <div style={PARTNER_ROW}>
              {PARTNERS.map((c) => (
                <span key={c} data-partner="" style={PARTNER_NAME}>{c}</span>
              ))}
            </div>
            {/* Duplicate copy: qvMarquee translates -50%, so this is what makes the loop seamless. */}
            <div aria-hidden="true" style={PARTNER_ROW}>
              {PARTNERS.map((c) => (
                <span key={c} style={{ ...PARTNER_NAME, transition: undefined }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
