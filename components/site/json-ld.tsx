import { absoluteUrl } from '@/lib/seo'
import { site } from '@/lib/site'

type JsonLdProps = { data: Record<string, unknown> }

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

/** Only identity facts: no offers, prices, ratings, certifications or reviews. */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [{ '@type': 'Organization', '@id': absoluteUrl('/#organization'), name: site.legalName, alternateName: site.brand, url: absoluteUrl('/'), logo: absoluteUrl('/images/brand/kingsen-logo.png'), email: site.email, telephone: site.phone, address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: `${site.address.locality}, ${site.address.city}`, addressRegion: site.address.region, addressCountry: site.address.countryCode } }, { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: site.brand, url: absoluteUrl('/'), publisher: { '@id': absoluteUrl('/#organization') }, inLanguage: 'en' }],
      }}
    />
  )
}

export function ProductJsonLd({ name, description, path, images }: { name: string; description: string; path: string; images: string[] }) { return <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Product', '@id': absoluteUrl(`${path}#product`), name, description, url: absoluteUrl(path), image: images.map(absoluteUrl), manufacturer: { '@id': absoluteUrl('/#organization') } }} /> }

export function ArticleJsonLd({ headline, description, path, image, datePublished }: { headline: string; description: string; path: string; image?: string; datePublished: string }) { return <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', '@id': absoluteUrl(`${path}#article`), headline, description, url: absoluteUrl(path), image: image ? absoluteUrl(image) : undefined, datePublished, dateModified: datePublished, author: { '@id': absoluteUrl('/#organization') }, publisher: { '@id': absoluteUrl('/#organization') } }} /> }

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  )
}

export function WebPageJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name,
        description,
        url: absoluteUrl(path),
        isPartOf: { '@type': 'WebSite', name: site.brand, url: absoluteUrl('/') },
      }}
    />
  )
}
