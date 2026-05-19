# Portfolio Website Spec — Muhammad Hafizh Fayiz

> A hybrid specification document for an **Editorial / Data-Driven** portfolio website for a Data Engineer.
> Designed to be handed off to **Claude Code** (for full implementation) or to a **design generator** (Figma AI, v0, Lovable, etc.).

---

## 1. Project Overview

| Item | Value |
|---|---|
| **Owner** | Muhammad Hafizh Fayiz |
| **Role** | Data Engineer / Product Operations Analyst |
| **Site type** | Personal portfolio / CV / case-study showcase |
| **Audience** | Tech recruiters, hiring managers, startup CTOs, remote-first companies (global) |
| **Language** | English (single language) |
| **Tone of voice** | Confident, precise, data-literate. Sentences are short, claims are quantified, jargon is fluent but never hollow. |
| **Primary CTA** | "Get in touch" → email + LinkedIn |
| **Secondary CTA** | "View case studies" → Projects section |

### Positioning statement (use as meta description / hero subtitle source)
> Final-year Digital Business student turning fragmented operational data into unified, queryable, decision-ready platforms. Python · Prefect · MinIO · DuckDB · Metabase.

---

## 2. Visual Direction — Editorial / Data-Driven

The site reads like a **digital data magazine** — a grid-based editorial layout where data visualization is a first-class design element, not decoration. Think *Pudding.cool* meets *Stripe.com* meets a Metabase dashboard.

### 2.1 Design principles

1. **Grid is law.** Every section snaps to a visible 12-column grid. Faint vertical guide lines may even be rendered behind hero/about sections at low opacity (5–8%).
2. **Numbers as headlines.** Big metrics (KPIs, years of experience, pipelines built) are rendered in display type, not body copy.
3. **Charts are content.** Mini sparklines, bar fragments, and node graphs are embedded inline — not as illustrations, but as actual SVG renderings of real or representative data.
4. **Generous typographic hierarchy.** Display serif for headings + clean grotesk for body + monospace for code/data/labels.
5. **Light-first.** Background defaults to a paper-like off-white. A dark mode toggle is offered but light is the canonical look.

### 2.2 Color tokens

| Token | Hex | Usage |
|---|---|---|
| `--bg-paper` | `#FAFAF7` | Page background (warm off-white, editorial feel) |
| `--bg-elevated` | `#FFFFFF` | Cards, modals |
| `--ink-primary` | `#0E0E0E` | Headings, primary text |
| `--ink-secondary` | `#3A3A3A` | Body copy |
| `--ink-muted` | `#7A7A7A` | Captions, metadata, axis labels |
| `--rule` | `#1A1A1A` | Hairline borders, dividers |
| `--accent-data` | `#FF5B1F` | Primary accent — chart highlights, link underline, CTA fill (warm editorial orange) |
| `--accent-cool` | `#1E40AF` | Secondary chart color (deep blue) |
| `--accent-soft` | `#F2EFE6` | Pull-quote backgrounds, hover states |
| `--success` | `#067647` | Status pills (e.g., "Available for hire") |

**Dark mode mapping:**
- `--bg-paper` → `#0E0E0E`
- `--ink-primary` → `#FAFAF7`
- `--accent-data` stays `#FF5B1F` (works on both)
- Rules become `rgba(250,250,247,0.12)`

### 2.3 Typography

| Role | Font | Fallback | Weight | Notes |
|---|---|---|---|---|
| Display headings | **Fraunces** | Georgia, serif | 600 / 700 | Optical size variation on H1 (`opsz: 144`) |
| Body | **Inter** | system-ui, sans-serif | 400 / 500 | `font-feature-settings: 'ss01', 'cv11'` |
| Mono / labels / data | **JetBrains Mono** | ui-monospace | 400 / 500 | Used for code, KPI labels, axis text, metadata |

**Type scale (rem, 16px base):**
- H1: 5.5rem / line-height 0.95 / tracking -0.03em
- H2: 3rem / 1.05 / -0.02em
- H3: 1.75rem / 1.2
- Body L: 1.125rem / 1.6
- Body: 1rem / 1.65
- Caption / Mono: 0.8125rem / 1.4 / uppercase optional

