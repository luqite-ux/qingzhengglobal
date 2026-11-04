import Image from 'next/image'
import Link from 'next/link'
import { brandLogo } from '@/lib/data/media'
import { cn } from '@/lib/utils'

/*
 * The official logo file carries wide margins around the wordmark. The image
 * itself is never stretched: it is rendered at its natural ratio
 * (object-fit: contain) and the wrapper only trims the empty margin.
 */
const trim = { x: 14, y: 176, width: 634, height: 236 }
const ratio = trim.width / trim.height

type BrandLogoProps = {
  /** Tailwind classes that set the `--logo-h` custom property per breakpoint. */
  className?: string
  priority?: boolean
}

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Kingsen, Taicang Qingzheng Automation. Go to Home"
      className={cn('inline-flex shrink-0 items-center rounded-sm [--logo-h:40px]', className)}
    >
      <span
        className="relative block overflow-hidden"
        style={{ height: 'var(--logo-h)', width: `calc(var(--logo-h) * ${ratio.toFixed(4)})` }}
      >
        <Image
          src={brandLogo.src}
          alt={brandLogo.alt}
          width={brandLogo.width}
          height={brandLogo.height}
          priority={priority}
          sizes="200px"
          className="absolute max-w-none object-contain"
          style={{
            width: `${(brandLogo.width / trim.width) * 100}%`,
            height: 'auto',
            left: `${(-trim.x / trim.width) * 100}%`,
            top: `${(-trim.y / trim.height) * 100}%`,
          }}
        />
      </span>
    </Link>
  )
}
