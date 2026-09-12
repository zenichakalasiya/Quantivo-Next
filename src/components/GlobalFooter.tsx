'use client';

import { usePathname } from 'next/navigation';
import { SiteFooter } from './SiteFooter';

/**
 * Renders the site footer everywhere EXCEPT the routes that compose it
 * themselves.
 *
 * Home wraps the footer inside HomeOutro so one Q watermark can span both the
 * Let's Talk screen and the footer; /q-reveal is the standalone prototype. Both
 * render SiteFooter directly, so the global one would double up.
 *
 * The check lives here rather than inside SiteFooter because SiteFooter must stay
 * route-agnostic — otherwise the instance HomeOutro renders would hide itself.
 */
const SELF_COMPOSED = ['/q-reveal'];

export function GlobalFooter() {
  const pathname = usePathname();
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/' || SELF_COMPOSED.some((r) => p.startsWith(r))) return null;
  return <SiteFooter />;
}
