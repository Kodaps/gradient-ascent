import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from '@/config/i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'

import Negotiator from 'negotiator';

import { redirects } from '@/lib/redirectTable';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
 
  try {
    return matchLocale(languages, locales, i18n.defaultLocale)
  } catch (err) {
    return i18n.defaultLocale;
  }


}





export function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname

  // check if there are hard coded redirects to handle
  if (!!redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], request.url));
  }

  // Localisation : 1. Check if there is any supported locale in the pathname
  if (i18n.locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)) {
    // if so, we are good to go
    return;
  }

  // Localisation : 2. Get supported locale from headers
  let locale = getLocale(request) || i18n.defaultLocale;

  // Localisation : 3. Redirect based on the locale
  return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));

}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` and more...
  matcher: ['/((?!api|_next/static|images|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-0.xml|server-sitemap.xml).*)'],
}