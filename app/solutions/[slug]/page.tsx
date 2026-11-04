import { notFound } from 'next/navigation'
import { PageHero } from '@/components/site/page-hero'
import { Section, SectionHeader } from '@/components/site/section'
import { ProjectCard } from '@/components/site/project-card'
import { CtaLink } from '@/components/site/cta-link'
import { getSolution, solutionSlugs } from '@/lib/data/solutions'
import { getProjectsBySlugs } from '@/lib/data/projects'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = true
export const revalidate = 60
export function generateStaticParams() { return solutionSlugs.map((slug) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const solution = await getSolution(slug); return solution ? buildMetadata({ title: solution.title, description: solution.summary, path: solution.href, image: solution.image }) : {} }

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = await getSolution(slug)
  if (!solution) notFound()
  const projects = await getProjectsBySlugs(solution.relatedProjectSlugs)
  return <><PageHero eyebrow="Solution" title={solution.title} description={solution.lead} crumbs={[{ label: 'Solutions', href: '/solutions' }, { label: solution.navTitle, href: solution.href }]} image={solution.image} actions={<CtaLink href="/contact" variant="gold">Request a project review</CtaLink>} /><Section tone="white"><div className="grid gap-12 lg:grid-cols-2"><div><p className="eyebrow mb-4 text-gold-deep">Choose this when</p><ul className="space-y-4">{solution.chooseWhen.map((item) => <li key={item} className="border-l-2 border-gold pl-4 leading-relaxed">{item}</li>)}</ul></div><div><p className="eyebrow mb-4 text-gold-deep">What to prepare</p><ol className="space-y-4">{solution.prepare.map((item, index) => <li key={item} className="flex gap-4"><span className="font-mono text-gold-deep">{String(index + 1).padStart(2, '0')}</span><span className="leading-relaxed text-ink-muted">{item}</span></li>)}</ol></div></div></Section><Section tone="paper"><SectionHeader eyebrow="Related projects" title="Documented work connected to this solution" description={solution.scopeNote} /><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></Section></>
}
