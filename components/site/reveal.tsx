'use client'

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { armOnEntry } from '@/lib/motion'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

type RevealProps = {
  as?: ElementType
  /** Position within a repeated group; drives a capped stagger. */
  index?: number
  className?: string
  children: ReactNode
} & Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'>

export function Reveal({ as: Tag = 'div', index = 0, className, children, style, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return undefined
    return armOnEntry(element, 'data-reveal')
  }, [])

  const delay = Math.min(index, 5) * 70
  const mergedStyle = { ...style, '--reveal-delay': `${delay}ms` } as CSSProperties

  return (
    <Tag ref={ref} data-reveal="" className={className} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  )
}