### 2.4 Layout system

- **Max content width:** 1280px
- **Grid:** 12 columns, 24px gutter (desktop) → 6 columns (tablet) → 4 columns (mobile)
- **Section vertical rhythm:** 120px top/bottom on desktop, 64px on mobile
- **Hairline rules** (`1px solid var(--rule)`) separate every major section — editorial signature
- **Section labels:** Each section is preceded by a mono uppercase label like `§ 02 — EXPERIENCE` aligned to the left margin

### 2.5 Motion

Subtle, never showy.
- Fade + 8px translate-up on scroll-into-view (one-shot)
- Charts animate stroke-dashoffset on first reveal (~600ms ease-out)
- Cursor becomes a small crosshair `+` over chart elements
- No parallax. No scroll-jacking.

---

## 3. Information Architecture

Single-page scroll with sticky top nav + anchor links. A separate `/case-studies/[slug]` route exists for deep dives.

```
/                       → home (all sections below)
/case-studies/[slug]    → individual project deep dive
/cv.pdf                 → static download of the ATS CV
```

### Section order

1. **Nav** (sticky)
2. **§01 — Hero / Masthead**
3. **§02 — About**
4. **§03 — Experience**
5. **§04 — Selected Work (Projects / Case Studies)**
6. **§05 — Tech Stack (Data Stack Visualization)**
7. **§06 — Skills Matrix**
8. **§07 — Contact**
9. **Footer**

---

## 4. Section-by-Section Spec

### §00 — Navigation

**Layout:** Sticky top, full-width, 64px tall, hairline bottom border.

| Slot | Content |
|---|---|
| Left | `HF.` monogram (mono, bold) — clicks to top |
| Center | Anchor links: `About · Experience · Work · Stack · Contact` (mono, small caps) |
| Right | `Available for hire` status pill (green dot) + theme toggle |

**Mobile:** Collapses to hamburger; status pill stays visible.

---

### §01 — Hero / Masthead

**Purpose:** Land the proposition in under 3 seconds.

**Layout (12-col grid):**
- Cols 1–8: Display headline + subtitle
- Cols 9–12: Live "data card" widget (see below)

**Content:**

```
§ 01 — INDEX

Muhammad Hafizh Fayiz

I build the pipelines that turn
scattered ops data into
[decisions.] ← accent-data underline animation

Data Engineer · Product Ops Analyst
Karawang, Indonesia · Open to remote
```

**Data card (top-right):**
A small editorial "stat block" with three KPIs styled like a magazine sidebar:

```
PIPELINES SHIPPED      ETL workflows in production
        12+            ─────────────────────

DEPARTMENTS UNIFIED    Cross-team data consolidated
         5             ─────────────────────

CURRENT GPA            Bachelor of Digital Business
       3.54            ─────────────────────
```

Each number is large display type; each label is mono uppercase 0.75rem.

**Background detail:** A faint, slowly-animating SVG line chart drawn behind the hero text at 6% opacity — represents data flowing.

---

### §02 — About

**Layout:** Two-column editorial spread.
- Left col (5/12): Portrait or abstract avatar (square, grayscale, slight grain). If no photo, replace with a node-graph illustration of the data stack.
- Right col (7/12): Bio prose.

**Content (use verbatim or refine):**

> **About**
>
> I'm a final-year Digital Business student at Universitas Pakuan, currently working as a Product Operations Analyst at PT Boer Technology. My day-to-day is centralizing data that lives in spreadsheets, third-party APIs, and the heads of project managers into a single queryable platform.
>
> The work is half engineering, half translation. I write Python and Prefect flows that move data from A to B reliably, and I write data dictionaries and SOPs so the next person doesn't have to guess what `status_2` means.
>
> Outside of pipelines, I dig into product analytics — RFM segmentation, retention curves, the kind of analysis that tells a sales lead which 200 customers to call this week.

**Pull-quote callout** (below bio, full-width inside the column):
> *"Half engineering, half translation."*

---

### §03 — Experience

**Layout:** Vertical timeline, hairline rule on the left. Each role is a row in the editorial grid.

**Per role:**

