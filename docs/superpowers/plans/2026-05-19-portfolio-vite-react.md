# Portfolio Website (Vite React) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Muhammad Hafizh Fayiz's editorial/data-driven portfolio as a prerendered Vite + React + TypeScript site per `portfolio-website-spec.md` and `docs/superpowers/specs/2026-05-19-portfolio-vite-react-design.md`.

**Architecture:** Vite 6 + React 19 + TS. `vite-react-ssg` prerenders `/` and `/case-studies/:slug` to static HTML for SEO. Tailwind v4 with CSS-variable design tokens, dark mode via `data-theme`. Pure D3 SVG for all data viz. Case studies authored as MDX. Logic units (data, SEO, MDX loader) are React-free and unit-tested with Vitest; visual sections verified via typecheck + production build + dev smoke.

**Tech Stack:** pnpm · Vite 6 · React 19 · TypeScript · vite-react-ssg · react-router · Tailwind CSS v4 · @fontsource-variable · @mdx-js/rollup · framer-motion · D3 · Vitest

---

## File Structure

```
src/
  main.tsx                  ssg entry (createRoot export)
  App.tsx                   layout shell: theme, skip-link, <Outlet/>
  routes.tsx                route table + getStaticPaths for case studies
  pages/Home.tsx            composes all sections
  pages/CaseStudy.tsx       MDX deep-dive layout
  components/nav/Nav.tsx
  components/sections/{Hero,About,Experience,SelectedWork,StackDiagram,SkillsMatrix,Contact,Footer}.tsx
  components/viz/{HeroSparkline,StackNodeGraph,RFMScatter}.tsx
  components/ui/{SectionLabel,StatBlock,Chip,HairlineRule,ThemeToggle,SeoHead}.tsx
  components/mdx/mdx-components.tsx
  content/case-studies/{unified-ops-data-platform,rfm-segmentation-edutech,local-data-stack}.mdx
  lib/data/experience.ts    typed CV data + KPIs
  lib/case-studies.ts       MDX glob loader + frontmatter types
  lib/seo.ts                meta + Person JSON-LD builders
  lib/theme.ts              theme get/set/init (localStorage + prefers-color-scheme)
  lib/analytics.ts          GA4 gtag loader (no-op if VITE_GA_ID unset)
  styles/globals.css        tokens + Tailwind
public/{og.png,cv.pdf,robots.txt,favicon.svg}
scripts/gen-sitemap.mjs     postbuild sitemap.xml
test/ (Vitest specs colocated as *.test.ts)
vite.config.ts · tailwind config (v4 = CSS) · tsconfig · package.json
```

---

## Phase 1 — Scaffold, tokens, fonts, theme

### Task 1: Project scaffold

**Files:** Create `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/routes.tsx`, `src/pages/Home.tsx`, `.gitignore`, `.env.example`

- [ ] **Step 1: Init with pnpm and install deps**

```bash
cd /Users/farhan.fajarrudin/Documents/Work/personal/profile-hafizh
git init
pnpm init
pnpm add react@^19 react-dom@^19 react-router@^7 vite-react-ssg framer-motion d3
pnpm add -D vite@^6 @vitejs/plugin-react typescript @types/react @types/react-dom @types/d3 \
  tailwindcss @tailwindcss/vite @mdx-js/rollup @mdx-js/react remark-frontmatter remark-mdx-frontmatter \
  remark-gfm rehype-slug vitest @testing-library/react @testing-library/dom jsdom \
  @fontsource-variable/fraunces @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

- [ ] **Step 2: Write `index.html`**

```html
<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Write `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({
      remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }], remarkGfm],
      rehypePlugins: [rehypeSlug],
      providerImportSource: '@mdx-js/react',
    }) },
    react(),
    tailwindcss(),
  ],
  test: { environment: 'jsdom', globals: true },
})
```

- [ ] **Step 4: Write `package.json` scripts**

