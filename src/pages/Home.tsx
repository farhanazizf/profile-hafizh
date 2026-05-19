import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import SkillsMatrix from '../components/sections/SkillsMatrix'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'
import StackDiagram from '../components/sections/StackDiagram'
import SelectedWork from '../components/sections/SelectedWork'

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <SelectedWork />
        <StackDiagram />
        <SkillsMatrix />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
