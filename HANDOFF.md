# Handoff — 2026-09-13 14:38

## Read first

In `CLAUDE.md`: **"The work page rebuild"** and **"The header mega-menus"** (both
new this session), the **"Five more things learned the hard way"** list (lessons
9–13), and **"Placeholder content — do not ship in front of a client"**, which is
still the biggest thing standing between this build and a client review.

If you are touching anything that sticks, pins or stacks, read lesson 12 first.
It is the bug this project keeps making.

## What we worked on this session

Built the **work page** from scratch (staggered featured columns + a filterable
gallery), rewrote **What We Do** on `/about` from an accordion into a sticky
section stack with a four-circle pinwheel, added **hover mega-menus** to the
header for Services / Work / Insights, and worked through a long list of the
client's own fixes on `/` and `/about`.

## Completed

- **`/work` rebuilt** — hero, Selected Work (top 10 in two staggered flex
  columns, rotated wordmark behind them), All Projects (category tabs over an
  `auto-fill` grid), CTA. `src/app/work/page.tsx`.
- **`ProjectCard.tsx`** — shared by both sections. Name below the image; year,
  description and tags revealed on hover over the image under a gradient rising
  from its foot.
- **Gallery cards enlarged** — grid track min `250px → 300px` (4 per row,
  ~372×464) and the crop changed `4 / 3 → 4 / 5`, which is what actually made the
  hover copy readable. Hover text raised to `clamp(13.5px,1.05vw,17px)`.
- **`WhatWeDo.tsx` rewritten** — Vision / Mission / Why is now a stack of
  always-expanded sections, each sticking *as a whole* one title-height below the
  last, so an opened section stays put and the next arrives already open and
  parks below the previous title. Second divider removed.
- **The four circles** — bigger, cut on one side only, arranged as a pinwheel via
  a radial-gradient mask (z-index can't express the cycle). Flip text raised to
  `clamp(10px,.92vw,13px)`; all four services now sit on single lines.
- **Header mega-menus** — `src/components/nav/MegaMenu.tsx`, `src/lib/megaMenu.ts`,
  wired into `SiteHeader.tsx`. Cards carry a slow continuous hairline that runs
  around the edge on hover (7s, two segments half a lap apart) and **no outline at
  all at rest**.
- **Home fixes** — FAQ centred with less gap to the Q outro; Let's Talk card
  given contrast against the page and equal column heights; Work rail tiles
  enlarged to 5 per row; **Home removed from the nav**.
- **About fixes** — card titles forced onto one line; Final CTA centred and
  shrunk; a gap opened between the section title and the circles.
- Everything above is committed and deployed.

## In progress

Nothing mid-flight. The tree is clean and the live site matches it.

## Next steps

1. **Replace the placeholder content.** This is the only thing blocking a client
   review. In priority order:
   - `HOME_TESTIMONIALS` — the quotes, names, **and the invented star ratings and
     "N months ago" dates**. A 5-star rating with a date reads as a verified
     review and should not go live as fiction.
   - `WORK` — 4 of the 10 projects are invented (Halden Interiors, Meridian
     Health, Orbit Beverages, Grove & Co) and all 10 covers are stock.
   - `HOME_TEAM` / `TEAM` — names are `Name Surname`, photos are stock stand-ins,
     LinkedIn URLs are `#`.
   - `STATS` figures, and `ABOUT_VMW[].points`.
2. **Renumber the home section eyebrows.** They have been stale since the section
   reorder — Services says `04` but sits third, Work says `06` but sits fourth,
   Testimonials says `05` but sits eighth. Small job, currently visible on the
   live site.
3. Decide whether `/q-reveal` (the standalone test route) stays or goes.
4. Apply the white-arrow logo fix to the **original** V4 site — the two logos now
   differ (documented at the bottom of the original project's `CLAUDE.md`).

## Decisions made

- **Vision / Mission / Why: stack, not accordion.** The client asked that an open
  section stay open and the next arrive already open. A collapse state fought
  that, so it was removed entirely — every section is expanded and the *stacking*
  is what reveals them one at a time.
- **Stick the whole section, not just its header.** Sticking only the header made
  the body scroll up behind its own title, which is exactly the artefact the
  client reported.
- **The work gallery repeats the featured projects on purpose.** The columns are
  an editorial pick; the gallery is the filterable archive. Different jobs.
- **Two real flex columns on `/work`, not a grid.** A grid fills row by row, so
  the right column would always sit level with the left and the stagger would be
  impossible.
- **The menu card outline fades in with hover** rather than each stroke animating
  from zero — simpler, and the running animation is paused while invisible so it
  costs nothing.

## Gotchas & notes

- **`stroke-dashoffset` does not hide a stroke** — it slides the dash pattern one
  lap. That is why the menu cards showed a white outline with no hover. Grow
  `stroke-dasharray` from `0 100` instead, and watch the round line-caps, which
  paint a dot at zero length.
- **`calc()` inside a gradient radius is rejected silently.** The first attempt at
  the circle mask did nothing at all, with no error. Use percentages.
- **Don't edit source files with `node -e` from the shell.** It mangled code
  repeatedly this session — it produced a broken `maxWidth` value that tsc
  happily accepted, and it broke JSX closing tags. Use the Edit/Write tools, or
  write a script to a file and run that. Note that `content.ts` stores curly
  quotes as literal escape text, which the shell will happily destroy.
- **Measure, don't estimate.** `ROW_H = 82` in `WhatWeDo.tsx` is a measured
  value. The estimate (72) clipped every stacked title.
- **A backgrounded tab pauses rAF**, so transitions freeze at t=0 and computed
  style disagrees with the inline style forever. This looks exactly like a stuck
  animation and is not one — screenshots are the trustworthy check.
- The renderer can still wedge when driving the site over CDP; a fresh tab
  recovers it. Inherited from the original V4 site, not introduced here.
- There is also a client-facing **`Quantivo - Website Build Record.pdf`** in the
  original project folder (workflow + costing), plus its artifact version.
