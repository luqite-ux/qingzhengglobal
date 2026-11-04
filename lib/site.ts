import { defaultLocale, localize, t, type Locale, type Localized } from '@/lib/i18n'

export const site = {
  legalName: 'Taicang Qingzheng Automation Equipment Co., Ltd.',
  brand: 'Kingsen',
  domain: 'qingzhengglobal.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qingzhengglobal.com',
  email: 'info@qingzhengglobal.com',
  phone: '+86 138 1291 7586',
  phoneHref: 'tel:+8613812917586',
  address: {
    street: 'No. 123 Beihai Road',
    locality: 'Taicang',
    city: 'Suzhou',
    region: 'Jiangsu',
    country: 'China',
    countryCode: 'CN',
  },
} as const

export const addressLine = `${site.address.street}, ${site.address.locality}, ${site.address.city}, ${site.address.region}, ${site.address.country}`

type NavItem = { label: Localized; href: string }

const navItems: NavItem[] = [
  { label: t('Home'), href: '/' },
  { label: t('Solutions'), href: '/solutions' },
  { label: t('Projects'), href: '/projects' },
  { label: t('Capabilities'), href: '/capabilities' },
  { label: t('About'), href: '/about' },
  { label: t('News'), href: '/news' },
  { label: t('Contact'), href: '/contact' },
]

export function getNavItems(locale: Locale = defaultLocale) {
  return navItems.map((item) => ({ label: localize(item.label, locale), href: item.href }))
}

export function getCopyright(year: number = new Date().getFullYear()) {
  return `© ${year} ${site.legalName} All rights reserved.`.replace(/\.{2,}/g, '.')
}
