import { defaultLocale, localize, t, type Locale, type Localized } from '@/lib/i18n'
import { media, resolveMedia, type Media, type MediaSource } from '@/lib/data/media'
import type { SolutionSlug } from '@/lib/data/solutions'
import { getSupabaseClient, tenantId } from '@/lib/supabase'

/*
 * Static project records for the visual design pass.
 * Replace with backend data. `gallery` accepts any number of images; the
 * list, gallery and detail templates already render N images per project.
 */

export type ProjectSubject = 'line' | 'fixtures' | 'workstation'

type ProjectRecord = {
  slug: string
  title: Localized
  customer?: string
  family: SolutionSlug
  subject: ProjectSubject
  summary: Localized
  gallery: MediaSource[]
}

const subjectLabels: Record<ProjectSubject, Localized> = {
  line: t('Line views'),
  fixtures: t('Fixtures'),
  workstation: t('Workstations'),
}

const familyLabels: Record<SolutionSlug, Localized> = {
  'assembly-lines': t('Production & assembly lines'),
  'fixtures-turntables': t('Fixtures & turntables'),
  'standard-workstations': t('Standard workstations'),
}

const projectRecords: ProjectRecord[] = [
  {
    slug: 'motor-assembly-line',
    title: t('Motor Assembly Line'),
    family: 'assembly-lines',
    subject: 'workstation',
    summary: t(
      'An assembly line project for motor assembly. Station arrangement, fixtures and interfaces are reviewed in detail when you share your own requirements.',
    ),
    gallery: [
      media(
        '/images/projects/motor-assembly-line.jpg',
        1932,
        1932,
        'Assembly workstation with a gantry axis, screwdriving head, ionizer units and operator monitor',
      ),
    ],
  },
  {
    slug: 'hozon-neta-production-line',
    title: t('Hozon Neta Production Line'),
    customer: 'Hozon Neta',
    family: 'assembly-lines',
    subject: 'line',
    summary: t(
      'A production line project for Hozon Neta. Scope, station layout and handover details are discussed with your team once your requirement is shared.',
    ),
    gallery: [
      media(
        '/images/projects/hozon-neta-production-line.jpg',
        1932,
        1932,
        'Production hall with rows of white robot arms and operators working between fenced cells',
      ),
    ],
  },
  {
    slug: 'geely-chengdu-body-side-line',
    title: t('Geely Chengdu Body Side Line'),
    customer: 'Geely',
    family: 'assembly-lines',
    subject: 'line',
    summary: t(
      'A body side line project for Geely Chengdu. The line is documented here through photography from the production floor.',
    ),
    gallery: [
      media(
        '/images/projects/geely-chengdu-body-side-line.jpg',
        1932,
        1932,
        'Vehicle body side structure on a production line with robot cells behind it',
      ),
    ],
  },
  {
    slug: 'geely-jinzhong-production-line',
    title: t('Geely Jinzhong Production Line'),
    customer: 'Geely',
    family: 'assembly-lines',
    subject: 'fixtures',
    summary: t(
      'A production line project for Geely Jinzhong. Fixture and station details can be reviewed against your own part and process.',
    ),
    gallery: [
      media(
        '/images/projects/geely-jinzhong-production-line.jpg',
        1932,
        1932,
        'Welding robot above a clamp fixture with cylinders and wrapped cable runs',
      ),
    ],
  },
  {
    slug: 'geely-shenyang-fs12-production-line',
    title: t('Geely Shenyang FS12 Production Line'),
    customer: 'Geely',
    family: 'assembly-lines',
    subject: 'fixtures',
    summary: t(
      'A production line project for Geely Shenyang FS12, documented through fixture stands photographed in the workshop.',
    ),
    gallery: [
      media(
        '/images/projects/geely-shenyang-fs12-line.jpg',
        1932,
        1932,
        'Row of cream fixture stands with blue pneumatic hoses on a green workshop floor',
      ),
    ],
  },
  {
    slug: 'geely-dc1e-production-line',
    title: t('Geely DC1E Production Line'),
    customer: 'Geely',
    family: 'assembly-lines',
    subject: 'fixtures',
    summary: t(
      'A production line project for Geely DC1E, documented through close photography of fixtures during assembly.',
    ),
    gallery: [
      media(
        '/images/projects/geely-dc1e-production-line.jpg',
        1932,
        1932,
        'Close-up of cream fixture stands with clamps and bolted brackets during assembly',
      ),
    ],
  },
  {
    slug: 'li-auto-control-arm-line',
    title: t('Li Auto Control Arm Line'),
    customer: 'Li Auto',
    family: 'assembly-lines',
    subject: 'fixtures',
    summary: t(
      'A control arm line project for Li Auto. Fixture design and line details are reviewed together with the part requirement.',
    ),
    gallery: [
      media(
        '/images/projects/li-auto-control-arm-line.jpg',
        1932,
        1932,
        'Top-down view of a fixture plate with clamps, locating pins and red-sheathed cables',
      ),
    ],
  },
  {
    slug: 'li-auto-subframe-line',
    title: t('Li Auto Subframe Line'),
    customer: 'Li Auto',
    family: 'assembly-lines',
    subject: 'fixtures',
    summary: t(
      'A subframe line project for Li Auto. Station tooling and interfaces are reviewed with you against your own program.',
    ),
    gallery: [
      media(
        '/images/projects/li-auto-subframe-line.jpg',
        1932,
        1932,
        'Fixture plate with red and silver clamp units and locating tooling under a white overhead frame',
      ),
    ],
  },
]