Set `"type": "module"` and scripts:
```json
{
  "scripts": {
    "dev": "vite-react-ssg dev",
    "build": "vite-react-ssg build && node scripts/gen-sitemap.mjs",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

- [ ] **Step 5: `tsconfig.json`** — standard React-JSX strict config, `"jsx": "react-jsx"`, `"module": "ESNext"`, `"moduleResolution": "bundler"`, `"strict": true`, `"types": ["vitest/globals","@testing-library/jest-dom"]`, include `src`, `scripts`, `vite.config.ts`.

- [ ] **Step 6: `src/main.tsx` (vite-react-ssg entry)**

```tsx
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './styles/globals.css'

export const createRoot = ViteReactSSG({ routes })
```

- [ ] **Step 7: `src/routes.tsx`, `src/App.tsx`, `src/pages/Home.tsx` (stubs)**

`routes.tsx`:
```tsx
import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import Home from './pages/Home'

export const routes: RouteRecord[] = [
  { path: '/', element: <App />, children: [{ index: true, element: <Home /> }] },
]
```
`App.tsx`: renders `<a class="sr-only focus:not-sr-only" href="#main">Skip to content</a>` then `<Outlet/>` from `react-router`.
`Home.tsx`: `<main id="main">Hafizh — coming up</main>` placeholder.
`.gitignore`: `node_modules dist .env`. `.env.example`: `VITE_GA_ID=`.

- [ ] **Step 8: Verify dev + build**

Run: `pnpm dev` → open printed URL, see placeholder. Then `pnpm build`.
Expected: `dist/index.html` contains the literal text "Hafizh — coming up" inside `#root` (prerendered, not just `<!--app-html-->`).

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "chore: scaffold vite-react-ssg + tailwind + mdx"
```

### Task 2: Design tokens, fonts, theme module

**Files:** Create `src/styles/globals.css`, `src/lib/theme.ts`, `src/lib/theme.test.ts`, `public/favicon.svg`

- [ ] **Step 1: Write failing test `src/lib/theme.test.ts`**

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getInitialTheme, applyTheme } from './theme'

describe('theme', () => {
  beforeEach(() => { localStorage.clear(); document.documentElement.removeAttribute('data-theme') })
  it('defaults to light when nothing stored and no dark preference', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as MediaQueryList)
    expect(getInitialTheme()).toBe('light')
  })
  it('honors stored theme over media', () => {
    localStorage.setItem('theme', 'dark')
    expect(getInitialTheme()).toBe('dark')
  })
  it('applyTheme sets attribute and persists', () => {
    applyTheme('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
```

- [ ] **Step 2: Run, expect FAIL** — Run: `pnpm test theme` → FAIL (module not found).

- [ ] **Step 3: Implement `src/lib/theme.ts`**

```ts
export type Theme = 'light' | 'dark'
export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
export function applyTheme(t: Theme): void {
  document.documentElement.setAttribute('data-theme', t)
  localStorage.setItem('theme', t)
}
```

- [ ] **Step 4: Run, expect PASS** — Run: `pnpm test theme` → PASS.

- [ ] **Step 5: Write `src/styles/globals.css`** with exact tokens from spec §2.2/§2.3:

```css
@import "tailwindcss";
@import "@fontsource-variable/fraunces";
@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";

@theme {
  --font-display: "Fraunces Variable", Georgia, serif;
  --font-sans: "Inter Variable", system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
  --color-paper: #FAFAF7;
  --color-elevated: #FFFFFF;
  --color-ink: #0E0E0E;
  --color-ink-secondary: #3A3A3A;
  --color-ink-muted: #7A7A7A;
  --color-rule: #1A1A1A;
  --color-accent-data: #FF5B1F;
  --color-accent-cool: #1E40AF;
  --color-accent-soft: #F2EFE6;
  --color-success: #067647;
}
:root[data-theme="dark"] {
  --color-paper: #0E0E0E;
  --color-elevated: #161616;
  --color-ink: #FAFAF7;
  --color-ink-secondary: #C9C9C4;
  --color-ink-muted: #8A8A85;
  --color-rule: rgba(250,250,247,0.12);
  --color-accent-soft: rgba(250,250,247,0.06);
}
html { background: var(--color-paper); color: var(--color-ink); font-family: var(--font-sans); }
:focus-visible { outline: 2px dashed var(--color-accent-data); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation: none !important; transition: none !important; } }
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
```

