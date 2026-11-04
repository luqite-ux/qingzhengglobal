import Image from 'next/image'
import { banners, resolveMedia } from '@/lib/data/media'
import { offerScope } from '@/lib/data/content'
import { defaultLocale, localize } from '@/lib/i18n'
import { addressLine, site } from '@/lib/site'
import { CtaLink } from '@/components/site/cta-link'
import { Reveal } from '@/components/site/reveal'
import { Section, SectionHeader } from '@/components/site/section'

export function CompanyIdentity() {
  const rows: { label: string; value: string }[] = [
    { label: 'Company', value: site.legalName },
    { label: 'Brand', value: site.brand },
    { label: 'Address', value: addressLine },
    { label: 'Email', value: site.email },
    { label: 'Phone', value: site.phone },
  ]
  return (
    <dl className="surface-dark grid rounded-md border border-line-dark">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 border-b border-line-dark px-5 py-4 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:gap-6"
        >
          <dt className="eyebrow pt-1 text-gold-soft">{row.label}</dt>
          <dd className="break-words text-sm leading-relaxed text-on-dark">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function CompanyOverview() {
  const facility = resolveMedia(banners.facility)
  const scope = localize(offerScope, defaultLocale)
  return (
    <Section id="company" tone="white" labelledBy="company-title">
      <SectionHeader
        id="company-title"
        eyebrow="Company"
        title="Kingsen is the brand of Taicang Qingzheng Automation Equipment"
        description="An automotive automation equipment company based in Taicang, Suzhou, Jiangsu. Kingsen equipment is designed, customized and manufactured for each project requirement."
        action={
          <CtaLink href="/about" variant="outlineDark">
            About the company
          </CtaLink>
        }
      />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow mb-4 text-ink">What the company provides</p>
          <ul className="border-b border-line">
            {scope.map((item, index) => (
              <li key={item} className="flex gap-5 border-t border-line py-4">
                <span className="font-mono text-sm text-gold-deep">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-base font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="lg:col-span-6" index={1}>
          <CompanyIdentity />
        </Reveal>
      </div>
      <Reveal className="mt-12">
        <div className="overflow-hidden rounded-md bg-graphite">
          <Image
            src={facility.src}
            alt={facility.alt}
            width={facility.width}
            height={facility.height}
            sizes="(min-width: 1360px) 1280px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </Reveal>
    </Section>
  )
}
