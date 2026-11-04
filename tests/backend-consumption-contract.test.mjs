import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('project and news data layers query the tenant backend', async () => {
  const projects = await readFile(new URL('../lib/data/projects.ts', import.meta.url), 'utf8')
  const news = await readFile(new URL('../lib/data/news.ts', import.meta.url), 'utf8')

  assert.match(projects, /getSupabaseClient/)
  assert.match(projects, /from\(['"]products['"]\)/)
  assert.match(news, /getSupabaseClient/)
  assert.match(news, /from\(['"]articles['"]\)/)
})
