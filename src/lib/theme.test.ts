import { describe, it, expect, beforeEach } from 'vitest'
import { getInitialTheme, applyTheme } from './theme'

function mockMatchMedia(matches: boolean) {
  window.matchMedia = ((query: string) =>
    ({ matches, media: query, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false }) as unknown as MediaQueryList)
}

describe('theme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to light when nothing stored and no dark preference', () => {
    mockMatchMedia(false)
    expect(getInitialTheme()).toBe('light')
  })

  it('uses dark when no stored value but OS prefers dark', () => {
    mockMatchMedia(true)
    expect(getInitialTheme()).toBe('dark')
  })

  it('honors stored theme over media', () => {
    mockMatchMedia(true)
    localStorage.setItem('theme', 'light')
    expect(getInitialTheme()).toBe('light')
  })

  it('applyTheme sets attribute and persists', () => {
    applyTheme('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
