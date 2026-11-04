import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Media } from '@/lib/data/media'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { cn } from '@/lib/utils'

export type Crumb = { label: string; href: string }

type PageHeroProps = {
  eyebrow: string
  title: string
  description?: string
  crumbs: Crumb[]
  image?: Media
  imageAspect?: string
  actions?: ReactNode
}

export function PageHero({ eyebrow, title, description, crumbs, image, imageAspect = 'aspect-[5/4]', actions }: PageHeroProps) {
  const trail: Crumb[] = [{ label: 'Home', href: '/' }, ...crumbs]
  return (
    <section data-section-id="page-hero" className="surface-dark">
      <BreadcrumbJsonLd items={trail.map((crumb) => ({ name: crumb.label, path: crumb.href }))} />
      <div
        className={cn(
          'container-page grid gap-10 py-12 md:py-16 lg:py-20',
          image ? 'lg:grid-cols-12 lg:items-center lg:gap-14' : '',
        )}
      >
        <div className={cn(image ? 'lg:col-span-7' : 'max-w-3xl')}>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-on-dark-muted">
              {trail.map((crumb, index) => {
                const last = index === trail.length - 1
                return (
                  <li key={crumb.href} className="flex items-center gap-1">
                    {last ? (
                      <span aria-current="page" className="py-2 text-on-dark">
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          className="inline-flex min-h-11 items-center rounded-sm px-1 transition-colors hover:text-on-dark active:text-on-dark"
                        >
                          {crumb.label}
                        </Link>
                        <ChevronRight aria-hidden="true" className="size-3.5" />
                      </>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
          <p className="eyebrow mb-5 text-gold-soft">{eyebrow}</p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-dark-muted md:text-lg">{description}</p>
          ) : null}
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
        </div>
        {image ? (
          <div className="lg:col-span-5">
            <div className={cn('relative overflow-hidden rounded-md bg-graphite-2', imageAspect)}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="size-full object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
