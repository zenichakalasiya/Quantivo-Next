'use client';

import { useRouter } from 'next/navigation';
import { AboutCards } from '@/components/about/AboutCards';
import { WhatWeDo } from '@/components/about/WhatWeDo';
import { JourneyTimeline } from '@/components/about/JourneyTimeline';
import { TeamMarquee } from '@/components/about/TeamMarquee';

/**
 * About. Rebuilt from the client's sticky-note layout — four sections between
 * the hero and the closing CTA:
 *
 *   1. About Quantivo           three cards, one widening on hover
 *   2. What We Do               flipping circle cluster, pinned beside the
 *                               Vision / Mission / Why accordion
 *   3. Our Journey              vertical 2021-2025 timeline with a filling rail
 *   4. Our Team                 continuously scrolling cards, quote on hover
 *
 * The previous page ran 12,792px over eight sections. Approach and Global are
 * gone at the client's direction; Journey and Team both came back rebuilt — a
 * vertical timeline rather than the old horizontal year rail, and a marquee
 * rather than the old bio-and-card carousel. Every word of copy that
 * survived was moved, not rewritten — see ABOUT_CARDS and ABOUT_VMW, and
 * JOURNEY, which the old rail already carried.
 *
 * That retires this page's three imperative scroll rigs. `_initVM`, `_initTeam`
 * and `_initYearRail` in the vendored motion layer each bail early when their
 * root attribute is missing ([data-vm-sec], [data-team-wrap], [data-yr-sec]),
 * so dropping those sections makes them no-ops rather than errors — but they
 * are dead code now if anyone is pruning.
 */
export default function AboutPage() {
  const router = useRouter();
  const goContact = () => {
    router.push('/contact');
    scrollTo({ top: 0, behavior: 'instant' });
  };
  const goWork = () => {
    router.push('/work');
    scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      {/* ---------- Hero ----------
          Padding was 150px top with a 24px gap, which left a large dead band
          between the headline and the line under it. Centred content with a
          tighter gap does the same job in less height. */}
      <section
        data-screen-label="About / Hero"
        style={{ minHeight: '58svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 'clamp(14px,2vh,22px)', padding: 'clamp(100px,13vh,140px) clamp(16px,3.4vw,48px) clamp(32px,5vh,64px)' }}
      >
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>About Quantivo</span>
        <h1 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,8.4vw,150px)', lineHeight: '.86', maxWidth: '18ch' }}>Built for Ideas That Move Forward.</h1>
        <p data-anim="up" style={{ fontSize: 'clamp(15px,1.3vw,20px)', lineHeight: '1.5', color: 'var(--mute)', maxWidth: '62ch' }}>Quantivo is a creative and digital solutions company helping businesses build stronger brands, create meaningful digital experiences, and communicate their ideas with greater impact.</p>
      </section>

      <AboutCards />
      <WhatWeDo />
      <JourneyTimeline />
      <TeamMarquee />

      {/* ---------- Final CTA ---------- */}
      <section data-screen-label="About / Final CTA" style={{ padding: 'clamp(60px,8vw,120px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4.6vw,74px)', lineHeight: '.92', maxWidth: '18ch' }}>Let&apos;s Build Something Meaningful.</h2>
        <p style={{ fontSize: 'clamp(14px,1.05vw,17px)', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '58ch' }}>Every great project starts with an idea. Whether you&apos;re building a new brand, improving your digital presence, launching a product, creating a website, or visualizing something — let&apos;s turn your idea into something people can experience.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          <button onClick={goContact} data-magnet="" data-cursor="Talk" style={{ padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Conversation</button>
          <button onClick={goWork} data-magnet="" data-cursor="Work" data-cta-outline="" style={{ padding: '16px 32px', borderRadius: '99px', border: '1px solid var(--line)', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', transition: 'border-color .3s' }}>See Our Work</button>
        </div>
      </section>
    </main>
  );
}
