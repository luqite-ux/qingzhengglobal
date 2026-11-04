import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const routes = [
  'app/solutions/page.tsx',
  'app/solutions/[slug]/page.tsx',
  'app/projects/page.tsx',
  'app/projects/[slug]/page.tsx',
  'app/capabilities/page.tsx',
  'app/about/page.tsx',
  'app/news/page.tsx',
  'app/news/[slug]/page.tsx',
  'app/contact/page.tsx',
]

test('all planned public routes have page implementations', async () => {
  for (const route of routes) await access(new URL(`../${route}`, import.meta.url))
})

test('home page composes the full conversion narrative', async () => {
  const source = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8')
  for (const component of [
    'SolutionPaths',
    'FeaturedProjects',
    'EngineeringProcess',
    'CapabilityEvidence',
    'ProjectGallery',
    'Collaboration',
    'CompanyOverview',
    'NewsPreview',
  ]) {
    assert.match(source, new RegExp(`<${component}`), `missing ${component}`)
  }
})
