# Handoff — 2026-09-13 15:35

## Read first

In `CLAUDE.md`: **"The insights page rebuild"** (new this session), and the
**"Seven more things learned the hard way"** list — lessons 14 and 15 are both
from this session and both cost real time.

Then **"Placeholder content — do not ship in front of a client"**. It grew again:
all ten insight articles are invented, on top of the testimonials, the work
projects and the team. That table is still the only thing standing between this
build and a client review.

## What we worked on this session

Rebuilt the **insights page** (`/blog`) from two client reference frames — a
featured lead article over a nine-card gallery whose hover uncovers the cover
image behind a left-to-right wash. Then enlarged the **About Quantivo** card type
and trimmed **every hero heading** by 8px.

## Completed

- **`/blog` rebuilt.** Hero → Most read → All insights (3 per row) → CTA.
  - `src/components/insights/FeaturedInsight.tsx` — picture left, copy right,
    category chip + read time, `Read →` control. Driven by `ARTICLES[0]`.
  - `src/components/insights/InsightCard.tsx` — the cover fills the whole card
    with an opaque panel over its left 64%, so only a strip of picture shows at
    rest.
- **The card hover.** The panel cross-fades out while a left-to-right wash fades
  in: near-solid where the copy starts, thinning across the column, gone by the
  right edge so it dissolves into the photograph with no panel edge or corner
  radius left. Verified in both themes.
- **`ARTICLES` extended** — now ten entries with `cat` / `read` / `posted` /
  `author` alongside the original fields, so the home rail and the mega-menu keep
  working unchanged.
- **`--ins-wash`** added to `globals.css`, theme-scoped, plus the
  `[data-insights-grid]` media queries that step 3 columns down to 2 and then 1.
- **About Quantivo cards** (`AboutCards.tsx`) — title up to the Vision heading's
  size, revealed copy enlarged (lead 14→17px, belief lines 13→21px, paragraphs
  13→16px) with real gaps between the three groups. The hovered card grows to `3`
  and the height to `55vh` so it all still fits.
- **Every hero heading down 8px** — home (`HeroSlider`), about, services, work,
  insights, contact.
- All of it committed and deployed.

## In progress

Nothing mid-flight. The tree is clean and the live site matches it.

## Next steps

1. **Replace the placeholder content.** Unchanged from last session except that
   it now includes the whole `ARTICLES` array. Priority order:
   - `ARTICLES` — all ten are written by Claude, not the client.
   - `HOME_TESTIMONIALS` — quotes, names, **and the invented star ratings and
     "N months ago" dates**, which read as verified reviews.
   - `WORK` — 4 of 10 projects invented, all 10 covers stock.
   - `HOME_TEAM` / `TEAM`, `STATS`, `ABOUT_VMW[].points`.
2. **Decide whether insights need individual article routes.** There are none, so
   every `Read` control on `/blog` currently goes to `/contact` rather than a dead
   link. Fine as a placeholder, wrong once real articles exist.
3. **Renumber the home section eyebrows.** Still stale since the section reorder —
   Services says `04` but sits third, Work `06` but fourth, Testimonials `05` but
   eighth. Visible on the live site.
4. Decide whether `/q-reveal` (the standalone test route) stays or goes.
5. Apply the white-arrow logo fix to the **original** V4 site — the two logos
   differ (documented at the bottom of the original project's `CLAUDE.md`).

## Decisions made

- **The insight card's hover is two layers, not one changing colour.** A gradient
  and a flat colour cannot be interpolated, so a single element transitioning
  `background` between them snaps instead of fading. Image / wash / flat panel /
  copy, with the two middle layers cross-fading on opacity.
- **The wash's stops are placed against the copy**, not spaced evenly — it must
  still be ~.76 opaque where the text column ends at 64%, and only fall away
  across the strip of picture beyond it.
- **Read time moved off the picture** into the panel beside the date. Over a light
  cover, white text with a shadow is still unreadable. Only the category chip
  stays out on the image, and it carries its own dark pill.
- **Heroes shrunk via `calc(Nvw - 8px)`**, not just the clamp bounds — at any
  normal viewport width the `vw` term is what the clamp resolves to, so trimming
  the bounds alone would have changed nothing.
- **The About card grew wider rather than the type staying small.** The bigger
  copy no longer fits the fixed height, and the fix is more width (fewer, longer
  lines), not less type.

## Gotchas & notes

- **The overflow guard hides bugs.** `AboutCards`' body column has
  `overflow-y: auto` so a copy change can never silently cut a sentence — but
  that means overflow shows up as a *scrollbar*, not as an error. Card 01 was
  overflowing by 36px and looked fine at a glance. Measure `scrollHeight -
  clientHeight`, don't eyeball it.
- **Measuring a hover state is awkward.** A synthetic `mouseover` does not
  trigger React's `onMouseEnter` here, and a real hover is lost the moment the JS
  tool runs. Force the layout instead — override `style.flex`, kill the
  transition, wait a frame, measure.
- **The renderer wedges** when driving this site over CDP, especially on a heavy
  measurement loop. A fresh tab recovers it. Inherited from the original V4 site.
- **A backgrounded tab pauses rAF**, so transitions freeze at t=0 and computed
  style disagrees with the inline style forever. Screenshots are the trustworthy
  check.
- **Reference images**: `.jfif` files are not read as images — convert them with
  the `sharp` already in `node_modules` (also the way to downscale anything over
  256KB).
- There is a client-facing **`Quantivo - Website Build Record.pdf`** in the
  original project folder (workflow + costing), plus its artifact version.
