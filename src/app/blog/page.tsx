import { ImageSlot } from '@/components/ImageSlot';

/**
 * Insights. Ported from Quantivo.dc.html lines 1111-1146.
 *
 * Route is /blog to match the original's PAGES entry, while the nav label
 * reads "Insights" - see labelFor() in lib/nav.
 */
const POSTS = [
  { cat: 'SEO', title: 'Building a Search Foundation That Lasts', read: '5 min read', slot: 'qv-post-1', ph: 'Article cover — 3:2' },
  { cat: 'Branding', title: 'When a Rebrand Is Actually Worth It', read: '4 min read', slot: 'qv-post-2', ph: 'Article cover — 3:2' },
  { cat: '3D', title: 'Why Product Renders Beat Photo Shoots', read: '6 min read', slot: 'qv-post-3', ph: 'Article cover — 3:2' },
  { cat: 'Web', title: 'Designing Websites Around Business Goals', read: '5 min read', slot: 'qv-post-4', ph: 'Article cover — 3:2' },
  { cat: 'Packaging', title: 'Shelf Presence Is a Design Problem', read: '3 min read', slot: 'qv-post-5', ph: 'Article cover — 3:2' },
  { cat: 'Strategy', title: 'One Partner vs. Five Vendors', read: '4 min read', slot: 'qv-post-6', ph: 'Article cover — 3:2' },
];

export default function BlogPage() {
  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      <section data-screen-label="Blog / Hero" style={{ minHeight: '52svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '22px', padding: '150px clamp(16px,3.4vw,48px) clamp(40px,5vw,72px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'baseline', justifyContent: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Insights</span>
          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)', border: '1px dashed var(--line)', borderRadius: '99px', padding: '5px 11px' }}>Placeholder articles — titles &amp; copy to be supplied</span>
        </div>
        <h1 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,9vw,168px)', lineHeight: '.84', maxWidth: '14ch' }}>Notes on Brand &amp; Growth.</h1>
      </section>

      <section style={{ padding: '0 clamp(16px,3.4vw,48px) clamp(60px,8vw,120px)', borderTop: '1px solid var(--line)' }}>
        <article data-anim="up" data-cursor="Read" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 'clamp(20px,3vw,44px)', alignItems: 'center', padding: 'clamp(20px,3vw,40px) 0', borderBottom: '1px solid var(--line)' }}>
          <span style={{ display: 'block', position: 'relative', aspectRatio: '16/10', borderRadius: '18px', overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)' }}>
            <ImageSlot id="qv-blog-hero" placeholder="Featured article cover image" style={{ position: 'absolute', inset: '0' }} />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--a)' }}>Featured</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,3.8vw,60px)', lineHeight: '.98' }}>What Actually Moves the Needle in Paid Social</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '52ch' }}>Placeholder excerpt. Replace with the article standfirst once editorial copy is ready.</p>
            <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>6 min read</span>
          </div>
        </article>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 'clamp(16px,2.4vw,30px)', paddingTop: 'clamp(24px,3vw,44px)' }}>
          {POSTS.map((p) => (
            <article key={p.slot} data-anim="up" data-cursor="Read" data-post-card="" style={{ display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid var(--line)', borderRadius: '18px', padding: '14px', background: 'var(--bg2)', transition: 'transform .5s cubic-bezier(.16,1,.3,1),border-color .4s' }}>
              <span style={{ display: 'block', position: 'relative', aspectRatio: '3/2', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg)' }}>
                <ImageSlot id={p.slot} placeholder={p.ph} style={{ position: 'absolute', inset: '0' }} />
              </span>
              <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--a)' }}>{p.cat}</span>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2vw,30px)', lineHeight: '1.02' }}>{p.title}</h3>
              <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)', marginTop: 'auto' }}>{p.read}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
