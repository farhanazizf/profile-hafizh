import { Link } from 'react-router-dom'
import SectionLabel from '../ui/SectionLabel'
import HairlineRule from '../ui/HairlineRule'
import RFMScatter from '../viz/RFMScatter'
import { listCaseStudies } from '../../lib/case-studies'

function NodeGraphCover() {
  const n = [
    [30, 30], [30, 90], [110, 60], [190, 35], [190, 85], [260, 60],
  ]
  const e = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5]]
  return (
    <svg viewBox="0 0 290 120" className="h-full w-full" aria-hidden="true">
      {e.map(([a, b], i) => (
        <line key={i} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke="var(--color-ink-muted)" strokeWidth="1" strokeDasharray="3 4" />
      ))}
      {n.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="11" fill="var(--color-elevated)" stroke="var(--color-ink)" strokeWidth="1.2" />
      ))}
    </svg>
  )
}

function DockerStackCover() {
  return (
    <svg viewBox="0 0 290 120" className="h-full w-full" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={70} y={18 + i * 32} width={150} height={24} rx={3} fill="var(--color-elevated)" stroke="var(--color-ink)" strokeWidth="1.2" />
          <rect x={70} y={18 + i * 32} width={6} height={24} fill="var(--color-accent-data)" />
        </g>
      ))}
    </svg>
  )
}

function Cover({ cover }: { cover: string }) {
  if (cover === 'rfm-scatter')
    return (
      <div className="pointer-events-none scale-95">
        <RFMScatter />
      </div>
    )
  if (cover === 'docker-stack') return <DockerStackCover />
  return <NodeGraphCover />
}

export default function SelectedWork() {
  const studies = listCaseStudies()
  const trackPointer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section id="work" className="scroll-mt-20">
      <HairlineRule />
      <div className="shell py-24 md:py-32">
        <SectionLabel index="04" label="Selected Work" />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule/50 bg-rule/30 md:grid-cols-2">
          {studies.map((s) => (
            <Link
              key={s.slug}
              to={`/case-studies/${s.slug}`}
              onMouseMove={trackPointer}
              className="spotlight tactile group flex flex-col bg-paper p-8 hover:bg-accent-soft hover:shadow-[0_24px_50px_-24px_color-mix(in_srgb,var(--color-ink)_22%,transparent)]"
            >
              <div className="grid h-40 place-items-center overflow-hidden border-b border-rule/40 pb-4">
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                  <Cover cover={s.cover} />
                </div>
              </div>
              <h3 className="mt-6 font-display text-2xl text-ink">{s.title}</h3>
              <p className="mt-3 flex-1 text-ink-secondary">{s.dek}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="tabular font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-muted">
                  {s.year} · {s.tags.join(' · ')}
                </span>
                <span className="font-mono text-accent-data opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
