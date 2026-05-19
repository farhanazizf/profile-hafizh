# Design — Portfolio Website (Vite React adaptation)

> Owner: Muhammad Hafizh Fayiz · Date: 2026-05-19
> This document captures the **implementation design** for the portfolio site.
> The full **visual + content specification** lives in [`portfolio-website-spec.md`](../../../portfolio-website-spec.md) and is authoritative for layout, copy, color tokens, typography, and section-by-section behavior. This doc records only the decisions that deviate from that spec (the spec assumes Next.js; we build with Vite React) plus the data sourced from the CV.

## 1. Goals & success criteria

- Single-page editorial/data-driven portfolio per `portfolio-website-spec.md` §2–§4.
- Deep-dive route `/case-studies/:slug` with 3 authored case studies.
- SEO- and analytics-friendly: prerendered static HTML per route, full meta/OG/JSON-LD, GA4.
- Hits the quality bar in spec §5.5 (Lighthouse ≥95, LCP <1.5s, reduced-motion, a11y §5.6).
- Built with **pnpm**.

## 2. Stack decisions (spec Next.js → actual Vite)

| Spec (Next.js) | Actual | Notes |
|---|---|---|
| Next.js 15 App Router | **Vite 6 + React 19 + TypeScript** | |
| SSG/SSR | **vite-react-ssg** | Prerenders `/` and every `/case-studies/:slug` to static HTML at build. SEO parity with Next SSG. |
| `next/font` | **@fontsource-variable** (Fraunces, Inter, JetBrains Mono) | Self-hosted, variable axes only, zero CLS. |
| MDX (Next) | **@mdx-js/rollup** + `remark`/`rehype` | Case studies as `.mdx` in `src/content/case-studies/`. |
| `next/image` | plain `<img>` + pre-optimized assets in `public/` | Site is type/SVG heavy; few raster images. |
| `@vercel/og` dynamic OG | **static `public/og.png`** (1200×630) | Title + role, designed once. |
| Vercel Analytics | **GA4** via `gtag`, `VITE_GA_ID` env | No-ops if env unset; no cookie banner needed (minimal config). |
| `react-helmet` | **vite-react-ssg `<Head>`** | Per-route title/meta/OG/Twitter/canonical + `Person` JSON-LD. |
| Framer Motion | **framer-motion** | Same. Respects `prefers-reduced-motion`. |
| D3 + Recharts | **D3 only** | Hero sparkline, stack node-graph, RFM scatter all bespoke SVG. Recharts dropped (YAGNI). |
| Tailwind v4 | **Tailwind v4** + CSS var tokens | Dark mode via `data-theme`, persisted in `localStorage`, respects `prefers-color-scheme`. |
| Routing | **react-router** via vite-react-ssg | `/`, `/case-studies/:slug`. |

## 3. Architecture & structure

```
src/
  main.tsx                 ← vite-react-ssg entry
  App.tsx                  ← route shell, theme provider, skip-to-content
  routes.tsx               ← route table (home + case-study slugs from content)
  pages/
    Home.tsx               ← composes all sections
    CaseStudy.tsx          ← MDX deep-dive layout (TOC rail, hero, prev/next)
  components/
    nav/Nav.tsx
    sections/{Hero,About,Experience,SelectedWork,StackDiagram,SkillsMatrix,Contact}.tsx
    viz/{HeroSparkline,StackNodeGraph,RFMScatter}.tsx   ← D3 SVG
    ui/{SectionLabel,StatBlock,Chip,HairlineRule,ThemeToggle,SeoHead}.tsx
    mdx/mdx-components.tsx
  content/case-studies/*.mdx
  lib/
    data/experience.ts     ← typed CV data
    case-studies.ts        ← MDX glob loader + frontmatter
    seo.ts                 ← meta/JSON-LD builders
  styles/globals.css       ← tokens + Tailwind base
public/ : og.png, cv.pdf, robots.txt, favicon ; sitemap.xml generated at build
```

Each unit has one purpose: `viz/*` are pure (data in → SVG out, no app state); `sections/*` are presentational consuming `lib/data`; `lib/*` is data/SEO logic, no React. Charts ship a visually-hidden `<table>` for screen readers and `<title>`/`<desc>` on SVG.

## 4. Content (sourced from CV — accurate)

- Email `h4fizcareer@gmail.com` · Phone `+62 812-2453-9337` · LinkedIn `linkedin.com/in/hafizcareer` · Location `Karawang, West Java, Indonesia` · GPA `3.54/4.00`.
- Two roles at PT Boer Technology (Product Operations Analyst, Jun 2025–present; Intern, Feb–Jun 2025), bullets per CV verbatim, lightly edited to spec voice.
- Hero stat block: `12+` pipelines, `5` departments unified, `3.54` GPA (spec §1; "12+" is representative — flagged as such in a code comment).
- **3 case-study MDX drafts** (600–900 words, Problem → Approach → Architecture → Outcome → Reflection), AI-drafted from CV bullets, each with a visible `> Draft — review before publishing` callout:
  1. `unified-ops-data-platform`
  2. `rfm-segmentation-edutech`
  3. `local-data-stack`
- About portrait: abstract **node-graph SVG avatar** (no photo provided, spec §8).
- GitHub footer link: placeholder `github.com/CHANGEME` with a `TODO` comment.
- `cv.pdf`: the provided CV copied into `public/cv.pdf`.

## 5. SEO / analytics

- Prerendered HTML for all routes; per-route `<title>`, meta description, canonical, OG + Twitter card, `Person` JSON-LD on home.
- `public/robots.txt` + build-step `sitemap.xml` (home + all case-study slugs).
- GA4: load `gtag` only when `VITE_GA_ID` is set; SPA route-change pageviews.

## 6. Out of scope (YAGNI)

Recharts; dynamic OG service; CMS; i18n; contact form backend (contact is copy/mailto only per spec §07).

## 7. Risks

- vite-react-ssg + MDX glob: verify prerender resolves dynamic `/case-studies/:slug` from the content glob (config `getStaticPaths` equivalent).
- Fraunces optical-size (`opsz:144`) on H1 — confirm the variable font exposes the `opsz` axis via fontsource; fall back to weight if not.
