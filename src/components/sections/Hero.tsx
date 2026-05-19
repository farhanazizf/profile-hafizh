import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import StatBlock from '../ui/StatBlock'
import HeroSparkline from '../viz/HeroSparkline'
import { kpis, person } from '../../lib/data/experience'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]
const rise = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: 0.15 + i * 0.09 },
  }),
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-guides pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-24 opacity-90" aria-hidden="true">
        <HeroSparkline className="h-full w-full" />
      </div>

      <div className="shell relative grid grid-cols-1 gap-12 pb-24 pt-20 md:grid-cols-12 md:pb-32 md:pt-28">
        <div className="md:col-span-8">
          <SectionLabel index="01" label="Index" />

          <motion.p
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-8 font-mono text-sm uppercase tracking-[0.2em] text-ink-muted"
          >
            {person.name}
          </motion.p>

          <h1 className="mt-5 text-h1 text-ink">
            <motion.span custom={1} variants={rise} initial="hidden" animate="show" className="block">
              I build the pipelines
            </motion.span>
            <motion.span custom={2} variants={rise} initial="hidden" animate="show" className="block">
              that turn scattered ops
            </motion.span>
            <motion.span custom={3} variants={rise} initial="hidden" animate="show" className="block">
              data into{' '}
              <span className="relative inline-block">
                decisions.
                <motion.span
                  className="absolute -bottom-1 left-0 h-[0.14em] w-full origin-left bg-accent-data"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease, delay: 1.05 }}
                />
              </span>
            </motion.span>
          </h1>

          <motion.div
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-10 space-y-1 font-mono text-sm uppercase tracking-[0.12em] text-ink-secondary"
          >
            <p>Data Engineer · Product Ops Analyst</p>
            <p className="text-ink-muted">Karawang, Indonesia · Open to remote</p>
          </motion.div>

          <motion.div
            custom={5}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-data px-6 py-3 font-mono text-sm uppercase tracking-[0.1em] text-[#fafaf7] transition-transform duration-200 active:scale-[0.98]"
            >
              Get in touch
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 border-b border-rule/60 pb-1 font-mono text-sm uppercase tracking-[0.1em] text-ink-secondary transition-colors hover:border-accent-data hover:text-accent-data"
            >
              View case studies
            </a>
          </motion.div>
        </div>

        <motion.div
          custom={4}
          variants={rise}
          initial="hidden"
          animate="show"
          className="md:col-span-4 md:border-l md:border-rule/40 md:pl-8"
        >
          <div className="divide-y divide-rule/40">
            {kpis.map((k) => (
              <StatBlock key={k.label} {...k} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
