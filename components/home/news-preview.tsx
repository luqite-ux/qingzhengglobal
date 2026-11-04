import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import type { NewsArticle } from '@/lib/data/news'
import { CtaLink } from '@/components/site/cta-link'
import { NewsEmpty } from '@/components/site/news-empty'
import { Reveal } from '@/components/site/reveal'
import { Section, SectionHeader } from '@/components/site/section'

export function NewsPreview({ articles }: { articles: NewsArticle[] }) {
  const latest = articles.slice(0, 3)
  return (
    <Section id="news-preview" tone="paper" labelledBy="news-preview-title">
      <SectionHeader
        id="news-preview-title"
        eyebrow="News"
        title="Company updates"
        action={
          <CtaLink href="/news" variant="outlineDark" arrow>
            News
          </CtaLink>
        }
      />
      {latest.length === 0 ? (
        <Reveal>
          <NewsEmpty compact />
        </Reveal>
      ) : (
        <ul className="border-b border-line">
          {latest.map((article, index) => (
            <Reveal
              as="li"
              key={article.slug}
              index={index}
              className="group relative grid gap-2 border-t border-line py-6 md:grid-cols-[10rem_1fr] md:gap-8"
            >
              <time dateTime={article.publishedAt} className="font-mono text-sm text-ink-muted">
                {article.publishedAt}
              </time>
              <div>
                <h3 className="text-lg font-semibold">
                  <Link href={article.href} className="after:absolute after:inset-0 after:content-['']">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      )}
      <span className="sr-only">
        <Newspaper aria-hidden="true" />
      </span>
    </Section>
  )
}