- [ ] **Step 6: favicon.svg** — minimal `HF.` monogram SVG, ink on paper.

- [ ] **Step 7: Typecheck + commit**

Run: `pnpm typecheck` → no errors.
```bash
git add -A && git commit -m "feat: design tokens, fonts, theme module + tests"
```

---

## Phase 2 — Data layer & SEO (tested logic units)

### Task 3: Typed CV data

**Files:** Create `src/lib/data/experience.ts`, `src/lib/data/experience.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { describe, it, expect } from 'vitest'
import { roles, kpis, contact } from './experience'

describe('experience data', () => {
  it('has two PT Boer roles, newest first', () => {
    expect(roles).toHaveLength(2)
    expect(roles[0].title).toBe('Product Operations Analyst')
    expect(roles[0].end).toBe('present')
    expect(roles[1].title).toBe('Intern')
  })
  it('every role has >=3 quantified-ish bullets and a stack', () => {
    for (const r of roles) { expect(r.bullets.length).toBeGreaterThanOrEqual(3); expect(r.stack.length).toBeGreaterThan(0) }
  })
  it('kpis and contact match the CV', () => {
    expect(kpis.find(k => k.label.includes('GPA'))?.value).toBe('3.54')
    expect(contact.email).toBe('h4fizcareer@gmail.com')
    expect(contact.linkedin).toBe('linkedin.com/in/hafizcareer')
  })
})
```

- [ ] **Step 2: Run, expect FAIL.**

- [ ] **Step 3: Implement `experience.ts`** — `Role` type per spec §5.4; `roles` array with both PT Boer roles, bullets adapted from CV verbatim into spec voice (spec §03 Role 1/Role 2 text), stacks per spec. `kpis = [{label:'PIPELINES SHIPPED',value:'12+',note:'ETL workflows in production'},{label:'DEPARTMENTS UNIFIED',value:'5',note:'Cross-team data consolidated'},{label:'CURRENT GPA',value:'3.54',note:'Bachelor of Digital Business'}]` — add `// NOTE: "12+" is a representative figure, not from CV — confirm with Hafizh`. `contact = {email:'h4fizcareer@gmail.com',linkedin:'linkedin.com/in/hafizcareer',location:'Karawang, West Java, Indonesia',cv:'/cv.pdf',github:'github.com/CHANGEME' /* TODO: real username */}`. Also export `skillsMatrix` (spec §06 table) and `softSkills` array.

- [ ] **Step 4: Run, expect PASS. Step 5: commit** `git commit -am "feat: typed CV data + tests"`

### Task 4: SEO builders

**Files:** Create `src/lib/seo.ts`, `src/lib/seo.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { describe, it, expect } from 'vitest'
import { buildMeta, personJsonLd } from './seo'

it('buildMeta returns title/description/og', () => {
  const m = buildMeta({ title: 'X', description: 'D', path: '/case-studies/a' })
  expect(m.title).toBe('X')
  expect(m.canonical).toMatch(/\/case-studies\/a$/)
  expect(m.og['og:type']).toBe('website')
})
it('personJsonLd is valid Person schema', () => {
  const ld = personJsonLd()
  expect(ld['@type']).toBe('Person')
  expect(ld.name).toBe('Muhammad Hafizh Fayiz')
})
```

- [ ] **Step 2: Run, expect FAIL.**

- [ ] **Step 3: Implement `seo.ts`** — `SITE_URL` from `import.meta.env.VITE_SITE_URL ?? 'https://hafizhfayiz.com'`. `buildMeta({title,description,path,image?})` → `{title,description,canonical,og:{...},twitter:{...}}` using spec §6 defaults. `personJsonLd()` → `{ '@context':'https://schema.org','@type':'Person', name, jobTitle:'Data Engineer', email, sameAs:[linkedin], address:'Karawang, West Java, Indonesia', alumniOf:'Universitas Pakuan' }`.

