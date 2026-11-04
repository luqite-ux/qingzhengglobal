import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/data/projects'
import { getNews } from '@/lib/data/news'
import { absoluteUrl } from '@/lib/seo'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const [projects, articles] = await Promise.all([getProjects(), getNews()]); const staticPaths = ['/', '/solutions', '/solutions/assembly-lines', '/solutions/fixtures-turntables', '/solutions/standard-workstations', '/projects', '/capabilities', '/about', '/news', '/contact']; return [...staticPaths.map((path) => ({ url: absoluteUrl(path), changeFrequency: path === '/' ? 'weekly' as const : 'monthly' as const, priority: path === '/' ? 1 : 0.7 })), ...projects.map((project) => ({ url: absoluteUrl(project.href), changeFrequency: 'monthly' as const, priority: 0.8 })), ...articles.map((article) => ({ url: absoluteUrl(article.href), lastModified: article.publishedAt || undefined, changeFrequency: 'monthly' as const, priority: 0.6 }))] }
