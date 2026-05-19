import { Head } from 'vite-react-ssg'
import type { Meta } from '../../lib/seo'

type Props = {
  meta: Meta
  jsonLd?: object
}

export default function SeoHead({ meta, jsonLd }: Props) {
  return (
    <Head>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      {Object.entries(meta.og).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      {Object.entries(meta.twitter).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  )
}
