
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
  defaultNS: 'common'
} as const


export function getOptions (lng: string = i18n.defaultLocale, ns: string = i18n.defaultNS) {
  return {
    // debug: true,
    supportedLngs: i18n.locales,
    fallbackLng: i18n.defaultLocale,
    lng,
    fallbackNS: i18n.defaultNS,
    defaultNS: i18n.defaultNS,
    ns
  }
}

export type Locale = typeof i18n['locales'][number];
