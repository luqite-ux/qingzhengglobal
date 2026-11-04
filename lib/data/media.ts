import { defaultLocale, localize, t, type Locale, type Localized } from '@/lib/i18n'

/*
 * Static media definitions used for the visual design pass.
 * Replace these records with backend / storage-backed data; the resolved
 * `Media` shape below is what every component consumes.
 */

export type MediaSource = {
  src: string
  width: number
  height: number
  alt: Localized
}

export type Media = {
  src: string
  width: number
  height: number
  alt: string
}

export function media(src: string, width: number, height: number, alt: string): MediaSource {
  return { src, width, height, alt: t(alt) }
}

export function resolveMedia(source: MediaSource, locale: Locale = defaultLocale): Media {
  return { src: source.src, width: source.width, height: source.height, alt: localize(source.alt, locale) }
}

export const banners = {
  fixtures: media(
    '/images/banners/banner-fixtures-turntables.jpg',
    2576,
    1073,
    'Machined fixtures, clamping units and rotary turntables arranged on a dark display platform',
  ),
  facility: media(
    '/images/banners/banner-facility.jpg',
    2576,
    1073,
    'Industrial building at dusk with an illuminated glass entrance and a row of loading docks',
  ),
  machiningFloor: media(
    '/images/banners/banner-machining-floor.jpg',
    2576,
    1073,
    'Engineers beside CNC machining centers, robotic arms and fixture tables inside a production hall',
  ),
}

export const brandLogo = {
  src: '/images/brand/kingsen-logo.png',
  width: 661,
  height: 529,
  alt: 'Kingsen by Qingzheng Automation',
}

export type FacilityEvidenceRecord = {
  id: string
  label: Localized
  caption: Localized
  image: MediaSource
}

export const facilityEvidence: FacilityEvidenceRecord[] = [
  {
    id: 'engineering-office',
    label: t('Engineering office'),
    caption: t('Engineering desks and design workstations where project drawings and layouts are prepared.'),
    image: media(
      '/images/facility/engineering-office.jpg',
      1707,
      1280,
      'Open-plan engineering office with rows of desks, dual monitors and a glass-walled meeting area',
    ),
  },
  {
    id: 'workshop-floor',
    label: t('Workshop floor'),
    caption: t('Fixtures and workstations built up on mobile bases across the assembly hall.'),
    image: media(
      '/images/facility/workshop-floor.jpg',
      1280,
      1707,
      'Workshop floor seen from above with many fixture assemblies on wheeled bases and technicians working',
    ),
  },
  {
    id: 'machining-area',
    label: t('Machining area'),
    caption: t('A row of CNC machining centers with control panels along the production hall.'),
    image: media(
      '/images/facility/machining-area.jpg',
      1707,
      1280,
      'Row of CNC machining centers with control panels inside a high-bay production hall',
    ),
  },
  {
    id: 'warehouse',
    label: t('Warehouse'),
    caption: t('Shelving with bins of components and materials, with a marked aisle through the warehouse.'),
    image: media(
      '/images/facility/warehouse.jpg',
      1707,
      1280,
      'Warehouse aisle with blue shelving bins, boxed components and a pallet jack',
    ),
  },
]

export type FacilityEvidence = {
  id: string
  label: string
  caption: string
  image: Media
}

export async function getFacilityEvidence(locale: Locale = defaultLocale): Promise<FacilityEvidence[]> {
  return facilityEvidence.map((item) => ({
    id: item.id,
    label: localize(item.label, locale),
    caption: localize(item.caption, locale),
    image: resolveMedia(item.image, locale),
  }))
}
