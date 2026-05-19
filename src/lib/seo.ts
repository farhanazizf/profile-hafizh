import { contact, person } from './data/experience'

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://hafizh.web.id'
).replace(/\/$/, '')

export const DEFAULTS = {
  siteTitle: 'Muhammad Hafizh Fayiz — Data Engineer',
  description:
    'Data Engineer & Product Operations Analyst. I build the pipelines that turn scattered operational data into unified, queryable, decision-ready platforms.',
  ogImage: '/og.png',
} as const

export type Meta = {
  title: string
  description: string
  canonical: string
  image: string
  og: Record<string, string>
  twitter: Record<string, string>
}

export function canonicalUrl(path: string): string {
  if (!path || path === '/') return SITE_URL
  return SITE_URL + '/' + path.replace(/^\/+/, '').replace(/\/$/, '')
}

export function buildMeta(input: {
  title: string
  description: string
  path: string
  image?: string
}): Meta {
  const url = canonicalUrl(input.path)
  const image = SITE_URL + (input.image ?? DEFAULTS.ogImage)
  return {
    title: input.title,
    description: input.description,
    canonical: url,
    image,
    og: {
      'og:type': 'website',
      'og:site_name': DEFAULTS.siteTitle,
      'og:title': input.title,
      'og:description': input.description,
      'og:url': url,
      'og:image': image,
    },
    twitter: {
      'twitter:card': 'summary_large_image',
      'twitter:title': input.title,
      'twitter:description': input.description,
      'twitter:image': image,
    },
  }
}

export type PersonJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string
  jobTitle: string
  email: string
  url: string
  sameAs: string[]
  address: string
  alumniOf: string
}

export function personJsonLd(): PersonJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: 'Data Engineer',
    email: `mailto:${contact.email}`,
    url: SITE_URL,
    sameAs: [`https://${contact.linkedin}`],
    address: contact.location,
    alumniOf: 'Universitas Pakuan',
  }
}
