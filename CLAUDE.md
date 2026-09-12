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
- `src/components/home/` — the 12 home sections, in page order.
- `src/vendor/` — code deliberately NOT rewritten (see below).

### Vendored, not rewritten

Three files are copied near-verbatim so they are identical **by construction**:

| File | Why |
| --- | --- |
| `quantivo-roller.js` | three.js card drum. Self-registering custom element, owns its own theme MutationObserver and cleanup. Only change: `import('three')` instead of the jsDelivr URL. |
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

## Conventions

Layout is inline `style={{}}` with `clamp()`; there are no CSS classes anywhere,
matching the original. Stateful styling is `[data-*]` attribute selectors in
`globals.css`. When porting more markup, keep every `data-*` hook — the motion layer
selects on them.
