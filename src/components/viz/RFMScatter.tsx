import { useMemo } from 'react'
import { scaleLinear } from 'd3'

type Point = { r: number; f: number; m: number; seg: 'Champion' | 'At-Risk' | 'Hibernating' }

// Representative (non-round) cohort data — illustrative, not production figures.
const DATA: Point[] = [
  { r: 92, f: 41, m: 38, seg: 'Champion' },
  { r: 88, f: 36, m: 47, seg: 'Champion' },
  { r: 79, f: 29, m: 22, seg: 'Champion' },
  { r: 71, f: 24, m: 31, seg: 'Champion' },
  { r: 58, f: 19, m: 17, seg: 'At-Risk' },
  { r: 49, f: 22, m: 26, seg: 'At-Risk' },
  { r: 44, f: 14, m: 12, seg: 'At-Risk' },
  { r: 37, f: 17, m: 21, seg: 'At-Risk' },
  { r: 26, f: 9, m: 7, seg: 'Hibernating' },
  { r: 19, f: 6, m: 11, seg: 'Hibernating' },
  { r: 13, f: 4, m: 5, seg: 'Hibernating' },
  { r: 8, f: 7, m: 9, seg: 'Hibernating' },
]

const W = 460
const H = 300
const PAD = 36

export default function RFMScatter() {
  const { x, y, rad } = useMemo(() => {
    return {
      x: scaleLinear().domain([0, 100]).range([PAD, W - PAD]),
      y: scaleLinear().domain([0, 45]).range([H - PAD, PAD]),
      rad: scaleLinear().domain([0, 50]).range([4, 16]),
    }
  }, [])

  const color = (s: Point['seg']) =>
    s === 'Champion'
      ? 'var(--color-accent-data)'
      : s === 'At-Risk'
        ? 'var(--color-accent-cool)'
        : 'var(--color-ink-muted)'

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-labelledby="rfm-title rfm-desc"
      >
        <title id="rfm-title">RFM segmentation scatter plot</title>
        <desc id="rfm-desc">
          Learners plotted by recency against frequency, point size by monetary
          value, coloured by segment: Champion, At-Risk, and Hibernating.
        </desc>

        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--color-rule)" strokeWidth={1} />
        <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="var(--color-rule)" strokeWidth={1} />
        <text x={W / 2} y={H - 6} textAnchor="middle" className="font-mono" fontSize={10} fill="var(--color-ink-muted)">
          RECENCY →
        </text>
        <text x={12} y={H / 2} textAnchor="middle" className="font-mono" fontSize={10} fill="var(--color-ink-muted)" transform={`rotate(-90 12 ${H / 2})`}>
          FREQUENCY →
        </text>

        {DATA.map((p, i) => (
          <circle
            key={i}
            cx={x(p.r)}
            cy={y(p.f)}
            r={rad(p.m)}
            fill={color(p.seg)}
            fillOpacity={0.22}
            stroke={color(p.seg)}
            strokeWidth={1.25}
          />
        ))}
      </svg>

      <table className="sr-only">
        <caption>RFM data points</caption>
        <thead>
          <tr><th>Segment</th><th>Recency</th><th>Frequency</th><th>Monetary</th></tr>
        </thead>
        <tbody>
          {DATA.map((p, i) => (
            <tr key={i}>
              <td>{p.seg}</td><td>{p.r}</td><td>{p.f}</td><td>{p.m}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
