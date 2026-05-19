import { useEffect, useState } from 'react'
import ThemeToggle from '../ui/ThemeToggle'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

function StatusPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-rule/40 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink-secondary">
      <span className="relative grid h-2 w-2 place-items-center" aria-hidden="true">
        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[var(--color-success)] opacity-60" />
        <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
      </span>
      Available for hire
    </span>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.6] },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-rule/60 bg-paper/85 backdrop-blur-md">
      <nav className="shell flex h-16 items-center justify-between" aria-label="Primary">
        <a
          href="#top"
          className="font-mono text-lg font-bold tracking-tight text-ink"
          aria-label="Back to top"
        >
          HF<span className="text-accent-data">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const isActive = active === l.href.slice(1)
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative py-1 font-mono text-[0.78rem] uppercase tracking-[0.12em] transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-accent-data transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <StatusPill />
          </div>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full border border-rule/50 text-ink-secondary md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-rule/40 bg-paper md:hidden">
          <ul className="shell flex flex-col py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-[0.12em] text-ink-secondary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <StatusPill />
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
