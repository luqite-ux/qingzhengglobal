import { PageHero } from '@/components/site/page-hero'
import { CompanyOverview } from '@/components/home/company-overview'
import { CapabilityEvidence } from '@/components/home/capability-evidence'
import { getFacilityEvidence } from '@/lib/data/media'
import { buildMetadata } from '@/lib/seo'

const description = 'Kingsen is the automotive automation equipment brand of Taicang Qingzheng Automation Equipment Co., Ltd. in Taicang, Suzhou, Jiangsu.'
export const metadata = buildMetadata({ title: 'About Kingsen', description, path: '/about' })
export default async function AboutPage() { const evidence = await getFacilityEvidence(); return <><PageHero eyebrow="About" title="Taicang Qingzheng Automation Equipment" description={description} crumbs={[{ label: 'About', href: '/about' }]} image={evidence[1]?.image ?? evidence[0]?.image} /><CompanyOverview /><CapabilityEvidence evidence={evidence} /></> }
