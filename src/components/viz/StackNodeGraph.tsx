import { useState } from 'react'

type Node = {
  id: string
  label: string
  use: string
  version: string
}

const SOURCES: Node[] = [
  { id: 'apis', label: 'APIs', use: 'External REST endpoints — partner platforms and SaaS tools.', version: 'REST / JSON' },
  { id: 'sheets', label: 'Spreadsheets', use: 'Manual ops trackers maintained by project managers.', version: 'Sheets / XLSX' },
  { id: 'pg', label: 'PostgreSQL', use: 'Transactional product databases.', version: 'PostgreSQL 16' },
  { id: 'hooks', label: 'Webhooks', use: 'Event payloads pushed from third-party services.', version: 'HTTP push' },
]

const PIPE: Node[] = [
  { id: 'prefect', label: 'Prefect', use: 'Orchestrates extract + transform as tasks, flows, and deployments.', version: 'Prefect 2.x' },
  { id: 'minio', label: 'MinIO', use: 'S3-compatible object storage — the raw + processed data lake.', version: 'MinIO (S3 API)' },
  { id: 'duckdb', label: 'DuckDB', use: 'In-process analytical query engine over the lake.', version: 'DuckDB 1.x' },
  { id: 'metabase', label: 'Metabase', use: 'BI layer — dashboards every department reads from.', version: 'Metabase OSS' },
]

const ALL = [...SOURCES, ...PIPE]

const W = 1000
const SRC_Y = 70
const srcX = (i: number) => 130 + i * 247
const PIPE_X = W / 2
const pipeY = (i: number) => 230 + i * 150

export default function StackNodeGraph() {
  const [active, setActive] = useState<string | null>(null)
  const current = ALL.find((n) => n.id === active) ?? null

  const NodeBox = ({
    node,
    x,
    y,
    w = 150,
  }: {
    node: Node
    x: number
    y: number
    w?: number
  }) => {
    const on = active === node.id
    return (
      <g
        transform={`translate(${x - w / 2}, ${y - 26})`}
        tabIndex={0}
        role="button"
        aria-label={`${node.label}: ${node.use}`}
        onMouseEnter={() => setActive(node.id)}
        onMouseLeave={() => setActive((a) => (a === node.id ? null : a))}
        onFocus={() => setActive(node.id)}
        onBlur={() => setActive((a) => (a === node.id ? null : a))}
        style={{ cursor: 'crosshair' }}
      >
        <rect
          width={w}
          height={52}
          rx={4}
          fill={on ? 'var(--color-accent-soft)' : 'var(--color-elevated)'}
          stroke={on ? 'var(--color-accent-data)' : 'var(--color-ink)'}
          strokeWidth={1.25}
        />
        <text
          x={w / 2}
          y={31}
          textAnchor="middle"
          className="font-mono"
          fontSize={15}
          fill="var(--color-ink)"
          letterSpacing="0.04em"
        >
          {node.label}
        </text>
      </g>
    )
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} 800`}
        className="w-full"
        role="img"
        aria-labelledby="stack-title stack-desc"
      >
        <title id="stack-title">Data stack flow diagram</title>
        <desc id="stack-desc">
          Four sources — APIs, spreadsheets, PostgreSQL, and webhooks — flow into
          Prefect for orchestration, then into MinIO object storage, then DuckDB
          for querying, and finally Metabase for dashboards.
        </desc>

        {/* source → prefect converging flow lines */}
        {SOURCES.map((s, i) => (
          <path
            key={s.id}
            d={`M ${srcX(i)} ${SRC_Y + 26} C ${srcX(i)} 150, ${PIPE_X} 150, ${PIPE_X} ${pipeY(0) - 26}`}
            fill="none"
            stroke="var(--color-accent-data)"
            strokeWidth={1.5}
            strokeDasharray="2 6"
            strokeLinecap="round"
            className="flow-line"
            opacity={0.7}
          />
        ))}
        {/* pipeline vertical flow lines */}
        {PIPE.slice(0, -1).map((p, i) => (
          <line
            key={p.id}
            x1={PIPE_X}
            y1={pipeY(i) + 26}
            x2={PIPE_X}
            y2={pipeY(i + 1) - 26}
            stroke="var(--color-accent-data)"
            strokeWidth={1.5}
            strokeDasharray="2 6"
            strokeLinecap="round"
            className="flow-line"
          />
        ))}

        {SOURCES.map((s, i) => (
          <NodeBox key={s.id} node={s} x={srcX(i)} y={SRC_Y} w={190} />
        ))}
        {PIPE.map((p, i) => (
          <NodeBox key={p.id} node={p} x={PIPE_X} y={pipeY(i)} w={200} />
        ))}
      </svg>

      {/* hover/focus detail — also serves as the live region */}
      <div
        className="mt-6 min-h-[3.5rem] border-l-2 border-accent-data bg-accent-soft px-5 py-4"
        aria-live="polite"
      >
        {current ? (
          <p className="font-mono text-sm text-ink">
            <span className="text-accent-data">{current.label}</span>{' '}
            <span className="text-ink-muted">({current.version})</span> —{' '}
            <span className="text-ink-secondary">{current.use}</span>
          </p>
        ) : (
          <p className="font-mono text-sm text-ink-muted">
            Hover or focus a node to see how I use it.
          </p>
        )}
      </div>

      {/* Screen-reader equivalent of the flow */}
      <table className="sr-only">
        <caption>Data stack pipeline stages</caption>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Tool</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {ALL.map((n) => (
            <tr key={n.id}>
              <td>{SOURCES.includes(n) ? 'Source' : 'Pipeline'}</td>
              <td>{n.label}</td>
              <td>{n.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
