'use client';

import type { useRouter } from 'next/navigation';

/**
 * Replicates _goSvc from Quantivo.dc.html: route to /services, then smooth-scroll
 * to the detail block after 450ms. The delay is the original's, kept so the
 * scroll starts only once the page has laid out.
 */
export const goService =
  (router: ReturnType<typeof useRouter>, id: string) => () => {
    router.push('/services');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }, 450);
  };
