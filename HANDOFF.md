# Handoff — 2026-09-13 00:02

## Read first

`CLAUDE.md` in this directory, especially two new sections:

- **"The home page redesign"** — the section order, what each rebuilt section
  does, and the five mechanics that took real debugging to get right.
- **"Placeholder content — do not ship in front of a client"** — the most
  important thing on this page right now.

Also worth reading before touching anything animated: **"A debugging note that
will save an hour"** at the bottom of `CLAUDE.md`.

## What we worked on this session

Redesigned the home page section by section against client reference images
(Klarna, KOTA, wearebulletproof), and reordered the page to the client's running
order. Everything was built, verified in the browser, committed and deployed
section by section — the live site is current.

## Completed

- **Hero** → `HeroSlider.tsx`. Clip-path aperture slider, 3 slides. Copy wipes in
  left→right per line (staggered 0/95/190/285ms), image opens small→big at 560ms.
  The three.js card drum, the old `Hero.tsx` and the `three` dependency are gone.
- **About** → `AboutTeaser.tsx`. Three columns (paragraph / stacked wordmark /
  image + copy + CTA), no card, `02 — About` + "About Us." heading, "Trusted by"
  strip stripped of its box. Fits one screen.
- **Services** → `ServicesShowcase.tsx`. Sticky card deck of the four capability
  groups, theme-aware dark cards, per-card image opening left→right.
- **Work** → `WorkRail.tsx`. Two opposed marquees, hover pauses the row and
  expands the tile Klarna-style with year, description and a CTA.
- **Team** → `TeamCards.tsx` (new section). Three cards, greyscale→colour on a
  soft 14° cross-fade turn, full-width row, square crop.
- **Testimonials** → `Testimonials.tsx`. Three-card ring carousel, centre lit,
  dots, autoplay pausing on hover.
- **Page reorder** in `src/app/page.tsx`; `Pillars` and `Ticker` deleted.
- New data in `src/data/content.ts`: `HERO_SLIDES`, `SERVICE_CARDS`, `HOME_TEAM`,
  `HOME_TESTIMONIALS`, plus an `img` field on every `WORK` entry.

## In progress

Nothing mid-flight. Working tree is clean, `main` is pushed, Pages deploy green.

## Next steps

1. **Replace the placeholder content** — see the table in `CLAUDE.md`. The
   testimonial star ratings and dates are the urgent one: they were invented to
   match the reference card and read as verified reviews.
2. **Renumber the section eyebrows.** The reorder left them stale — Services says
   `04` but is 3rd, Work says `06` but is 4th, Testimonials says `05` but is 8th.
   Only About (`02`) is correct. Team and Numbers have no eyebrow at all.
   (Offered twice; the client has not asked for it yet.)
3. Continue section-by-section redesign if more references arrive. Per the last
   instruction image, **Process and Insights stay as they are**.
4. Optional, carried from earlier: decide whether to keep the `/q-reveal` route,
   and whether to apply the white-arrow logo fix to the original V4 site.

## Decisions made

- **Home is no longer a port.** The other five routes still mirror
  `Quantivo.dc.html`; `/` does not. Recorded at the top of `CLAUDE.md` so nobody
  "fixes" the home page back toward the original.
- **Services and Process are exempt from the one-screen rule.** Both are
  scroll-driven — the Services deck is ~4.8 screens and the Process rail ~3.9.
  The height *is* the animation; compressing them would mean redesigning them.
  Every other section is now at or under ~1.05 screens.
- **Sticky over GSAP pinning for the card deck.** KOTA pins with GSAP plus a
  smooth-scroll proxy; CSS sticky gets the same result with less machinery and
  cannot drift out of sync, since no JS decides where a card sits.
- **Four capability groups, not four individual services**, for the Services
  cards — each already carries a sub-service list that maps onto the reference's
  pill tags, and there is one `q-cat-*` image per group.

## Gotchas & notes

- **The renderer wedges regularly** when driving this page over CDP — screenshots
  and scrolls start timing out. A fresh tab clears it. The original V4 site does
  it too, so it is inherited.
- **A backgrounded tab pauses rAF**, freezing every CSS transition at t=0 and
  making computed style disagree with inline style forever. This cost real time
  early on: it looks exactly like a stuck animation. Verify with screenshots.
- **Shell escaping mangles template literals.** Several `node -e` edits silently
  produced `` maxWidth: `px` `` — and TypeScript accepted it, because `'px'` is a
  valid string. Use the Edit tool for anything containing backticks or `${}`.
- `HOME_SERVICES` is now unused (the old three-column track was its only
  consumer). Left in place deliberately, in case those three services are wanted
  elsewhere.
- `_initSvcTrack` in `src/vendor/motion.js` is now a no-op — it bails when
  `[data-svc-col]` is absent, and the rebuilt Services section no longer emits
  that attribute. Harmless, but it is dead weight if you are ever pruning.
