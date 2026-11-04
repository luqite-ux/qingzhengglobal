import { PageHero } from '@/components/site/page-hero'
import { Section, SectionHeader } from '@/components/site/section'
import { ProjectCard } from '@/components/site/project-card'
import { ProjectGallery } from '@/components/home/project-gallery'
import { getGalleryItems, getProjects, getSubjectFilters } from '@/lib/data/projects'
import { buildMetadata } from '@/lib/seo'

const description = 'Documented automotive production-line, fixture and workstation projects from Kingsen.'
export const metadata = buildMetadata({ title: 'Projects', description, path: '/projects' })
export default async function ProjectsPage() { const [projects, items, filters] = await Promise.all([getProjects(), getGalleryItems(), getSubjectFilters()]); return <><PageHero eyebrow="Projects" title="Automotive automation projects as built" description={description} crumbs={[{ label: 'Projects', href: '/projects' }]} image={projects[0]?.cover} /><Section tone="paper"><SectionHeader eyebrow="Project index" title="Eight documented project groups" description="Open a project for its available photography and project context." /><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></Section><ProjectGallery items={items} filters={filters} /></> }
