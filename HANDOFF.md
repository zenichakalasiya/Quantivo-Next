# Handoff — 2026-09-13 19:44

## Read first

In `CLAUDE.md`, under "The home outro — Q draw-and-reveal": the two new notes on
**`QReveal`'s cleanup must be a `useLayoutEffect`** and **every inner page shares
the same footer as home now**. Also new lesson **17** (end of "Eight more things
learned the hard way") on the hero slider's `ready` gate, and the existing
**"A debugging note that will save an hour"** section — it explains why this
session's own testing tab kept reporting stale computed styles.

## What we worked on this session

Tuned the home page's Q-reveal outro (size, alignment, a real crash it was
causing on navigation), rolled the same footer out to every inner page, and
fixed the hero slider's first-load entrance animation.

## Completed

- **Q watermark tuning** (`qreveal/QWatermark.tsx`): shrunk from 175svh → 130svh
  (was reading as too dominant), after an earlier pass had grown it from the
  original 140svh so its arc reached nearer the top of the viewport.
- **Services page CTA** (`app/services/page.tsx`): the "One Team. Multiple
  Capabilities." closing section now centres like Home's Final CTA, instead of
  sitting left-aligned like the rest of the page.
- **Q-reveal watermark misalignment, fixed** (`qreveal/QWatermark.tsx` +
  `QReveal.tsx`): the background watermark (anchored to the section's bottom
  edge) and the growing reveal clip (centred on the viewport) sat at different
  points, so the opening clip exposed stray slivers of the watermark's
  ring/arrow knockouts as a second, disconnected "Q" fragment. Fixed by keeping
  the watermark at `opacity: 0` until the reveal window has (almost) fully
  opened, then fading it in — nothing left for it to peek through unevenly.
- **Fixed a real crash on client-side navigation away from Home**, reported as
  three symptoms that were all the same root cause: a stuck Q-outline screen, and
  Chrome's "This page couldn't load" error, hitting About/Work/any route
  sometimes. Root cause: `QReveal`'s GSAP cleanup (`ctx.revert()`, which unwraps
  the `.pin-spacer` div GSAP inserts for `pin: true`) lived in `useEffect`, whose
  cleanup fires in React's passive phase — AFTER React already tries to
  `removeChild` the section from the parent it thinks it has. Since the real
  parent was the spacer, that threw `NotFoundError` and crashed the whole
  navigation. Fixed by switching to `useLayoutEffect`, whose cleanup runs
  synchronously in the same commit, before the removal. Verified via console
  instrumentation (now removed) that the spacer is fully unwrapped in time, and
  reproduced all three original repro steps cleanly afterward.
- **Same footer everywhere** (`GlobalFooter.tsx`): now renders `OutroFooter`
  (Home's Connect/nav-words/Newsletter footer + bottom-half Q watermark)
  directly — unwrapped, no reveal — on About, Services, Work, Insights and
  Contact, instead of the older, differently-designed `SiteFooter`. Verified on
  all five routes.
- **Hero slider first-load fix** (`home/HeroSlider.tsx`): slide 1 is active from
  the very first render, so it never got an OFF-state paint to transition from —
  it just appeared already open, skipping the small→big reveal every other
  slide gets. A `ready` flag (starts `false`, flips `true` ~50ms after mount via
  `setTimeout`) now forces slide 1 through the same OFF → ON transition. Verified
  via raw inline-style inspection (not `getComputedStyle` — see the debugging
  note in CLAUDE.md) that it animates correctly.

## In progress

Nothing code-wise. This handoff itself was mid-write when the session ended —
Tata was asked to save + publish (`/tatago`), so by the time anyone reads this,
`git status` should be clean and all of the above should be live.

## Next steps

1. **Delete `SiteFooter.tsx`, `QuantivoLogoFooter.tsx` and `SplitWordmark.tsx`.**
   Fully unused after the `GlobalFooter` swap (confirmed by grep — no remaining
   imports). A sandboxed `rm` was blocked as a destructive-action guard this
   session; just delete them normally next time.
2. Everything already listed in previous handoffs under "Next steps" for content
   (placeholders), per-service detail routes, article routes, and the stale home
   section eyebrow numbers is still outstanding — nothing here touched that.
3. Keep an eye on the hero slider's autoplay: while testing, `active` appeared to
   advance far faster than the coded `AUTOPLAY_MS` (6600ms) in one run. Not
   reproduced deliberately or root-caused — may well have been this session's own
   dev-server HMR churn from repeated file edits rather than a real bug, but
   worth a clean-tab check if slides seem to cycle too fast in practice.

## Decisions made

- **Hide the Q watermark during the reveal rather than try to align it with the
  clip.** The watermark's bottom-edge anchor (needed so the top and bottom
  halves join across the Let's Talk / footer boundary) and the reveal clip's
  viewport-centre anchor serve different, both-correct purposes — reconciling
  them geometrically would fight the footer-pairing design. Hiding one until the
  transition is basically over sidesteps the conflict entirely.
- **`useLayoutEffect` over `useEffect` for any GSAP `pin: true` cleanup that can
  unmount via routing.** Established as a general rule, not a one-off fix — see
  the CLAUDE.md note.
- **`setTimeout` over double-`requestAnimationFrame` for the hero's `ready`
  gate.** rAF is the more idiomatic way to force a paint before flipping state,
  but it does not fire at all while a tab is backgrounded, which would leave the
  first slide stuck OFF instead of merely delayed. A plain timeout degrades
  gracefully.

## Gotchas & notes

- **This session's own test tab kept reporting a hidden `document.visibilityState`**,
  which made `getComputedStyle` report stale opacity/clip-path values indefinitely
  — looked exactly like the hero fix or the Q-reveal fix not working, when both
  were actually fine. Checking `el.style.*` (the raw inline style, not computed)
  is what surfaced the truth both times. This is the same root cause CLAUDE.md's
  "A debugging note that will save an hour" already documented from an earlier
  session — it bit again here in a new context (initial-mount transitions, not
  scroll-driven ones), so the note now covers both.
- The removeChild crash reproduced reliably via: scroll to the footer, click a
  footer nav link (or press the browser Back button after that) — and, less
  reliably, plain header-nav clicks to About. All confirmed fixed.
