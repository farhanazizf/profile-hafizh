import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { initAnalytics, trackPageview } from './lib/analytics'
import Nav from './components/nav/Nav'

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackPageview(pathname)
  }, [pathname])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-elevated focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink focus:no-underline"
      >
        Skip to content
      </a>
      <div className="grain-overlay" aria-hidden="true" />
      <span id="top" />
      <Nav />
      <Outlet />
    </>
  )
}
