/*
export const metadata:Metadata = {
  title: {
    default: 'Acme',
    template: '%s | Acme',
  },
}*/

import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
// import Announcement from '@/components/widgets/Announcement';
// import Footer2 from '@/components/widgets/Footer2';
import Script from "next/script"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

import { Lang } from "@/lib/i18n"
import { routing } from "@/lib/i18n/routing"
import Providers from "@/components/providers/Providers"
import Header from "@/components/widgets/Header"

import {setRequestLocale} from 'next-intl/server';

const SITE = require("src/config/site.config.mjs").SITE

// import type { Metadata } from 'next'
//import 'highlight.js/styles/github.css';

interface Params {
  params: {
    slug: string
  }
}

const customFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }]
}

export interface LayoutProps {
  children: React.ReactNode
  params: {
    locale: Lang
  }
}

const RootLayout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale);

  const messages = await getMessages()

  return (
    <>
      <Header lang={locale} />
      <main className="gap-5 flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </main>
      {/*<Footer2 lang={lang} /> */}
    </>
  )
}

export default RootLayout
