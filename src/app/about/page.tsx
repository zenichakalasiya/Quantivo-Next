'use client';

import { useRouter } from 'next/navigation';
import { ABOUT_STEPS, BELIEFS, CAPABILITIES, JOURNEY, TEAM, WHY_US } from '@/data/content';
import { ImageSlot } from '@/components/ImageSlot';
import { bgUrl } from '@/lib/assets';

/**
 * About. Ported from Quantivo.dc.html lines 663-998.
 *
 * Three of the motion layer's scroll rigs live only on this page and key off
 * attributes that must survive verbatim:
 *   [data-vm-sec]    -> _initVM        (vision/mission/why cross-fade band)
 *   [data-team-wrap] -> _initTeam      (bio <-> card carousel)
 *   [data-yr-sec]    -> _initYearRail  (2021-2025 horizontal rail)
 *
 * The :not([data-ready]) rules in globals.css keep the first slide/bio/card
 * visible until those rigs mark the section ready.
 */
const EYEBROW = { fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' } as const;
const BLOCK_GRID = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 'clamp(14px,2vw,36px)', padding: 'clamp(26px,3vw,44px) 0', borderTop: '1px solid var(--line)' } as const;
const H3 = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(26px,2.6vw,42px)', lineHeight: '.98', maxWidth: '16ch' } as const;
const P_MUTE = { fontSize: '15px', lineHeight: '1.6', color: 'var(--mute)', textWrap: 'pretty' } as const;
const P_INK = { fontSize: 'clamp(16px,1.25vw,19px)', lineHeight: '1.6', color: 'var(--ink)', textWrap: 'pretty' } as const;
const VM_BG = { position: 'absolute', inset: '0', backgroundSize: 'cover', backgroundPosition: 'center' } as const;
const VM_LABEL = { fontSize: '10px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: '#fff' } as const;
const VM_H3 = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2vw,30px)', lineHeight: '1', color: '#fff' } as const;