| Field | Content for role 1 |
|---|---|
| Date | `JUN 2025 — PRESENT` (mono, muted) |
| Role | **Product Operations Analyst** (display serif, h3) |
| Company | PT Boer Technology — Remote |
| Summary line | One sentence describing impact |
| Bullets | 3–5 quantified achievement bullets |
| Stack chips | Mono pill tags: `Python` `Prefect` `MinIO` `Metabase` `PostgreSQL` |
| Mini-viz | Optional inline sparkline showing e.g. pipelines shipped over time |

**Role 1 — Product Operations Analyst @ PT Boer Technology** *(Jun 2025 — Present, Remote)*

Summary: *Building the data platform that lets every department at Boer see the same numbers.*

Bullets:
- Engineered automated ETL pipelines in **Python + Prefect**, extracting from heterogeneous sources, transforming with complex business logic, and loading into **MinIO** (S3-compatible object storage).
- Consolidated 5 cross-departmental data domains — **PMO KPI/SLA tracking, Managed Services alerts, General Affairs inventory, EduTech sales, Marketing performance** — into a unified Metabase reporting layer.
- Drove **RFM (Recency / Frequency / Monetary)** segmentation on EduTech customer data, paired with Amplitude's *Mastering Retention* framework, to surface 3 actionable cohorts for the growth team.
- Partnered with Project Managers to translate raw metrics into executive-ready narratives, sharpening KPI clarity in weekly leadership reviews.
- Authored the team's **data dictionary and SOP library**, reducing onboarding friction for new analysts.

Stack: `Python` `Pandas` `Prefect` `MinIO` `Metabase` `DuckDB` `PostgreSQL` `Docker` `Linux`

**Role 2 — Intern @ PT Boer Technology** *(Feb 2025 — Jun 2025, Remote)*

Summary: *Learned the stack by building it from the ground up.*

Bullets:
- Built foundational ETL pipelines pulling from external REST APIs, transforming with **Pandas**, and orchestrating via **Prefect** tasks / flows / deployments.
- Containerized the analytical environment using **Docker** (Dockerfile + Compose) for reproducible local-to-server parity.
- Stood up the local analytical stack: **MinIO** for object storage, **DuckDB** as the query engine, **Metabase** as the visualization layer.
- Completed a **Linux Administration** course on the ADINUSA platform.
- Tracked deliverables and decisions in **GitLab Issues**, keeping the project audit-trail tight.

Stack: `Python` `Pandas` `Prefect` `Docker` `MinIO` `DuckDB` `Metabase` `GitLab`

---

### §04 — Selected Work (Case Studies)

**Purpose:** Translate CV bullets into proof. This is the section recruiters spend the most time on.

**Layout:** A 2-column grid of case-study cards. Each card is editorial — image/diagram on top, headline, 2-line dek, mono metadata footer (year · stack · role).

**Card hover behavior:** Background shifts to `--accent-soft`, an arrow icon slides in.

**Case study 1 — "Unified Ops Data Platform"**
- **Hero diagram:** Node-graph visualization showing 5 source systems → Prefect → MinIO → DuckDB → Metabase
- **Dek:** *How we collapsed 5 departments' worth of fragmented spreadsheets into one queryable platform.*
- **Tags:** `Data Platform` `ETL` `2025`

**Case study 2 — "RFM Segmentation for EduTech Retention"**
- **Hero diagram:** Scatter plot styled as editorial (Recency × Frequency, sized by Monetary)
- **Dek:** *Segmenting 10k+ learners into Champions, At-Risk, and Hibernating cohorts to drive a targeted re-engagement campaign.*
- **Tags:** `Product Analytics` `Retention` `2025`

**Case study 3 — "From Zero to Local Data Stack"** *(intern era)*
- **Hero diagram:** Docker container stack illustration
- **Dek:** *Building a reproducible MinIO + DuckDB + Metabase environment that runs identically on a laptop and on the team server.*
- **Tags:** `Infrastructure` `Docker` `2025`

> **NOTE FOR HAFIZ:** I drafted these case study cards based on your CV bullets. To unlock full marks here, draft a 600–900 word write-up for each one — *Problem → Approach → Architecture → Outcome → What I'd do differently*. We can store these as MDX files under `/content/case-studies/`.

