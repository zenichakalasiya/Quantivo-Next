# Handoff — 2026-09-17 22:14

## Read first

In `CLAUDE.md`:
- **"The about page rebuild"** — the new paragraphs on how the Vision / Mission /
  Why stack's geometry is *measured*, and why (lesson **18**). Don't replace that
  measurement with hard-coded pixels.
- **"Conventions"** — two new rules: the `data-cursor-tone="light"` cursor option,
  and *no interaction hints in section headings*.
- The Architecture note near the top was stale (it still said `/contact` was a
  port); it now reflects that every route is a redesign.

## What we worked on this session

Fixed the About page's Vision / Mission / Why scroll so the third section behaves
like the first two, then two site-wide polish requests: a light cursor pill over
the About circles, and removing every "Hover a card"-style hint from section
headings.

## Completed

- **Why Quantivo now sticks under Mission's title**, and all three sections leave
  the screen together (`src/components/about/WhatWeDo.tsx`).
  - Cause, measured by stepping the scroll 100px at a time: the last section had
    zero runway (sticky can't hold the last child of its parent), so it scrolled
    straight past its 270px line and over Mission's title; and the three sections
    — 323 / 323 / 392px tall — released at different scroll positions on the way
    out.
  - Fix: `layout()` + a ResizeObserver measure each title and body, then set a
    runway spacer after the last section, an invisible extension on each
    section's sticky box (next section pulled up over it) so all release
    together, and the stacking offset from the measured title row (80.5px, it had
    been hard-coded at 82).
  - Verified: Why holds at Mission's line + one title-height, no title is ever
    covered, all three move out in step with constant gaps; resting layout
    unchanged.
- **Hairline tick beside each divider fixed** — the column edge lands on a
  fractional pixel, so the text underneath showed through the anti-aliased edge.
  A 3px `boxShadow` ring of page background on each section covers it.
- **Arrows removed** from the right of the Vision / Mission / Why titles.
- **Light cursor pill over the About circles** — the circles flip to the brand
  gradient, and the pill was the same gradient. Opt-in `data-cursor-tone="light"`
  (small addition to `_initCursor` in vendored `motion.js`, plus CSS in
  `globals.css`) makes it white with gradient text. Checked in the browser.
- **Eight heading hint labels removed**: About ("Hover a card", "Hover to
  explore", "Hover to read"), Home ("Hover a card", "Drag to browse", "Keep
  scrolling — five steps"), Work ("Hover for detail"), Insights ("Hover a card to
  see its cover").
- All committed and deployed (`89c5b4b`, `bee2ec3`).

## In progress

Nothing mid-flight.

## Next steps

1. **Delete the dead footer files** (carried over from the previous handoff, still
   true): `src/components/SiteFooter.tsx` and
   `src/components/qreveal/SplitWordmark.tsx` are unused since the shared-footer
   change. (`QuantivoLogoFooter.tsx` is already gone.) Confirm with a grep for
   imports first.
2. **Replace the placeholder content** — unchanged, in priority order:
   `public/img/before/*` (fabricated before-shots on /services), `ARTICLES` (all
   invented), `HOME_TESTIMONIALS` (invented ratings and dates), `WORK` (4 of 10
   projects invented), `HOME_TEAM` / `TEAM`, `STATS`, `ABOUT_VMW[].points`.
3. **Per-service and per-article routes** — `DETAIL[].paras` is unused since the
   services rebuild, and every insights `Read` control goes to `/contact`.
4. **Renumber the home section eyebrows** — still stale since the section
   reorder (Services `04` sits third, Work `06` fourth, Testimonials `05` eighth).
5. From the previous handoff: keep an eye on the hero slider's autoplay speed in
   a clean tab — once seen cycling faster than `AUTOPLAY_MS`, not reproduced.

## Decisions made

- **Measure the sticky stack instead of styling it.** Section heights depend on
  copy, font loading and viewport height (the title padding is vh-based), so any
  constant is wrong somewhere. A ResizeObserver keeps it right as copy changes.
- **Release all three sections together** rather than letting sticky's default
  per-height release run — a staggered exit re-creates the overlap bug on the
  way out.
- **Cursor tone is opt-in per element**, not automatic. Only elements that turn
  the brand gradient under the pointer need it; everywhere else the gradient pill
  is still the right look.
- **Kept the placeholder notices** ("Sample articles — editorial copy to be
  supplied", "Placeholder figures", "Dummy copy") while removing hint labels:
  they flag fake content rather than explain an interaction. Also kept the
  before/after "Click to see" disc (it *is* the control) and `/q-reveal` (an
  unlinked test page).

## Gotchas & notes

- **Find sticky bugs by stepping the scroll and logging `top`**, not by
  screenshots. `scrollTo(base + d)` in 100px steps and print each row's
  `getBoundingClientRect().top` — "never stopped at its line" and "released
  early" are obvious in the numbers and invisible in a single frame.
- **Set `document.documentElement.style.scrollBehavior = 'auto'` before
  programmatic scrolling in tests** — the site now has smooth scroll on `html`,
  which makes `scrollTo` animate and measurements land mid-scroll.
- **The renderer wedges constantly** under CDP on this site: long measurement
  loops and `computer` screenshots/zooms time out. Keep JS probes short, open a
  fresh tab when it freezes, and use real wheel `scroll` actions — screenshots
  taken right after a wheel scroll were the reliable ones this session.
- **Hover a circle twice** when testing: the first `hover` often lands before the
  page settles and never fires `pointermove`, leaving the cursor pill stale.
- **The follow-cursor lags the pointer by design** (eased), so a zoom right after
  a hover can catch the pill mid-travel or already moved on.
