import SectionLabel from '../ui/SectionLabel'
import HairlineRule from '../ui/HairlineRule'

function NodeGraphAvatar() {
  // Abstract data-stack node graph used in place of a portrait (spec §02/§8).
  const nodes = [
    { id: 'API', x: 40, y: 46 },
    { id: 'CSV', x: 40, y: 150 },
    { id: 'ETL', x: 150, y: 98 },
    { id: 'LAKE', x: 250, y: 60 },
    { id: 'DB', x: 250, y: 150 },
    { id: 'BI', x: 340, y: 110 },
  ]
  const edges = [
    ['API', 'ETL'], ['CSV', 'ETL'], ['ETL', 'LAKE'], ['ETL', 'DB'], ['LAKE', 'BI'], ['DB', 'BI'],
  ]
  const at = (id: string) => nodes.find((n) => n.id === id)!

  return (
    <svg
      viewBox="0 0 380 200"
      className="w-full"
      role="img"
      aria-label="Abstract node graph representing a data pipeline: sources flow through an ETL layer into a lake and database, then into business intelligence."
    >
      <defs>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope="0.06" /></feComponentTransfer>
          <feComposite operator="over" in2="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#grain)">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={at(a).x} y1={at(a).y} x2={at(b).x} y2={at(b).y}
            stroke="var(--color-ink-muted)" strokeWidth="1" strokeDasharray="3 4"
          />
        ))}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="20" fill="var(--color-elevated)" stroke="var(--color-ink)" strokeWidth="1.25" />
            <text
              x={n.x} y={n.y + 3} textAnchor="middle"
              className="font-mono" fontSize="9" fill="var(--color-ink-secondary)"
              letterSpacing="0.05em"
            >
              {n.id}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-20">
      <HairlineRule />
      <div className="shell relative grid grid-cols-1 gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="grid-guides pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

        <div className="relative md:col-span-5">
          <div className="aspect-square overflow-hidden border border-rule/50 bg-accent-soft/40 p-6 grayscale">
            <NodeGraphAvatar />
          </div>
        </div>

        <div className="relative md:col-span-7">
          <SectionLabel index="02" label="About" />
          <div className="mt-8 space-y-6 text-body-l text-ink-secondary">
            <p>
              I&rsquo;m a final-year Digital Business student at Universitas Pakuan,
              currently working as a Product Operations Analyst at PT Boer Technology.
              My day-to-day is centralizing data that lives in spreadsheets, third-party
              APIs, and the heads of project managers into a single queryable platform.
            </p>
            <p>
              The work is half engineering, half translation. I write Python and Prefect
              flows that move data from A to B reliably, and I write data dictionaries and
              SOPs so the next person doesn&rsquo;t have to guess what{' '}
              <code className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
                status_2
              </code>{' '}
              means.
            </p>
            <p>
              Outside of pipelines, I dig into product analytics &mdash; RFM segmentation,
              retention curves, the kind of analysis that tells a sales lead which 200
              customers to call this week.
            </p>
          </div>

          <blockquote className="mt-10 border-l-2 border-accent-data bg-accent-soft px-6 py-5">
            <p className="font-display text-2xl italic text-ink md:text-3xl">
              &ldquo;Half engineering, half translation.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
