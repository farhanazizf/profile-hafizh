import { contact } from '../../lib/data/experience'

export default function Footer() {
  return (
    <footer className="border-t border-rule/60">
      <div className="shell flex flex-col gap-2 py-8 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-muted md:flex-row md:items-center md:justify-between">
        <span>© 2026 Muhammad Hafizh Fayiz</span>
        <span>Built with Vite, React &amp; care</span>
        <a
          href={`https://${contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent-data"
        >
          Source on GitHub ↗
        </a>
      </div>
    </footer>
  )
}
