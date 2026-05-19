// Postbuild: write dist/sitemap.xml from the case-study MDX files + home.
import { readdirSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://hafizh.web.id').replace(/\/$/, '')
const contentDir = fileURLToPath(new URL('../src/content/case-studies', import.meta.url))
const distDir = fileURLToPath(new URL('../dist', import.meta.url))

if (!existsSync(distDir)) {
  console.error('[gen-sitemap] dist/ not found — run build first')
  process.exit(1)
}

const slugs = readdirSync(contentDir)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => f.replace(/\.mdx$/, ''))

const today = new Date().toISOString().slice(0, 10)
const urls = ['/', ...slugs.map((s) => `/case-studies/${s}`)]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${SITE_URL}${u === '/' ? '' : u}</loc><lastmod>${today}</lastmod></url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(`${distDir}/sitemap.xml`, xml)
console.log(`[gen-sitemap] wrote dist/sitemap.xml with ${urls.length} urls`)
