import { Fragment } from 'react';
import { ServicesRoller } from '@/components/ServicesRoller';

/**
 * Home / Hero. Ported from Quantivo.dc.html lines 163-186.
 *
 * Each word is its own [data-w] span because _animate() staggers them in with
 * a yPercent rise - the motion layer selects on that attribute, so it has to
 * survive the port even though it looks like redundant markup.
 */
const HERO_WORDS: { text: string; grad?: boolean }[] = [
  { text: 'WE' },
  { text: 'TURN' },
  { text: 'ATTENTION', grad: true },
  { text: 'INTO' },
  { text: 'MEASURABLE' },
  { text: 'GROWTH.' },
];

const GRAD_WORD = { display: 'inline-block', background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as const;
const PLAIN_WORD = { display: 'inline-block' } as const;

export function Hero() {
  return (
    <section data-screen-label="Home / Hero" style={{ position: 'relative', minHeight: '100svh', display: 'grid', gridTemplateRows: 'auto 1fr auto', padding: '110px clamp(16px,3.4vw,48px) 28px', overflow: 'hidden' }}>
      <div data-hero-word="" style={{ position: 'absolute', left: '50%', bottom: '-2.5vw', transform: 'translateX(-50%)', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'min(23vw,300px)', lineHeight: '.78', letterSpacing: '-.01em', whiteSpace: 'nowrap', color: 'var(--ink)', opacity: '.07', pointerEvents: 'none', userSelect: 'none' }}>QUANTIVO</div>

      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: '2' }}>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,7.2vw,124px)', lineHeight: '.88', letterSpacing: '-.005em', maxWidth: '22ch', textAlign: 'center', textWrap: 'balance' }}>
          {HERO_WORDS.map((w, i) => (
            <Fragment key={w.text}>
              {i > 0 && ' '}
              <span data-w="" style={w.grad ? GRAD_WORD : PLAIN_WORD}>{w.text}</span>
            </Fragment>
          ))}
        </h1>
      </div>

      <ServicesRoller />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', paddingTop: '18px', borderTop: '1px solid var(--line)', position: 'relative', zIndex: '2' }}>
        <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)', display: 'flex', alignItems: 'center', gap: '9px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--a)', animation: 'qvBlink 1.8s ease-in-out infinite' }} />
          Drag the drum · eight capabilities
        </span>
        <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' }}>Scroll</span>
      </div>
    </section>
  );
}
