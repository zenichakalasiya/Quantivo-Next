import { HomeOutro } from '@/components/qreveal/HomeOutro';

/**
 * PROTOTYPE ROUTE — /q-reveal
 *
 * The same sequence home ends with, on a short page so it can be tuned without
 * scrolling the whole site. Renders HomeOutro itself (not a separate copy), so
 * what you see here is exactly what home does.
 */
export default function QRevealPage() {
  return (
    <>
      <main style={{ position: 'relative', zIndex: '1' }}>
        <section style={{ minHeight: '80svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '18px', padding: '150px clamp(16px,3.4vw,48px) clamp(40px,6vw,90px)' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Prototype</span>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(38px,6vw,96px)', lineHeight: '.92', maxWidth: '22ch' }}>End of Testimonials.</h1>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '46ch' }}>Keep scrolling — the Q draws itself, then opens onto the full outro screen.</p>
          <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)', marginTop: '10px' }}>Scroll ↓</span>
        </section>
      </main>
      <HomeOutro />
    </>
  );
}
