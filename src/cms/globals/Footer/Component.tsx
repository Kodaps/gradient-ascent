import React from "react"
import Link from "next/link"
import { ThemeSelector } from "@/providers/Theme/ThemeSelector"
import { getCachedGlobal } from "@cms/lib/getGlobals"
import type { Footer } from "@payload-types"

import { CMSLink } from "@/components/Link"
import { Logo } from "@/components/Logo/Logo"

export async function Footer() {
  const footer: Footer = await getCachedGlobal("footer", 1)()

  const navItems = footer?.navItems || []

  return (
    <footer className="border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
