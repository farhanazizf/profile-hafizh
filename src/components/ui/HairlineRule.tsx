/** Editorial hairline divider — the section signature (spec §2.4). */
export default function HairlineRule({ className = '' }: { className?: string }) {
  return (
    <hr
      className={`border-0 h-px bg-rule/70 ${className}`}
      aria-hidden="true"
    />
  )
}
