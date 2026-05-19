type Props = {
  index: string
  label: string
  id?: string
}

/** Editorial section marker: "§ 02 — EXPERIENCE" (spec §2.4). */
export default function SectionLabel({ index, label, id }: Props) {
  return (
    <div
      id={id}
      className="flex items-center gap-3 font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-ink-muted"
    >
      <span aria-hidden="true">§</span>
      <span>{index}</span>
      <span className="h-px w-8 bg-rule/60" aria-hidden="true" />
      <span className="text-ink-secondary">{label}</span>
    </div>
  )
}
