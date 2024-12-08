import type { Metadata } from "next"

import "./globals.css"

//import 'highlight.js/styles/github.css';

/*
export const metadata:Metadata = {
  title: {
    default: 'Acme',
    template: '%s | Acme',
  },
}*/

export async function generateMetadata(): Promise<Metadata> {
  const conf = await import("@/config/site.config.mjs")
  const SITE = conf.default

  return {
    metadataBase: new URL(`${SITE.origin}${SITE.basePathname}`),
  }
}

export interface LayoutProps {
  children: React.ReactNode
}
const RootLayout = async ({ children }: LayoutProps) => {
  return <>{children}</>
}

export default RootLayout
