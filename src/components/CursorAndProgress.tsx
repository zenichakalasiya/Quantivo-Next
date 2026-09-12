/**
 * The custom follow-cursor dot and the scroll-progress bar.
 * Ported from Quantivo.dc.html lines 1256-1259.
 *
 * Markup only - _initCursor and _initProgress drive both, and _initCursor
 * bails out entirely on coarse pointers, leaving the dot at opacity 0.
 */
export function CursorAndProgress() {
  return (
    <>
      <div data-qv-cursor="" style={{ position: 'fixed', top: '0', left: '0', zIndex: '99', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--grad)', pointerEvents: 'none', mixBlendMode: 'normal', opacity: '0', transform: 'translate3d(-50px,-50px,0)', display: 'grid', placeItems: 'center' }}>
        <span data-qv-cursor-label="" style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '.14em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap', opacity: '0' }} />
      </div>
      <div data-qv-progress="" style={{ position: 'fixed', left: '0', bottom: '0', height: '2px', width: '0', zIndex: '80', background: 'var(--grad)', pointerEvents: 'none' }} />
    </>
  );
}
