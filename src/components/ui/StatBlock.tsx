type Props = {
  label: string
  value: string
  note: string
}

/** Magazine-sidebar KPI: mono label, big display number, hairline, note. */
export default function StatBlock({ label, value, note }: Props) {
  return (
    <div className="flex flex-col gap-2 py-5">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </span>
      <span
        className="font-display font-semibold leading-none tracking-tight text-ink"
        style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)' }}
      >
        {value}
      </span>
      <span className="h-px w-full bg-rule/60" aria-hidden="true" />
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink-muted">
        {note}
      </span>
    </div>
  )
}
