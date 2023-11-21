//i18n-config.ts
import { Lang } from "../lib/i18n";


interface i18nTypes {
  defaultLocale: Lang,
  locales: Array<Lang>
};


export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
} as const

export type Locale = typeof i18n['locales'][number];
