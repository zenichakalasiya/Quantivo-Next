import { Q_DOT, Q_OUTER, Q_RING, Q_VIEWBOX } from '@/lib/qmark';

/**
 * The oversized Q sitting behind the outro, split across two sections: the TOP
 * half behind Let's Talk, the BOTTOM half behind the footer.
 *
 * Drawn as a FILLED shape, not an outline — an outline at this scale read as busy
 * linework competing with the copy. The arrow survives because the ring and centre
 * dot are filled in the SECTION background, punching back through the mass exactly
 * the way the real logo is built. Colour comes from --q-wm / --q-wm-op, which sit
 * DARKER than the surface in both schemes (see globals.css).
 *
 * ── Sizing ───────────────────────────────────────────────────────────────────
 * SIZE is in svh, not a percentage of the section, and each half is anchored by
 * the edge it shares rather than by its own top. That is deliberate: percentages
 * are relative to each section's own height, so the moment the two sections stop
 * being the same height the halves stop lining up. Anchoring on the shared edge
 * keeps them joined no matter how either section is resized.
 *
 *   half="top"    -> bottom:-SIZE/2, so the letter's centre lands on the section's
 *                    BOTTOM edge and only its top half shows.
 *   half="bottom" -> top:-SIZE/2, centre on the section's TOP edge.
 *
 * The letter is very nearly square, so SIZE is also roughly its width — at 200svh
 * it was wider than the viewport and read as a full-bleed blob. 140svh keeps it
 * comfortably inside the frame while still spanning both screens.
 */
const SIZE_SVH = 140;
const HALF = SIZE_SVH / 2;

export function QWatermark({ half }: { half: 'top' | 'bottom' }) {
  return (
    <svg
      viewBox={Q_VIEWBOX}
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        ...(half === 'top'
          ? { bottom: `-${HALF}svh` }
          : { top: `-${HALF}svh` }),
        height: `${SIZE_SVH}svh`,
        width: 'auto',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <path d={Q_OUTER} fill="var(--q-wm)" fillOpacity="var(--q-wm-op)" />
      {/* Knockouts back to the surface colour — this is what keeps the arrow. */}
      <path d={Q_RING} fill="var(--bg2)" />
      <circle cx={Q_DOT.cx} cy={Q_DOT.cy} r={Q_DOT.r} fill="var(--bg2)" />
    </svg>
  );
}
