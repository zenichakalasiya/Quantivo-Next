**On session start:** If `HANDOFF.md` exists in this directory, read it before
anything else for the latest state of the work.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Quantivo Digital — Next.js port

Next.js 16 / React 19 / TypeScript port of the Quantivo Digital marketing site.

## Deployment
Repo: https://github.com/zenichakalasiya/Quantivo-Next
Live URL: https://zenichakalasiya.github.io/Quantivo-Next/

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `out/`.

**`NEXT_PUBLIC_BASE_PATH` in that workflow must equal the repo name** (`/Quantivo-Next`).
Next applies `basePath` to `next/image` and `next/link` only — raw asset strings in
inline styles go through `asset()` / `bgUrl()` in `src/lib/assets.ts` to pick it up.
Get this wrong and every image and chunk 404s under the Pages subpath.

`out/.nojekyll` is created in the workflow; without it Jekyll eats `_next/`.

## Where this came from

The ORIGINAL site lives in a separate local project (`Quantivo.dc.html`, deployed as
`zenichakalasiya/Quantivo-V4`). That file is a **Claude Design canvas document**
rendered by a generated runtime, `support.js`, which parses a template DSL and renders
it with React under the hood.

So this port swapped the authoring layer (template DSL → JSX) rather than migrating
frameworks. GSAP, ScrollTrigger and three.js came across at identical pinned versions.

## Architecture

- `src/app/globals.css` — the original's `<helmet><style>` block **byte-for-byte**
  (verified by diff), then a `PORTED PSEUDO-CLASSES` section at the bottom.
- `src/data/content.ts` — every content constant, copied verbatim from the source.
- `src/components/home/` — the home sections, in page order.
- `src/components/about/` — the about sections, in page order.
- `src/vendor/` — code deliberately NOT rewritten (see below).

**`/`, `/about` and `/work` are no longer ports.** All three have been redesigned
section by section against client reference images and sticky-note sketches — see
"The home page redesign", "The about page rebuild" and "The work page rebuild"
below. `Quantivo.dc.html` is still the source of truth for the remaining three
routes (`/services`, `/blog`, `/contact`), but do not "fix" the redesigned pages
back toward it.

### Vendored, not rewritten

Two files are copied near-verbatim so they are identical **by construction**.
(`quantivo-roller.js`, the three.js card drum, was a third — it and the `three`
dependency were deleted when the hero was redesigned.)

| File | Why |
| --- | --- |
| `image-slot.js` | Placeholder slots. Outside the Claude Design host `window.omelette` is absent, so it renders exactly the read-only placeholder the live site shows. |
| `motion.js` | `_animate` + all 7 `_init*`/`_*Off()` pairs. Mechanically transformed: methods → functions, `this._x` → the module-level `S` object, gsap/ScrollTrigger → imports. Dense, measurement-sensitive scroll code — rewriting it is where an animation port drifts. |

### Two traps that cost real debugging time

1. **Ported hover rules need `!important`.** The 16 `style-hover` / 3 `style-focus`
   attributes became CSS rules, but the elements carry the overridden property
   *inline*, and inline beats any selector. `support.js` ran every `style-<pseudo>`
   value through `importantify()` for exactly this reason. Drop the `!important`
   and the hover silently does nothing — it still looks fine in review.

2. **`reactStrictMode: false` is deliberate.** StrictMode double-invokes mount /
   unmount in dev, which runs the vendored custom elements' `connectedCallback` /
   `disconnectedCallback` twice and wedges `<image-slot>` in a ResizeObserver +
   subscription render loop. Production was never affected. Do not turn it back on
   without fixing the vendored elements first.

### Motion lifecycle

`MotionProvider` mirrors the original's split:
- `startGlobalMotion()` — cursor + scroll progress, once on mount.
- `runPageMotion()` — re-runs on every `pathname` change, because React replaces the
  DOM on navigation and every GSAP handle and measured offset dies with it.

### Routing and theming

Six real routes replace the original's hash-based `state.page`. Theme is
`document.documentElement.dataset.qv`, rendered `"dark"` server-side in `layout.tsx`
— the original never persisted the choice, so every load starting dark is faithful
*and* sidesteps any flash or hydration mismatch.

Fonts load via a plain `<link>`, not `next/font`: the CSS and ~700 inline styles
reference the literal families `Manrope` and `'Bebas Neue'`, and `next/font` would
hash those names and shift font-load timing (which perturbs scroll measurement).

