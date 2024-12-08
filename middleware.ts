import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"



// import {withAuth} from 'next-auth/middleware';

import createMiddleware from 'next-intl/middleware';
import {routing} from './src/lib/i18n/routing';
 

import { auth } from "./auth"
import { i18n } from "./src/config/i18n.config"
import { redirects } from "./src/config/redirectTable.config"
import { findDocumentById, getPermalinkByDocument } from "./src/lib/content"

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  try {
    return matchLocale(languages, locales, i18n.defaultLocale)
  } catch (err) {
    return i18n.defaultLocale
  }
}

const handleI18nRouting = createMiddleware(routing);


export function middleware(request: NextRequest, response: NextResponse) {


  const pathname = request.nextUrl.pathname

  if (pathname.startsWith(`/api/`)) {
    // use auth middleware for api routes

    return auth(
      request as unknown as NextApiRequest,
      response as unknown as NextApiResponse
    )
  }

  // check if there are hard coded redirects to handle
  if (!!redirects[pathname]) {
    // hardcoded redirect
    return NextResponse.redirect(new URL(redirects[pathname], request.url))
  }

  // check if it is a notion id

  const id = pathname.substring(1)

  if (id.length > 0) {
    const doc = findDocumentById(pathname.substring(1))

    if (doc) {
      const url = getPermalinkByDocument(doc)
      return NextResponse.redirect(new URL(url, request.url))
    }
  }

  return handleI18nRouting(request);

  /*
  // Localisation : 1. Check if there is any supported locale in the pathname
  if (
    i18n.locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
  ) {
    // if so, we are good to go
    return
  }

  // Localisation : 2. Get supported locale from headers
  let locale = getLocale(request) || i18n.defaultLocale

  // Localisation : 3. Redirect based on the locale
  return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  */
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` and more...
  matcher: [
    "/((?!api|_next/static|next|admin|auth|images|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-0.xml|server-sitemap.xml).*)",
  ],
}
