'use client'

import { useEffect, useLayoutEffect, useRef, type CSSProperties } from 'react'
import { armOnEntry } from '@/lib/motion'
import type { ProcessStage } from '@/lib/data/content'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/** QZ-M02: bounded alignment path. Horizontal on desktop, vertical on mobile. */
export function ProcessPath({ stages }: { stages: ProcessStage[] }) {
  const ref = useRef<HTMLOListElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return undefined
    return armOnEntry(element, 'data-path')
  }, [])

  return (
    <ol ref={ref} className="process-path grid lg:grid-cols-4 lg:gap-x-8">
      {stages.map((stage, index) => {
        const last = index === stages.length - 1
        return (
          <li
            key={stage.id}
            className="relative pb-10 pl-14 last:pb-0 lg:pb-0 lg:pl-0"
            style={{ '--i': index } as CSSProperties}
          >
            {!last ? (
              <span
                aria-hidden="true"
                className="path-line left-5 top-12 bottom-2 w-px -translate-x-1/2 lg:bottom-auto lg:left-12 lg:right-[-1.5rem] lg:top-5 lg:h-px lg:w-auto lg:translate-x-0 lg:-translate-y-1/2"
              >
                <span
                  className="path-fill path-fill-y lg:hidden"
                  style={{ transitionDelay: `${index * 430 + 300}ms`, transitionDuration: '420ms' }}
                />
                <span
                  className="path-fill path-fill-x hidden lg:block"
                  style={{ transitionDelay: `${index * 430 + 300}ms`, transitionDuration: '420ms' }}
                />
              </span>
            ) : null}
            <span
              aria-hidden="true"
              className="path-node absolute left-0 top-0 flex size-10 items-center justify-center rounded-md border border-gold bg-gold font-mono text-sm font-medium text-graphite lg:static lg:mb-6"
            >
              {stage.step}
            </span>
            <p className="eyebrow mb-3 text-gold-soft">{stage.outcome}</p>
            <h3 className="text-xl font-semibold leading-snug tracking-[-0.01em]">
              <span className="sr-only">Step {stage.step}: </span>
              {stage.title}
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-dark-muted">{stage.description}</p>
          </li>
        )
      })}
    </ol>
  )
}
