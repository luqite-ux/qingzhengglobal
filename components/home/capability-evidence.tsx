import Image from 'next/image'
import type { FacilityEvidence } from '@/lib/data/media'
import { CtaLink } from '@/components/site/cta-link'
import { Reveal } from '@/components/site/reveal'
import { Section, SectionHeader } from '@/components/site/section'

function EvidenceFigure({
  item,
  index,
  sizes,
  priority = false,
}: {
  item: FacilityEvidence
  index: number
  sizes: string
  priority?: boolean
}) {
  return (
    <Reveal as="figure" index={index} className="m-0">
      <div className="overflow-hidden rounded-md bg-graphite-2">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-4 max-w-md">
        <span className="eyebrow block text-gold-deep">{item.label}</span>
        <span className="mt-2 block text-sm leading-relaxed text-ink-muted">{item.caption}</span>
      </figcaption>
    </Reveal>
  )
}

/** Natural-ratio figures: every subject stays complete and undistorted. */
export function EvidenceGrid({ evidence }: { evidence: FacilityEvidence[] }) {
  const byId = new Map(evidence.map((item) => [item.id, item]))
  const office = byId.get('engineering-office')
  const workshop = byId.get('workshop-floor')
  const machining = byId.get('machining-area')
  const warehouse = byId.get('warehouse')
  const extras = evidence.filter(
    (item) => !['engineering-office', 'workshop-floor', 'machining-area', 'warehouse'].includes(item.id),
  )

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
      {workshop ? (
        <div className="lg:col-span-5">
          <EvidenceFigure item={workshop} index={0} sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      ) : null}
      <div className="grid gap-10 lg:col-span-7">
        {office ? <EvidenceFigure item={office} index={1} sizes="(min-width: 1024px) 55vw, 100vw" /> : null}
        <div className="grid gap-10 sm:grid-cols-2">
          {machining ? <EvidenceFigure item={machining} index={2} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw" /> : null}
          {warehouse ? <EvidenceFigure item={warehouse} index={3} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw" /> : null}
        </div>
        {extras.length ? (
          <div className="grid gap-10 sm:grid-cols-2">
            {extras.map((item, index) => (
              <EvidenceFigure key={item.id} item={item} index={index} sizes="(min-width: 640px) 45vw, 100vw" />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function CapabilityEvidence({ evidence }: { evidence: FacilityEvidence[] }) {
  return (
    <Section id="capability-evidence" tone="paper" labelledBy="capability-evidence-title">
      <SectionHeader
        id="capability-evidence-title"
        eyebrow="Capabilities"
        title="Where your equipment is designed, machined and assembled"
        description="The engineering office, the workshop floor, the machining area and the warehouse that support each project."
        action={
          <CtaLink href="/capabilities" variant="outlineDark">
            View capabilities
          </CtaLink>
        }
      />
      <EvidenceGrid evidence={evidence} />
    </Section>
  )
}
