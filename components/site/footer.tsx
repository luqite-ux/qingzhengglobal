import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/site/brand-logo'
import { getSolutions } from '@/lib/data/solutions'
import { addressLine, getCopyright, getNavItems, site } from '@/lib/site'

const footerLink =
  'inline-flex min-h-11 items-center text-sm text-on-dark-muted transition-colors duration-200 hover:text-on-dark active:text-on-dark md:min-h-9'

export async function SiteFooter() {
  const solutions = await getSolutions()
  const navItems = getNavItems()

  return (
    <footer className="surface-dark border-t border-line-dark">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="max-w-sm">
            <div className="inline-block rounded-md bg-white px-3 py-2">
              <BrandLogo className="[--logo-h:44px]" />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-on-dark-muted">
              {site.brand} is the automotive automation equipment brand of {site.legalName} Production and assembly
              lines, fixtures and turntables, and standard workstations, designed, customized and manufactured for
              project requirements.
            </p>
          </div>

          <nav aria-label="Footer pages">
            <h2 className="eyebrow mb-4 text-gold-soft">Pages</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer solutions">
            <h2 className="eyebrow mb-4 text-gold-soft">Solutions</h2>
            <ul>
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link href={solution.href} className={footerLink}>
                    {solution.navTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className={footerLink}>
                  Request a Quote
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-4 text-gold-soft">Contact</h2>
            <ul className="space-y-1">
              <li>
                <a href={`mailto:${site.email}`} className={`${footerLink} gap-3 break-all`}>
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-soft" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={`${footerLink} gap-3`}>
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-gold-soft" />
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3 py-2 text-sm leading-relaxed text-on-dark-muted">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-soft" />
                <address className="not-italic">{addressLine}</address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line-dark pt-6 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>{getCopyright()}</p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  )
}
