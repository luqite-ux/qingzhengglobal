'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { CtaLink } from '@/components/site/cta-link'
import type { HeroSlide } from '@/lib/data/hero'
import { cn } from '@/lib/utils'

const AUTO_ADVANCE_MS = 7000

const iconButton =
  'inline-flex size-11 items-center justify-center rounded-md border border-line-dark text-on-dark transition-[background-color,border-color,transform] duration-200 hover:border-on-dark-muted hover:bg-graphite-3 active:scale-95 active:bg-graphite-3 motion-reduce:transition-none motion-reduce:active:scale-100'

export function HeroCarousel({ slides, titleStyle }: { slides: HeroSlide[]; titleStyle?: { fontFamily?: string; fontWeight?: number; fontSizeDesktop?: number; fontSizeMobile?: number } }) {
  const [index, setIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const reducedMotion = useRef(false)

  const count = slides.length
  const go = useCallback((next: number) => setIndex((next + count) % count), [count])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = query.matches
    setAutoplay(!query.matches)
    const onChange = (event: MediaQueryListEvent) => {
      reducedMotion.current = event.matches
      if (event.matches) setAutoplay(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const running = autoplay && !interacting && pageVisible

  useEffect(() => {
    if (!running) return undefined
    const timer = window.setTimeout(() => go(index + 1), AUTO_ADVANCE_MS)
    return () => window.clearTimeout(timer)
  }, [running, index, go])

  return (
    <section
      data-section-id="hero"
      aria-roledescription="carousel"
      aria-label="Kingsen featured messages"
      className="surface-dark relative"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
    >
      <h1 className="sr-only">Kingsen automotive automation equipment by Taicang Qingzheng Automation</h1>

      <div className="grid" aria-live={autoplay ? 'off' : 'polite'}>
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index
          const right = slide.align === 'right'
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${count}: ${slide.tabLabel}`}
              aria-hidden={!active}
              inert={!active}
              data-hero-active={active}
              className={cn(
                'relative col-start-1 row-start-1 flex flex-col transition-[opacity,visibility] duration-700 ease-out motion-reduce:duration-0 lg:block lg:h-[clamp(540px,41vw,660px)]',
                active ? 'visible opacity-100' : 'invisible opacity-0',
              )}
              style={
                {
                  '--pos-m': slide.position.mobile,
                  '--pos-d': slide.position.desktop,
                } as CSSProperties
              }
            >
              <div className="relative h-[250px] w-full sm:h-[340px] md:h-[420px] lg:absolute lg:inset-0 lg:h-full">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  priority={slideIndex === 0}
                  loading={slideIndex === 0 ? undefined : 'eager'}
                  sizes="100vw"
                  className="object-cover [object-position:var(--pos-m)] lg:[object-position:var(--pos-d)]"
                />
              </div>

              <div className="container-page relative flex-1 pb-8 pt-8 lg:absolute lg:inset-0 lg:flex lg:items-center lg:py-0">
                <div
                  className={cn(
                    'relative w-full lg:max-w-[30rem]',
                    right && 'lg:ml-auto lg:max-w-[27rem]',
                    slide.localContrast &&
                      'lg:before:pointer-events-none lg:before:absolute lg:before:-inset-x-10 lg:before:-inset-y-12 lg:before:-z-10 lg:before:bg-[radial-gradient(closest-side,rgba(8,9,11,0.5),rgba(8,9,11,0))]',
                  )}
                >
                  <p
                    className="hero-rise eyebrow mb-4 text-gold-soft"
                    style={{ '--i': 0 } as CSSProperties}
                  >
                    {slide.eyebrow}
                  </p>
                  <p
                    role="heading"
                    aria-level={2}
                    className="hero-rise hq-typography text-balance text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] text-on-dark sm:text-4xl lg:text-[2.625rem]"
                    style={{ '--i': 1, ...(titleStyle?.fontFamily === 'site-sans' ? { fontFamily: 'var(--font-archivo)' } : {}), ...(titleStyle?.fontWeight ? { fontWeight: titleStyle.fontWeight } : {}), ...(titleStyle?.fontSizeDesktop ? { '--hq-font-size-desktop': `${titleStyle.fontSizeDesktop}px` } : {}), ...(titleStyle?.fontSizeMobile ? { '--hq-font-size-mobile': `${titleStyle.fontSizeMobile}px` } : {}) } as CSSProperties}
                  >
                    {slide.title}
                  </p>
                  <p
                    className="hero-rise mt-4 max-w-[34rem] text-[0.9375rem] leading-relaxed text-on-dark lg:[text-shadow:0_1px_14px_rgba(0,0,0,0.55)]"
                    style={{ '--i': 2 } as CSSProperties}
                  >
                    {slide.body}
                  </p>
                  <div
                    className="hero-rise mt-7 flex flex-col gap-3 sm:flex-row"
                    style={{ '--i': 3 } as CSSProperties}
                  >
                    <CtaLink href={slide.primary.href} variant="gold" size="large">
                      {slide.primary.label}
                    </CtaLink>
                    <CtaLink href={slide.secondary.href} variant="outlineLight" size="large" arrow={false}>
                      {slide.secondary.label}
                    </CtaLink>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-line-dark bg-graphite">
        <div className="container-page flex items-stretch justify-between gap-3 py-3 sm:gap-6">
          <ul className="flex flex-1 items-stretch gap-2 sm:gap-3" aria-label="Choose message">
            {slides.map((slide, slideIndex) => {
              const active = slideIndex === index
              return (
                <li key={slide.id} className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => go(slideIndex)}
                    aria-current={active ? 'true' : undefined}
                    aria-label={`Show message ${slideIndex + 1}: ${slide.tabLabel}`}
                    className="group relative flex min-h-11 w-full items-center gap-3 overflow-hidden rounded-md px-2 text-left transition-colors hover:bg-graphite-3 active:bg-graphite-3 sm:px-3"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-0.5 bg-line-dark"
                    />
                    <span
                      aria-hidden="true"
                      key={`${index}-${running}`}
                      className={cn(
                        'absolute inset-x-0 top-0 h-0.5 origin-left bg-gold',
                        active ? (running ? '' : 'scale-x-100') : 'scale-x-0',
                      )}
                      style={
                        active && running
                          ? { animation: `hero-progress ${AUTO_ADVANCE_MS}ms linear both` }
                          : undefined
                      }
                    />
                    <span
                      className={cn(
                        'font-mono text-xs font-medium',
                        active ? 'text-gold-soft' : 'text-on-dark-muted',
                      )}
                    >
                      {String(slideIndex + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'hidden truncate text-sm font-medium sm:inline',
                        active ? 'text-on-dark' : 'text-on-dark-muted group-hover:text-on-dark',
                      )}
                    >
                      {slide.tabLabel}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className={iconButton}
              aria-label={autoplay ? 'Pause automatic slide rotation' : 'Start automatic slide rotation'}
              aria-pressed={!autoplay}
              onClick={() => setAutoplay((value) => !value)}
            >
              {autoplay ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
            </button>
            <button type="button" className={iconButton} aria-label="Previous message" onClick={() => go(index - 1)}>
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button type="button" className={iconButton} aria-label="Next message" onClick={() => go(index + 1)}>
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
