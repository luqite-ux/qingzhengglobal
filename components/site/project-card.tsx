import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/data/projects'
import { Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

type ProjectCardProps = {
  project: Project
  index?: number
  priority?: boolean
  sizes?: string
  className?: string
}

/** Whole-card link: the title link is stretched over the card with a pseudo-element. */
export function ProjectCard({
  project,
  index = 0,
  priority = false,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
  className,
}: ProjectCardProps) {
  return (
    <Reveal
      as="article"
      index={index}
      className={cn(
        'group relative flex flex-col rounded-md outline-offset-4 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-ink',
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-graphite-2">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes={sizes}
          priority={priority}
          className="size-full object-contain transition-transform duration-500 ease-out group-active:scale-[1.015] motion-reduce:transition-none md:group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="eyebrow mb-3 text-gold-deep">{project.subjectLabel}</p>
        <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em]">
          <Link
            href={project.href}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">{project.summary}</p>
        <span
          aria-hidden="true"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
        >
          View project
          <ArrowUpRight className="size-4 transition-transform duration-200 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </span>
      </div>
    </Reveal>
  )
}
