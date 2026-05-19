import { useState } from 'react'
import SectionLabel from '../ui/SectionLabel'
import HairlineRule from '../ui/HairlineRule'
import { contact } from '../../lib/data/experience'

const BUILD_DATE =
  import.meta.env.VITE_BUILD_DATE ?? new Date().toISOString().slice(0, 10)

type Row = {
  label: string
  value: string
  href?: string
  action: 'copy' | 'link' | 'download'
}

const ROWS: Row[] = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, action: 'copy' },
  { label: 'LinkedIn', value: contact.linkedin, href: `https://${contact.linkedin}`, action: 'link' },
  { label: 'Location', value: contact.location, action: 'copy' },
  { label: 'CV (PDF)', value: contact.cv, href: contact.cv, action: 'download' },
]

function ContactRow({ row }: { row: Row }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(row.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  const hint =
    row.action === 'link' ? '↗' : row.action === 'download' ? 'download' : copied ? 'copied' : 'copy'

  const content = (
    <>
      <span className="w-28 shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-muted">
        {row.label}
      </span>
      <span className="flex-1 font-mono text-sm text-ink md:text-base">{row.value}</span>
      <span
        className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-muted transition-colors group-hover:text-accent-data"
        aria-live="polite"
      >
        {hint}
      </span>
    </>
  )

  const cls =
    'group flex items-center gap-4 border-b border-rule/40 py-5 text-left transition-colors hover:bg-accent-soft'

  if (row.action === 'copy') {
    return (
      <button type="button" onClick={copy} className={`${cls} w-full`}>
        {content}
      </button>
    )
  }
  return (
    <a
      href={row.href}
      className={cls}
      {...(row.action === 'link'
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : { download: true })}
    >
      {content}
    </a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20">
      <HairlineRule />
      <div className="shell py-24 text-center md:py-36">
        <SectionLabel index="07" label="Contact" />

        <h2 className="mx-auto mt-10 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">
          Let&rsquo;s build something queryable.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-body-l text-ink-secondary">
          Open to data engineering, analytics engineering, and product-ops roles.
          Remote-first or Indonesia-based.
        </p>

        <div className="mx-auto mt-12 max-w-2xl text-left">
          {ROWS.map((r) => (
            <ContactRow key={r.label} row={r} />
          ))}
        </div>

        <p className="mt-12 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">
          Last updated · {BUILD_DATE}
        </p>
      </div>
    </section>
  )
}
