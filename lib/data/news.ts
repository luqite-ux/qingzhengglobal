import { defaultLocale, localize, type Locale, type Localized } from '@/lib/i18n'
import type { Media } from '@/lib/data/media'
import { getSupabaseClient, tenantId } from '@/lib/supabase'

/*
 * No articles have been published. Replace `newsRecords` with backend data
 * once real news exists; the News list, detail, preview and sitemap already
 * read from these functions.
 */

type NewsRecord = {
  slug: string
  title: Localized
  excerpt: Localized
  body: Localized<string[]>
  publishedAt: string
  image?: Media
}

const newsRecords: NewsRecord[] = []

export type NewsArticle = {
  slug: string
  href: string
  title: string
  excerpt: string
  body: string[]
  publishedAt: string
  image?: Media
  content?: string
}

function resolveNews(record: NewsRecord, locale: Locale): NewsArticle {
  return {
    slug: record.slug,
    href: `/news/${record.slug}`,
    title: localize(record.title, locale),
    excerpt: localize(record.excerpt, locale),
    body: localize(record.body, locale),
    publishedAt: record.publishedAt,
    image: record.image,
    content: '',
  }
}

export async function getNews(locale: Locale = defaultLocale): Promise<NewsArticle[]> {
  const fallback = newsRecords
    .map((record) => resolveNews(record, locale))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  const supabase = getSupabaseClient()
  const currentTenant = tenantId()
  if (!supabase || !currentTenant) return fallback
  const { data, error } = await supabase.from('articles').select('slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,featured_image,published_at,updated_at,is_published,sort_order').eq('tenant_id', currentTenant).eq('is_published', true).order('sort_order').order('published_at', { ascending: false })
  if (error || !data) return fallback
  const pick = (value: Record<string, string> | null | undefined, plain: string | null | undefined) => value?.[locale] || value?.[defaultLocale] || Object.values(value || {}).find(Boolean) || plain || ''
  return data.map((row) => ({ slug: row.slug, href: `/news/${row.slug}`, title: pick(row.title_i18n, row.title), excerpt: pick(row.excerpt_i18n, row.excerpt), content: pick(row.content_i18n, row.content), publishedAt: row.published_at || row.updated_at || '', image: row.featured_image ? { src: row.featured_image, width: 1600, height: 900, alt: pick(row.title_i18n, row.title) } : undefined }))
}

export async function getNewsArticle(slug: string, locale: Locale = defaultLocale): Promise<NewsArticle | null> {
  return (await getNews(locale)).find((item) => item.slug === slug) ?? null
}