## The home page redesign

`/` was rebuilt section by section from client reference images (Klarna, KOTA,
wearebulletproof). Section order is the client's, not the original document's:

    Hero → About → Services → Work → Process → Team → Numbers →
    Testimonials → Insights → FAQ → Let's Talk + Footer

Gone from the original: the hero + three.js card drum, the capability marquee,
and the "Four Things We Bring" pillars. New: `TeamCards`.

| Section | Component | Mechanic |
| --- | --- | --- |
| Hero | `HeroSlider.tsx` | clip-path aperture `inset(45%) → inset(0%)`, image never transformed. Copy wipes in left→right per line, staggered; media follows on a `transition-delay`. |
| About | `AboutTeaser.tsx` | Three columns, no card. Wordmark is SVG `<text textLength lengthAdjust="spacingAndGlyphs">` so all three words occupy the same width regardless of letter count. |
| Services | `ServicesShowcase.tsx` | Sticky card deck; each card sticks lower than the last, covered cards fade in place. Per-card image opens left→right. |
| Work | `WorkRail.tsx` | Two opposed marquees; hovering a tile pauses that row and expands it Klarna-style. |
| Team | `TeamCards.tsx` | Greyscale → colour on a soft 14° cross-fade turn. |
| Testimonials | `Testimonials.tsx` | Three-card ring; slot derived as `(i - active + n) % n`. |

### Five things learned the hard way here

1. **A sticky deck needs ONE shared container.** Giving each card its own
   `100svh` slot means every card unsticks the instant its slot ends — which
   lands exactly when the next card's top reaches the previous card's bottom.
   The cards meet edge to edge and never overlap, no matter how you tune it.

2. **A marquee that contains resizable children cannot use a `%` keyframe.**
   `qvMarquee` translates by `-50%`, which resolves against the track's own
   width — so the moment a hovered tile widens, the distance changes underneath
   the animation and the row jumps. Tween `x` to a measured pixel distance.

3. **Never let an animation's "from" state be the inline default.** If GSAP
   fails to load, or `prefers-reduced-motion` makes the effect return early, a
   clipped-to-nothing element stays invisible forever. Default to the VISIBLE
   state and let the tween apply the closed one.

4. **Don't reorder the DOM to rotate a carousel.** It restarts transitions,
   throws focus, and walks a screen reader through the items in a different
   order every cycle. Express rotation as transform + explicit `z-index`.

5. **Fading a covered card to near-zero destroys the depth.** A card you cannot
   see is not *behind* anything, it has just gone. Stop around `.3–.55` and give
   each card a small sticky offset so a sliver of its top edge stays visible.

## The about page rebuild

`/about` was rebuilt from a photographed sticky note plus reference frames. It
went from **12,792px over eight sections to ~6,400px over five**. Approach and
Global are gone; Journey and Team came back rebuilt.

    Hero → About Quantivo → What We Do → Our Journey → Our Team → Final CTA

| Section | Component | Mechanic |
| --- | --- | --- |
| About Quantivo | `AboutCards.tsx` | Three cards; hovering one animates `flex-grow` so the row's total width never changes. Fixed height. |
| What We Do | `WhatWeDo.tsx` | Four overlapping circles pinned beside the Vision/Mission/Why stack. Circles flip 180° at 260ms to show sub-services. |
| Our Journey | `JourneyTimeline.tsx` | Vertical 2021–2025 timeline, rows alternating either side of a rail that fills on scroll. |
| Our Team | `TeamMarquee.tsx` | Continuously scrolling cards; hover darkens the portrait bottom-up and reveals the quote. |

**Vision / Mission / Why is a stack, not an accordion.** Every section is always
expanded, and each sticks **as a whole** — title and body together — parked
`i * ROW_H` below the one above. Scrolling therefore never pushes a body behind
its own title; instead the next section rides up, opaque, covers the previous
body and leaves its title showing. The titles end up stacked and exactly one body
is visible. The opaque `var(--bg)` background is what makes the covering work.

**The four circles are a pinwheel**, each overlapping the next. See lesson 11 —
the cycle cannot be expressed with `z-index`, so the last circle is masked.

### Three more things learned here

6. **A sticky element needs a parent taller than itself.** `align-items` on the
   flex row decides this: the default `stretch` makes both columns the row's full
   height, so the sticky one already fills its parent and never travels. Use
   `flex-start` and let the other column's height create the runway.

