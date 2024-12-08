import { getTranslations, Translator } from "app/[lang]/(website)/dictionaries"

import { findAllTags, findLatestPostsByTag } from "@/lib/content"
import { Lang } from "@/lib/i18n"
import { ListPage } from "@/components/blog/ListPage"

interface TagProps {
  params: {
    tag?: string
    locale: Lang
  }
}

const getTitle = (t: Translator, param: string) => {
  let h1 = t("blog.h1")
  let cat = t("blog.tagged")
  return `${h1} ${cat} ${param}`
}

export async function generateMetadata({ params: { tag, locale } }: TagProps) {
  // For /products/123, params.id is "123"
  // For /products/123?foo=bar, searchParams.get("foo") is "bar"
  // The return value is the metadata object
  let t = await getTranslations(locale)

  return { title: getTitle(t, tag || "") }
}

export async function generateStaticParams() {
  return [
    ...(await findAllTags("en")).map((tag) => ({ tag, lang: "en" })),
    ...(await findAllTags("fr")).map((tag) => ({ tag, lang: "fr" })),
  ]
}

export default async function Home({ params }: TagProps) {
  const { tag, locale } = await params
  const item = tag || ""
  const posts = await findLatestPostsByTag(item, locale)
  let t = await getTranslations(locale)
  return <ListPage lang={locale} title={getTitle(t, tag || "")} posts={posts} />
}
