import { describe, it, expect } from 'vitest'
import { listCaseStudies, getCaseStudy } from './case-studies'

describe('case studies', () => {
  it('loads all three with required frontmatter', () => {
    const all = listCaseStudies()
    expect(all.map((c) => c.slug).sort()).toEqual([
      'local-data-stack',
      'rfm-segmentation-edutech',
      'unified-ops-data-platform',
    ])
    for (const c of all) {
      expect(c.title).toBeTruthy()
      expect(c.dek).toBeTruthy()
      expect(c.tags.length).toBeGreaterThan(0)
      expect(typeof c.year).toBe('number')
      expect(typeof c.Component).toBe('function')
    }
  })

  it('is sorted newest-year first', () => {
    const years = listCaseStudies().map((c) => c.year)
    expect([...years].sort((a, b) => b - a)).toEqual(years)
  })

  it('getCaseStudy returns one entry or undefined', () => {
    expect(getCaseStudy('unified-ops-data-platform')?.title).toBeTruthy()
    expect(getCaseStudy('does-not-exist')).toBeUndefined()
  })
})
