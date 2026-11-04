import type { ProcessStage } from '@/lib/data/content'
import { ProcessPath } from '@/components/home/process-path'
import { Section, SectionHeader } from '@/components/site/section'

export function EngineeringProcess({ stages }: { stages: ProcessStage[] }) {
  return (
    <Section id="engineering-process" tone="dark" labelledBy="engineering-process-title">
      <SectionHeader
        id="engineering-process-title"
        tone="dark"
        eyebrow="Engineering process"
        title="From requirement to delivery, in four aligned stages"
        description="Each stage is confirmed with your team before the next begins, so scope, design and handover stay consistent."
      />
      <ProcessPath stages={stages} />
    </Section>
  )
}
