import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import SelectedWork from '../components/sections/SelectedWork'
import StackDiagram from '../components/sections/StackDiagram'
import SkillsMatrix from '../components/sections/SkillsMatrix'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'
import Reveal from '../components/ui/Reveal'
import SeoHead from '../components/ui/SeoHead'
import { buildMeta, personJsonLd, DEFAULTS } from '../lib/seo'

const meta = buildMeta({
  title: DEFAULTS.siteTitle,
  description: DEFAULTS.description,
  path: '/',
})

export default function Home() {
  return (
    <>
      <SeoHead meta={meta} jsonLd={personJsonLd()} />
      <main id="main">
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <SelectedWork />
        </Reveal>
        <Reveal>
          <StackDiagram />
        </Reveal>
        <Reveal>
          <SkillsMatrix />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  )
}
