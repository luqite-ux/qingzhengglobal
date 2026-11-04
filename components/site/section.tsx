import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/site/reveal'

export type Tone = 'paper' | 'white' | 'dark' | 'dark2'

const toneClass: Record<Tone, string> = {
  paper: 'surface-paper',
  white: 'surface-white',
  dark: 'surface-dark',
  dark2: 'surface-dark-2',
}

type SectionProps = {
  id?: string
  tone?: Tone
  className?: string
  labelledBy?: string
  children: ReactNode
}

export function Section({ id, tone = 'paper', className, labelledBy, children }: SectionProps) {
  return (
    <section
      data-section-id={id}
      aria-labelledby={labelledBy}
      className={cn('py-16 md:py-24', toneClass[tone], className)}
    >
      <div className="container-page">{children}</div>
    </section>
  )
}

type SectionHeaderProps = {
  id?: string
  eyebrow: string
  title: string
  description?: string
  tone?: Tone
  action?: ReactNode
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  tone = 'paper',
  action,
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  const dark = tone === 'dark' || tone === 'dark2'
  return (
    <Reveal className={cn('mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        <p className={cn('eyebrow mb-4', dark ? 'text-gold-soft' : 'text-gold-deep')}>{eyebrow}</p>
        <Heading
          id={id}
          className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] md:text-[2.5rem]"
        >
          {title}
        </Heading>
        {description ? (
          <p className={cn('mt-4 text-base leading-relaxed md:text-lg', dark ? 'text-on-dark-muted' : 'text-ink-muted')}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  )
}
