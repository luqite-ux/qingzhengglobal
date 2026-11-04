'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { BrandLogo } from '@/components/site/brand-logo'
import { CtaLink } from '@/components/site/cta-link'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { getNavItems } from '@/lib/site'
import { cn } from '@/lib/utils'

const navItems = getNavItems()

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white text-ink">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <BrandLogo priority className="[--logo-h:38px] lg:[--logo-h:44px]" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group relative inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none',
                      active ? 'text-ink' : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 bottom-1.5 h-0.5 origin-left bg-gold-deep transition-transform duration-200 motion-reduce:transition-none',
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink href="/contact" variant="dark" className="hidden lg:inline-flex">
            Request a Quote
          </CtaLink>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-md border border-line text-ink transition-colors hover:bg-paper active:bg-paper-2 lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu aria-hidden="true" className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="surface-paper w-[88%] gap-0 border-line p-0 sm:max-w-sm">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">Site pages and the quote request link</SheetDescription>
              <div className="flex h-16 items-center border-b border-line bg-white px-5">
                <p className="eyebrow text-gold-deep">Kingsen</p>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
                <ul>
                  {navItems.map((item) => {
                    const active = isActive(pathname, item.href)
                    return (
                      <li key={item.href}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                              'flex min-h-12 items-center justify-between rounded-md px-3 text-lg font-medium transition-colors active:bg-paper-2',
                              active ? 'bg-paper-2 text-ink' : 'text-ink hover:bg-paper-2',
                            )}
                          >
                            {item.label}
                            {active ? <span aria-hidden="true" className="size-1.5 rounded-full bg-gold-deep" /> : null}
                          </Link>
                        </SheetClose>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className="border-t border-line p-5">
                <SheetClose asChild>
                  <CtaLink href="/contact" variant="dark" size="large" className="w-full">
                    Request a Quote
                  </CtaLink>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
