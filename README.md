# Muhammad Hafizh Fayiz — Portfolio

Editorial / data-driven portfolio. Vite + React + TypeScript, prerendered to
static HTML with `vite-react-ssg` for SEO. Built per
[`portfolio-website-spec.md`](portfolio-website-spec.md).

## Stack

- **Vite 6 + React 19 + TypeScript**, `vite-react-ssg` (static prerender of `/`
  and every `/case-studies/:slug`)
- **Tailwind v4** with CSS-variable design tokens, dark mode via `data-theme`
- **framer-motion** (scroll/entrance motion, global reduced-motion via
  `MotionConfig reducedMotion="user"`)
- **D3** for all data viz (hero sparkline, stack node-graph, RFM scatter)
- **MDX** case studies in `src/content/case-studies/`
- **Vitest** unit tests for logic units (theme, CV data, SEO, MDX loader)

## Develop

```bash
pnpm install
pnpm dev          # vite-react-ssg dev server
pnpm test         # vitest (14 tests)
pnpm typecheck    # tsc --noEmit
pnpm build        # prerender to dist/ + generate sitemap.xml
pnpm preview      # serve the built dist/
```

## Environment

Copy `.env.example` to `.env`:

| Var | Purpose |
|---|---|
| `VITE_GA_ID` | GA4 measurement ID. Empty = no analytics script/cookies at all. |
| `VITE_SITE_URL` | Canonical origin for SEO/OG/sitemap. Default `https://hafizh.web.id`. |

`VITE_BUILD_DATE` is injected automatically by `pnpm build` (the "Last updated"
stamp). The OG image is regenerated only when needed: `node scripts/gen-og.mjs`.

## Deploy

Static host (`dist/`). The DNS `hafizh.web.id` is prepared. Set `VITE_SITE_URL`
to the production origin at build time so canonical URLs, OG tags, and
`sitemap.xml` are correct. Configure the host to serve
`dist/case-studies/<slug>.html` for `/case-studies/<slug>` (clean URLs).

## Open follow-ups (need Hafizh's input)

These are intentionally stubbed and clearly marked in code:

1. **GitHub username** — footer link is `github.com/CHANGEME`
   (`src/lib/data/experience.ts`). Replace before publishing.
2. **Hero metric "12+ pipelines"** — representative figure, not from the CV
   (flagged with a comment in `experience.ts`). Confirm the real number.
3. **Case-study write-ups** — the 3 MDX files in
   `src/content/case-studies/` are AI drafts from CV bullets, each opening with
   a `DRAFT —` callout. Rewrite in Hafizh's voice before publishing.
4. **Portrait** — none provided, so the About section uses an abstract
   node-graph avatar (per spec §8).

## Quality notes

- Static HTML carries all section copy, per-route `<title>`/meta/OG/canonical,
  and `Person` JSON-LD (verified in `dist/`).
- `robots.txt` + build-generated `sitemap.xml` (home + 3 case studies).
- A11y: skip-link, semantic landmarks, focus-visible rings, SVG
  `<title>`/`<desc>`, screen-reader data tables for charts, reduced-motion
  honored globally.
- Bundle: ~162 KB gzipped JS (React + framer-motion + D3 + router), 9.5 KB CSS.
- **Lighthouse was not run in the build environment** (no headless Chrome).
  Run it manually against `pnpm preview` for the spec's ≥95 targets; the
  prerendered HTML + font `swap` give a strong FCP/LCP baseline.
