'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SVC_MENU } from '@/data/content';
import { NAV, normalise } from '@/lib/nav';
import { bgUrl } from '@/lib/assets';
import { useTheme } from '@/lib/theme';
import { QuantivoLogo } from './QuantivoLogo';

/**
 * Fixed site header. Ported from Quantivo.dc.html lines 106-157.
 *
 * Nav entries stay <button> elements rather than becoming <Link>/<a>. That is
 * deliberate: globals.css carries `a:hover{color:var(--a)}` from the original,
 * which would fight the ported [data-nav-btn]:hover rule and shift the hover
 * colour. Matching the original element type keeps the cascade identical.
 * (The original had no real nav links either, so this is no SEO regression -
 * but it is the obvious thing to revisit later.)
 */
export function SiteHeader() {
  const pathname = normalise(usePathname());
  const router = useRouter();
  const { toggle } = useTheme();

  const goHome = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.push('/');
      scrollTo({ top: 0, behavior: 'instant' });
    },
    [router],
  );

  const go = useCallback(
    (href: string) => () => {
      router.push(href);
      scrollTo({ top: 0, behavior: 'instant' });
    },
    [router],
  );

  /** Replicates _goSvc: route to /services, then smooth-scroll after 450ms. */
  const goSvc = useCallback(
    (id: string) => () => {
      router.push('/services');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      }, 450);
    },
    [router],
  );

  return (
    <header style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '60', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', padding: '18px clamp(16px,3.4vw,48px)', backdropFilter: 'blur(14px)', background: 'color-mix(in oklab,var(--bg) 72%,transparent)', borderBottom: '1px solid var(--line)' }}>
      <a href="/" onClick={goHome} data-cursor="Home" style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '0 0 auto' }}>
        <QuantivoLogo />
      </a>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <span key={item.key} data-nav-item="" style={{ display: 'inline-flex' }}>
              <button
                onClick={go(item.href)}
                data-cursor="Open"
                data-nav-btn=""
                style={{ padding: '9px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: active ? 'var(--ink)' : 'var(--mute)', background: active ? 'var(--bg2)' : 'transparent', border: `1px solid ${active ? 'var(--a)' : 'transparent'}`, transition: 'color .3s,background .3s,border-color .3s' }}
              >
                {item.label}
              </button>

              {item.isSvc && (
                <span data-hdr-panel="" style={{ position: 'absolute', left: 'clamp(16px,3.4vw,48px)', right: 'clamp(16px,3.4vw,48px)', top: 'calc(100% + 4px)', maxWidth: '640px', marginLeft: 'auto', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) clamp(150px,16vw,200px)', gap: 'clamp(14px,1.6vw,22px)', padding: 'clamp(14px,1.6vw,20px)', border: '1px solid var(--line)', borderRadius: '20px', background: 'var(--bg2)', boxShadow: '0 28px 70px rgba(0,0,0,.5)', textAlign: 'left' }}>
                  <span style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '2px 14px', minWidth: '0' }}>
                    {SVC_MENU.map((m) => (
                      <button key={m.id} onClick={goSvc(m.id)} data-hdr-link="" data-cursor="Open" style={{ display: 'flex', alignItems: 'baseline', gap: '8px', padding: '7px 0', textAlign: 'left', fontSize: '13px', fontWeight: '600', lineHeight: '1.25' }}>
                        <span data-hdr-n="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '12px', letterSpacing: '.06em' }}>{m.n}</span>
                        <span data-hdr-t="" style={{ minWidth: '0' }}>{m.label}</span>
                        <span data-hdr-peek="" style={{ backgroundImage: bgUrl(m.img) }} />
                      </button>
                    ))}
                  </span>
                  <span style={{ position: 'relative', display: 'block', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--line)', backgroundImage: bgUrl('/img/q-peek-social.jpg'), backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 'clamp(120px,14vw,170px)' }} />
                </span>
              )}
            </span>
          );
        })}

        <button onClick={toggle} data-cursor="Theme" data-theme-toggle="" aria-label="Toggle colour scheme" style={{ marginLeft: '8px', width: '38px', height: '38px', borderRadius: '50%', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', transition: 'border-color .3s,transform .3s' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--grad)', boxShadow: 'inset -4px 0 0 0 var(--bg)' }} />
        </button>
      </nav>
    </header>
  );
}
