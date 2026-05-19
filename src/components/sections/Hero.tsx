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

          <motion.h1
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-8 font-display font-semibold tracking-[-0.03em] text-ink [font-optical-sizing:auto]"
            style={{ fontSize: 'clamp(3.25rem, 8.5vw, 6rem)', lineHeight: 0.95 }}
          >
            {person.name.split(' ')[0]}
            <br />
            {person.name.split(' ').slice(1).join(' ')}
          </motion.h1>

          <motion.div
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.8125rem] uppercase tracking-[0.18em] text-ink-muted"
          >
            <span className="text-ink-secondary">Data Engineer</span>
            <span aria-hidden="true">·</span>
            <span>Product Ops Analyst</span>
            <span aria-hidden="true">·</span>
            <span>Karawang, ID — Open to remote</span>
          </motion.div>

          <motion.p
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-10 max-w-2xl font-display text-ink-secondary"
            style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)', lineHeight: 1.25 }}
          >
            I build the pipelines that turn scattered ops data into{' '}
            <span className="relative inline-block whitespace-nowrap font-medium text-ink">
              decisions.
              <motion.span
                className="absolute -bottom-1 left-0 h-[0.1em] w-full origin-left bg-accent-data"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.95 }}
              />
            </span>
          </motion.p>

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
