'use client';

import { useRouter } from 'next/navigation';
import { DETAIL, SERVICES, SVC_MENU, WORK } from '@/data/content';
import { ServiceRow } from '@/components/services/ServiceRow';
import { BeforeAfterCard } from '@/components/services/BeforeAfterCard';
import { asset } from '@/lib/assets';

/**
 * Services.
 *
 *   Hero          copy left, picture right
 *   What We Do    the eight services as full-width rows
 *   Latest work   four projects, each a before/after
 *   CTA
 *
 * ── The service rows carry the anchor ids ────────────────────────────────────
 * The header's mega-menu links to `/services#svc-social` and so on (see
 * `lib/megaMenu.ts`). Those ids used to live on the sticky detail cards this
 * page was built from; they now sit on the rows, so every menu entry still
 * lands somewhere real.
 *
 * ── Where the row content comes from ─────────────────────────────────────────
 * Three constants, joined on index, because the original document split them
 * that way: `SVC_MENU` has the picture and the id, `SERVICES` the one-line
 * blurb, and `DETAIL` the full capability list that the row reveals on hover.
 *
 * SERVICES lists Google and Meta ads as one entry and DETAIL splits the list
 * into three groups, so the groups are flattened and the arrays are matched on
 * position — both are eight long and in the same order.
 */
const FEATURED = 4;