- [ ] **Step 4: PASS. Step 5: commit.**

### Task 5: SeoHead component + analytics

**Files:** Create `src/components/ui/SeoHead.tsx`, `src/lib/analytics.ts`

- [ ] **Step 1:** `SeoHead` uses `Head` from `vite-react-ssg` to render `<title>`, `<meta name=description>`, canonical link, OG/Twitter tags, and (when `jsonLd` prop given) a `<script type="application/ld+json">`. Props: `{meta, jsonLd?}`.
- [ ] **Step 2:** `analytics.ts`: `initAnalytics()` — if `import.meta.env.VITE_GA_ID`, inject gtag script + config; export `trackPageview(path)`. No-op when unset. Call `initAnalytics()` once in `App.tsx` effect and `trackPageview` on `useLocation()` change.
- [ ] **Step 3:** `pnpm typecheck` → clean. Commit `feat: SeoHead + GA4 analytics`.

---

## Phase 3 — UI primitives & static sections

> Visual tasks: verify by `pnpm typecheck`, `pnpm build` (must succeed + prerender text present), and `pnpm dev` visual smoke against spec §4. Match spec tokens/type-scale exactly.

### Task 6: UI primitives

**Files:** Create `src/components/ui/{SectionLabel,StatBlock,Chip,HairlineRule,ThemeToggle}.tsx`

- [ ] **Step 1:** Implement each per spec:
  - `SectionLabel`: mono uppercase `§ {num} — {label}`, 0.8125rem, ink-muted, left-aligned.
  - `StatBlock`: big display number (Fraunces) + mono uppercase label + note + hairline (spec §01 data card).
  - `Chip`: mono pill tag, 1px rule border, hover `accent-soft`.
  - `HairlineRule`: `<hr>` `1px solid var(--color-rule)`.
  - `ThemeToggle`: button toggling `applyTheme`, sun/moon (inline SVG, no icon dep), `aria-label`, `aria-pressed`.
- [ ] **Step 2:** typecheck → clean. Commit `feat: ui primitives`.

### Task 7: Nav

**Files:** Create `src/components/nav/Nav.tsx`; modify `src/App.tsx` to render `<Nav/>` above `<Outlet/>`.

- [ ] **Step 1:** Sticky 64px, hairline bottom border, full-width, max-content 1280px inner. Left `HF.` monogram (mono bold, scrolls to top). Center anchor links `About · Experience · Work · Stack · Contact` (mono small-caps, smooth scroll to `#about` etc.). Right: `Available for hire` status pill (green dot, `--color-success`, role text + icon for a11y) + `ThemeToggle`. Mobile (<768px): hamburger drawer; status pill stays visible.
- [ ] **Step 2:** Build + dev smoke: nav sticky, links jump to sections, theme toggles, mobile drawer opens. Commit `feat: sticky nav`.

### Task 8: Hero (§01)

**Files:** Create `src/components/sections/Hero.tsx`, `src/components/viz/HeroSparkline.tsx`; add to `Home.tsx`.

- [ ] **Step 1: `HeroSparkline.tsx`** — D3-generated SVG path of representative time-series; `aria-hidden`, 6% opacity, slow `stroke-dashoffset` reveal (disabled under reduced-motion). Pure: takes optional `points` prop, default representative data.
- [ ] **Step 2: `Hero.tsx`** — 12-col grid: cols 1–8 `SectionLabel §01 — INDEX`, H1 "Muhammad Hafizh Fayiz", display headline "I build the pipelines that turn scattered ops data into **decisions.**" with `accent-data` underline animation on "decisions", subtitle "Data Engineer · Product Ops Analyst / Karawang, Indonesia · Open to remote", primary CTA `Get in touch →` (→ `#contact`) + secondary `View case studies` (→ `#work`). Cols 9–12: three `StatBlock`s from `kpis`. `HeroSparkline` absolutely positioned behind text. H1 type per spec §2.3 (5.5rem/0.95/-0.03em, Fraunces).
- [ ] **Step 3:** Build + dev smoke vs spec §01. Commit `feat: hero section + sparkline`.

