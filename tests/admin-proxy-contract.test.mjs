import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('customer login uses a local route handler and writes both admin cookies', async () => {
  const page = await readFile(new URL('../app/admin/login/page.tsx', import.meta.url), 'utf8')
  const route = await readFile(new URL('../app/api/auth/login/route.ts', import.meta.url), 'utf8')
  assert.match(page, /action="\/api\/auth\/login"/)
  assert.match(route, /hq_admin_session|SESSION_COOKIE/)
  assert.match(route, /hq_tenant_id|TENANT_COOKIE/)
  assert.match(route, /303/)
})

test('admin routes proxy to the shared admin and middleware protects private pages', async () => {
  const config = await readFile(new URL('../next.config.mjs', import.meta.url), 'utf8')
  const middleware = await readFile(new URL('../middleware.ts', import.meta.url), 'utf8')
  assert.match(config, /\/api\/admin\/:path\*/)
  assert.match(middleware, /hq_admin_session|SESSION_COOKIE/)
})
