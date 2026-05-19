import SectionLabel from '../ui/SectionLabel'
import HairlineRule from '../ui/HairlineRule'
import StackNodeGraph from '../viz/StackNodeGraph'

export default function StackDiagram() {
  return (
    <section id="stack" className="scroll-mt-20">
      <HairlineRule />
      <div className="shell py-24 md:py-32">
        <SectionLabel index="05" label="Stack" />
        <div className="mt-12">
          <StackNodeGraph />
        </div>
        <p className="mt-8 max-w-xl font-mono text-sm text-ink-muted">
          Every pipeline I ship lives somewhere on this diagram. Hover a node to
          see how I use it.
        </p>
      </div>
    </section>
  )
}
