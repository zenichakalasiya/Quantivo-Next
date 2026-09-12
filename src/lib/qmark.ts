/**
 * The Quantivo Q mark, lifted from "Quantivo logo-05.svg".
 *
 * Three shapes make up the mark:
 *   OUTER  the gradient blob - a circle plus the tail that makes it a Q, not an O
 *   RING   a knockout that carves the ring AND forms the arrow terminal
 *   DOT    the solid centre
 *
 * BBOX is measured (getBBox on the outer path), not taken from the logo's
 * viewBox - the artboard is padded, and the clip normalisation below has to use
 * the real ink bounds or the reveal sits off-centre.
 */
export const Q_OUTER =
  'M826.97,543.18c.08-1.09.14-2.19.14-3.31,0-23.49-19.04-42.53-42.53-42.53s-42.53,19.04-42.53,42.53,19.04,42.53,42.53,42.53c9.52,0,18.31-3.13,25.39-8.41l17.14,9.82-.14-40.64Z';

export const Q_RING =
  'M809.35,514.96v6.55c-5.12-4.99-12.88-12.08-23.18-12.68-.11-.02-.22-.02-.34-.03-.39-.03-.77-.04-1.17-.06-.39-.02-.78-.02-1.17-.02-.55,0-1.09.02-1.63.04-.54.02-1.08.06-1.6.11-.06,0-.12,0-.19.01-5.05.49-9.65,2.1-13.78,4.83-.18.12-.36.23-.54.36-.03.01-.07.04-.1.06-1.63,1.13-3.18,2.44-4.67,3.92-1.48,1.48-2.78,3.03-3.91,4.65-.02.03-.04.07-.06.1-3.42,4.94-5.2,10.55-5.36,16.83,0,.31-.01.63-.01.94,0,8.78,3.12,16.28,9.34,22.51,6.23,6.23,13.73,9.34,22.51,9.34s16.29-3.12,22.43-9.34c6.23-6.23,9.34-13.73,9.34-22.51,0-1.22-.06-2.41-.18-3.57h-5.91c.17,1.23.25,2.5.25,3.81,0,7.18-2.56,13.33-7.66,18.36-5.03,5.11-11.18,7.66-18.36,7.66s-13.34-2.55-18.44-7.66c-5.03-5.03-7.59-11.18-7.59-18.36s2.56-13.34,7.59-18.37c5.11-5.02,11.25-7.58,18.44-7.58,9.88,0,17.3,6.55,22.33,11.57.22.22.44.45.66.68h-8.05v6.15h17.15v-18.3h-6.15Z';

export const Q_DOT = { cx: 783.46, cy: 540.57, r: 13.46 };

/** Measured ink bounds of Q_OUTER. */
export const Q_BBOX = { x: 742.05, y: 497.34, w: 85.06, h: 86.47 };

/** viewBox that frames the mark tightly, with a little breathing room for the stroke. */
export const Q_VIEWBOX = `${Q_BBOX.x - 2} ${Q_BBOX.y - 2} ${Q_BBOX.w + 4} ${Q_BBOX.h + 4}`;

/**
 * Maps the mark into the 0-1 space clipPathUnits="objectBoundingBox" expects, so
 * the clip scales with its element instead of needing new geometry every frame.
 * SVG transforms apply right-to-left: translate first, then scale.
 */
export const Q_NORMALISE =
  `scale(${(1 / Q_BBOX.w).toFixed(6)},${(1 / Q_BBOX.h).toFixed(6)}) translate(${-Q_BBOX.x},${-Q_BBOX.y})`;
