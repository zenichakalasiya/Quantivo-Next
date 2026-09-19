# Handoff — 2026-09-19 15:20

## Read first

In `CLAUDE.md`:
- **"The About cards' QUANTIVO wordmark"** (under "The about page rebuild") — the
  whole design and the one trade-off it accepts.
- Lessons **19** (edge-to-edge vs. immunity to resizing — you cannot have both)
  and **20** (diagonal stripe spacing needs pitch × √2).

## What we worked on this session

One thing only: the striped **QUANTIVO wordmark** that now fills the empty
bottom of the three About cards. New component
`src/components/about/AboutCardGlyph.tsx`, mounted from `AboutCards.tsx`.

It went through about six design directions before landing — abstract geometric
glyphs, monoline letterforms, letters assembled from visible primitives, then
three different client reference alphabets. Only the last one shipped; the rest
are gone. **Don't re-propose the earlier ones**, they were each rejected on
sight.

## Completed

- **`AboutCardGlyph.tsx`** — one wordmark spanning all three cards, sliced by
  the card edges so A and I break across the boundaries and the row reads as one
  continuous word.
  - Letters are solid shapes with stripes **cut out** via `<mask>`, per the
    client's reference sheet.
  - Stripe rhythm is two constants (`STRIPE_W`, `STRIPE_PITCH`); every cut and
    `BAR_H` derives from them.
  - Verified by measurement, not by eye: all 8 letters land on an exact 150
    advance and the word spans 0..1180 precisely.
- **`AboutCards.tsx`** — `position: relative` on the article, plus
  `<AboutCardGlyph index={i} on={on} />`. That is the only change to it.
- `tsc --noEmit` clean; checked in both dark and light themes.

## In progress

Nothing mid-flight. Both files are complete and the page renders.

## Next steps

1. **Look at it in a real browser.** Everything this session was verified by
   rasterising the component's own path data with `sharp` — accurate for
   artwork, sizing and both themes, but it does **not** show the hover
   transition, the gradient cross-fade, or real Bebas/Manrope. Nobody has seen
   this move.
2. **Decide on the hover resize.** The letters scale with the card
   (hovered 132%, siblings 84%). If the sibling shrink reads badly, the fix is
   one line: fade all three wordmarks whenever *any* card is open, so the resize
   happens under a fade.
3. **Mobile.** Cards stack full-width, so each shows a third of a wordmark three
   card-widths wide — abstract stripes, not a word. No fallback yet.
4. Carried over, untouched this session: delete the dead
   `src/components/SiteFooter.tsx` and `src/components/qreveal/SplitWordmark.tsx`;
   replace the placeholder content (`public/img/before/*`, `ARTICLES`,
   `HOME_TESTIMONIALS`, `WORK`, `HOME_TEAM`/`TEAM`, `STATS`); per-service and
   per-article routes; renumber the stale home section eyebrows.

## Decisions made

- **One wordmark across the row, not three per-card ones.** The `<svg>` is the
  full row width and each card is offset by its index; the cards' existing
  `overflow: hidden` does the cutting. This is what makes A and I slice across
  the boundaries.
- **The slicing geometry lives in CSS, not the viewBox.** The gap between two
  halves of a cut letter IS the real card gap at every viewport, because the
  same `clamp()` drives both. A gap baked into the viewBox would drift, since
  the gap-to-card ratio changes with width.
- **Edge-to-edge was chosen over immunity to the hover resize.** These are
  mutually exclusive (lesson 19). Measured the cost first: the flex split is
  1/1/3, not proportional, so siblings only drop to 84%.
- **Stripes are generated from one pitch, never written out.** The literal
  version had already drifted into two different rhythms.
- **Where the reference alphabet hurts legibility, legibility won.** It draws A
  as an arch and V as a round bowl, which in a word read as "n" and "u". Both
  are triangles with counters instead.

## Gotchas & notes

- **The bash heredoc/`node -e` layer eats backslashes and template literals.**
  Several edits silently produced empty `return ;` statements and broken regexes
  this session. For anything containing backticks or `\d`, use the Write tool or
  a plain `.js` file — don't inline it in a shell command.
- **Harnesses go stale silently.** `bounds.js` kept measuring on a 320-wide
  canvas after the component moved to 480, clipping every glyph and reporting a
  right margin of 0 — which looked like a real centring bug. All harnesses now
  read the canvas size and letter data out of the component itself.
- **The measurement scripts live outside the repo**, in this session's scratchpad
  (`glyphdata.js`, `glyph-preview.js`, `measure.js`). They are not committed. If
  this artwork needs changing again they are worth recreating — `measure.js`
  catches advance errors instantly.
- **A dev server was already running on :3000** for this project; starting a
  second one fails with "Another next dev server is already running".
- **Chrome/Edge automation was unavailable all session** — the Claude extension
  isn't installed in the Edge profile, so `list_connected_browsers` returns
  empty. Being signed into claude.ai is not sufficient.
