/**
 * About / section 1 — the striped wordmark in each card's bottom whitespace.
 *
 * At rest the About cards show an eyebrow, a number and a title, and then a
 * lot of nothing: the card height is sized to card 01's full hover copy, so
 * two thirds of every card is empty until you point at it. These fill that
 * space with ONE QUANTIVO running across all three, sliced by the card edges
 * rather than divided into three tidy groups.
 *
 * ── The letters ──────────────────────────────────────────────────────────────
 * Built to the client's per-letter reference sheet: each letter is ONE bold
 * solid shape — a circle, an arch, a shield, a pentagon, a bar — with a band of
 * parallel stripes CUT OUT of it, so the card shows through the gaps.
 *
 * The stripes are subtraction, not linework, which is why every letter renders
 * through a mask (silhouette in white, stripes stroked black over it) rather
 * than as plain paths. Drawing the stripes in the card's own background colour
 * instead would force them to be opaque, and this wordmark is deliberately not.
 *
 * Letters are 130 wide on a 150 advance, y=30 to y=160.
 *
 * ── Three things that decide the implementation ──────────────────────────────
 *
 * 1. ABSOLUTELY POSITIONED, NOT A FLEX CHILD. The card height is fixed and
 *    card 01's revealed copy already fills it at flex:3 (see the measurement
 *    note in AboutCards). Anything in the flow would steal that height back and
 *    the copy would start scrolling inside the card.
 *
 * 2. THE SCALE IS DRIVEN BY WIDTH. The wrapper is the row's full width and
 *    takes its height from aspect-ratio, so the art always fills that width.
 *    See the wrapper's own note for what that costs on hover.
 *
 * 3. THE LETTERS SIT FLAT ON THE CARD'S BOTTOM EDGE. The viewBox is cropped to
 *    the cap-line/baseline band, so the design space's 30 units of slack above
 *    and below are simply never shown.
 *
 * The wordmark is drawn twice, from one <defs> definition, and the two copies
 * cross-fade: quiet var(--mute) at rest, brand gradient on hover.
 *
 * Ids are suffixed per card because three of these render in one document.
 */

/**
 * ONE wordmark spanning the whole row, not three per-card ones.
 *
 * Every card renders the identical eight-letter QUANTIVO; the <svg> is as wide
 * as all three cards plus both gaps, and each card is shifted left by its own
 * index so it shows only its window of it. The cards' own `overflow: hidden`
 * does the cutting. A and I therefore land ON the card boundaries and are
 * sliced by them — A's tail reappearing at the head of card 2, I's head
 * reappearing at its foot — which is what makes the three cards read as one
 * continuous word rather than three separate decorations.
 *
 * Doing the geometry in CSS rather than in the viewBox is what keeps it exact:
 * the gap between two halves of a sliced letter IS the real card gap, at every
 * viewport, because the same clamp() drives both.
 *
 * The letters need no new coordinates. Inside each of the three GLYPHS groups
 * they already sit 150 apart, which is exactly the advance the full wordmark
 * wants, so joining the groups into one continuous line is three translations:
 *   group 0 (QUA) -25  ->  Q 0,   U 150, A 300
 *   group 1 (NT) +350  ->  N 450, T 600
 *   group 2 (IVO) +725 ->  I 750, V 900, O 1050
 * Eight letters of 130 on a 150 advance = 1180 wide.
 */
const VB_W = 480; // design width one group was authored in
const VB_H = 190; // design height one group was authored in
const GROUP_DX = [-25, 350, 725];
const ROW_W = 1180;

/** The row gap, repeated from AboutCards so the two cannot disagree. */
const CARD_GAP = 'clamp(12px,1.4vw,20px)';

/**
 * Stripe rhythm — ONE definition for every letter.
 *
 * The cuts were originally written out per letter as literal coordinates, and
 * the two kinds drifted apart: the horizontal bands on T and I were 5 wide on a
 * 9 pitch, while the diagonals were 9 wide on a ~17.7 perpendicular pitch, so
 * the diagonal letters read visibly coarser than the straight ones. Both now
 * derive from the same two numbers.
 *
 * DIAG_STEP is the catch: a 45-degree line moved one pitch PERPENDICULAR
 * travels pitch * sqrt(2) horizontally, so stepping diagonals by the pitch
 * itself would pack them 1.41x too tight.
 */
/* glyph-data-start */
const TOP = 30;
const BOT = 160;
const BOX = BOT - TOP;

const STRIPE_W = 5;
const STRIPE_PITCH = 9;
const DIAG_STEP = STRIPE_PITCH * Math.SQRT2;

