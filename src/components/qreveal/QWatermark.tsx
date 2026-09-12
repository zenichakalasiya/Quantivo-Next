import { Q_DOT, Q_OUTER, Q_RING, Q_VIEWBOX } from '@/lib/qmark';

/**
 * The oversized Q sitting behind the outro, split across two full-screen
 * sections: the TOP half behind Let's Talk, the BOTTOM half behind the footer.
 *
 * It is drawn as a FILLED shape, not an outline — an outline at this scale read
 * as busy linework competing with the copy, where the reference (Bulletproof's
 * B) is a solid mass slightly lighter than the page.
 *
 * The arrow survives because the ring and centre dot are filled in the SECTION
 * background colour, punching back through the light mass exactly the way the
 * real logo is constructed. A plain silhouette would lose them.
 *
 * Sizing: height 200% of its section with the letter's centre pinned to the
 * shared edge, so each section shows precisely one half and the two read as one
 * continuous letter cut by the boundary.
 *   half="top"    -> centre at the section's BOTTOM edge
 *   half="bottom" -> centre at the section's TOP edge
 */
export function QWatermark({ half }: { half: 'top' | 'bottom' }) {
  return (
    <svg
      viewBox={Q_VIEWBOX}
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        // 200% tall, so shifting by a full section height puts the centre on the edge.
        top: half === 'top' ? '0%' : '-100%',
        transform: 'translateX(-50%)',
        height: '200%',
        width: 'auto',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <path d={Q_OUTER} fill="var(--ink)" fillOpacity=".11" />
      {/* Knockouts in the section background — this is what keeps the arrow. */}
      <path d={Q_RING} fill="var(--bg2)" />
      <circle cx={Q_DOT.cx} cy={Q_DOT.cy} r={Q_DOT.r} fill="var(--bg2)" />
    </svg>
  );
}
