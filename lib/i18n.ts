export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

/** A translatable value. English is required; other locales fall back to it. */
export type Localized<T = string> = { en: T } & Partial<Record<Locale, T>>

export function localize<T>(value: Localized<T>, locale: Locale = defaultLocale): T {
  return (value[locale] as T | undefined) ?? value[defaultLocale]
}

export const t = (en: string): Localized => ({ en })
