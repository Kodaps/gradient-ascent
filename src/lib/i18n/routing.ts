import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

import { i18n } from "@/config/i18n.config"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: i18n.locales,

  // Used when no locale matches
  defaultLocale: i18n.defaultLocale,
  localePrefix: "as-needed",
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    "/": "/",
    "/blog": "/blog",

    // If locales use different paths, you can
    // specify each external path per locale
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
  },
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