### Task 9: About (§02)

**Files:** Create `src/components/sections/About.tsx`; add to `Home.tsx`.

- [ ] **Step 1:** Two-col editorial spread. Left 5/12: abstract **node-graph SVG avatar** (small inline D3/hand-built SVG of the data stack, grayscale, subtle grain via SVG filter). Right 7/12: bio prose verbatim from spec §02, then full-width pull-quote `"Half engineering, half translation."` on `accent-soft` background. `SectionLabel §02 — ABOUT`, `HairlineRule` above.
- [ ] **Step 2:** Build + dev smoke. Commit `feat: about section`.

### Task 10: Experience (§03)

**Files:** Create `src/components/sections/Experience.tsx`; add to `Home.tsx`.

- [ ] **Step 1:** Vertical timeline, left hairline rule. Map `roles`: date mono muted (`JUN 2025 — PRESENT`), title Fraunces h3, company + location, summary line, 3–5 bullets, `Chip` row from `role.stack`, optional inline mini-sparkline (reuse `HeroSparkline` small variant). `SectionLabel §03 — EXPERIENCE`.
- [ ] **Step 2:** Build + dev smoke vs spec §03 (both roles, correct bullets). Commit `feat: experience timeline`.

### Task 11: Skills Matrix (§06) + Contact (§07) + Footer

**Files:** Create `src/components/sections/{SkillsMatrix,Contact,Footer}.tsx`; add to `Home.tsx`.

- [ ] **Step 1: SkillsMatrix** — semantic `<table>`, mono headers (Daily/Comfortable/Learning), hairline rules, rows from `skillsMatrix`; below: row of mono `Chip`s from `softSkills`. `SectionLabel §06 — SKILLS`.
- [ ] **Step 2: Contact** — centered, Fraunces 4rem headline "Let's build something queryable.", body-L sub-copy (spec §07), mono contact rows (EMAIL/LINKEDIN/LOCATION/CV) with click-to-copy on hover (copies value, shows "copied" via `aria-live`), hairline between rows. Bottom mono timestamp `LAST UPDATED · {buildDate}` where buildDate = `import.meta.env.VITE_BUILD_DATE ?? new Date().toISOString().slice(0,10)` (set in build script env). `SectionLabel §07 — CONTACT`.
- [ ] **Step 3: Footer** — single mono line: `© 2026 Muhammad Hafizh Fayiz · Built with Vite, React & care · Source on GitHub ↗` (GitHub link from `contact.github`).
- [ ] **Step 4:** Build + dev smoke. Commit `feat: skills, contact, footer`.

---

## Phase 4 — Data viz & case studies

### Task 12: StackDiagram (§05)

**Files:** Create `src/components/viz/StackNodeGraph.tsx`, `src/components/sections/StackDiagram.tsx`; add to `Home.tsx`.

- [ ] **Step 1: `StackNodeGraph.tsx`** — full-width SVG: source row (`APIs`,`Spreadsheets`,`PostgreSQL`,`Webhooks`) → `Prefect` → `MinIO` → `DuckDB` → `Metabase` per spec §05 ASCII. Mono node labels, `--color-ink` outlines, `--color-accent-data` animated dotted flow lines (pulse source→sink; static under reduced-motion). Each node hoverable → tooltip "what I use this for" + version. Crosshair cursor over nodes. SVG has `<title>`+`<desc>`; include visually-hidden `<table>` describing the flow for screen readers.
- [ ] **Step 2: `StackDiagram.tsx`** — `SectionLabel §05 — STACK`, edge-to-edge graph, caption "Every pipeline I ship lives somewhere on this diagram. Hover a node to see how I use it."
- [ ] **Step 3:** Build + dev smoke: nodes render, tooltips work, flow animates, reduced-motion static. Commit `feat: stack node-graph diagram`.

### Task 13: Case-study MDX loader

**Files:** Create `src/lib/case-studies.ts`, `src/lib/case-studies.test.ts`, the 3 `.mdx` files, `src/components/mdx/mdx-components.tsx`

