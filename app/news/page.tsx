import { PageHero } from '@/components/site/page-hero'
import { NewsPreview } from '@/components/home/news-preview'
import { getNews } from '@/lib/data/news'
import { buildMetadata } from '@/lib/seo'

const description = 'Company updates and technical news from Kingsen.'
export const revalidate = 60
export const metadata = buildMetadata({ title: 'News', description, path: '/news' })
export default async function NewsPage() { const articles = await getNews(); return <><PageHero eyebrow="News" title="Company updates" description={description} crumbs={[{ label: 'News', href: '/news' }]} /><NewsPreview articles={articles} /></> }
