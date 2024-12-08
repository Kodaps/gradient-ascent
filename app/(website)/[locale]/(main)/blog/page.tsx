import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { allPortfolios } from "contentlayer/generated"

import { findLatestPosts } from "@/lib/content"
import { Lang, langs, } from "@/lib/i18n"
import { List } from "@/components/blog/List"

import siteConfig from "@/config/site.config.mjs"
import { getTranslations } from "@/lib/i18n/getTranslations"
import { Translator } from "@/lib/i18n/getTranslations"

interface Params {
  params: {
    locale: Lang
  }
}

const getTitle = (t: Translator) => {
  return t("blog.h1") + " | " + siteConfig.title
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {

  const { locale } = await params
  const t = await getTranslations(locale)

  return {
    title: getTitle(t),
    description: siteConfig.description,
  }
}

export default async function BlogIndex({ params }: Params) {

  const { locale } = await params
  const t = await getTranslations(locale)
  const posts = await findLatestPosts(locale, 20, 0)

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
      <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
        {getTitle(t)}
      </h1>
      <div className="p-4 md:p-0">
        <List lang={locale} posts={posts} />
      </div>
    </section>
  )
}