- [ ] **Step 1:** Author 3 MDX files under `src/content/case-studies/` with frontmatter `{slug,title,dek,tags,year,cover,metrics}` and 600–900 word body (Problem → Approach → Architecture → Outcome → Reflection) drafted from CV bullets. Each body starts with a blockquote `> ⚠️ Draft — AI-drafted from CV bullets; review before publishing.`
  - `unified-ops-data-platform.mdx` — 5 sources → Prefect → MinIO → DuckDB → Metabase consolidation.
  - `rfm-segmentation-edutech.mdx` — RFM + Amplitude Mastering Retention cohorts.
  - `local-data-stack.mdx` — Docker + MinIO + DuckDB + Metabase reproducible stack (intern era).
- [ ] **Step 2: Failing test `case-studies.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { listCaseStudies, getCaseStudy } from './case-studies'
describe('case studies', () => {
  it('loads all three with required frontmatter', () => {
    const all = listCaseStudies()
    expect(all.map(c => c.slug).sort()).toEqual(['local-data-stack','rfm-segmentation-edutech','unified-ops-data-platform'])
    for (const c of all) { expect(c.title).toBeTruthy(); expect(c.dek).toBeTruthy(); expect(c.tags.length).toBeGreaterThan(0) }
  })
  it('getCaseStudy returns Component + frontmatter, undefined for unknown', () => {
    expect(getCaseStudy('unified-ops-data-platform')?.frontmatter.title).toBeTruthy()
    expect(getCaseStudy('nope')).toBeUndefined()
  })
})
```

- [ ] **Step 3: Run, expect FAIL.**
- [ ] **Step 4: Implement `case-studies.ts`** using `import.meta.glob('../content/case-studies/*.mdx', { eager: true })`; map module `frontmatter` + `default` (Component). `listCaseStudies()` sorted by year desc; `getCaseStudy(slug)`. `mdx-components.tsx` maps `h2/h3/p/ul/blockquote/code/pre` to editorial styled elements (Fraunces headings, mono code, hairlines).
- [ ] **Step 5: Run, expect PASS. Commit** `feat: case-study MDX loader + 3 drafts + tests`.

### Task 14: SelectedWork section (§04)

**Files:** Create `src/components/viz/RFMScatter.tsx`, `src/components/sections/SelectedWork.tsx`; add to `Home.tsx`.

- [ ] **Step 1: `RFMScatter.tsx`** — D3 editorial scatter (Recency × Frequency, point size = Monetary) with representative data, mono axis labels, hidden data `<table>`.
- [ ] **Step 2: `SelectedWork.tsx`** — `SectionLabel §04 — SELECTED WORK`, 2-col card grid from `listCaseStudies()`. Each card: hero diagram on top (case 1 → `StackNodeGraph` compact; case 2 → `RFMScatter`; case 3 → simple Docker-stack SVG), title, 2-line dek, mono footer `year · tags`. Hover: bg `accent-soft` + arrow slides in. Card links to `/case-studies/:slug`.
- [ ] **Step 3:** Build + dev smoke. Commit `feat: selected work cards + RFM scatter`.

### Task 15: Case-study deep-dive route

**Files:** Create `src/pages/CaseStudy.tsx`; modify `src/routes.tsx` (add dynamic route + `getStaticPaths`).

- [ ] **Step 1:** `routes.tsx` add child `{ path: 'case-studies/:slug', element: <CaseStudy />, entry: 'src/pages/CaseStudy.tsx', getStaticPaths: () => listCaseStudies().map(c => `/case-studies/${c.slug}`) }` (per vite-react-ssg dynamic route API).
- [ ] **Step 2:** `CaseStudy.tsx` — read `:slug` via `useParams`, `getCaseStudy`; 404 fallback if undefined. Layout per spec §04 deep-dive: sticky right-rail TOC (from headings), hero (title, dek, year, reading time = words/200), `<article>` rendering `<MDXProvider>` + Component, "Stack used" Chip row, "Key metrics" callout boxes from frontmatter `metrics`, prev/next nav between studies. `<SeoHead>` with per-study `buildMeta`.
- [ ] **Step 3:** `pnpm build` → confirm `dist/case-studies/unified-ops-data-platform/index.html` exists and contains the study title in static HTML. Dev smoke all 3 pages + prev/next + 404. Commit `feat: case-study deep-dive route (prerendered)`.

