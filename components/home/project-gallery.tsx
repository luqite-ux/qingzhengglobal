'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { GalleryItem, ProjectSubject } from '@/lib/data/projects'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Reveal } from '@/components/site/reveal'
import { Section, SectionHeader } from '@/components/site/section'
import { cn } from '@/lib/utils'

type Filter = { value: ProjectSubject; label: string }
type Active = 'all' | ProjectSubject

const filterBase =
  'inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-medium transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100'

export function ProjectGallery({ items, filters }: { items: GalleryItem[]; filters: Filter[] }) {
  const [active, setActive] = useState<Active>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const visible = useMemo(
    () => (active === 'all' ? items : items.filter((item) => item.subject === active)),
    [items, active],
  )
  const opened = items.find((item) => item.id === openId) ?? null
  const available = filters.filter((filter) => items.some((item) => item.subject === filter.value))

  return (
    <Section id="project-gallery" tone="dark2" labelledBy="project-gallery-title">
      <SectionHeader
        id="project-gallery-title"
        tone="dark2"
        eyebrow="Project gallery"
        title="Fixtures, stations and lines as built"
        description="Photography from documented projects. Filter by subject and open any image to see it in full."
      />

      <Reveal className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by subject">
        {[{ value: 'all' as const, label: 'All' }, ...available].map((filter) => {
          const selected = active === filter.value
          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter.value)}
              className={cn(
                filterBase,
                selected
                  ? 'border-gold bg-gold text-graphite'
                  : 'border-on-dark/35 text-on-dark hover:border-on-dark hover:bg-on-dark/10 active:bg-on-dark/15',
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </Reveal>

      <p className="sr-only" role="status" aria-live="polite">
        {visible.length} images shown
      </p>

      <ul key={active} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {visible.map((item, index) => (
          <li
            key={item.id}
            className="gallery-item"
            style={{ '--i': Math.min(index, 8) } as CSSProperties}
          >
            <button
              type="button"
              onClick={() => setOpenId(item.id)}
              aria-label={`Open image: ${item.projectTitle}`}
              className="group relative block aspect-square w-full overflow-hidden rounded-md bg-graphite-3 text-left outline-offset-4 transition-transform duration-200 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 48vw"
                className="size-full object-contain transition-transform duration-500 ease-out motion-reduce:transition-none md:group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-graphite px-3 py-2 text-xs font-medium text-on-dark">
                {item.projectTitle}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={opened !== null} onOpenChange={(open) => (open ? undefined : setOpenId(null))}>
        <DialogContent className="max-h-[92dvh] gap-0 overflow-y-auto border-line-dark bg-graphite p-0 text-on-dark sm:max-w-3xl [&_[data-slot=dialog-close]]:rounded-md [&_[data-slot=dialog-close]]:bg-graphite [&_[data-slot=dialog-close]]:p-2 [&_[data-slot=dialog-close]]:text-on-dark [&_[data-slot=dialog-close]]:opacity-100">
          {opened ? (
            <>
              <div className="bg-graphite-2">
                <Image
                  src={opened.image.src}
                  alt={opened.image.alt}
                  width={opened.image.width}
                  height={opened.image.height}
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="mx-auto h-auto max-h-[70dvh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <DialogTitle className="text-lg text-on-dark">{opened.projectTitle}</DialogTitle>
                  <DialogDescription className="mt-1 text-on-dark-muted">{opened.subjectLabel}</DialogDescription>
                </div>
                <Link
                  href={`/projects/${opened.projectSlug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-gold px-4 text-sm font-semibold text-graphite transition-colors hover:bg-gold-soft active:bg-gold-soft"
                >
                  View project
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  )
}