export default function ServicesPage() {
  const router = useRouter();

  const go = (href: string) => () => { router.push(href); scrollTo({ top: 0, behavior: 'instant' }); };
  const goContact = go('/contact');

  const rows = SVC_MENU.map((m, i) => ({
    id: m.id,
    n: m.n,
    title: SERVICES[i].title,
    blurb: SERVICES[i].blurb,
    items: DETAIL[i].groups.flatMap((g) => g.items),
    img: m.img,
  }));

  const work = WORK.slice(0, FEATURED);

  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      {/* ---------- Hero ---------- */}
      <section data-screen-label="Services / Hero" style={{ padding: 'clamp(104px,15vh,168px) clamp(16px,3.4vw,48px) clamp(40px,6vw,80px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 'clamp(26px,4vw,70px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.2vh,26px)', minWidth: '0' }}>
            <span style={{ alignSelf: 'start', display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 18px 9px 14px', borderRadius: '99px', border: '1px solid var(--line)', background: 'var(--bg2)' }}>
              <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', color: 'var(--a)' }}>
                <span style={{ display: 'block', width: '28px', height: '1.4px', borderRadius: '2px', background: 'currentColor' }} />
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '-3px' }}><path d="M9 5l7 7-7 7" /></svg>
              </span>
              <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--ink)' }}>Services</span>
            </span>

            <h1 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,calc(8.4vw - 8px),150px)', lineHeight: '.86', letterSpacing: '.01em', maxWidth: '13ch' }}>What We Do.</h1>

            <span style={{ alignSelf: 'start', padding: '11px 22px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: 'clamp(11px,.9vw,14px)', fontWeight: '700', letterSpacing: '.04em' }}>Everything under one roof</span>

            <p data-anim="up" style={{ fontSize: 'clamp(14px,1.1vw,17px)', lineHeight: '1.68', color: 'var(--mute)', maxWidth: '52ch' }}>
              <strong style={{ color: 'var(--ink)', fontWeight: '700' }}>Strategy, creativity, technology and visualization</strong> — we combine digital marketing, branding, web development and 3D visualization to help businesses build stronger brands and communicate their ideas more effectively.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'stretch', minWidth: '0' }}>
            <span style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '16 / 11', borderRadius: 'clamp(14px,1.4vw,22px)', overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)' }}>
              <img src={asset('/img/q-cat-growth.jpg')} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </span>
            <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '18px', fontSize: 'clamp(12px,.95vw,15px)', color: 'var(--mute)' }}>
              <span style={{ fontWeight: '700', color: 'var(--ink)' }}>hello@quantivo.digital</span>
              <span>Eight services, one team</span>
            </span>
          </div>
        </div>
      </section>

      {/* ---------- The list ---------- */}
      <section data-screen-label="Services / List" style={{ padding: 'clamp(16px,2vw,34px) clamp(16px,3.4vw,48px) clamp(60px,8vw,120px)' }}>
        {rows.map((r) => (
          <ServiceRow key={r.id} {...r} onOpen={goContact} />
        ))}
        <div style={{ borderTop: '1px solid var(--line)' }} />
      </section>

      {/* ---------- Latest work ---------- */}
      <section data-screen-label="Services / Latest work" style={{ padding: '0 clamp(16px,3.4vw,48px) clamp(60px,8vw,120px)' }}>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 'clamp(20px,2.4vw,38px)', padding: 'clamp(24px,3.4vw,60px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 'clamp(22px,3vw,50px)', marginBottom: 'clamp(26px,3.4vw,52px)', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vh,20px)', minWidth: '0' }}>
              <h2 data-split="" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,1.2vw,18px)', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(26px,2.6vw,40px)', lineHeight: '1.05', letterSpacing: '.02em' }}>
                <span aria-hidden="true" style={{ flex: 'none', width: 'clamp(14px,1.3vw,20px)', height: 'clamp(14px,1.3vw,20px)', borderRadius: '50%', background: 'var(--grad)' }} />
                Our Latest Work.
              </h2>
              <p style={{ fontSize: 'clamp(14px,1.1vw,17px)', lineHeight: '1.66', color: 'var(--mute)', maxWidth: '50ch' }}>A few of the projects the services above turned into. Click any image to see what the brand looked like before we started.</p>
              <button onClick={go('/work')} data-cursor="All work" data-magnet="" style={{ alignSelf: 'start', display: 'flex', alignItems: 'center', gap: '12px', fontSize: 'clamp(13px,1vw,16px)', fontWeight: '700', color: 'var(--a)' }}>
                View all work
                <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'block', width: '40px', height: '1.4px', borderRadius: '2px', background: 'currentColor' }} />
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '-3px' }}><path d="M9 5l7 7-7 7" /></svg>
                </span>
              </button>
            </div>

            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-start', minWidth: '0' }}>
              <span style={{ padding: '9px 15px', borderRadius: '99px', border: '1px dashed var(--line)', fontSize: '10px', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>Before images are placeholders — client screenshots to be supplied</span>
            </span>
          </div>

          {/* Two columns with the right one dropped, so the pairs read as a
              sequence down the page rather than as a tidy grid of four. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,330px),1fr))', gap: 'clamp(22px,3vw,52px)', alignItems: 'start' }}>
            <div data-svc-work-col="" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px,4vw,70px)', minWidth: '0' }}>
              {work.filter((_, i) => i % 2 === 0).map((w) => (
                <BeforeAfterCard key={w.slot} w={w} before={beforeFor(w.img)} onOpen={go('/work')} />
              ))}
            </div>
            <div data-svc-work-col="" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px,4vw,70px)', minWidth: '0', marginTop: 'clamp(0px,6vw,96px)' }}>
              {work.filter((_, i) => i % 2 === 1).map((w) => (
                <BeforeAfterCard key={w.slot} w={w} before={beforeFor(w.img)} onOpen={go('/work')} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      {/* Centred to match the Home page's Final CTA (FinalCta.tsx) rather than
          left-aligned like the rest of this page's sections. */}
      <section id="svc-contact" data-screen-label="Services / One team" style={{ borderTop: '1px solid var(--line)', padding: 'clamp(70px,10vw,150px) clamp(16px,3.4vw,48px)', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,6.8vw,124px)', lineHeight: '.88', letterSpacing: '.01em', maxWidth: '18ch' }}>One Team. Multiple Capabilities.</h2>
        <p style={{ fontSize: 'clamp(15px,1.25vw,19px)', lineHeight: '1.55', color: 'var(--mute)', maxWidth: '66ch' }}>From building your brand identity and packaging to growing your digital presence, developing your website, running advertising campaigns, and creating high-quality 3D visualizations—Quantivo brings strategy, creativity, technology, and visualization together under one roof.</p>
        <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(26px,3.2vw,50px)', lineHeight: '1', letterSpacing: '.02em' }}>Have a Project in Mind? Let&apos;s create something meaningful.</p>
        <button onClick={goContact} data-magnet="" data-cursor="Start" style={{ padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Project</button>
      </section>
    </main>
  );
}

/** `/img/q-art-3.jpg` → `/img/before/q-art-3.jpg`. */
function beforeFor(img: string) {
  return img.replace('/img/', '/img/before/');
}
