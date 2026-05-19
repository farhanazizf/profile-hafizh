import type { ComponentType } from 'react'

export type CaseStudyMetric = { label: string; value: string }

export type CaseStudyFrontmatter = {
  slug: string
  title: string
  dek: string
  tags: string[]
  year: number
  cover: string
  metrics?: CaseStudyMetric[]
}

export type CaseStudy = CaseStudyFrontmatter & {
  Component: ComponentType
}

type MdxModule = {
  default: ComponentType
  frontmatter: CaseStudyFrontmatter
}

const modules = import.meta.glob<MdxModule>('../content/case-studies/*.mdx', {
  eager: true,
})

const studies: CaseStudy[] = Object.values(modules)
  .map((m) => ({ ...m.frontmatter, Component: m.default }))
  .sort((a, b) => b.year - a.year)

export function listCaseStudies(): CaseStudy[] {
  return studies
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return studies.find((s) => s.slug === slug)
}
