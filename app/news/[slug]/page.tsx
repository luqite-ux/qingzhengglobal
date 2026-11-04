import { notFound } from 'next/navigation'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { ArticleJsonLd } from '@/components/site/json-ld'
import { getNewsArticle } from '@/lib/data/news'
import { buildMetadata } from '@/lib/seo'
export const dynamicParams = true
export const revalidate = 60
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = await getNewsArticle(slug); return article ? buildMetadata({ title: article.title, description: article.excerpt, path: article.href, image: article.image }) : {} }
export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = await getNewsArticle(slug); if (!article) notFound(); return <><ArticleJsonLd headline={article.title} description={article.excerpt} path={article.href} image={article.image?.src} datePublished={article.publishedAt} /><PageHero eyebrow="News" title={article.title} description={article.excerpt} crumbs={[{ label: 'News', href: '/news' }, { label: article.title, href: article.href }]} image={article.image} /><Section tone="white"><article className="article-prose mx-auto max-w-3xl"><time dateTime={article.publishedAt} className="font-mono text-sm text-ink-muted">{article.publishedAt}</time><div className="mt-8" dangerouslySetInnerHTML={{ __html: article.content ?? '' }} /></article></Section></> }
