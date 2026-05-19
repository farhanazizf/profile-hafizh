import SectionLabel from '../ui/SectionLabel'
import HairlineRule from '../ui/HairlineRule'
import Chip from '../ui/Chip'
import HeroSparkline from '../viz/HeroSparkline'
import { roles } from '../../lib/data/experience'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20">
      <HairlineRule />
      <div className="shell py-24 md:py-32">
        <SectionLabel index="03" label="Experience" />

        <ol className="mt-12 border-l border-rule/50">
          {roles.map((role) => (
            <li key={`${role.title}-${role.start}`} className="relative pb-14 pl-8 last:pb-0 md:pl-12">
              <span className="absolute -left-[5px] top-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-accent-data opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-rule bg-accent-data" />
              </span>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                <div className="md:col-span-3">
                  <p className="tabular font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-muted">
                    {role.dateLabel}
                  </p>
                  <div className="mt-6 hidden h-10 w-28 md:block">
                    <HeroSparkline variant="inline" className="h-full w-full" />
                  </div>
                </div>

                <div className="md:col-span-9">
                  <h3 className="text-h3 text-ink">{role.title}</h3>
                  <p className="mt-1 font-mono text-sm text-ink-secondary">
                    {role.company} — {role.location}
                  </p>
                  <p className="mt-4 text-body-l text-ink-secondary">{role.summary}</p>

                  <ul className="mt-5 space-y-3">
                    {role.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-ink-secondary">
                        <span className="mt-2 h-px w-4 shrink-0 bg-accent-data" aria-hidden="true" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {role.stack.map((s) => (
                      <Chip key={s} as="li">
                        {s}
                      </Chip>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
