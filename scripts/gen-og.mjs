// One-off Open Graph image generator (1200x630). Run: node scripts/gen-og.mjs
// Produces public/og.png. Re-run only if the title/subtitle changes.
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#FAFAF7"/>
  <rect x="0" y="0" width="1200" height="8" fill="#FF5B1F"/>
  <text x="80" y="150" font-family="ui-monospace, monospace" font-size="26"
        letter-spacing="6" fill="#7A7A7A">§ 01 — INDEX</text>
  <text x="76" y="320" font-family="Georgia, 'Times New Roman', serif" font-size="104"
        font-weight="700" fill="#0E0E0E">Hafizh Fayiz</text>
  <text x="80" y="408" font-family="Georgia, serif" font-size="52" fill="#3A3A3A">Data Engineer · Product Ops Analyst</text>
  <rect x="80" y="470" width="120" height="4" fill="#FF5B1F"/>
  <text x="80" y="540" font-family="ui-monospace, monospace" font-size="30"
        letter-spacing="2" fill="#7A7A7A">Python · Prefect · MinIO · DuckDB · Metabase</text>
</svg>`

const png = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(new URL('../public/og.png', import.meta.url), png)
console.log('[gen-og] wrote public/og.png', png.length, 'bytes')