**Case study deep-dive page (`/case-studies/[slug]`) layout:**
- Sticky table of contents (right rail)
- Hero with title, dek, date, reading time
- Body with embedded SVG architecture diagrams
- "Stack used" chip row
- "Key metrics" callout boxes
- Prev/Next navigation between case studies

---

### §05 — Tech Stack (Data Stack Visualization)

**Purpose:** Show, don't list. Render the actual data flow as the section's hero.

**Layout:** Full-width, edge-to-edge SVG diagram with annotations.

**Visualization spec:**

```
[ APIs ]  [ Spreadsheets ]  [ PostgreSQL ]  [ Webhooks ]
    │           │                │              │
    └───────────┴────────┬───────┴──────────────┘
                         ▼
                   ╔═══════════╗
                   ║  Prefect  ║  ← orchestration
                   ╚═════╤═════╝
                         │  (extract · transform)
                         ▼
                   ╔═══════════╗
                   ║   MinIO   ║  ← S3-compatible storage
                   ╚═════╤═════╝
                         │
                         ▼
                   ╔═══════════╗
                   ║  DuckDB   ║  ← analytical query layer
                   ╚═════╤═════╝
                         │
                         ▼
                   ╔═══════════╗
                   ║ Metabase  ║  ← BI & dashboards
                   ╚═══════════╝
```

**Rendering rules:**
- Draw as SVG with mono-labeled nodes
- Each node is hoverable → tooltip shows "What I use this for" + version
- Animated dotted lines pulse from source → sink (data flowing)
- Color: nodes in `--ink-primary` outline, accent flow lines in `--accent-data`

**Caption underneath:**
> *Every pipeline I ship lives somewhere on this diagram. Hover a node to see how I use it.*

---

### §06 — Skills Matrix

**Layout:** Editorial table — actual `<table>` with hairline rules, mono headers.

| | Daily | Comfortable | Learning |
|---|---|---|---|
| **Languages** | Python, SQL | Bash | Go |
| **Orchestration** | Prefect | — | Airflow, Dagster |
| **Storage** | MinIO, PostgreSQL, DuckDB | — | Iceberg, Delta Lake |
| **Analytics & BI** | Metabase, Pandas | Amplitude | dbt |
| **Infra** | Docker, Git, Linux | Docker Compose | Kubernetes, Terraform |
| **Methods** | ETL design, RFM, Data modeling | Retention analysis | Streaming, CDC |

**Soft skills strip** (below the matrix, single row of mono pills):
`Technical Communication` · `Analytical Thinking` · `Problem Solving` · `Cross-functional Collaboration` · `Technical Writing`

---

### §07 — Contact

**Layout:** Centered, generous whitespace. Big closing statement.

**Headline (display serif, 4rem):**
> *Let's build something queryable.*

**Sub-copy (body L):**
> Open to data engineering, analytics engineering, and product-ops roles. Remote-first or Indonesia-based.

**Contact rows** (mono, hairline rule between each, click-to-copy on hover):

```
EMAIL          h4fizcareer@gmail.com           [copy]
LINKEDIN       linkedin.com/in/hafizcareer     [↗]
LOCATION       Karawang, West Java, Indonesia
CV (PDF)       /cv.pdf                         [download]
```

**Closing detail:** A small mono timestamp at the bottom: `LAST UPDATED · {{ build_date }}` — auto-generated at build time. Reinforces the data-driven aesthetic.

---

### Footer

Minimal, single line, mono small:

```
© 2026 Muhammad Hafizh Fayiz  ·  Built with Next.js, Tailwind & care  ·  Source on GitHub ↗
```

---

## 5. Technical Spec (for Claude Code)

### 5.1 Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSG for hero/sections, MDX for case studies, easy Vercel deploy |
| Styling | **Tailwind CSS v4** + CSS variables | Token-driven, dark mode via `data-theme` attr |
| Type | `next/font` for Fraunces + Inter + JetBrains Mono | Self-hosted, zero CLS |
| Content | **MDX** under `/content/case-studies/*.mdx` | Author case studies in markdown |
| Charts | **D3** (raw SVG) for hero sparkline + stack diagram; **Recharts** for case-study charts | D3 for bespoke editorial visuals, Recharts for fast standard charts |
| Animation | **Framer Motion** | Scroll-into-view + chart reveals |
| Icons | **Lucide React** | Consistent stroke style fits editorial feel |
| Analytics | **Plausible** or **Vercel Analytics** | Privacy-respecting |
| Deployment | **Vercel** | Standard, free tier sufficient |
| Repo | GitHub, public | Doubles as a portfolio artifact |