export type Project = {
  slug: string
  href: string
  title: string
  customer?: string
  familySlug: SolutionSlug
  familyLabel: string
  subject: ProjectSubject
  subjectLabel: string
  summary: string
  cover: Media
  images: Media[]
}

function resolveProject(record: ProjectRecord, locale: Locale): Project {
  const images = record.gallery.map((image) => resolveMedia(image, locale))
  return {
    slug: record.slug,
    href: `/projects/${record.slug}`,
    title: localize(record.title, locale),
    customer: record.customer,
    familySlug: record.family,
    familyLabel: localize(familyLabels[record.family], locale),
    subject: record.subject,
    subjectLabel: localize(subjectLabels[record.subject], locale),
    summary: localize(record.summary, locale),
    cover: images[0],
    images,
  }
}

export async function getProjects(locale: Locale = defaultLocale): Promise<Project[]> {
  const fallback = projectRecords.map((record) => resolveProject(record, locale))
  const supabase = getSupabaseClient()
  const currentTenant = tenantId()
  if (!supabase || !currentTenant) return fallback
  const { data, error } = await supabase.from('products').select('slug,name,name_i18n,description,description_i18n,image_url,category_slug,extra_data,is_active,sort_order').eq('tenant_id', currentTenant).eq('is_active', true).order('sort_order')
  if (error || !data?.length) return fallback
  const pick = (value: Record<string, string> | null | undefined, plain: string | null | undefined) => value?.[locale] || value?.[defaultLocale] || Object.values(value || {}).find(Boolean) || plain || ''
  return data.map((row) => {
    const staticMatch = fallback.find((item) => item.slug === row.slug)
    const familySlug = (row.category_slug || staticMatch?.familySlug || 'assembly-lines') as SolutionSlug
    const subject: ProjectSubject = familySlug === 'standard-workstations' ? 'workstation' : familySlug === 'fixtures-turntables' ? 'fixtures' : 'line'
    const imageUrls = Array.isArray(row.extra_data?.images) ? row.extra_data.images.filter((url: unknown): url is string => typeof url === 'string' && /^https:\/\//.test(url)) : []
    const urls = imageUrls.length ? imageUrls : row.image_url ? [row.image_url] : []
    const title = pick(row.name_i18n, row.name)
    const images = urls.map((src: string, index: number) => ({ src, width: 1600, height: 1200, alt: `${title} project view ${index + 1}` }))
    return {
      slug: row.slug,
      href: `/projects/${row.slug}`,
      title,
      customer: staticMatch?.customer,
      familySlug,
      familyLabel: localize(familyLabels[familySlug], locale),
      subject,
      subjectLabel: localize(subjectLabels[subject], locale),
      summary: pick(row.description_i18n, row.description),
      cover: images[0] || staticMatch!.cover,
      images: images.length ? images : staticMatch!.images,
    }
  })
}

export async function getProject(slug: string, locale: Locale = defaultLocale): Promise<Project | null> {
  return (await getProjects(locale)).find((item) => item.slug === slug) ?? null
}

export async function getProjectsBySlugs(slugs: string[], locale: Locale = defaultLocale): Promise<Project[]> {
  const all = await getProjects(locale)
  return slugs.map((slug) => all.find((project) => project.slug === slug)).filter((project): project is Project => Boolean(project))
}

export const featuredProjectSlugs = [
  'hozon-neta-production-line',
  'motor-assembly-line',
  'geely-chengdu-body-side-line',
  'li-auto-subframe-line',
]

export type GalleryItem = {
  id: string
  image: Media
  projectSlug: string
  projectTitle: string
  subject: ProjectSubject
  subjectLabel: string
}

export async function getGalleryItems(locale: Locale = defaultLocale): Promise<GalleryItem[]> {
  const projects = await getProjects(locale)
  return projects.flatMap((project) =>
    project.images.map((image, imageIndex) => ({
      id: `${project.slug}-${imageIndex}`,
      image,
      projectSlug: project.slug,
      projectTitle: project.title,
      subject: project.subject,
      subjectLabel: project.subjectLabel,
    })),
  )
}

export async function getSubjectFilters(locale: Locale = defaultLocale) {
  return (Object.keys(subjectLabels) as ProjectSubject[]).map((subject) => ({
    value: subject,
    label: localize(subjectLabels[subject], locale),
  }))
}

export const projectSlugs = projectRecords.map((record) => record.slug)
