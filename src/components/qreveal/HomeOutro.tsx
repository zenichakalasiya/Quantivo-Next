'use client';

import { QReveal } from './QReveal';
import { FinalCta } from '@/components/home/FinalCta';
import { SiteFooter } from '@/components/SiteFooter';
import { Q_OUTER, Q_VIEWBOX } from '@/lib/qmark';

/**
 * The home page outro: the Q draws, opens onto the Let's Talk screen, and the
 * footer follows — with ONE oversized Q watermark spanning both.
 *
 * Layout is deliberately a single positioned wrapper holding the reveal AND the
 * footer, because the watermark has to be one continuous letter cut in half by
 * the boundary between them. Rendering it per-section would restart the letter
 * and the illusion breaks.
 *
 * The footer is the real SiteFooter, not a copy, so home stays consistent with
 * every other page. layout.tsx skips its global footer on "/" to avoid doubling.
 */
export function HomeOutro() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)' }}>
      {/* One Q, spanning the Let's Talk screen and the footer. Sized to the
          wrapper's HEIGHT so the whole letter fits and the boundary cuts it
          roughly in half. */}
      <svg
        viewBox={Q_VIEWBOX}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          height: '104%',
          width: 'auto',
          opacity: '.07',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <path d={Q_OUTER} fill="var(--ink)" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <QReveal>
          <FinalCta />
        </QReveal>
        <SiteFooter />
      </div>
    </div>
  );
}
