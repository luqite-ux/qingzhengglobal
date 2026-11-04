import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Solution } from '@/lib/data/solutions'
import { Reveal } from '@/components/site/reveal'
import { Section, SectionHeader } from '@/components/site/section'
import { cn } from '@/lib/utils'

export function SolutionRows({ solutions }: { solutions: Solution[] }) {
  return (
    <div className="border-b border-line">
      {solutions.map((solution, index) => {
        const flipped = index % 2 === 1
        return (
          <Reveal
            as="article"
            key={solution.slug}
            className="group relative grid gap-6 border-t border-line py-8 outline-offset-4 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-ink md:grid-cols-12 md:items-center md:gap-10 md:py-10"
          >
            <div className={cn('md:col-span-5', flipped && 'md:order-2 md:col-span-5')}>
              <div className="relative aspect-[5/4] overflow-hidden rounded-md bg-graphite">
                <Image
                  src={solution.image.src}
                  alt={solution.image.alt}
                  width={solution.image.width}
                  height={solution.image.height}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="size-full object-cover transition-transform duration-500 ease-out group-active:scale-[1.015] motion-reduce:transition-none md:group-hover:scale-[1.03]"
                />
              </div>
            </div>
            <div className={cn('md:col-span-7', flipped && 'md:order-1 md:pr-6')}>
              <p className="font-mono text-sm text-gold-deep">{solution.index}</p>
              <h3 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-[-0.015em] md:text-3xl">
                <Link
                  href={solution.href}
                  className="outline-none after:absolute after:inset-0 after:content-['']"
                >
                  {solution.title}
                </Link>
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">{solution.summary}</p>
              <p className="eyebrow mb-3 mt-6 text-ink">Choose this when</p>
              <ul className="grid gap-2 text-sm leading-relaxed text-ink-muted">
                {solution.chooseWhen.slice(0, 2).map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-gold-deep" />
                    {point}
                  </li>
                ))}
              </ul>
              <span
                aria-hidden="true"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                View {solution.navTitle}
                <ArrowRight className="size-4 transition-transform duration-200 md:group-hover:translate-x-1 motion-reduce:transition-none" />
              </span>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

export function SolutionPaths({ solutions }: { solutions: Solution[] }) {
  return (
    <Section id="solution-paths" tone="paper" labelledBy="solution-paths-title">
      <SectionHeader
        id="solution-paths-title"
        eyebrow="Solutions"
        title="Three ways to bring equipment into your line"
        description="Start from the scope that matches your requirement: a whole production line, fixtures and turntables for a specific part, or a standard workstation for a single task."
      />
      <SolutionRows solutions={solutions} />
    </Section>
  )
}
