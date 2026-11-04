import type { Metadata } from 'next'
import { site } from '@/lib/site'

export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString()
}

type MetadataInput = {
  title: string
  description: string
  path: string
  image?: { src: string; width: number; height: number; alt: string }
}

const defaultShareImage = {
  src: '/images/banners/banner-fixtures-turntables.jpg',
  width: 2576,
  height: 1073,
  alt: 'Kingsen fixtures and turntables',
}

export function buildMetadata({ title, description, path, image = defaultShareImage }: MetadataInput): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.brand,
      type: 'website',
      images: [{ url: absoluteUrl(image.src), width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image.src)],
    },
  }
}
