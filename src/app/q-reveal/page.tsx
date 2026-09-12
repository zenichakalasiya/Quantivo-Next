import { QReveal } from '@/components/qreveal/QReveal';
import { LetsTalkFooter } from '@/components/qreveal/LetsTalkFooter';
import { SplitWordmark } from '@/components/qreveal/SplitWordmark';

/**
 * PROTOTYPE ROUTE — /q-reveal
 *
 * Standalone so the sequence can be tuned without touching the home page. The
 * stub section at the top stands in for the end of Testimonials, which is where
 * this is meant to sit on home.
 */
export default function QRevealPage() {
  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      {/* stand-in for the end of the Testimonials section */}
      <section style={{ minHeight: '80svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '18px', padding: '150px clamp(16px,3.4vw,48px) clamp(40px,6vw,90px)' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Prototype</span>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,6vw,96px)', lineHeight: '.92', maxWidth: '22ch' }}>End of Testimonials.</h1>
        <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '46ch' }}>Keep scrolling — the Q draws itself, then the next screen opens out of it.</p>
        <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)', marginTop: '10px' }}>Scroll ↓</span>
      </section>

      <QReveal>
        <LetsTalkFooter />
      </QReveal>

      {/* Sits after the pinned reveal so it scrolls in normally underneath it. */}
      <LetsTalkFooter />
      <SplitWordmark />
    </main>
  );
}
