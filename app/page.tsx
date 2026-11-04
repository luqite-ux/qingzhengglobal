import { HeroCarousel } from '@/components/home/hero-carousel'
import { SolutionPaths } from '@/components/home/solution-paths'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { EngineeringProcess } from '@/components/home/engineering-process'
import { CapabilityEvidence } from '@/components/home/capability-evidence'
import { ProjectGallery } from '@/components/home/project-gallery'
import { Collaboration } from '@/components/home/collaboration'
import { CompanyOverview } from '@/components/home/company-overview'
import { NewsPreview } from '@/components/home/news-preview'
import { getHeroSlides } from '@/lib/data/hero'
import { getSolutions } from '@/lib/data/solutions'
import { featuredProjectSlugs, getGalleryItems, getProjectsBySlugs, getSubjectFilters } from '@/lib/data/projects'
import { getFacilityEvidence } from '@/lib/data/media'
import { getCollaborationInputs, getProcessStages } from '@/lib/data/content'
import { getNews } from '@/lib/data/news'
import { getSiteContent, siteContentMetadata } from '@/lib/site-content/site-content'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> { return siteContentMetadata('/', 'en') }

export default async function HomePage() {
  const [slides, solutions, projects, stages, evidence, gallery, filters, inputs, articles, siteContent] = await Promise.all([
    getHeroSlides(),
    getSolutions(),
    getProjectsBySlugs(featuredProjectSlugs),
    getProcessStages(),
    getFacilityEvidence(),
    getGalleryItems(),
    getSubjectFilters(),
    getCollaborationInputs(),
    getNews(),
    getSiteContent('en'),
  ])
  const heroModule = siteContent?.pages.find((page) => page.path === '/')?.modules.find((module) => module.key === 'hero')
  const heroValues = heroModule?.values
  const configuredSlides = Array.isArray(heroValues?.slides) ? heroValues.slides : []
  const resolvedSlides = slides.map((slide, index) => {
    if (index === 0 && heroValues) return { ...slide, eyebrow: typeof heroValues.eyebrow === 'string' ? heroValues.eyebrow : slide.eyebrow, title: typeof heroValues.title === 'string' ? heroValues.title : slide.title, body: typeof heroValues.body === 'string' ? heroValues.body : slide.body, primary: { ...slide.primary, label: typeof heroValues.primary_label === 'string' ? heroValues.primary_label : slide.primary.label }, secondary: { ...slide.secondary, label: typeof heroValues.secondary_label === 'string' ? heroValues.secondary_label : slide.secondary.label } }
    const configured = configuredSlides.find((value) => value && typeof value === 'object' && 'id' in value && value.id === slide.id) as Record<string, unknown> | undefined
    if (!configured) return slide
    return { ...slide, tabLabel: typeof configured.tabLabel === 'string' ? configured.tabLabel : slide.tabLabel, eyebrow: typeof configured.eyebrow === 'string' ? configured.eyebrow : slide.eyebrow, title: typeof configured.title === 'string' ? configured.title : slide.title, body: typeof configured.body === 'string' ? configured.body : slide.body, primary: { ...slide.primary, label: typeof configured.primaryLabel === 'string' ? configured.primaryLabel : slide.primary.label }, secondary: { ...slide.secondary, label: typeof configured.secondaryLabel === 'string' ? configured.secondaryLabel : slide.secondary.label } }
  })

  return (
    <div className="contents" {...(siteContent ? { 'data-hq-content-version': siteContent.version } : {})}>
      <HeroCarousel slides={resolvedSlides} titleStyle={heroModule?.styles?.title} />
      <SolutionPaths solutions={solutions} />
      <FeaturedProjects projects={projects} />
      <EngineeringProcess stages={stages} />
      <CapabilityEvidence evidence={evidence} />
      <ProjectGallery items={gallery} filters={filters} />
      <Collaboration inputs={inputs} />
      <CompanyOverview />
      <NewsPreview articles={articles} />
    </div>
  )
}
