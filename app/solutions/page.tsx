import { PageHero } from '@/components/site/page-hero'
import { Section, SectionHeader } from '@/components/site/section'
import { SolutionRows } from '@/components/home/solution-paths'
import { CtaLink } from '@/components/site/cta-link'
import { WebPageJsonLd } from '@/components/site/json-ld'
import { getSolutions } from '@/lib/data/solutions'
import { buildMetadata } from '@/lib/seo'

const description = 'Choose automotive production and assembly lines, fixtures and turntables, or configurable standard workstations for your project.'
export const metadata = buildMetadata({ title: 'Automation Solutions', description, path: '/solutions' })

export default async function SolutionsPage() {
  const solutions = await getSolutions()
  return <><WebPageJsonLd name="Automation Solutions" description={description} path="/solutions" /><PageHero eyebrow="Solutions" title="Equipment paths for automotive production" description={description} crumbs={[{ label: 'Solutions', href: '/solutions' }]} actions={<CtaLink href="/contact" variant="gold">Discuss your requirement</CtaLink>} /><Section tone="paper"><SectionHeader eyebrow="Choose by project scope" title="Start with the equipment scope that fits your line" description="Each path is adapted to the part, process, interfaces and site constraints you provide." /><SolutionRows solutions={solutions} /></Section></>
}
