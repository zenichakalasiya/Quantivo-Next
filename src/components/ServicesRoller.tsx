'use client';

import { useEffect, useRef } from 'react';
import { SERVICES } from '@/data/content';

/**
 * Thin React wrapper around the vendored <quantivo-roller> custom element.
 *
 * The element self-registers, reads its cards from child [data-title] nodes,
 * owns its own theme MutationObserver on data-qv, and cleans up in
 * disconnectedCallback - so React's only jobs are to load the module
 * client-side and render the children it reads.
 *
 * Registration is deferred to an effect because customElements and three.js
 * both need a DOM; importing at module scope would break the static export.
 */
export function ServicesRoller() {
  const ready = useRef(false);

  useEffect(() => {
    if (ready.current) return;
    ready.current = true;
    void import('@/vendor/quantivo-roller.js');
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: 'clamp(400px,46vh,540px)', margin: '8px -12px 0' }}>
      <quantivo-roller style={{ position: 'absolute', inset: '0' }}>
        <div style={{ display: 'none' }}>
          {SERVICES.map((s) => (
            <i key={s.num} data-num={s.num} data-title={s.title} data-tag={s.tags[0]} />
          ))}
        </div>
      </quantivo-roller>
    </div>
  );
}
