import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-elevated focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink focus:no-underline focus:[outline:2px_dashed_var(--color-accent-data)]"
      >
        Skip to content
      </a>
      <Outlet />
    </>
  )
}
