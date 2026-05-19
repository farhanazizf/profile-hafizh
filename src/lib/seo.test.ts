import { describe, it, expect } from 'vitest'
import { buildMeta, personJsonLd, SITE_URL } from './seo'

describe('seo', () => {
  it('buildMeta returns title/description/canonical/og/twitter', () => {
    const m = buildMeta({ title: 'X', description: 'D', path: '/case-studies/a' })
    expect(m.title).toBe('X')
    expect(m.description).toBe('D')
    expect(m.canonical).toBe(`${SITE_URL}/case-studies/a`)
    expect(m.og['og:type']).toBe('website')
    expect(m.og['og:title']).toBe('X')
    expect(m.og['og:url']).toBe(`${SITE_URL}/case-studies/a`)
    expect(m.twitter['twitter:card']).toBe('summary_large_image')
  })

  it('normalizes root path without trailing slash', () => {
    expect(buildMeta({ title: 'H', description: 'd', path: '/' }).canonical).toBe(SITE_URL)
  })

  it('personJsonLd is a valid Person schema', () => {
    const ld = personJsonLd()
    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@type']).toBe('Person')
    expect(ld.name).toBe('Muhammad Hafizh Fayiz')
    expect(Array.isArray(ld.sameAs)).toBe(true)
    expect(ld.sameAs[0]).toContain('linkedin.com/in/hafizcareer')
  })
})
