import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

test('technical SEO routes and branded icon exist', async () => {
  for (const file of ['app/sitemap.ts', 'app/robots.ts', 'app/manifest.ts', 'app/icon.png']) await access(new URL(`../${file}`, import.meta.url))
})

test('root schema describes both the organization and website', async () => {
  const source = await readFile(new URL('../components/site/json-ld.tsx', import.meta.url), 'utf8')
  assert.match(source, /WebSite/)
  assert.match(source, /ProductJsonLd/)
  assert.match(source, /ArticleJsonLd/)
})
