import { defaultLocale, localize, t, type Locale, type Localized } from '@/lib/i18n'
import { media, resolveMedia, type Media, type MediaSource } from '@/lib/data/media'

export type SolutionSlug = 'assembly-lines' | 'fixtures-turntables' | 'standard-workstations'

type SolutionRecord = {
  slug: SolutionSlug
  index: string
  title: Localized
  navTitle: Localized
  summary: Localized
  lead: Localized
  chooseWhen: Localized<string[]>
  prepare: Localized<string[]>
  scopeNote: Localized
  image: MediaSource
  relatedProjectSlugs: string[]
}

const solutionRecords: SolutionRecord[] = [
  {
    slug: 'assembly-lines',
    index: '01',
    title: t('Automotive Production & Assembly Lines'),
    navTitle: t('Assembly Lines'),
    summary: t(
      'Line-level projects that organize stations, fixtures and handling into one connected production flow for automotive parts and vehicle programs.',
    ),
    lead: t(
      'When the requirement is a whole production or assembly line, the work is organized around the product program: how parts arrive, how each station holds and processes them, and how the line is handed over to your team.',
    ),
    chooseWhen: {
      en: [
        'Several stations must work together as one production sequence.',
        'Fixtures, handling and station layout need to be coordinated across the whole line.',
        'The project is defined by a product program rather than a single station.',
      ],
    },
    prepare: {
      en: [
        'Part drawings or 3D models for the product to be produced.',
        'The process sequence and station list as currently understood.',
        'Site layout, available floor area and any interface constraints.',
        'The scope you need: design, customization, manufacturing, or a combination.',
      ],
    },
    scopeNote: t('Documented line projects are listed below. Project details are reviewed with you during the inquiry.'),
    image: media(
      '/images/projects/hozon-neta-production-line.jpg',
      1932,
      1932,
      'Production hall with rows of white robot arms and operators working between fenced cells',
    ),
    relatedProjectSlugs: [
      'motor-assembly-line',
      'hozon-neta-production-line',
      'geely-chengdu-body-side-line',
      'li-auto-subframe-line',
    ],
  },
  {
    slug: 'fixtures-turntables',
    index: '02',
    title: t('Fixtures & Turntables'),
    navTitle: t('Fixtures & Turntables'),
    summary: t(
      'Locating, clamping and indexing equipment built around a specific part and process, supplied for a new line or for existing equipment.',
    ),
    lead: t(
      'Fixtures and turntables are defined by the part they hold. The work starts from the part geometry and the process it must support, then moves to a custom design and manufacturing.',
    ),
    chooseWhen: {
      en: [
        'The requirement centers on holding, locating or indexing a part.',
        'You already have the line or machine and need tooling for it.',
        'Part geometry calls for a custom fixture rather than a standard one.',
      ],
    },
    prepare: {
      en: [
        'Part drawings or 3D models, including the surfaces to be located or clamped.',
        'The process the fixture will support and the machine or station it mounts to.',
        'Mounting interface and space limits at the station.',
        'Quantity or set count, if known.',
      ],
    },
    scopeNote: t('Fixture imagery from documented projects is available in the project gallery.'),
    image: media(
      '/images/projects/geely-dc1e-production-line.jpg',
      1932,
      1932,
      'Close-up of cream fixture stands with clamps and bolted brackets in assembly',
    ),
    relatedProjectSlugs: ['geely-jinzhong-production-line', 'geely-dc1e-production-line', 'li-auto-control-arm-line'],
  },
  {
    slug: 'standard-workstations',
    index: '03',
    title: t('Standard Workstations'),
    navTitle: t('Standard Workstations'),
    summary: t(
      'Workstation formats for repeatable assembly and handling tasks, configured to the requirement instead of designed from a blank page.',
    ),
    lead: t(
      'A standard workstation suits a single, repeatable task that needs its own station. It starts from an established format and is adapted to your process, rather than being engineered as part of a full line.',
    ),
    chooseWhen: {
      en: [
        'One repeatable task needs its own dedicated station.',
        'You would rather adapt an established format than start from a blank page.',
        'The station may later sit inside a larger line.',
      ],
    },
    prepare: {
      en: [
        'A description of the task the station performs and the parts involved.',
        'Operator and handling expectations at the station.',
        'Available floor space and utilities at the installation point.',
        'Any additional functions you want configured.',
      ],
    },
    scopeNote: t('A documented motor assembly project is shown alongside this family.'),
    image: media(
      '/images/projects/motor-assembly-line.jpg',
      1932,
      1932,
      'Assembly workstation with a gantry axis, screwdriving head, ionizer units and operator monitor',
    ),
    relatedProjectSlugs: ['motor-assembly-line'],
  },
]

export type Solution = {
  slug: SolutionSlug
  index: string
  title: string
  navTitle: string
  summary: string
  lead: string
  chooseWhen: string[]
  prepare: string[]
  scopeNote: string
  image: Media
  relatedProjectSlugs: string[]
  href: string
}

function resolveSolution(record: SolutionRecord, locale: Locale): Solution {
  return {
    slug: record.slug,
    index: record.index,
    title: localize(record.title, locale),
    navTitle: localize(record.navTitle, locale),
    summary: localize(record.summary, locale),
    lead: localize(record.lead, locale),
    chooseWhen: localize(record.chooseWhen, locale),
    prepare: localize(record.prepare, locale),
    scopeNote: localize(record.scopeNote, locale),
    image: resolveMedia(record.image, locale),
    relatedProjectSlugs: record.relatedProjectSlugs,
    href: `/solutions/${record.slug}`,
  }
}

export async function getSolutions(locale: Locale = defaultLocale): Promise<Solution[]> {
  return solutionRecords.map((record) => resolveSolution(record, locale))
}

export async function getSolution(slug: string, locale: Locale = defaultLocale): Promise<Solution | null> {
  const record = solutionRecords.find((item) => item.slug === slug)
  return record ? resolveSolution(record, locale) : null
}

export const solutionSlugs = solutionRecords.map((record) => record.slug)