const r2 = (n = 0) => +n.toFixed(2);

/** Diagonal cuts at 45 degrees. `lean` is 1 for a backslash, -1 for a slash. */
const diag = (xStart = 0, count = 1, lean = 1) =>
  Array.from({ length: count }, (_, i) => {
    const x = r2(xStart + i * DIAG_STEP);
    return `M${x} ${TOP} L${r2(x + lean * BOX)} ${BOT}`;
  }).join(' ');

/** Horizontal cuts across a bar, `yStart` being the FIRST cut's centre. */
const horiz = (x1 = 0, x2 = 0, yStart = 0, count = 1) =>
  Array.from({ length: count }, (_, i) => `M${x1} ${r2(yStart + i * STRIPE_PITCH)} H${x2}`).join(' ');

/**
 * A striped bar's height, derived from the rhythm rather than chosen.
 *
 * The cuts have to sit centred in the bar AND leave a solid margin at each end
 * equal to the gap between them, or the rhythm visibly breaks where the bar
 * ends. T's head bar was 44 and I's slabs were 38, both carrying four cuts, so
 * T finished on a 5.5 solid band and I on a 1.5 sliver — same pitch, but the
 * edges gave them away. At this height both come out solid4 / cut5 / ... /
 * solid4 exactly.
 */
const BAR_CUTS = 4;
const GAP = STRIPE_PITCH - STRIPE_W;
const BAR_H = (BAR_CUTS - 1) * STRIPE_PITCH + STRIPE_W + 2 * GAP;

/** The first cut's centre for a bar whose top edge is `yTop`. */
const barFirst = (yTop = 0) => yTop + GAP + STRIPE_W / 2;

const GLYPHS = [
  // -- 01 . QUA ------------------------------------------------------------
  [
    // Q - a circle whose bottom-right quadrant is squared off; that corner is
    // the tail. Diagonal band across the middle.
    {
      shape: 'M90 30 A65 65 0 0 0 25 95 A65 65 0 0 0 90 160 H155 V95 A65 65 0 0 0 90 30 Z',
      stripes: diag(-45, 9, 1),
    },
    // U - a shield: flat top, straight sides, half-round foot. Band upper right.
    {
      shape: 'M175 30 H305 V95 A65 65 0 0 1 175 95 Z',
      stripes: diag(215, 9, 1),
    },
    // A - an arch: half-round head, straight sides, flat foot. Band lower left,
    // leaning the other way to the two letters before it.
    {
      shape: 'M325 160 V95 A65 65 0 0 1 455 95 V160 Z',
      stripes: diag(380, 9, -1),
    },
  ],

  // -- 02 . NT -------------------------------------------------------------
  [
    // N - two stems and a leaning bar, as three subpaths that union under the
    // default nonzero fill rule (all three are wound clockwise).
    {
      shape: 'M100 30 H140 V160 H100 Z M140 30 H180 L230 160 H190 Z M190 30 H230 V160 H190 Z',
      stripes: diag(155, 9, -1),
    },
    // T - a head bar and a stem. The cuts run on through where the two overlap,
    // which is what the reference does.
    {
      shape: `M250 30 H380 V${TOP + BAR_H} H250 Z M293 30 H337 V160 H293 Z`,
      stripes: horiz(250, 380, barFirst(TOP), BAR_CUTS),
    },
  ],

  // -- 03 . IVO ------------------------------------------------------------
  [
    // I - a serifed bar: two banded slabs with a solid stem between. Both slabs
    // are BAR_H, the same as T's head, so all three striped bars on the page
    // share one rhythm right out to their edges.
    {
      shape:
        `M25 30 H155 V${TOP + BAR_H} H25 Z ` +
        `M68 ${TOP + BAR_H} H112 V${BOT - BAR_H} H68 Z ` +
        `M25 ${BOT - BAR_H} H155 V160 H25 Z`,
      stripes:
        horiz(25, 155, barFirst(TOP), BAR_CUTS) + ' ' + horiz(25, 155, barFirst(BOT - BAR_H), BAR_CUTS),
    },
    // V - a pentagon: flat top, straight sides, point at the foot.
    {
      shape: 'M175 30 H305 V105 L240 160 L175 105 Z',
      stripes: diag(105, 7, 1),
    },
    // O - a plain disc with a band straight across its middle.
    {
      shape: 'M325 95 A65 65 0 1 0 455 95 A65 65 0 1 0 325 95 Z',
      stripes: diag(255, 9, 1),
    },
  ],
];
/* glyph-data-end */

