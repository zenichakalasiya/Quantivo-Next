# Handoff — 2026-09-13 01:13

## Read first

`CLAUDE.md` in this directory:

- **"The about page rebuild"** — this session's work, plus three mechanics
  (numbered 6–8) that each cost real debugging.
- **"Placeholder content — do not ship in front of a client"** — still the most
  important thing on this project.
- **"A debugging note that will save an hour"** at the bottom, before touching
  anything animated.

## What we worked on this session

Rebuilt `/about` from a photographed sticky note and reference frames — the
client said the page "looks bad UI wise". It went from 12,792px over eight
sections to ~6,400px over five. Built, verified in the browser, committed and
deployed section by section; the live site is current.

## Completed

- **About Quantivo** → `AboutCards.tsx`. Three cards, one widening on hover.
  Later shrunk 570px → 410px; they were mostly empty at rest.
- **What We Do** → `WhatWeDo.tsx`. Started as two sections (circle cluster with a
  side detail panel, and a separate Vision/Mission/Why accordion), then merged at
  the client's direction: cluster pinned on the left, accordion scrolling past on
  the right, one heading. Circles now flip 180° at 260ms to show sub-services;
  the side panel is gone.
- **Our Journey** → `JourneyTimeline.tsx`. Vertical 2021–2025 timeline,
  alternating rows, rail fills on scroll. Driven by the existing `JOURNEY` data.
- **Our Team** → `TeamMarquee.tsx`. Continuously scrolling cards, hover darkens
  the portrait bottom-up and reveals the quote. Six people (the note said seven;
  client chose to use the six that exist).
- Approach and Global sections dropped. New data: `ABOUT_CARDS`, `ABOUT_VMW`, and
  an `img` field on `TEAM`.
- One media query added to `globals.css` for the Journey timeline — the only
  thing on this project that inline styles cannot express.

## In progress

Nothing mid-flight. Working tree clean, `main` pushed, Pages deploy green.

## Next steps

1. **Replace the placeholder content** — see the table in `CLAUDE.md`. Two are
   worse than the rest: the invented testimonial star ratings and dates, and the
   /about team marquee, where six stock photographs of desks and crowds stand in
   for six people at large size.
2. **Renumber the home page section eyebrows.** Still stale from the reorder two
   sessions ago — Services says `04` but is 3rd, Work `06` but is 4th,
   Testimonials `05` but is 8th. Offered three times; never asked for.
3. Continue section-by-section redesign if more references arrive. Per earlier
   instructions, home Process and Insights stay as they are.
4. Optional: decide whether to keep the `/q-reveal` route, and whether to apply
   the white-arrow logo fix to the original V4 site.

## Decisions made

- **Merged What We Do with Vision/Mission/Why** rather than keeping two sections.
  The circle detail panel moved onto the back of the circles, which freed the
  right half of the row for the accordion.
- **Circles flip properly (180°, 260ms)**, unlike the home team cards' soft 14°
  turn — the brief asked for something instant, and the two effects are meant to
  read differently.
- **The circle back carries the sub-service list only**, not the lead line. That
  line ends in a colon introducing the list, so the list alone reads complete —
  and a paragraph does not fit the usable middle of a circle at any readable size.
- **Six team members, not the note's seven.** `TEAM` already had six with a role
  and quote each, and the marquee works at any count.
- **`position: sticky` over a JS pin** for the circle cluster, consistent with the
  home Services deck.

## Gotchas & notes

- **A sticky element needs a parent taller than itself.** `align-items: stretch`
  (the flex default) makes both columns the row's full height, so the sticky one
  already fills its parent and never travels. `flex-start` is what gives it a
  runway — 194px here, from the accordion column.
- **A fixed-height card silently ate a sentence.** Card 02 clipped its last
  paragraph with no error and nothing visibly broken. Any fixed-height card needs
  `overflow-y: auto` as a guard.
- **Shell escaping keeps biting.** `content.ts` stores `’` as literal text,
  so a `node -e` script matching the real apostrophe found nothing; and an earlier
  script produced `` maxWidth: `px` `` which TypeScript accepted, because `'px'`
  is a valid string. Use the Edit tool for anything with backticks, `${}` or
  escapes.
- **The renderer wedges regularly** when driving this site over CDP, and reading
  the very large client reference PNGs is the worst offender — decode them with
  `createImageBitmap(blob, {resizeWidth})` rather than an `<img>` at full size,
  and expect to open a fresh tab when screenshots start timing out.
- `ABOUT_STEPS`, `JOURNEY`'s `left` field and `HOME_SERVICES` are unused data,
  left in place deliberately. `_initVM`, `_initTeam` and `_initYearRail` in
  `src/vendor/motion.js` are now no-ops — each bails when its root attribute is
  absent.
