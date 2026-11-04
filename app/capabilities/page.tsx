import { PageHero } from '@/components/site/page-hero'
import { CapabilityEvidence } from '@/components/home/capability-evidence'
import { EngineeringProcess } from '@/components/home/engineering-process'
import { CtaLink } from '@/components/site/cta-link'
import { getFacilityEvidence } from '@/lib/data/media'
import { getProcessStages } from '@/lib/data/content'
import { buildMetadata } from '@/lib/seo'

const description = 'Engineering, machining, assembly and coordinated delivery capabilities for customized automotive automation equipment.'
export const metadata = buildMetadata({ title: 'Capabilities', description, path: '/capabilities' })
export default async function CapabilitiesPage() { const [evidence, stages] = await Promise.all([getFacilityEvidence(), getProcessStages()]); return <><PageHero eyebrow="Capabilities" title="Engineering and manufacturing around the project" description={description} crumbs={[{ label: 'Capabilities', href: '/capabilities' }]} image={evidence[0]?.image} actions={<CtaLink href="/contact" variant="gold">Share your scope</CtaLink>} /><CapabilityEvidence evidence={evidence} /><EngineeringProcess stages={stages} /></> }
