'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SERVICES } from '@/data/content';
import { NAV } from '@/lib/nav';
import { QuantivoLogoFooter } from './QuantivoLogoFooter';

/** Site footer. Ported from Quantivo.dc.html lines 1195-1254. Renders on every page. */
export function SiteFooter() {
  const router = useRouter();
  const pathname = usePathname();
  // The /q-reveal prototype ships its own footer as part of the reveal, so the
  // global one would double up on screen.
  const hide = pathname.startsWith('/q-reveal');
  const go = (href: string) => () => { router.push(href); scrollTo({ top: 0, behavior: 'instant' }); };

  if (hide) return null;

  return (
    <footer style={{ position: 'relative', zIndex: '1', borderTop: '1px solid var(--line)', background: 'var(--bg2)', padding: 'clamp(48px,6vw,90px) clamp(16px,3.4vw,48px) 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 'clamp(28px,4vw,60px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'nowrap', maxWidth: '100%' }}>
            <QuantivoLogoFooter />
          </span>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2vw,28px)', letterSpacing: '.18em', lineHeight: '1', color: 'var(--mute)' }}>DIGITAL</span>
          <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mute)', lineHeight: '1.6' }}>Digital Marketing · Branding · Packaging · Web Development · 3D Visualization</span>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--mute)', maxWidth: '34ch' }}>Helping businesses create stronger brands and better digital experiences.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' }}>Quick Links</span>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {NAV.map((l) => (
              <li key={l.key}><button onClick={go(l.href)} data-cursor="Go" data-foot-link="" style={{ fontSize: '15px', fontWeight: '600', transition: 'color .3s' }}>{l.label}</button></li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' }}>Our Services</span>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {SERVICES.map((s) => (
              <li key={s.num}><button onClick={go('/services')} data-cursor="View" data-foot-svc="" style={{ fontSize: '14px', color: 'var(--mute)', textAlign: 'left', transition: 'color .3s' }}>{s.title}</button></li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'start' }}>
          <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' }}>Ready?</span>
          <button onClick={go('/contact')} data-magnet="" data-cursor="Let's go" style={{ padding: '16px 30px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>Let&apos;s Work Together</button>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(36px,5vw,70px)', paddingTop: '20px', borderTop: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>
        <span>© Quantivo Digital</span>
        <span>Ideas don&apos;t have borders</span>
      </div>
    </footer>
  );
}
