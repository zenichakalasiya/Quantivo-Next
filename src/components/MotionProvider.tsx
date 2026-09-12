'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Drives the ported motion layer.
 *
 * Two effects, mirroring the original's lifecycle split: cursor and scroll
 * progress are global and mount once; everything scroll-driven re-runs per
 * route, because React replaces the DOM on navigation and every GSAP handle
 * and measured offset taken by the _init* functions dies with it.
 *
 * The module is imported dynamically so gsap never runs during the static
 * export's server render.
 */
export function MotionProvider() {
  useEffect(() => {
    let teardown: (() => void) | undefined;
    let cancelled = false;
    import('@/vendor/motion.js').then((m) => {
      if (!cancelled) teardown = m.startGlobalMotion();
    });
    return () => { cancelled = true; teardown?.(); };
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    let teardown: (() => void) | undefined;
    let cancelled = false;
    // A frame's grace so the new route's DOM is laid out before anything is
    // measured - the original used a setTimeout from componentDidUpdate.
    const id = setTimeout(() => {
      import('@/vendor/motion.js').then((m) => {
        if (!cancelled) teardown = m.runPageMotion();
      });
    }, 80);
    return () => { cancelled = true; clearTimeout(id); teardown?.(); };
  }, [pathname]);

  return null;
}
