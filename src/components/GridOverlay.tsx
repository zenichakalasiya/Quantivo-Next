/** Fixed background grid. Ported from Quantivo.dc.html line 104 (opacity:0 in the original). */
export function GridOverlay() {
  return (
    <div style={{ position: 'fixed', inset: '0', zIndex: '0', pointerEvents: 'none', opacity: '0', backgroundImage: 'linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)', backgroundSize: '100% 92px,8.333vw 100%', maskImage: 'linear-gradient(180deg,transparent,#000 18%,#000 82%,transparent)' }} />
  );
}
