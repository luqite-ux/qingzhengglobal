'use client'

import { useState } from 'react'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'

const field = 'min-h-12 w-full rounded-md border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-gold-deep focus:ring-2 focus:ring-gold/25'

export function InquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('submitting'); setMessage('')
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to send inquiry.')
      form.reset(); setStatus('success'); setMessage('Thank you. Your project inquiry has been received.'); setRefreshKey((value) => value + 1)
    } catch (error) {
      setStatus('error'); setMessage(error instanceof Error ? error.message : 'Unable to send inquiry.'); setRefreshKey((value) => value + 1)
    }
  }
  return <form onSubmit={submit} className="grid gap-5" noValidate>
    <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium">Name *<input className={field} name="name" required autoComplete="name" /></label><label className="grid gap-2 text-sm font-medium">Email *<input className={field} name="email" type="email" required autoComplete="email" /></label></div>
    <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium">Company<input className={field} name="company" autoComplete="organization" /></label><label className="grid gap-2 text-sm font-medium">Phone<input className={field} name="phone" autoComplete="tel" /></label></div>
    <label className="grid gap-2 text-sm font-medium">Project type<select className={field} name="subject" defaultValue="Website project inquiry"><option>Website project inquiry</option><option>Production & assembly line</option><option>Fixtures & turntables</option><option>Standard workstation</option></select></label>
    <label className="grid gap-2 text-sm font-medium">Requirement *<textarea className={`${field} min-h-36 py-3`} name="message" required placeholder="Part or process, site constraints, interfaces and requested scope" /></label>
    <InquiryCaptchaField refreshKey={refreshKey} />
    <button type="submit" disabled={status === 'submitting'} className="min-h-12 rounded-md bg-gold px-6 font-semibold text-graphite transition hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60">{status === 'submitting' ? 'Sending…' : 'Send project inquiry'}</button>
    {message ? <p role="status" className={`rounded-md border px-4 py-3 text-sm ${status === 'success' ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-red-300 bg-red-50 text-red-800'}`}>{message}</p> : null}
  </form>
}