const EASE = 'cubic-bezier(.22,1,.36,1)';

export function AboutCardGlyph({ index, on }: { index: number; on: boolean }) {
  const shapeId = `qv-about-glyph-${index}`;
  const gradId = `qv-about-glyph-grad-${index}`;
  // Every card draws the whole word; `index` only decides which slice shows.
  const offset = index === 0 ? '0' : `calc(${-index} * (100% + ${CARD_GAP}))`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        // As wide as the whole row — three cards and both gaps — then pulled
        // left by this card's share of it. `%` resolves against the card, so
        // 300% + 2 gaps IS the row, exactly, at every viewport. The card's own
        // overflow does the cutting.
        //
        // `right` must stay auto: setting left, right AND width over-constrains
        // an absolutely positioned box and one of them is simply dropped.
        left: offset,
        right: 'auto',
        width: `calc(300% + 2 * ${CARD_GAP})`,
        bottom: '0',
        // Height follows the art, so the wordmark always scales to the row's
        // full width. That makes the scale WIDTH-driven, and the letters
        // therefore resize with the card on hover — the flex split is 1/1/3
        // rather than proportional, so it is small: the hovered card reaches
        // 132% while its own wordmark is already fading out, and its two
        // siblings settle at 84%.
        aspectRatio: `${ROW_W} / ${BOX}`,
        pointerEvents: 'none',
        // Fades and drops as the copy rises, on the copy's own easing, so the
        // two are one gesture rather than two effects.
        opacity: on ? 0 : 1,
        transform: on ? 'translateY(20px)' : 'none',
        transition: `opacity .38s ${EASE}, transform .55s ${EASE}`,
      }}
    >
      <svg
        width="100%"
        height="100%"
        // y starts at TOP and is exactly BOX tall, so the letters' own cap line
        // and baseline ARE the box's top and bottom edges — which is what puts
        // their feet flat on the card's bottom edge. The 30 units of slack the
        // design space carried above and below are simply not shown.
        viewBox={`0 ${TOP} ${ROW_W} ${BOX}`}
        preserveAspectRatio="xMidYMax meet"
        focusable="false"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--a)" />
            <stop offset="1" stopColor="var(--b)" />
          </linearGradient>

          {/* One mask per letter: the silhouette in white, the stripes stroked
              black over it. The masks live OUTSIDE the <g> below on purpose —
              a mask inside it would be duplicated, id and all, by each of the
              two <use> copies. `butt` caps stop the stripes rounding off where
              they leave the shape. */}
          {GLYPHS.flatMap((group, g) =>
            group.map((l, i) => (
              <mask
                key={`${g}-${i}`}
                id={`${shapeId}-m${g}-${i}`}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={VB_W}
                height={VB_H}
              >
                <path d={l.shape} fill="#fff" />
                <path d={l.stripes} fill="none" stroke="#000" strokeWidth={STRIPE_W} strokeLinecap="butt" />
              </mask>
            ))
          )}

          {/* No fill is set here, on purpose. `fill` is an inherited property,
              so leaving it off lets each <use> below supply it — which is what
              lets the hover copy paint with the gradient paint server,
              something `currentColor` cannot express. */}
          {/* The masks are userSpaceOnUse, so they are read in whatever user
              space the referencing rect sits in — which means each group's
              translate carries its masks along with it, and the letters need no
              new coordinates of their own. */}
          <g id={shapeId} stroke="none">
            {GLYPHS.map((group, g) => (
              <g key={g} transform={`translate(${GROUP_DX[g]} 0)`}>
                {group.map((l, i) => (
                  <rect key={i} x="0" y="0" width={VB_W} height={VB_H} mask={`url(#${shapeId}-m${g}-${i})`} />
                ))}
              </g>
            ))}
          </g>
        </defs>

        {/* Two copies cross-fading: a flat colour and a gradient cannot be
            interpolated on one element, so this is the same two-layer trick
            the insights cards use for their hover wash.

            Held well down at rest — a wordmark of this mass at full strength
            competes with the card title instead of sitting behind it.
            var(--mute) re-scopes for the light theme, so one value serves both
            schemes. */}
        <use
          href={`#${shapeId}`}
          fill="var(--mute)"
          style={{ opacity: on ? 0 : 0.12, transition: 'opacity .2s linear' }}
        />
        <use
          href={`#${shapeId}`}
          fill={`url(#${gradId})`}
          style={{ opacity: on ? 0.34 : 0, transition: 'opacity .2s linear' }}
        />
      </svg>
    </div>
  );
}