export default function AboutPage() {
  const router = useRouter();
  const goContact = () => {
    router.push('/contact');
    scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      {/* ---------- Hero ---------- */}
      <section data-screen-label="About / Hero" style={{ minHeight: '66svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '24px', padding: '150px clamp(16px,3.4vw,48px) clamp(48px,6vw,90px)' }}>
        <span style={EYEBROW}>About Quantivo Digital</span>
        <h1 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,9vw,168px)', lineHeight: '.84', maxWidth: '18ch' }}>Built for Ideas That Move Forward.</h1>
        <p data-anim="up" style={{ fontSize: 'clamp(16px,1.4vw,22px)', lineHeight: '1.5', color: 'var(--mute)', maxWidth: '62ch' }}>Quantivo Digital is a creative and digital solutions company helping businesses build stronger brands, create meaningful digital experiences, and communicate their ideas with greater impact.</p>
      </section>

      {/* ---------- About Quantivo ---------- */}
      <section data-screen-label="About / About Quantivo" style={{ padding: 'clamp(50px,6vw,96px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3vw,48px)', alignItems: 'flex-start' }}>
          <div style={{ flex: '2 1 380px', minWidth: '0' }}>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.4vw,70px)', lineHeight: '.94', marginBottom: 'clamp(16px,2vw,28px)' }}>
              About <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Quantivo</span>
            </h2>

            <div style={BLOCK_GRID}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={EYEBROW}>Who We Are</span>
                <h3 style={H3}>Creativity Meets Strategy. Ideas Meet Execution.</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={P_INK}>The digital world is constantly changing, and businesses need more than individual services to stand out. They need strong ideas, clear communication, memorable visuals, and the right digital strategy. That&apos;s where Quantivo Digital comes in.</p>
                <p style={P_MUTE}>We are a team focused on combining strategy, creativity, technology, and visualization to create solutions that help businesses build their presence and present themselves with confidence.</p>
                <p style={P_MUTE}>From managing a brand&apos;s social media presence to creating its identity, building its website, designing its packaging, or bringing products and spaces to life through 3D visualization — we approach every project with purpose.</p>
              </div>
            </div>

            <div style={BLOCK_GRID}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={EYEBROW}>What We Believe</span>
                <h3 style={H3}>Good Work Starts With Understanding.</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={P_MUTE}>We believe great results don&apos;t come from simply following trends or using the same formula for every business.</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {BELIEFS.map((b) => (
                    <li key={b} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,1.9vw,30px)', lineHeight: '1.05', paddingBottom: '10px', borderBottom: '1px solid var(--line)' }}>{b}</li>
                  ))}
                </ul>
                <p style={P_MUTE}>That&rsquo;s why we take the time to understand the business, the challenge, and the opportunity before turning ideas into action.</p>
                <p style={P_INK}>Our goal is not just to create something that looks good. Our goal is to create something that communicates clearly, creates value, and moves the brand forward.</p>
              </div>
            </div>

            <div style={BLOCK_GRID}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={EYEBROW}>What We Do</span>
                <h3 style={H3}>One Partner. Multiple Possibilities.</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={P_MUTE}>Quantivo Digital brings together different capabilities to support businesses across their digital and creative journey.</p>
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 240px', minWidth: '0', display: 'flex', gap: 'clamp(12px,1.6vw,22px)', alignItems: 'stretch', position: 'sticky', top: '100px' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,5.4vw,86px)', lineHeight: '.86', letterSpacing: '.02em', writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: 'var(--mute)', opacity: '.32', whiteSpace: 'nowrap', alignSelf: 'start' }}>OUR STORY</span>
            <span style={{ flex: '1', display: 'block', position: 'relative', minHeight: 'clamp(320px,42vw,520px)', borderRadius: '22px', overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)' }}>
              <ImageSlot id="qv-about-story" placeholder="Studio or team image — portrait" style={{ position: 'absolute', inset: '0' }} />
            </span>
          </div>
        </div>

        <div data-cap-row="" style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '20px', overflow: 'hidden', marginTop: 'clamp(24px,3vw,44px)' }}>
          {CAPABILITIES.map((c) => (
            <div key={c.n} data-cap="" data-cursor={c.title} style={{ minWidth: '0', position: 'relative', padding: 'clamp(22px,2.4vw,34px) 20px clamp(20px,2.2vw,28px)', display: 'flex', flexDirection: 'column', gap: '14px', minHeight: 'clamp(230px,24vw,300px)', overflow: 'hidden' }}>
              <span data-cap-num="" style={{ position: 'absolute', right: '14px', top: '6px', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(56px,7vw,104px)', lineHeight: '1', color: 'var(--ink)', pointerEvents: 'none' }}>{c.n}</span>
              <span data-cap-bar="" style={{ display: 'block', width: '100%', height: '3px', borderRadius: '99px', background: 'var(--grad)' }} />
              <span style={{ position: 'relative', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(24px,2.4vw,38px)', lineHeight: '1', background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{c.title}</span>
              <span style={{ position: 'relative', fontSize: '13px', lineHeight: '1.55', color: 'var(--mute)' }}>{c.body}</span>
              <span data-cap-items="" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '7px', marginTop: 'auto' }}>
                {c.items.map((i) => (
                  <span key={i} style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.12em', textTransform: 'uppercase', border: '1px solid var(--line)', borderRadius: '99px', padding: '5px 10px', color: 'var(--mute)' }}>{i}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Approach ---------- */}
      <section data-screen-label="About / Approach" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(16px,3vw,48px)', alignItems: 'start', padding: 'clamp(50px,6vw,96px) clamp(16px,3.4vw,48px)' }}>
          <div>
            <span style={EYEBROW}>Our Approach</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5.6vw,96px)', lineHeight: '.9', marginTop: '14px' }}>
              Think. Create.<br /><span style={{ color: 'var(--mute)', opacity: '.6' }}>Deliver.</span>
            </h2>
          </div>
          <p style={{ fontSize: '15px', lineHeight: '1.65', color: 'var(--mute)', maxWidth: '46ch' }}>Five steps we run on every engagement, from the first conversation to the work going live. Hover a row.</p>
        </div>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {ABOUT_STEPS.map((s, i) => (
            <div key={s.title} data-val-row="" data-cursor={s.title} style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: 'clamp(12px,2vw,32px)', alignItems: 'center', padding: 'clamp(20px,2.4vw,34px) clamp(16px,3.4vw,48px)', borderBottom: '1px solid var(--line)' }}>
              <span data-val-num="" style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.16em', color: 'var(--a)' }}>{'0' + (i + 1)}</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '10px clamp(16px,3vw,44px)', alignItems: 'center' }}>
                <span data-val-name="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,3.6vw,60px)', lineHeight: '.98' }}>{s.title}</span>
                <span data-val-copy="" style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--mute)' }}>{s.body}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Vision / Mission / Why ---------- */}
      <section data-vm-sec="" data-screen-label="About / Vision, Mission & Why" style={{ position: 'relative', height: 'calc(100svh + 240svh)', borderTop: '1px solid var(--line)' }}>
        <div style={{ position: 'sticky', top: '0', height: '100svh', overflow: 'hidden' }}>
          <span data-vm-bg="" style={{ ...VM_BG, backgroundImage: bgUrl('/img/q-band-vision.jpg'), opacity: '1' }} />
          <span data-vm-bg="" style={{ ...VM_BG, backgroundImage: bgUrl('/img/q-band-mission.jpg'), opacity: '0' }} />
          <span data-vm-bg="" style={{ ...VM_BG, backgroundImage: bgUrl('/img/q-band-why.jpg'), opacity: '0' }} />
          <span style={{ position: 'absolute', inset: '0', background: 'linear-gradient(90deg,rgba(9,9,12,.9) 0%,rgba(9,9,12,.76) 48%,rgba(9,9,12,.6) 100%)', pointerEvents: 'none' }} />
          <span style={{ position: 'absolute', left: '0', right: '0', top: '36%', height: '1px', background: 'rgba(255,255,255,.28)', pointerEvents: 'none' }} />

          <div style={{ position: 'absolute', left: 'clamp(16px,3.4vw,48px)', right: 'clamp(16px,3.4vw,48px)', bottom: '64%', display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '2px', paddingBottom: '16px', pointerEvents: 'none' }}>
            {['Vision', 'Mission', 'Why'].map((t) => (
              <span key={t} data-vm-past="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,3.6vw,58px)', lineHeight: '.98', color: 'rgba(255,255,255,.3)', opacity: '0' }}>{t}</span>
            ))}
          </div>

          <div style={{ position: 'absolute', left: 'clamp(16px,3.4vw,48px)', right: 'clamp(16px,3.4vw,48px)', top: '34%', bottom: 'clamp(6px,1.4vh,16px)', paddingTop: 'clamp(8px,1.4vh,18px)', display: 'grid', overflow: 'hidden' }}>
            <div data-vm-slide="" style={{ gridArea: '1/1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 'clamp(14px,2.4vw,44px)', alignItems: 'start', opacity: '1' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={VM_LABEL}>Our</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5.6vw,96px)', lineHeight: '.9', color: '#fff' }}>Vision</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '52ch' }}>
                <h3 style={VM_H3}>Creating Better Ways for Brands to Be Seen.</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,.9)' }}>Our vision is to become a trusted creative and digital partner for businesses around the world. We want to help ambitious brands turn ideas into meaningful experiences through creativity, technology, strategy, and innovation.</p>
                <p style={{ fontSize: 'clamp(14px,1.1vw,17px)', lineHeight: '1.5', color: '#fff' }}>As Quantivo Digital grows, our focus remains simple: Keep learning. Keep creating. Keep moving forward.</p>
              </div>
            </div>

            <div data-vm-slide="" style={{ gridArea: '1/1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 'clamp(14px,2.4vw,44px)', alignItems: 'start', opacity: '0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={VM_LABEL}>Our</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5.6vw,96px)', lineHeight: '.9', color: '#fff' }}>Mission</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '52ch' }}>
                <h3 style={VM_H3}>Turning Ideas Into Meaningful Experiences.</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,.9)' }}>Our mission is to help businesses communicate better, build stronger brands, and create digital experiences that connect with people. We do this by combining the right mix of:</p>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(18px,1.9vw,28px)', lineHeight: '1.1', color: '#fff' }}>Strategy · Creativity · Technology · Visualization</span>
              </div>
            </div>

            <div data-vm-slide="" style={{ gridArea: '1/1', display: 'flex', flexWrap: 'wrap', gap: '14px clamp(20px,3vw,56px)', alignContent: 'start', alignItems: 'flex-start', opacity: '0' }}>
              <div style={{ flex: '0 1 auto', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={VM_LABEL}>Our</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,4.4vw,72px)', lineHeight: '.9', color: '#fff' }}>Why</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '52ch', margin: '0 auto' }}>
                <h3 style={VM_H3}>More Than a Service Provider.</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#fff' }}>We believe the best partnerships happen when people understand the bigger picture. Instead of looking at every project as an isolated task, we look at how branding, marketing, digital experiences, and visualization can work together.</p>
              </div>
              <div style={{ flex: '1 1 100%', marginTop: 'clamp(8px,1.6vh,22px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(50%,150px),1fr))', gap: '10px clamp(12px,1.6vw,22px)', minHeight: '0', padding: 'clamp(10px,1.2vw,14px) clamp(12px,1.4vw,18px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,.2)', background: 'rgba(10,10,14,.5)', backdropFilter: 'blur(14px) saturate(120%)', boxShadow: '0 20px 50px rgba(0,0,0,.35)' }}>
                {WHY_US.map((w) => (
                  <span key={w.title} style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid rgba(255,255,255,.34)', paddingTop: '7px', minHeight: '0' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '.06em', textTransform: 'uppercase', color: '#fff' }}>{w.title}</span>
                    <span style={{ fontSize: '14px', lineHeight: '1.5', color: '#fff' }}>{w.body}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Team ---------- */}
      <section data-team-wrap="" data-screen-label="About / Team" style={{ padding: 'clamp(50px,6vw,96px) 0', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: '20px', padding: '0 clamp(16px,3.4vw,48px) clamp(26px,3vw,44px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={EYEBROW}>The Team</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,5.4vw,92px)', lineHeight: '.92' }}>People Behind the Work.</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span data-team-count="" style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.2em', color: 'var(--mute)' }}>01 / 06</span>
            <button data-team-prev="" data-cursor="Prev" data-team-btn="" aria-label="Previous member" style={{ width: '46px', height: '46px', borderRadius: '50%', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', fontSize: '17px', transition: 'border-color .3s' }}>&#8592;</button>
            <button data-team-next="" data-cursor="Next" aria-label="Next member" style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--grad)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '17px' }}>&#8594;</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(18px,2.4vw,40px)', alignItems: 'flex-start', padding: '0 clamp(16px,3.4vw,48px)' }}>
          <div style={{ flex: '1 1 240px', minWidth: '0', display: 'grid' }}>
            {TEAM.map((t) => (
              <div key={t.slot} data-team-bio="" style={{ gridArea: '1/1', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <span style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--mute)', textWrap: 'pretty' }}>{t.bio}</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(22px,2.2vw,32px)', lineHeight: '1' }}>{t.name}</span>
                <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--a)' }}>{t.role}</span>
              </div>
            ))}
          </div>

          <div data-team-strip="" style={{ flex: '2 1 380px', minWidth: '0', display: 'flex', gap: 'clamp(14px,1.6vw,24px)', overflowX: 'auto', paddingBottom: '6px' }}>
            {TEAM.map((t) => (
              <div key={t.slot} data-team-card="" style={{ flex: '0 0 auto', width: 'clamp(230px,30vw,340px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ display: 'block', position: 'relative', aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)' }}>
                  <ImageSlot id={t.slot} placeholder="Team photo — portrait, 3:4" style={{ position: 'absolute', inset: '0' }} />
                </span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(18px,1.8vw,26px)', lineHeight: '1' }}>{t.name}</span>
                <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Journey ---------- */}
      <section data-yr-sec="" data-screen-label="About / Journey" style={{ position: 'relative', height: 'calc(100svh + 2400px)', borderTop: '1px solid var(--line)', background: 'var(--bg2)' }}>
        <div style={{ position: 'sticky', top: '0', height: '100svh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: '18px', padding: 'clamp(72px,8vh,104px) clamp(16px,3.4vw,48px) clamp(18px,2vw,30px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={EYEBROW}>Our Journey</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,5.4vw,92px)', lineHeight: '.92' }}>Growing Every Year.</h2>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' }}>Scroll — 2021 to 2025</span>
          </div>

          <div style={{ position: 'relative', flex: '1', overflow: 'hidden' }}>
            <div data-yr-track="" style={{ position: 'absolute', left: '0', top: '0', width: '3400px', height: '100%', willChange: 'transform' }}>
              <span style={{ position: 'absolute', left: '0', right: '0', top: '0', height: '1px', background: 'var(--line)' }} />
              {JOURNEY.map((j) => (
                <span key={j.year} style={{ position: 'absolute', left: j.left + 'px', top: '-4px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--a)' }} />
              ))}
              <div style={{ position: 'absolute', left: '0', top: '26px', width: '100%' }}>
                {JOURNEY.map((j) => (
                  <div key={j.year} data-yr-step="" style={{ position: 'absolute', left: j.left + 'px', top: '0', width: '440px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <span style={{ alignSelf: 'start', padding: '8px 20px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontFamily: "'Bebas Neue',sans-serif", fontSize: '26px', lineHeight: '1', letterSpacing: '.04em' }}>{j.year}</span>
                    <span style={{ fontSize: '16px', lineHeight: '1.55', color: 'var(--mute)', textWrap: 'pretty' }}>{j.body}</span>
                    <span style={{ display: 'block', width: '300px', aspectRatio: '16/10', borderRadius: '16px', overflow: 'hidden', backgroundImage: bgUrl(j.img), backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid var(--line)' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Global ---------- */}
      <section data-screen-label="About / Global" style={{ padding: 'clamp(56px,7vw,110px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)' }}>
        <span style={EYEBROW}>Working Globally</span>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,6.4vw,116px)', lineHeight: '.9', marginTop: '14px', maxWidth: '16ch' }}>Ideas Don&apos;t Have Borders.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 'clamp(24px,4vw,60px)', marginTop: 'clamp(24px,3vw,44px)' }}>
          <p data-anim="up" style={{ fontSize: '15px', lineHeight: '1.65', color: 'var(--mute)' }}>Great collaboration can happen anywhere. Quantivo Digital works with businesses internationally, helping brands and companies access creative, digital, and visualization services across markets.</p>
          <p data-anim="up" style={{ fontSize: 'clamp(16px,1.3vw,20px)', lineHeight: '1.5' }}>No matter where your business is located, our goal remains the same: Understand the challenge. Create the right solution. Deliver work that creates value.</p>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section data-screen-label="About / Final CTA" style={{ padding: 'clamp(70px,10vw,150px) clamp(16px,3.4vw,48px)', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'start' }}>
        <h2 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,7.6vw,132px)', lineHeight: '.86', maxWidth: '20ch' }}>Let&apos;s Build Something Meaningful.</h2>
        <p style={{ fontSize: 'clamp(15px,1.25vw,19px)', lineHeight: '1.55', color: 'var(--mute)', maxWidth: '56ch' }}>Every great project starts with an idea. Whether you&apos;re building a new brand, improving your digital presence, launching a product, creating a website, or visualizing something — let&apos;s turn your idea into something people can experience.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <button onClick={goContact} data-magnet="" data-cursor="Talk" style={{ padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Start a Conversation</button>
          <button onClick={goContact} data-magnet="" data-cursor="Work" data-cta-outline="" style={{ padding: '16px 32px', borderRadius: '99px', border: '1px solid var(--line)', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', transition: 'border-color .3s' }}>Let&apos;s Work Together</button>
        </div>
      </section>
    </main>
  );
}
