# Handoff — 2026-09-13 16:27

## Read first

In `CLAUDE.md`: **"The services page rebuild"** (new this session) and
**"The insights page rebuild"**, then the **"Eight more things learned the hard
way"** list — lessons 14, 15 and 16 all came out of these two pages.

Then **"Placeholder content — do not ship in front of a client"**. It grew again:
`public/img/before/*` are fabricated, on top of the ten invented articles, the
testimonials' invented ratings, the invented work projects and the team.

## What we worked on this session

Rebuilt the **insights page** and the **services page**, then a run of type-size
fixes across the site. Services was built against a live reference
(marino.co.uk/services) rather than a static frame — eight full-width rows whose
picture opens from the left on hover, plus a latest-work section where clicking a
card swaps the finished work for a "before".

## Completed

- **`/blog` rebuilt** — featured lead article (`FeaturedInsight.tsx`) over a
  nine-card gallery (`InsightCard.tsx`), three to a row. The card's cover fills
  the whole card behind an opaque panel; on hover the panel cross-fades out and a
  left-to-right wash fades in, so the picture is uncovered and dissolves into the
  copy with no panel edge left. `--ins-wash` is theme-scoped.
- **`ARTICLES` extended** to ten entries with `cat` / `read` / `posted` /
  `author`, so the home rail and mega-menu keep working unchanged.
- **`/services` rebuilt** — hero (copy left, picture right), the eight services
  as rows, latest work, CTA.
  - `ServiceRow.tsx` — hover opens a picture from the left by animating its own
    width from 0; the copy is a flex sibling so it is pushed across by exactly
    that much. Description swaps from the blurb to the capability list. Both
    descriptions share one grid cell so the row height never jumps.
  - `BeforeAfterCard.tsx` — click to swap finished work ↔ before, with a disc
    tracking the pointer saying which state the click gives.
  - The `svc-*` anchor ids moved from the old sticky detail cards onto the rows.
    **Verified all eight still resolve** for the mega-menu.
  - `public/img/before/*` generated with sharp (desaturate, flatten contrast,
    lift blacks, blur) from each cover.
- **About Quantivo cards** — title up to the Vision heading's size then up again
  to `clamp(21px,2.15vw,33px)`, tracking added to everything set in Bebas in that
  section, revealed copy enlarged with real gaps between the groups. Hovered card
  grows to `3` and the height to `55vh` so it all still fits.
- **Type trims** — every hero heading down 8px (home, about, services, work,
  insights, contact); the services subtext down 4px. Both via
  `calc(Nvw - Xpx)` so the fluid term takes the cut too.
- All of it committed and deployed.

## In progress

Nothing mid-flight. The tree is clean and the live site matches it.

## Next steps

1. **Per-service detail routes.** The old `/services` sticky cards are gone, so
   `DETAIL[].paras` and the full capability lists are now unused — each row shows
   the first six items with "+N more" and links to `/contact`. Nothing was deleted
   from `content.ts`, but there is currently nowhere that shows a service's full
   write-up.
2. **Replace the placeholder content**, in priority order:
   - `public/img/before/*` — fabricated; the /services before/after is the one
     place on the site that makes a visual claim about client results.
   - `ARTICLES` — all ten written by Claude, not the client.
   - `HOME_TESTIMONIALS` — quotes, names, **and the invented star ratings and
     "N months ago" dates**, which read as verified reviews.
   - `WORK` — 4 of 10 projects invented, all 10 covers stock.
   - `HOME_TEAM` / `TEAM`, `STATS`, `ABOUT_VMW[].points`.
3. **Article routes for insights.** There are none, so every `Read` control on
   `/blog` goes to `/contact`. Fine as a placeholder, wrong once real articles
   exist.
4. **Renumber the home section eyebrows.** Still stale since the section reorder —
   Services says `04` but sits third, Work `06` but fourth, Testimonials `05` but
   eighth. Visible on the live site.
5. Decide whether `/q-reveal` stays, and apply the white-arrow logo fix to the
   original V4 site.

## Decisions made

- **The services picture opens by width, not by sliding in.** The copy is a flex
  sibling, so animating the picture's own width pushes the copy across by exactly
  as much as the picture occupies. One value drives both, and it cannot drift at
  different viewport widths the way a hand-synced translate would.
- **Both service descriptions live in one grid cell**, so the row's height is
  always the taller of the two and never jumps mid-hover.
- **The `svc-*` ids moved onto the rows** rather than being dropped, because the
  mega-menu links to them.
- **The insight card hover is two layers cross-fading on opacity**, not one
  element changing colour — a gradient and a flat colour cannot be interpolated,
  so a single `background` transition snaps instead of fading.
- **Before-images are faked from the afters** (user chose this over unrelated
  stock or blank panels): same photograph, processed two ways, so it reads as one
  thing improved rather than two unrelated pictures.
- **Bebas kept for the service titles at the reference's 53px** rather than
  switching to Manrope to match the reference's look — consistency with every
  other page won.

## Gotchas & notes

- **`calc(Nvw - Xpx)` is the only way to actually shrink a heading.** Trimming
  the clamp's min/max alone changes nothing at normal viewport widths, because
  the `vw` term is what the clamp resolves to. Verified both times by reading
  `getComputedStyle().fontSize` before and after.
- **The overflow guard hides bugs.** `AboutCards`' body column has
  `overflow-y: auto` so copy can never be silently cut — which means overflow
  shows up as a *scrollbar*, not an error. Measure `scrollHeight - clientHeight`.
- **Measuring a hover state is awkward.** A synthetic `mouseover` does not fire
  React's `onMouseEnter` here, and a real hover is lost the moment the JS tool
  runs. Force the layout instead: override `style.flex`, kill the transition,
  wait a frame, measure.
- **The renderer wedges** when driving this site over CDP, especially on a heavy
  measurement loop. A fresh tab recovers it.
- **A backgrounded tab pauses rAF**, so transitions freeze at t=0 and computed
  style disagrees with the inline style forever. Screenshots are the trustworthy
  check.
- **`.jfif` reference files are not read as images** — convert them with the
  `sharp` already in `node_modules`, which is also how to downscale anything over
  256KB and how `public/img/before/*` were made.
- There is a client-facing **`Quantivo - Website Build Record.pdf`** in the
  original project folder (workflow + costing), plus its artifact version.