### 5.2 File structure

```
portfolio/
├── app/
│   ├── layout.tsx                  ← root layout, font loading, theme provider
│   ├── page.tsx                    ← home (composes all sections)
│   ├── case-studies/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── cv.pdf                      ← static asset
│   └── globals.css                 ← tokens + tailwind base
├── components/
│   ├── nav/Nav.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── SelectedWork.tsx
│   │   ├── StackDiagram.tsx
│   │   ├── SkillsMatrix.tsx
│   │   └── Contact.tsx
│   ├── viz/
│   │   ├── HeroSparkline.tsx
│   │   ├── StackNodeGraph.tsx
│   │   └── RFMScatter.tsx
│   ├── ui/
│   │   ├── SectionLabel.tsx        ← "§ 02 — EXPERIENCE"
│   │   ├── StatBlock.tsx
│   │   ├── Chip.tsx
│   │   ├── HairlineRule.tsx
│   │   └── ThemeToggle.tsx
│   └── mdx/
│       └── mdx-components.tsx
├── content/
│   └── case-studies/
│       ├── unified-ops-data-platform.mdx
│       ├── rfm-segmentation-edutech.mdx
│       └── local-data-stack.mdx
├── lib/
│   ├── case-studies.ts             ← MDX loader, frontmatter parser
│   └── data/
│       └── experience.ts           ← typed CV data
├── public/
│   ├── fonts/
│   ├── images/
│   └── cv.pdf
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

### 5.3 Tailwind config tokens (excerpt)

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        paper: 'var(--bg-paper)',
        elevated: 'var(--bg-elevated)',
        ink: {
          DEFAULT: 'var(--ink-primary)',
          secondary: 'var(--ink-secondary)',
          muted: 'var(--ink-muted)',
        },
        rule: 'var(--rule)',
        'accent-data': 'var(--accent-data)',
        'accent-cool': 'var(--accent-cool)',
        'accent-soft': 'var(--accent-soft)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '1280px' },
    },
  },
}
```

### 5.4 Data model (TypeScript)

```ts
// lib/data/experience.ts
export type Role = {
  company: string
  title: string
  location: string
  remote: boolean
  start: string   // 'YYYY-MM'
  end: string | 'present'
  summary: string
  bullets: string[]
  stack: string[]
}

export type CaseStudy = {
  slug: string
  title: string
  dek: string
  tags: string[]
  year: number
  cover: string   // /images/case-studies/...
  body: string    // MDX
  metrics?: { label: string; value: string }[]
}
```

### 5.5 Performance & quality bar

- Lighthouse: ≥ 95 across Performance / Accessibility / Best Practices / SEO
- LCP < 1.5s on 4G
- Total transferred bytes (above the fold): < 100KB gzipped
- All images served as AVIF/WebP via `next/image`
- Fonts subset to Latin + variable axes only
- Full keyboard nav, visible focus rings (`outline: 2px dashed var(--accent-data)`)
- Color contrast: AAA for body text, AA for large display
- `prefers-reduced-motion` disables all chart animations + scroll effects
- SEO: OG image generated dynamically with `@vercel/og` (large title + role)

### 5.6 Accessibility checklist

- Semantic HTML (`<main>`, `<section>`, `<nav>`, `<article>` for case studies)
- Skip-to-content link
- All SVG diagrams have `<title>` and `<desc>`
- Chart data also available as a `<table>` (visually hidden) for screen readers
- Status pill uses both color and icon
- Theme toggle persists via `localStorage` + respects `prefers-color-scheme`

---

## 6. Content Inventory (final copy ready to ship)

> All copy below is final draft. Drop directly into components.

### Meta