7. **`grid-template-rows: 0fr → 1fr` is how you transition to auto height.**
   `height: auto` cannot be animated, and a fixed `max-height` has to be guessed —
   too small clips the longest panel, too large makes short ones ease with nothing
   moving. The inner wrapper needs `overflow: hidden` or content spills out of the
   collapsed row.

8. **A fixed-height card will silently eat a sentence.** Any card whose height is
   fixed to stop layout jump needs `overflow-y: auto` as a guard — it already
   clipped copy once here, invisibly, because nothing errors.

## The work page rebuild

`/work` was rebuilt from client reference frames. Two sections doing two
different jobs:

    Hero → Selected Work (10, two staggered columns) → All Projects (tabs + gallery) → CTA

| Part | Where | Mechanic |
| --- | --- | --- |
| Selected Work | `src/app/work/page.tsx` | Two **real flex columns**, odd-indexed projects on the right, right column dropped by `OFFSET`. A giant rotated "Selected Work" wordmark at `opacity: .09` down the left edge. |
| All Projects | same file | The original's category tabs over an `auto-fill` grid, `minmax(min(100%,300px),1fr)` — four per row, portrait `4 / 5` crops. |
| Both tiles | `src/components/work/ProjectCard.tsx` | Name below the image; year, description and tags appear on hover *over* the image, under a gradient rising from its foot. |

**The two columns are not a wrapping grid.** A grid fills row by row, so the right
column would always sit level with the left and the stagger would be impossible.

**The gallery repeating the featured projects is intentional** — the columns are
an editorial pick, the gallery is the filterable archive.

**A wider tile is a shorter tile.** Enlarging the gallery cards by widening the
grid track alone made the hover copy *worse*, because a wider `4 / 3` card has
less height for the text to sit in. The portrait `4 / 5` crop is what actually
fixed it.

## The header mega-menus

`src/components/nav/MegaMenu.tsx` + `src/lib/megaMenu.ts`, mounted from
`SiteHeader.tsx`. Services, Work and Insights each open a hover panel: entries
down the left, a card grid on the right that swaps as you move through them.
Entries pad to `CARDS_PER_VIEW = 6` so the grid never reflows between entries.
The header tracks ONE `openKey` with a `CLOSE_DELAY = 140`, so moving between two
triggers doesn't flicker the panel shut.

On hover a hairline runs around each card: two identical rounded rects, one
rotated 180° about its own centre (which maps a rect onto itself but moves the
path's start to the opposite corner), `pathLength="100"` so "half a lap" is
literally `50`.

## Five more things learned the hard way

9. **`stroke-dashoffset` slides a dash pattern; it does not hide it.** Setting
   the offset to the full length to "hide" a stroke just moves the dash one lap
   round — the stroke stays fully painted, which is why the menu cards showed a
   white outline at rest. To grow a stroke from nothing, animate
   `stroke-dasharray` from `0 100`. (And round line-caps paint a visible dot at
   zero length, so the cap has to go to `butt` while the length is zero.)

10. **A CSS keyframe overrides an inline starting value.** Two rails that should
    run half a lap apart cannot be offset with an inline `stroke-dashoffset` —
    the keyframe wins and the two segments drift apart. Use a negative
    `animation-delay`.

11. **z-index cannot express a cycle.** The four-circle pinwheel needs each
    circle over the next and under the previous, which no stacking order can
    satisfy. The last circle is carved instead, with a
    `mask-image: radial-gradient(ellipse …)`. Note that `calc()` is rejected
    inside a gradient radius and fails *silently* — express the radius in
    percentages.

12. **Sticky containing blocks, three ways to get it wrong.** A row wrapped in
    its own div sticks only within that div (use Fragments); sticking only a
    section's *header* lets its body scroll up behind its own title (stick the
    whole section); and a sticky element with no taller parent never travels at
    all (lesson 6). This was the single most repeated bug of the whole redesign.

13. **Measure, don't estimate, a stacking offset.** `ROW_H` in `WhatWeDo.tsx` is
    the pinned title-row height. Estimated at 72px it clipped every stacked
    title; measured, it is an 81px row plus a 1px divider — hence 82.

## The home outro — Q draw-and-reveal

Home ends with a scroll sequence modelled on wearebulletproof.com: the logo Q
draws itself, then opens onto the closing screens. Lives in `src/components/qreveal/`.

