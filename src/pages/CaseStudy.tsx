import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { listCaseStudies, getCaseStudy } from '../lib/case-studies'
import { mdxComponents } from '../components/mdx/mdx-components'
import SeoHead from '../components/ui/SeoHead'
import HairlineRule from '../components/ui/HairlineRule'
import Chip from '../components/ui/Chip'
import { buildMeta } from '../lib/seo'

type Heading = { id: string; text: string }

export default function CaseStudy() {
  const { slug = '' } = useParams()
  const study = getCaseStudy(slug)
  const articleRef = useRef<HTMLDivElement>(null)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [minutes, setMinutes] = useState<number | null>(null)

  useEffect(() => {
    const el = articleRef.current
    if (!el) return
    const hs = Array.from(el.querySelectorAll<HTMLHeadingElement>('h2[id]')).map(
      (h) => ({ id: h.id, text: h.textContent ?? '' }),
    )
    setHeadings(hs)
    const words = (el.textContent ?? '').trim().split(/\s+/).length
    setMinutes(Math.max(1, Math.round(words / 200)))
  }, [slug])

  if (!study) {
    return (
      <main id="main" className="shell py-32 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.14em] text-ink-muted">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl text-ink">Case study not found</h1>
        <Link
          to="/#work"
          className="mt-8 inline-block border-b border-accent-data font-mono text-sm text-ink"
        >
          ← Back to selected work
        </Link>
      </main>
    )
  }

  const all = listCaseStudies()
  const idx = all.findIndex((c) => c.slug === study.slug)
  const prev = all[idx - 1]
  const next = all[idx + 1]
  const { Component } = study
  const meta = buildMeta({
    title: `${study.title} — Muhammad Hafizh Fayiz`,
    description: study.dek,
    path: `/case-studies/${study.slug}`,
  })

  return (
    <main id="main">
      <SeoHead meta={meta} />
      <div className="shell grid grid-cols-1 gap-12 py-20 lg:grid-cols-12">
        <article ref={articleRef} className="lg:col-span-8 lg:col-start-1">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink-muted">
            {study.year} ·{' '}
            {minutes ? `${minutes} min read` : '—'} · Case study
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink md:text-6xl">
            {study.title}
          </h1>
          <p className="mt-5 text-body-l text-ink-secondary">{study.dek}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((t) => (
              <Chip key={t} as="li">
                {t}
              </Chip>
            ))}
          </ul>

          {study.metrics && study.metrics.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-rule/50 bg-rule/30 sm:grid-cols-3">
              {study.metrics.map((m) => (
                <div key={m.label} className="bg-paper p-5">
                  <div className="font-display text-2xl text-ink">{m.value}</div>
                  <div className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <HairlineRule className="my-10" />

          <div className="max-w-[68ch]">
            <MDXProvider components={mdxComponents}>
              <Component />
            </MDXProvider>
          </div>

          <HairlineRule className="my-12" />
          <nav className="flex items-center justify-between font-mono text-sm" aria-label="Case study navigation">
            {prev ? (
              <Link to={`/case-studies/${prev.slug}`} className="text-ink-secondary hover:text-accent-data">
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/case-studies/${next.slug}`} className="text-right text-ink-secondary hover:text-accent-data">
                {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>

        <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
          <div className="sticky top-24">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
              On this page
            </p>
            <ul className="mt-4 space-y-2">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="font-mono text-[0.78rem] text-ink-secondary transition-colors hover:text-accent-data"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              to="/#work"
              className="mt-8 inline-block border-b border-rule/60 font-mono text-[0.78rem] text-ink-muted hover:border-accent-data hover:text-accent-data"
            >
              ← All work
            </Link>
          </div>
        </aside>
      </div>
    </main>
  )
}
