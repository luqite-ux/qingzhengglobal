import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('the inquiry handler consumes CAPTCHA before writing an inquiry', async () => {
  const source = await readFile(new URL('../app/api/inquiries/route.ts', import.meta.url), 'utf8')
  const verification = source.indexOf('verifyCaptchaSubmission')
  const insertion = source.indexOf("from('inquiries').insert")

  assert.ok(verification >= 0)
  assert.ok(insertion > verification)
  assert.match(source, /if \(!captcha\.ok\)/)
})

test('contact page mounts an independent CAPTCHA field', async () => {
  const source = await readFile(new URL('../components/contact/inquiry-form.tsx', import.meta.url), 'utf8')
  assert.match(source, /<InquiryCaptchaField/)
})