| File | Role |
| --- | --- |
| `QReveal.tsx` | Pinned, scrubbed timeline. 0–0.55 draws the outline via stroke-dashoffset; 0.55–1 opens the clip. |
| `QWatermark.tsx` | The oversized Q behind the outro, `half="top" \| "bottom"`. |
| `OutroScreen.tsx` | `OutroLetsTalk` + `OutroFooter`, two independent 100svh screens. |
| `HomeOutro.tsx` | Composes the three. |
| `src/lib/qmark.ts` | The Q path data + measured bbox, lifted from `Quantivo logo-05.svg`. |

**The reveal does not scale the panel.** It uses `clipPathUnits="userSpaceOnUse"`
and animates a transform on the clip PATH, so the content never moves and only
the window onto it opens. Scaling the panel would scale its text too — that is
the whole difference between this and a cheap zoom.

**The split Q is two halves, not one spanning element.** Each screen renders the
same letter at 200% of its own height with the centre pinned to the shared edge,
so each clips its own half and together they read as one continuous letter. That
is what lets both screens stay independently 100svh — a spanning wrapper would
force them to share one scroll container and the footer could never be full
screen.

**Watermark colour is theme-scoped** via `--q-wm` / `--q-wm-op` in `globals.css`.
It must sit DARKER than its surface in both schemes; dark mode needs ~.30 because
the ground is already near-black, light mode needs ~.05 or it becomes a grey slab.
One shared value cannot serve both.

**The arrow only survives because the ring is knocked out** in the section
background colour. A plain filled silhouette loses it, and a stroked outline at
that scale reads as busy linework competing with the copy — both were tried.

**`_killScroll()` must only kill its own triggers.** It originally did
`ScrollTrigger.getAll().forEach(t => t.kill())`, inherited from the source where
it was the only code creating ScrollTriggers. `runPageMotion()` fires ~80ms after
every route change, so a blanket kill silently destroys any scroll component
mounted alongside it — this is exactly what broke the Q reveal, with no error.

## Known, and inherited from the original

- The contact form posts nowhere.
- The 14 `<image-slot>`s are placeholders; there is no `.image-slots.state.json`.
- Scrolling deep into the Approach rail can wedge the renderer at high DPR — **the
  original does this too**, so it is inherited, not introduced.

## Placeholder content — do not ship in front of a client

The redesign surfaced placeholders that were previously buried. All of it needs
real content:

| Where | What is fake |
| --- | --- |
| `HOME_TEAM` | Names (`Name Surname`), photos (stock stand-ins — `/img` has no portraits), LinkedIn URLs (`#`). |
| `TEAM` | Same: names are `Name Surname`, and `img` is a stock stand-in. Drives the /about marquee, where six desk-and-crowd photographs stand in for six people — the weakest-looking placeholder on the site. |
| `HOME_TESTIMONIALS` | Quotes, names, **and the star ratings and "N months ago" dates, which were invented** — the old data had no such fields. A 5-star rating with a date reads as a verified review. |
| `WORK` | All 10 covers are stock stand-ins (every project originally pointed at an empty image slot), **and 4 of the 10 projects are invented** — Halden Interiors, Meridian Health, Orbit Beverages, Grove & Co — added to fill the work page's two columns of five. |
| `STATS` | Figures are placeholders (the section carries a visible chip saying so). |
| `ABOUT_VMW[].points` | Vision and Mission sub-point lines are written for the accordion; the old layout had no equivalent. The Why row's points are the real `WHY_US`. |

Everything else on `/about` is the client's own writing, moved rather than
rewritten — `ABOUT_CARDS`, the Vision/Mission bodies and `JOURNEY` all came from
the previous page verbatim.

## A debugging note that will save an hour

**A backgrounded tab pauses `requestAnimationFrame`**, so every CSS transition
freezes at t=0 and `getComputedStyle` disagrees with the inline style
indefinitely. This looks exactly like a stuck animation and is not one. Screenshots
force a paint, so they are the trustworthy check; computed-style probes are not.
Likewise, programmatic `scrollTo` does not drive ScrollTrigger the way a real
wheel event does.

## Conventions

Layout is inline `style={{}}` with `clamp()`; there are no CSS classes anywhere,
matching the original. Stateful styling is `[data-*]` attribute selectors in
`globals.css`. When porting more markup, keep every `data-*` hook — the motion layer
selects on them.
