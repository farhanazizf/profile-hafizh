import SectionLabel from '../ui/SectionLabel'
import HairlineRule from '../ui/HairlineRule'
import Chip from '../ui/Chip'
import { skillsMatrix, softSkills } from '../../lib/data/experience'

const COLS = ['Daily', 'Comfortable', 'Learning'] as const

function cell(items: string[]) {
  return items.length ? items.join(', ') : '—'
}

export default function SkillsMatrix() {
  return (
    <section id="skills" className="scroll-mt-20">
      <HairlineRule />
      <div className="shell py-24 md:py-32">
        <SectionLabel index="06" label="Skills" />

        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Skills matrix by category and proficiency
            </caption>
            <thead>
              <tr className="border-b border-rule">
                <th scope="col" className="py-3 pr-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-muted">
                  Category
                </th>
                {COLS.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="py-3 pr-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-muted"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skillsMatrix.map((row) => (
                <tr key={row.category} className="border-b border-rule/40">
                  <th scope="row" className="py-4 pr-6 font-display text-lg text-ink">
                    {row.category}
                  </th>
                  <td className="py-4 pr-6 text-ink-secondary">{cell(row.daily)}</td>
                  <td className="py-4 pr-6 text-ink-secondary">{cell(row.comfortable)}</td>
                  <td className="py-4 pr-6 text-ink-muted">{cell(row.learning)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2">
          {softSkills.map((s) => (
            <Chip key={s} as="li">
              {s}
            </Chip>
          ))}
        </ul>
      </div>
    </section>
  )
}
