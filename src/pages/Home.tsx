import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import SkillsMatrix from '../components/sections/SkillsMatrix'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <About />
        <Experience />
        {/* §04 Selected Work — Task 14 */}
        {/* §05 Stack diagram — Task 12 */}
        <SkillsMatrix />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
