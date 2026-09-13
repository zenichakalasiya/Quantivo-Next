'use client';

import { useRouter } from 'next/navigation';
import { ARTICLES } from '@/data/content';
import { FeaturedInsight } from '@/components/insights/FeaturedInsight';
import { InsightCard } from '@/components/insights/InsightCard';

/**
 * Insights.
 *
 *   Hero
 *   Most read      one lead article, picture left / copy right
 *   All insights   the rest, three to a row
 *
 * Route is /blog to match the original's PAGES entry, while the nav label reads
 * "Insights" — see labelFor() in lib/nav.
 *
 * `ARTICLES[0]` is the lead and the grid takes everything after it, so changing
 * which article is featured is a matter of reordering the data, not the markup.
 *
 * Every article is invented — there is no editorial copy yet. The chip in the
 * hero says so, and it should stay until the real pieces land.
 */
export default function BlogPage() {
  const router = useRouter();

  // Nothing to open yet: there are no article routes, so reading goes to
  // contact rather than to a dead link.
  const open = () => { router.push('/contact'); scrollTo({ top: 0, behavior: 'instant' }); };

  const [lead, ...rest] = ARTICLES;

  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      {/* ---------- Hero ---------- */}
      <section data-screen-label="Blog / Hero" style={{ minHeight: '46svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 'clamp(14px,2vh,22px)', padding: 'clamp(104px,14vh,150px) clamp(16px,3.4vw,48px) clamp(32px,4.5vh,62px)' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Insights</span>
        <h1 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,8.4vw,150px)', lineHeight: '.86', maxWidth: '15ch' }}>Notes On Brand &amp; Growth.</h1>
        <p data-anim="up" style={{ fontSize: 'clamp(15px,1.3vw,20px)', lineHeight: '1.55', color: 'var(--mute)', maxWidth: '54ch' }}>What we are learning in the middle of the work — search, brand, paid media and the occasional strong opinion.</p>
        <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)', border: '1px dashed var(--line)', borderRadius: '99px', padding: '6px 13px' }}>Sample articles — editorial copy to be supplied</span>
      </section>

      {/* ---------- Most read ---------- */}
      <section data-screen-label="Blog / Featured" style={{ padding: 'clamp(36px,5vw,72px) clamp(16px,3.4vw,48px) clamp(44px,6vw,86px)', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: 'clamp(22px,3vw,40px)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '11px', fontSize: '11px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--a)' }}>
            <span aria-hidden="true" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--a)' }} />
            Most read this month
          </span>
          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>{ARTICLES.length} articles</span>
        </div>

        <FeaturedInsight a={lead} onOpen={open} />
      </section>

      {/* ---------- The rest ---------- */}
      <section data-screen-label="Blog / All" style={{ padding: 'clamp(44px,6vw,88px) clamp(16px,3.4vw,48px) clamp(64px,8vw,124px)', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: 'clamp(22px,3vw,40px)' }}>
          <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,4vw,60px)', lineHeight: '.96' }}>All Insights.</h2>
          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>Hover a card to see its cover</span>
        </div>

        {/* Three to a row, fixed — not auto-fill, which would give four on a wide
            screen. [data-insights-grid] drops it to two and then one in
            globals.css, because there are no classes to hang a query on here. */}
        <div data-insights-grid="" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'clamp(14px,1.7vw,26px)' }}>
          {rest.map((a) => (
            <InsightCard key={a.title} a={a} onOpen={open} />
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section style={{ padding: 'clamp(56px,8vw,120px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4.6vw,74px)', lineHeight: '.92', maxWidth: '18ch' }}>Rather Talk It Through?</h2>
        <button onClick={open} data-magnet="" data-cursor="Say hello" style={{ padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Conversation</button>
      </section>
    </main>
  );
}
