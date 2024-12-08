import type { Metadata } from "next"

import { findAllCategories, findLatestPostsByCategory } from "@/lib/content"
import { getTranslations, Lang, Translator } from "@/lib/i18n"
import { ListPage } from "@/components/blog/ListPage"

interface CategoryProps {
  params: {
    category?: string
    locale: Lang
  }
}

const getTitle = (t: Translator, param: string) => {
  let h1 = t("blog.h1")
  let cat = t("blog.category")
  return `${h1} ${cat} ${param}`
}

export async function generateMetadata({ params }: CategoryProps) {
  const { category, locale } = await params
  // For /products/123, params.id is "123"
  // For /products/123?foo=bar, searchParams.get("foo") is "bar"
  // The return value is the metadata object
  let t = await getTranslations(locale)
  return { title: getTitle(t, category || "") }
}

export async function generateStaticParams() {
  return [
    ...(await findAllCategories("en")).map((category) => ({
      category,
      lang: "en",
    })),
    ...(await findAllCategories("fr")).map((category) => ({
      category,
      lang: "fr",
    })),
  ]
}

export default async function Home({ params }: CategoryProps) {
  const { category, locale } = await params
  const t = await getTranslations(locale)
  const item = category || ""
  const posts = await findLatestPostsByCategory(locale, item)
  return <ListPage lang={locale} title={getTitle(t, item)} posts={posts} />
}
