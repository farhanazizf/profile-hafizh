import { useMemo } from 'react'
import { line, curveMonotoneX, scaleLinear } from 'd3'

type Props = {
  /** Representative series; defaults to an organic upward "data flowing" curve. */
  points?: number[]
  width?: number
  height?: number
  className?: string
  /** Background mode = faint + thin (hero); inline = small sparkline. */
  variant?: 'background' | 'inline'
}

const DEFAULT_SERIES = [
  4, 6, 5, 9, 8, 13, 11, 17, 16, 22, 19, 27, 24, 33, 38, 35, 44, 41, 52, 58, 55, 67,
]

export default function HeroSparkline({
  points = DEFAULT_SERIES,
  width = 720,
  height = 240,
  className = '',
  variant = 'background',
}: Props) {
  const { d, area } = useMemo(() => {
    const x = scaleLinear()
      .domain([0, points.length - 1])
      .range([0, width])
    const y = scaleLinear()
      .domain([Math.min(...points), Math.max(...points)])
      .range([height - 6, 6])
    const gen = line<number>()
      .x((_, i) => x(i))
      .y((v) => y(v))
      .curve(curveMonotoneX)
    const path = gen(points) ?? ''
    const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`
    return { d: path, area: areaPath }
  }, [points, width, height])

  const inline = variant === 'inline'

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {!inline && (
        <path d={area} fill="var(--color-accent-data)" opacity={0.05} />
      )}
      <path
        d={d}
        fill="none"
        stroke="var(--color-accent-data)"
        strokeWidth={inline ? 2 : 1.5}
        strokeLinecap="round"
        opacity={inline ? 0.9 : 0.55}
        className="spark-draw"
        pathLength={1}
      />
    </svg>
  )
}
