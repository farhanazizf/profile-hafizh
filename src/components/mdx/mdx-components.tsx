import type { ComponentPropsWithoutRef } from 'react'

type P<T extends keyof React.JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>

export const mdxComponents = {
  h2: (p: P<'h2'>) => (
    <h2
      className="mt-14 mb-4 font-display text-3xl font-semibold tracking-tight text-ink"
      {...p}
    />
  ),
  h3: (p: P<'h3'>) => (
    <h3 className="mt-10 mb-3 font-display text-xl text-ink" {...p} />
  ),
  p: (p: P<'p'>) => (
    <p className="mt-5 text-body-l leading-relaxed text-ink-secondary" {...p} />
  ),
  ul: (p: P<'ul'>) => (
    <ul className="mt-5 space-y-2 pl-5 text-ink-secondary [list-style:square]" {...p} />
  ),
  ol: (p: P<'ol'>) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 text-ink-secondary" {...p} />
  ),
  li: (p: P<'li'>) => (
    <li className="leading-relaxed marker:text-accent-data" {...p} />
  ),
  a: (p: P<'a'>) => (
    <a
      className="border-b border-accent-data text-ink transition-colors hover:text-accent-data"
      {...p}
    />
  ),
  strong: (p: P<'strong'>) => <strong className="font-semibold text-ink" {...p} />,
  blockquote: (p: P<'blockquote'>) => (
    <blockquote
      className="mt-8 border-l-2 border-accent-data bg-accent-soft px-5 py-4 font-mono text-sm uppercase tracking-[0.08em] text-ink-secondary [&>p]:mt-0 [&>p]:text-sm [&>p]:normal-case"
      {...p}
    />
  ),
  code: (p: P<'code'>) => (
    <code
      className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
      {...p}
    />
  ),
  pre: (p: P<'pre'>) => (
    <pre
      className="mt-6 overflow-x-auto rounded border border-rule/50 bg-elevated p-4 font-mono text-sm"
      {...p}
    />
  ),
  hr: () => <hr className="my-10 h-px border-0 bg-rule/60" />,
}
