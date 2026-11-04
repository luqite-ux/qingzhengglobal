import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const ctaStyles = cva(
  'group/cta inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold tracking-[0.01em] whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100',
  {
    variants: {
      variant: {
        gold: 'bg-gold text-graphite hover:bg-gold-soft active:bg-gold-soft',
        dark: 'bg-graphite text-on-dark hover:bg-graphite-3 active:bg-graphite-3',
        outlineLight:
          'border border-on-dark/40 text-on-dark hover:border-on-dark hover:bg-on-dark/10 active:bg-on-dark/15',
        outlineDark: 'border border-ink/40 text-ink hover:border-ink hover:bg-ink/5 active:bg-ink/10',
      },
      size: {
        default: 'h-11',
        large: 'h-12 px-6 text-[0.9375rem]',
      },
    },
    defaultVariants: { variant: 'gold', size: 'default' },
  },
)

type CtaLinkProps = Omit<React.ComponentProps<typeof Link>, 'className'> &
  VariantProps<typeof ctaStyles> & {
    className?: string
    arrow?: boolean
  }

export function CtaLink({ variant, size, className, arrow = true, children, ...props }: CtaLinkProps) {
  return (
    <Link className={cn(ctaStyles({ variant, size }), className)} {...props}>
      {children}
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0"
        />
      ) : null}
    </Link>
  )
}
