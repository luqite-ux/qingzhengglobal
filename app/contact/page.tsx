import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { Section, SectionHeader } from '@/components/site/section'
import { CompanyIdentity } from '@/components/home/company-overview'
import { addressLine, site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'
import { InquiryForm } from '@/components/contact/inquiry-form'

const description = 'Share your part, process, site constraints and requested scope with Kingsen for an automotive automation equipment project review.'
export const metadata = buildMetadata({ title: 'Contact & Request a Quote', description, path: '/contact' })
export default function ContactPage() { return <><PageHero eyebrow="Contact" title="Start with the requirement you have" description={description} crumbs={[{ label: 'Contact', href: '/contact' }]} /><Section tone="paper"><SectionHeader eyebrow="Project inquiry" title="Tell us what the equipment needs to do" description="A drawing, model, process outline or short description is enough to start." /><div className="grid gap-10 lg:grid-cols-12"><div className="lg:col-span-7"><div className="rounded-md border border-line bg-white p-6 md:p-8"><InquiryForm /></div></div><div className="lg:col-span-5"><CompanyIdentity /><div className="mt-5 grid gap-3 text-sm"><a className="flex gap-3 text-ink-muted hover:text-ink" href={`mailto:${site.email}`}><Mail className="size-4 text-gold-deep" />{site.email}</a><a className="flex gap-3 text-ink-muted hover:text-ink" href={site.phoneHref}><Phone className="size-4 text-gold-deep" />{site.phone}</a><p className="flex gap-3 text-ink-muted"><MapPin className="size-4 shrink-0 text-gold-deep" />{addressLine}</p></div></div></div></Section></> }
