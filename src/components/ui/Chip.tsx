type Props = {
  children: React.ReactNode
  as?: 'span' | 'li'
}

/** Mono pill tag — 1px rule border, accent-soft on hover (spec §03/§06). */
export default function Chip({ children, as = 'span' }: Props) {
  const Tag = as
  return (
    <Tag className="tactile inline-flex items-center rounded-full border border-rule/50 px-3 py-1 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-ink-secondary hover:-translate-y-0.5 hover:border-accent-data/50 hover:bg-accent-soft hover:text-ink">
      {children}
    </Tag>
  )
}