- **Site title:** `Muhammad Hafizh Fayiz — Data Engineer`
- **Meta description:** `Data Engineer & Product Operations Analyst. I build the pipelines that turn scattered operational data into unified, queryable, decision-ready platforms.`
- **OG title:** `Hafizh Fayiz · Data Engineer`
- **OG subtitle:** `Python · Prefect · MinIO · DuckDB · Metabase`

### Reusable strings

- Status pill: `Available for hire`
- CTA primary: `Get in touch →`
- CTA secondary: `View case studies`
- Footer build label: `LAST UPDATED — {{ build_date }}`

---

## 7. Brief for Design Generators (Figma AI / v0 / Lovable)

> Copy-paste the block below into a design generator if you'd rather generate the visual mock first.

```
Generate a portfolio website for a Data Engineer named Muhammad Hafizh Fayiz.

STYLE: Editorial, data-driven, paper-like off-white background (#FAFAF7) with deep ink text (#0E0E0E) and a warm orange accent (#FF5B1F). The aesthetic is "data magazine" — Pudding.cool meets Stripe meets a Metabase dashboard. Light mode primary, dark mode optional.

TYPOGRAPHY: Fraunces (display serif) for headings, Inter for body, JetBrains Mono for labels and data. Strong type hierarchy. Numbers and metrics are rendered LARGE in display type.

LAYOUT: 12-column grid, max width 1280px, generous whitespace, hairline rules between sections. Each section is prefixed with a mono label like "§ 02 — EXPERIENCE".

SECTIONS (in order):
1. Sticky nav with monogram, anchor links, "Available for hire" status pill.
2. Hero: Big serif headline "I build the pipelines that turn scattered ops data into decisions." + a small editorial "stat block" on the right with three KPIs (12+ pipelines, 5 departments unified, 3.54 GPA).
3. About: Two-column editorial spread — square portrait left, bio prose right, with a pull-quote.
4. Experience: Vertical timeline with two roles at PT Boer Technology, each showing dates in mono, role title in serif, quantified bullet points, and stack chips.
5. Selected Work: 2-column grid of three case-study cards, each with an editorial diagram on top (node graph / scatter plot / docker stack).
6. Tech Stack: Full-width SVG flow diagram showing APIs → Prefect → MinIO → DuckDB → Metabase with animated dotted flow lines.
7. Skills Matrix: Actual table with mono headers, hairline rules, and a row of mono "soft skill" pills below.
8. Contact: Big serif closing line "Let's build something queryable." + monospace contact rows (email, LinkedIn, location, CV).
9. Footer: Single mono line.

MOOD KEYWORDS: editorial, magazine layout, data viz as content, hairline rules, mono labels, paper background, restrained orange accent, big numbers, generous whitespace, no gradients, no glow effects, no shadows beyond 1px.

REFERENCES: Pudding.cool, Bloomberg Originals, Stripe.com, Vercel.com, Linear.app, The Markup.
```

---

## 8. Open questions / things Hafizh needs to provide

1. **Portrait photo** (square, neutral background) — or confirm we generate an abstract node-graph avatar instead.
2. **Case study write-ups** — long-form text for the three deep-dive pages (suggested outline: Problem · Approach · Architecture · Outcome · Reflection).
3. **Real metrics** — exact numbers behind "12+ pipelines", "10k+ learners" etc. so the hero stat block stays truthful.
4. **GitHub username** (for the footer link).
5. **Custom domain** — `hafizhfayiz.com`? `hafiz.dev`? `hfayiz.com`?
6. **Confirm "Available for hire"** is OK to display publicly (or swap for "Open to opportunities").

---

## 9. Build phases (suggested)

| Phase | Deliverable | Effort |
|---|---|---|
| 1 | Next.js + Tailwind scaffold, tokens, font loading, theme toggle | 0.5 day |
| 2 | Static sections: Nav, Hero, About, Experience, Skills, Contact, Footer | 1.5 days |
| 3 | Stack diagram SVG + hero sparkline (D3) | 1 day |
| 4 | Case study cards + MDX route + 3 first write-ups | 1.5 days |
| 5 | Polish: accessibility audit, OG image generation, performance pass, dark mode QA | 1 day |
| 6 | Deploy to Vercel + custom domain + analytics | 0.5 day |
| **Total** | | **~6 days** |

---

*End of spec — ready to hand to Claude Code or paste into a design generator.*
