export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme)
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, theme)
  }
}

export function toggleTheme(current: Theme): Theme {
  const next: Theme = current === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
