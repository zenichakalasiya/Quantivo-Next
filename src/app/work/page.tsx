'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WORK } from '@/data/content';
import { ProjectCard } from '@/components/work/ProjectCard';

/**
 * Work.
 *
 *   Hero
 *   Selected work   ten projects in two staggered columns
 *   All projects    the same set again, filterable
 *
 * ── The two columns are real columns, not a wrapping grid ────────────────────
 * A grid fills row by row, so the right column would always sit level with the
 * left. Splitting the list in two and rendering each half in its own flex column
 * is what lets the right one start lower and stay offset all the way down, which
 * is the whole character of the reference layout.
 *
 * Odd-indexed projects go right, so the two columns alternate through the set
 * rather than putting the first five on one side and the last five on the other.
 *
 * ── The gallery repeats the featured projects deliberately ───────────────────
 * The columns are an editorial pick; the gallery is the filterable archive. They
 * do different jobs, so showing a project in both is correct, not a bug.
 */
const FILTERS = ['All', 'Branding', 'Web', 'Marketing', '3D'] as const;
/** How far the right column drops below the left. */
const OFFSET = 'clamp(40px,11vw,170px)';

export default function WorkPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>('All');

  const go = (href: string) => () => {
    router.push(href);
    scrollTo({ top: 0, behavior: 'instant' });
  };

  const featured = WORK.slice(0, 10);
  const left = featured.filter((_, i) => i % 2 === 0);
  const right = featured.filter((_, i) => i % 2 === 1);
  const numberOf = (slot: string) => WORK.findIndex((w) => w.slot === slot) + 1;

  const shown = filter === 'All' ? WORK : WORK.filter((w) => w.cat === filter);

  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      {/* ---------- Hero ---------- */}
      <section data-screen-label="Work / Hero" style={{ minHeight: '52svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 'clamp(14px,2vh,22px)', padding: 'clamp(100px,13vh,140px) clamp(16px,3.4vw,48px) clamp(30px,4vh,56px)' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Our Work</span>
        <h1 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,8.4vw,150px)', lineHeight: '.86', maxWidth: '16ch' }}>Ideas Turned Into Experiences.</h1>
        <p data-anim="up" style={{ fontSize: 'clamp(15px,1.3vw,20px)', lineHeight: '1.55', color: 'var(--mute)', maxWidth: '56ch' }}>Every project is an opportunity to solve a problem, communicate something meaningful, and create something memorable.</p>
      </section>

      {/* ---------- Selected work ---------- */}
      <section data-screen-label="Work / Selected" style={{ position: 'relative', padding: 'clamp(40px,6vw,90px) clamp(16px,3.4vw,48px) clamp(60px,8vw,130px)', borderTop: '1px solid var(--line)', overflow: 'hidden' }}>
        {/* The wordmark down the left edge. aria-hidden and pointer-events:none —
            it is texture, not content, and the heading below carries the meaning. */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 'clamp(-14px,-1vw,0px)',
            top: '50%',
            transform: 'translateY(-50%)',
            writingMode: 'vertical-rl',
            rotate: '180deg',
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 'clamp(70px,11vw,190px)',
            lineHeight: '.8',
            letterSpacing: '.02em',
            color: 'var(--ink)',
            // .05 was invisible against a near-black page; this reads as
            // texture without competing with the cards.
            opacity: '.09',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          Selected Work
        </span>

        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: 'clamp(26px,3.6vw,52px)', paddingLeft: 'clamp(0px,7vw,150px)' }}>
          <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,4vw,60px)', lineHeight: '.96' }}>Selected Work.</h2>
          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>Hover for detail</span>
        </div>

        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3.4vw,64px)', paddingLeft: 'clamp(0px,7vw,150px)' }}>
          <div style={{ flex: '1 1 300px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,5vw,96px)' }}>
            {left.map((w) => (
              <ProjectCard key={w.slot} w={w} n={numberOf(w.slot)} onOpen={go('/contact')} />
            ))}
          </div>

          {/* the offset column */}
          <div style={{ flex: '1 1 300px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,5vw,96px)', marginTop: OFFSET }}>
            {right.map((w) => (
              <ProjectCard key={w.slot} w={w} n={numberOf(w.slot)} onOpen={go('/contact')} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- All projects ---------- */}
      <section data-screen-label="Work / Gallery" style={{ padding: 'clamp(48px,6vw,96px) clamp(16px,3.4vw,48px) clamp(60px,8vw,120px)', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: 'clamp(20px,2.6vw,36px)' }}>
          <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,4vw,60px)', lineHeight: '.96' }}>All Projects.</h2>
          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>{shown.length} {shown.length === 1 ? 'project' : 'projects'}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'clamp(26px,3.4vw,48px)' }}>
          {FILTERS.map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor="Filter"
                aria-pressed={on}
                style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.14em', textTransform: 'uppercase', border: `1px solid ${on ? 'transparent' : 'var(--line)'}`, background: on ? 'var(--grad)' : 'transparent', color: on ? '#fff' : 'var(--mute)', borderRadius: '99px', padding: '10px 18px', transition: 'background .3s, color .3s, border-color .3s' }}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,250px),1fr))', gap: 'clamp(18px,2.4vw,34px)' }}>
          {shown.map((w) => (
            <ProjectCard key={w.slot} w={w} n={numberOf(w.slot)} onOpen={go('/contact')} ratio="4 / 3" />
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section style={{ padding: 'clamp(56px,8vw,120px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4.6vw,74px)', lineHeight: '.92', maxWidth: '18ch' }}>Your Project Could Be Next.</h2>
        <button onClick={go('/contact')} data-magnet="" data-cursor="Brief us" style={{ padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Project</button>
      </section>
    </main>
  );
}
