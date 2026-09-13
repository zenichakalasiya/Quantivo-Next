'use client';

import { useCallback, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { NAV, normalise } from '@/lib/nav';
import { MEGA_MENUS } from '@/lib/megaMenu';
import { useTheme } from '@/lib/theme';
import { QuantivoLogo } from './QuantivoLogo';
import { MegaPanel } from './nav/MegaMenu';

/**
 * Fixed site header.
 *
 * Nav entries stay <button> elements rather than becoming <Link>/<a>. That is
 * deliberate: globals.css carries `a:hover{color:var(--a)}` from the original,
 * which would fight the ported [data-nav-btn]:hover rule and shift the hover
 * colour. Matching the original element type keeps the cascade identical.
 *
 * ── The hover menus ──────────────────────────────────────────────────────────
 * Services, Work and Insights each open a panel on hover. Only one can be open,
 * so it is a single piece of state on the header rather than one per nav item —
 * two panels can never be open at once, and moving between nav items swaps
 * cleanly instead of racing two independent timers.
 *
 * Closing is deferred by a short timeout and cancelled on re-entry. Without it,
 * the pointer travelling from the nav button down into the panel crosses the gap
 * between them, fires mouseleave, and the panel shuts before it can be reached.
 */
const CLOSE_DELAY = 140;

export function SiteHeader() {
  const pathname = normalise(usePathname());
  const router = useRouter();
  const { toggle } = useTheme();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback((key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenKey(key);
  }, []);

  const close = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), CLOSE_DELAY);
  }, []);

  const closeNow = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenKey(null);
  }, []);

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
      closeNow();
      router.push(href);
      scrollTo({ top: 0, behavior: 'instant' });
    },
    [router, closeNow],
  );

  return (
    <header
      onMouseLeave={close}
      style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '60', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', padding: '18px clamp(16px,3.4vw,48px)', backdropFilter: 'blur(14px)', background: 'color-mix(in oklab,var(--bg) 72%,transparent)', borderBottom: '1px solid var(--line)' }}
    >
      <a href="/" onClick={goHome} data-cursor="Home" style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '0 0 auto' }}>
        <QuantivoLogo />
      </a>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {NAV.map((item) => {
          const active = pathname === item.href;
          const menu = MEGA_MENUS[item.key];
          return (
            <span
              key={item.key}
              data-nav-item=""
              onMouseEnter={menu ? () => open(item.key) : undefined}
              onFocus={menu ? () => open(item.key) : undefined}
              style={{ display: 'inline-flex' }}
            >
              <button
                onClick={go(item.href)}
                data-cursor="Open"
                data-nav-btn=""
                aria-expanded={menu ? openKey === item.key : undefined}
                style={{ padding: '9px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: '600', letterSpacing: '.14em', textTransform: 'uppercase', color: active ? 'var(--ink)' : 'var(--mute)', transition: 'color .3s, background .3s' }}
              >
                {item.label}
              </button>
            </span>
          );
        })}

        <button onClick={toggle} data-cursor="Theme" data-theme-toggle="" aria-label="Toggle colour scheme" style={{ marginLeft: '8px', width: '38px', height: '38px', borderRadius: '50%', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', transition: 'border-color .3s' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--grad)', boxShadow: 'inset -4px 0 0 0 var(--bg)' }} />
        </button>
      </nav>

      {/* One panel for the whole header. Rendered here rather than inside a nav
          item so it can span the full width regardless of which item opened it. */}
      {NAV.map((item) => {
        const menu = MEGA_MENUS[item.key];
        if (!menu) return null;
        const on = openKey === item.key;
        return (
          <div
            key={`panel-${item.key}`}
            onMouseEnter={() => open(item.key)}
            aria-hidden={!on}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 'clamp(16px,3.4vw,48px)',
              left: 'clamp(16px,3.4vw,48px)',
              maxWidth: '1040px',
              marginLeft: 'auto',
              borderRadius: '18px',
              border: '1px solid var(--line)',
              background: 'var(--bg2)',
              boxShadow: '0 30px 80px -30px rgba(0,0,0,.7)',
              opacity: on ? 1 : 0,
              visibility: on ? 'visible' : 'hidden',
              transform: on ? 'none' : 'translateY(-8px)',
              pointerEvents: on ? 'auto' : 'none',
              transition: 'opacity .28s ease, transform .34s cubic-bezier(.22,1,.36,1), visibility .28s',
            }}
          >
            <MegaPanel menu={menu} onNavigate={closeNow} />
          </div>
        );
      })}
    </header>
  );
}
