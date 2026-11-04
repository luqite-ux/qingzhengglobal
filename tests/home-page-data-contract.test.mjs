import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('home page resolves hero slides before rendering the carousel', async () => {
  const source = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8')

  assert.match(source, /getHeroSlides/)
  assert.match(source, /const resolvedSlides = slides\.map/)
  assert.match(source, /<HeroCarousel\s+slides=\{resolvedSlides\}/)
})
