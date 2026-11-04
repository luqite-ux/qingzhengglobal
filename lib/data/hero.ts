import { defaultLocale, localize, t, type Locale, type Localized } from '@/lib/i18n'
import { banners, resolveMedia, type Media, type MediaSource } from '@/lib/data/media'

type HeroLink = { label: Localized; href: string }

type HeroSlideRecord = {
  id: string
  tabLabel: Localized
  eyebrow: Localized
  title: Localized
  body: Localized
  image: MediaSource
  align: 'left' | 'right'
  /** object-position per breakpoint, chosen from each banner's own focal point. */
  position: { mobile: string; desktop: string }
  /** Small local contrast scrim, only for banners whose safe area needs it. */
  localContrast: boolean
  primary: HeroLink
  secondary: HeroLink
}

const heroSlideRecords: HeroSlideRecord[] = [
  {
    id: 'solution-scope',
    tabLabel: t('Solution scope'),
    eyebrow: t('Automotive automation equipment'),
    title: t('Automation equipment built around your production requirement'),
    body: t(
      'Production and assembly lines, fixtures and turntables, and standard workstations, designed, customized and manufactured for the project in front of you.',
    ),
    image: banners.fixtures,
    align: 'left',
    position: { mobile: '100% 50%', desktop: '0% 50%' },
    localContrast: false,
    primary: { label: t('Explore Solutions'), href: '/solutions' },
    secondary: { label: t('Request a Quote'), href: '/contact' },
  },
  {
    id: 'engineering-collaboration',
    tabLabel: t('Engineering collaboration'),
    eyebrow: t('From requirement to delivery'),
    title: t('Engineering and manufacturing that follow your project'),
    body: t(
      'Share the process, the site constraints and the scope you need. The requirement is aligned with you before design begins, and delivery is coordinated with your team.',
    ),
    image: banners.facility,
    align: 'right',
    position: { mobile: '32% 50%', desktop: '100% 50%' },
    localContrast: false,
    primary: { label: t('Request a Quote'), href: '/contact' },
    secondary: { label: t('View Capabilities'), href: '/capabilities' },
  },
  {
    id: 'project-evidence',
    tabLabel: t('Project evidence'),
    eyebrow: t('Documented projects'),
    title: t('Project evidence from automotive production lines'),
    body: t(
      'Motor assembly, body side, control arm and subframe lines, plus production lines for Hozon Neta, Geely and Li Auto programs.',
    ),
    image: banners.machiningFloor,
    align: 'left',
    position: { mobile: '100% 50%', desktop: '0% 50%' },
    localContrast: true,
    primary: { label: t('View Projects'), href: '/projects' },
    secondary: { label: t('Request a Quote'), href: '/contact' },
  },
]

export type HeroSlide = {
  id: string
  tabLabel: string
  eyebrow: string
  title: string
  body: string
  image: Media
  align: 'left' | 'right'
  position: { mobile: string; desktop: string }
  localContrast: boolean
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}

export async function getHeroSlides(locale: Locale = defaultLocale): Promise<HeroSlide[]> {
  return heroSlideRecords.map((record) => ({
    id: record.id,
    tabLabel: localize(record.tabLabel, locale),
    eyebrow: localize(record.eyebrow, locale),
    title: localize(record.title, locale),
    body: localize(record.body, locale),
    image: resolveMedia(record.image, locale),
    align: record.align,
    position: record.position,
    localContrast: record.localContrast,
    primary: { label: localize(record.primary.label, locale), href: record.primary.href },
    secondary: { label: localize(record.secondary.label, locale), href: record.secondary.href },
  }))
}
