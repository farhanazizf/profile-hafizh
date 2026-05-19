type Props = {
  children: React.ReactNode
  as?: 'span' | 'li'
}

/** Mono pill tag — 1px rule border, accent-soft on hover (spec §03/§06). */
export default function Chip({ children, as = 'span' }: Props) {
  const Tag = as
  return (
    <Tag className="inline-flex items-center rounded-full border border-rule/50 px-3 py-1 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-ink-secondary transition-colors duration-200 hover:bg-accent-soft hover:text-ink">
      {children}
    </Tag>
  )
}
