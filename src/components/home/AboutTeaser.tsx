'use client';

import { useRouter } from 'next/navigation';
import { PARTNERS } from '@/data/content';
import { asset } from '@/lib/assets';

/**
 * Home / About.
 *
 * ── Layout ───────────────────────────────────────────────────────────────────
 * No card — the content sits directly on the page ground. A thin top row (an
 * outlined circle at the left, the founding year at the right), then THREE
 * columns of equal width separated by one equal gap:
 *
 *     paragraph   |   the stacked wordmark   |   image + paragraph + CTA
 *
 * ── The stacked words, and why they are SVG ──────────────────────────────────
 * All three words are set to the SAME width regardless of how many letters each
 * has — so the six-letter word has visibly fatter glyphs than the ten-letter
 * one. That is not something font-size can do; it needs the glyph advances
 * themselves stretched to a target width.
 *
 * `<text textLength="100" lengthAdjust="spacingAndGlyphs">` inside a 100-unit
 * viewBox does exactly that: the browser forces the run to occupy the full width
 * and distributes the difference across both the letters and the gaps between
 * them. Because the SVG then scales to its container, the words stay
 * flush-justified at every screen size, with no measuring in JS and no
 * dependence on the webfont having loaded before layout.
 *
 * ── Why the wordmark is capped in vh, not px ─────────────────────────────────
 * Each word is ~.58 as tall as it is wide, so three of them stand ~1.74x the
 * column width. That makes the wordmark — not the photograph — the thing that
 * decides this section's height. Capping it against vh is what lets the section
 * hold to one screen: at 30vh the stack lands around half the viewport, leaving
 * room for the top row, the partner strip and the padding.
 */
const WORDS = ['Strategize', 'Create', 'Deliver'];
const SINCE = '2021';

/** Uniform padding on all four sides, and one gap value used everywhere. */
const PAD = 'clamp(28px,4vw,64px) clamp(16px,3.4vw,48px)';
const GAP = 'clamp(24px,3vw,56px)';

const PARTNER_ROW = { display: 'flex', alignItems: 'center', gap: 'clamp(40px,5vw,72px)', paddingRight: 'clamp(40px,5vw,72px)' } as const;
const PARTNER_NAME = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(18px,1.6vw,24px)', letterSpacing: '.05em', whiteSpace: 'nowrap', color: 'var(--mute)', transition: 'color .35s' } as const;

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
    <section
      data-screen-label="Home / About"
      // Height is content-driven, NOT min-height:100svh with the content centred.
      // Centring inside a full-screen box splits the leftover space above and
      // below the content, and that space above read as a large void between
      // this section and the hero. Balanced padding gives the section room
      // without manufacturing a gap.
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: GAP,
        padding: PAD,
      }}
    >
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

      {/* ---- top row: marker + year ---- */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <span aria-hidden="true" style={{ width: 'clamp(24px,2.2vw,32px)', height: 'clamp(24px,2.2vw,32px)', borderRadius: '50%', border: '1px solid var(--line)', flex: 'none' }} />
        <span style={{ fontSize: 'clamp(10px,.85vw,12px)', fontWeight: '700', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--mute)' }}>Since {SINCE}</span>
      </div>

      {/* ---- three equal columns, one equal gap ---- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: GAP, alignItems: 'start' }}>
        {/* 1 — section title and the lead paragraph */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.6vh,18px)', minWidth: '0' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>02 — About</span>
          <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,3.4vw,54px)', lineHeight: '.94', letterSpacing: '-.005em', margin: '0' }}>About Us.</h2>
          <p style={{ fontSize: 'clamp(14px,1.05vw,17px)', lineHeight: '1.7', color: 'var(--mute)', textWrap: 'pretty', margin: '0' }}>
            We believe great results don&apos;t come from following trends or using the same formula for every business. That&apos;s why we take the time to understand the business, the challenge and the opportunity before turning ideas into action.
          </p>
        </div>

        {/* 2 — the stacked wordmark. A <p>, not a heading: "About Us." above is
            this section's h2, and the wordmark reads as a strapline beside it. */}
        {/* alignSelf overrides the row's align-items:start so the wordmark sits
            centred against the tallest column; margin-inline:auto centres it
            across its own column rather than hugging the left edge. */}
        <p style={{ maxWidth: 'clamp(165px,25vh,268px)', minWidth: '0', alignSelf: 'center', marginInline: 'auto', display: 'flex', flexDirection: 'column', gap: 'clamp(2px,.4vw,6px)', marginBlock: '0' }}>
          <span style={SR_ONLY}>{WORDS.join('. ')}.</span>
          {WORDS.map((w) => <Word key={w}>{w}</Word>)}
        </p>

        {/* 3 — image, copy, CTA */}
        <div style={{ minWidth: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(14px,1.8vh,24px)' }}>
          <img
            src={asset('/img/q-cat-web.jpg')}
            alt="The Quantivo studio"
            style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '12px' }}
          />
          <p style={{ fontSize: 'clamp(13px,.95vw,16px)', lineHeight: '1.65', color: 'var(--mute)', textWrap: 'pretty', margin: '0' }}>
            In a digital world where every brand is competing for attention, being visible isn&apos;t enough. Quantivo combines strategy, creativity, technology and 3D to help businesses communicate their value and connect with the right audience.
          </p>
          <button
            onClick={goAbout}
            data-magnet=""
            data-cursor="About"
            style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(22px,2.6vw,46px)', padding: '14px 20px 14px 27px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '11px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}
          >
            More About Us
            <span aria-hidden="true" style={{ fontSize: '14px', lineHeight: '1' }}>&#8594;</span>
          </button>
        </div>
      </div>

      {/* ---- trusted by: no card, no border, no background ----
           marginTop on top of the section gap: the partner strip is a separate
           idea from the About copy and was sitting too close to it. */}
      <div style={{ marginTop: 'clamp(16px,5vh,72px)' }}>
        <p style={{ textAlign: 'center', fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--mute)' }}>Trusted by leading brands</p>
        <div style={{ marginTop: 'clamp(12px,2vh,22px)', position: 'relative', width: '100%', overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)', maskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)' }}>
          <div data-partner-track="" style={{ height: '42px', display: 'flex', alignItems: 'center', width: 'max-content', animation: 'qvMarquee 40s linear infinite' }}>
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
