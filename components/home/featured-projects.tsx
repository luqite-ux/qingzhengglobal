import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Project } from '@/lib/data/projects'
import { CtaLink } from '@/components/site/cta-link'
import { ProjectCard } from '@/components/site/project-card'
import { Reveal } from '@/components/site/reveal'
import { Section, SectionHeader } from '@/components/site/section'

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal
      as="article"
      index={index + 1}
      className="group relative flex gap-4 rounded-md border border-line bg-paper p-3 outline-offset-4 transition-colors duration-200 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-ink active:bg-paper-2 md:hover:border-ink/40 md:hover:bg-paper-2 motion-reduce:transition-none sm:gap-5 sm:p-4"
    >
      <div className="relative size-24 shrink-0 overflow-hidden rounded-sm bg-graphite-2 sm:size-32">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="128px"
          className="size-full object-contain"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="eyebrow mb-2 text-gold-deep">{project.subjectLabel}</p>
        <h3 className="text-base font-semibold leading-snug sm:text-lg">
          <Link href={project.href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">{project.summary}</p>
      </div>
      <ChevronRight
        aria-hidden="true"
        className="hidden size-5 shrink-0 self-center text-ink-muted transition-transform duration-200 sm:block md:group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </Reveal>
  )
}

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [lead, ...rest] = projects
  if (!lead) return null
  return (
    <Section id="featured-projects" tone="white" labelledBy="featured-projects-title">
      <SectionHeader
        id="featured-projects-title"
        eyebrow="Projects"
        title="Documented automotive production lines"
        description="Representative entries from motor assembly, body side, control arm and subframe lines, and production lines for Hozon Neta, Geely and Li Auto programs."
        action={
          <CtaLink href="/projects" variant="outlineDark">
            View all projects
          </CtaLink>
        }
      />
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <ProjectCard project={lead} sizes="(min-width: 1024px) 40vw, 100vw" priority={false} />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-6 lg:justify-between">
          {rest.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}
