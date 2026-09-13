'use client';

import { usePathname } from 'next/navigation';
import { OutroFooter } from './qreveal/OutroScreen';

/**
 * Renders the site footer everywhere EXCEPT the routes that compose it
 * themselves.
 *
 * Every inner page gets the SAME footer as home — `OutroFooter`, with its
 * bottom-half Q watermark — just without the Q-draw/expand intro: that reveal
 * is HomeOutro's `<QReveal>` wrapper around the Let's Talk screen, and this
 * renders OutroFooter directly, unwrapped, so it's a plain static footer here.
 * Home still composes it itself (inside HomeOutro, sharing one Q watermark
 * with the Let's Talk screen above it) and /q-reveal is the standalone
 * prototype — both would double up if this rendered on them too.
 */
const SELF_COMPOSED = ['/q-reveal'];

export function GlobalFooter() {
  const pathname = usePathname();
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/' || SELF_COMPOSED.some((r) => p.startsWith(r))) return null;
  return <OutroFooter />;
}
