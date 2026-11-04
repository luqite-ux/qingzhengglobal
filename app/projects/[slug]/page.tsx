import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/site/page-hero'
import { Section, SectionHeader } from '@/components/site/section'
import { CtaLink } from '@/components/site/cta-link'
import { ProductJsonLd } from '@/components/site/json-ld'
import { getProject, projectSlugs } from '@/lib/data/projects'
import { buildMetadata } from '@/lib/seo'
export const dynamicParams = true
export const revalidate = 60
export function generateStaticParams() { return projectSlugs.map((slug) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = await getProject(slug); return project ? buildMetadata({ title: project.title, description: project.summary, path: project.href, image: project.cover }) : {} }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = await getProject(slug); if (!project) notFound(); return <><ProductJsonLd name={project.title} description={project.summary} path={project.href} images={project.images.map((image) => image.src)} /><PageHero eyebrow={project.subjectLabel} title={project.title} description={project.summary} crumbs={[{ label: 'Projects', href: '/projects' }, { label: project.title, href: project.href }]} image={project.cover} actions={<CtaLink href="/contact" variant="gold">Discuss a similar project</CtaLink>} /><Section tone="paper"><SectionHeader eyebrow="Project photography" title="Available views from this project" description="Images show the documented equipment and production environment. Project scope is confirmed against your own requirement." /><div className="grid gap-6 sm:grid-cols-2">{project.images.map((image, index) => <figure key={`${image.src}-${index}`} className="overflow-hidden rounded-md bg-graphite-2"><Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-auto w-full object-contain" /></figure>)}</div></Section></> }
