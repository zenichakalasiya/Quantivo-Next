# Handoff — 2026-09-12 19:02

## Read first

`CLAUDE.md` in this folder — especially **"The home outro — Q draw-and-reveal"**
(the newest work) and **"Two traps that cost real debugging time"**. Both record
failure modes that produce *no error message*, so they are very hard to rediscover.

## What we worked on this session

Converted the whole Quantivo site from the Claude Design canvas document
(`Quantivo.dc.html`) to Next.js, published it live, then designed and built a
scroll sequence for the home page ending: the logo Q draws itself and opens onto
the Let's Talk screen and a full-screen footer.

## Completed

- **Full port.** All 6 pages (home with 12 sections, about, services, work,
  insights, contact), the motion layer, header, footer, custom cursor, scroll
  progress, and all 19 `style-hover`/`style-focus` rules.
- **Published.** https://zenichakalasiya.github.io/Quantivo-Next/ — all routes
  and assets verified 200 under the Pages subpath.
- **Q draw-and-reveal outro.** Draw → open → Let's Talk (top half of Q) → footer
  as its own 100svh screen (bottom half). Split wordmark QUANTIVO/DIGITAL at
  34vh sliding apart on scroll.
- **Logo fix.** Ring, arrow and centre dot are now `#fff`, matching `.cls-3` in
  `Quantivo logo-05.svg`. They were `var(--bg)`, which rendered the arrow
  near-black. **This bug also exists in the original V4 site** — not fixed there.
- A prototype route at `/q-reveal` renders the same `HomeOutro` as home, for
  tuning without scrolling the whole page.

## In progress

Nothing mid-flight. Working tree clean, everything committed and pushed.

## Next steps

1. **Visual sign-off on the port.** Fidelity was verified structurally (attribute
   counts, computed styles, a 700/700 lossless style round-trip) but there was
   never a side-by-side pixel diff of all six pages — the browser tab kept
   wedging. Compare against https://zenichakalasiya.github.io/Quantivo-V4/.
2. Decide whether to keep `/q-reveal` as a tuning sandbox or delete it.
3. Consider applying the white-arrow logo fix to the original V4 site so the two
   stay consistent.
4. Optional: real images for the 14 `<image-slot>` placeholders; a backend for
   the contact form (it posts nowhere, same as the original).

## Decisions made

- **Vendored rather than rewrote** `quantivo-roller.js`, `image-slot.js` and the
  motion layer. They are identical *by construction* instead of by reproduction —
  the highest-fidelity option for dense, measurement-sensitive scroll code.
- **Plain `<link>` fonts, not `next/font`.** The CSS and ~700 inline styles
  reference the literal families `Manrope` / `'Bebas Neue'`; `next/font` hashes
  those names and shifts load timing, which perturbs scroll measurement.
- **`reactStrictMode: false`.** Its double-mount wedges the vendored custom
  elements in dev. Production was never affected.
- **The reveal animates the clip path, not the panel.** Scaling the panel would
  scale its text; here only the window opens and the content never moves.
- **The split Q is two half-letters, not one spanning element** — that is what
  lets both outro screens stay independently 100svh.

## Gotchas & notes

- **The renderer freezes when scrolling deep into the Approach rail** at high DPR.
  **The original site does this too** — inherited, not introduced. If a tab
  wedges, open a fresh one; navigating does not recover it.
- **Programmatic scroll under CDP does not dispatch scroll events**, so
  ScrollTrigger and the progress bar appear frozen when driven from devtools.
  Use real wheel scrolling, or `dispatchEvent(new Event('scroll'))`.
- Screenshots at DPR 2.25 can come back looking hugely zoomed. That is a capture
  artifact, not the page. Computed-style probes are the reliable instrument.
- `python` is **not installed** on this machine, so the original project's
  README instruction (`python -m http.server`) does not work. Use a node static
  server.
- Dev server is degraded by the StrictMode workaround; **verify against
  production builds** (`npm run build`, serve `out/`).