---

## Phase 5 — Motion, SEO assets, polish, verification

### Task 16: Scroll-in motion

**Files:** Create `src/components/ui/Reveal.tsx`; wrap section roots.

- [ ] **Step 1:** `Reveal` — framer-motion one-shot fade + 8px translate-up on in-view (`whileInView`, `viewport={{once:true}}`); renders children unchanged when `prefers-reduced-motion`. Wrap each section in `Home.tsx`.
- [ ] **Step 2:** Dev smoke: subtle reveal, no parallax/scroll-jack; reduced-motion shows content immediately. Commit `feat: scroll-in reveal motion`.

### Task 17: SEO assets — og.png, robots, sitemap, cv.pdf, head wiring

**Files:** Create `public/robots.txt`, `public/og.png`, `scripts/gen-sitemap.mjs`; copy CV to `public/cv.pdf`; add `<SeoHead>` to `Home` and `CaseStudy`.

- [ ] **Step 1:** Copy `CV_ATS_Muhammad_Hafizh_Fayiz_2026.pdf` → `public/cv.pdf`.
- [ ] **Step 2:** `og.png` 1200×630: paper bg, "Hafizh Fayiz · Data Engineer" Fraunces + "Python · Prefect · MinIO · DuckDB · Metabase" mono (generate via a small node-canvas/SVG→PNG step or hand-built SVG rasterized; commit the PNG).
- [ ] **Step 3:** `robots.txt`: `User-agent: *\nAllow: /\nSitemap: <SITE_URL>/sitemap.xml`.
- [ ] **Step 4:** `scripts/gen-sitemap.mjs`: read case-study slugs from `src/content/case-studies/*.mdx`, write `dist/sitemap.xml` with `/` + each `/case-studies/<slug>`.
- [ ] **Step 5:** Wire `<SeoHead>` on `Home` (default meta §6 + `personJsonLd`) and `CaseStudy` (per-study).
- [ ] **Step 6:** `pnpm build` → `dist/sitemap.xml`, `dist/robots.txt`, `dist/cv.pdf` present; `dist/index.html` `<head>` has title/description/og/canonical/JSON-LD. Commit `feat: SEO assets (og, robots, sitemap, cv) + head wiring`.

### Task 18: Final verification pass

- [ ] **Step 1:** `pnpm typecheck` → zero errors. `pnpm test` → all pass.
- [ ] **Step 2:** `pnpm build` succeeds; manually grep `dist/index.html` for hero copy + meta tags + JSON-LD present in static HTML (SSG works). Confirm `dist/case-studies/*/index.html` for all 3 slugs.
- [ ] **Step 3:** `pnpm preview`, run Lighthouse (Chrome) on `/` and one case study — target ≥95 Performance/A11y/Best-Practices/SEO. Fix regressions (image sizing, contrast, labels) until met.
- [ ] **Step 4:** Manual a11y smoke: keyboard-only nav reaches all interactive elements with visible dashed focus ring; skip-link works; theme persists across reload; toggle dark mode and re-check contrast; set OS reduced-motion and confirm animations disabled.
- [ ] **Step 5:** Final commit `chore: final verification pass` and write a short `README.md` (run/build/deploy + env vars `VITE_GA_ID`, `VITE_SITE_URL` + the open TODOs: GitHub username, "12+" metric, case-study draft review, real portrait/domain).

---

## Notes / known follow-ups (surface in README)

- `contact.github` is `github.com/CHANGEME` — needs real username.
- Hero KPI `12+` is representative, not from CV — confirm with Hafizh.
- 3 case-study bodies are AI drafts marked with a ⚠️ callout — Hafizh to rewrite.
- No photo → abstract node-graph avatar used (spec §8 option).
- `VITE_SITE_URL` defaults to `https://hafizhfayiz.com`; update when domain is chosen.
