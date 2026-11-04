import { NextResponse } from 'next/server'
import { getAdminSupabase } from '@/lib/supabase-server'
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'

export async function POST(request: Request) {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  const secret = process.env.CAPTCHA_SECRET?.trim()
  if (!tenantId || !secret) return NextResponse.json({ error: 'Inquiry service is unavailable.' }, { status: 503 })
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const message = String(body.message || '').trim()
  if (!name || !email || !message) return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
  let captcha
  try {
    const context = createSupabaseCaptchaContextFromEnv()
    captcha = await verifyCaptchaSubmission({ secret, ...context, scope: String(body.captchaScope || ''), token: String(body.captchaToken || ''), answer: String(body.captchaAnswer || '') })
  } catch {
    return NextResponse.json({ error: 'Verification service is unavailable.' }, { status: 503 })
  }
  if (!captcha.ok) return NextResponse.json({ error: captcha.code === 'expired' ? 'The verification code expired. Please use the new code.' : 'The verification code is incorrect. Please try again.', captchaCode: captcha.code }, { status: 400 })
  const { error } = await getAdminSupabase().from('inquiries').insert({ tenant_id: tenantId, name, email, phone: String(body.phone || '').trim() || null, company: String(body.company || '').trim() || null, subject: String(body.subject || 'Website project inquiry').trim(), message })
  if (error) return NextResponse.json({ error: 'We could not save the inquiry. Please contact us by email.' }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
