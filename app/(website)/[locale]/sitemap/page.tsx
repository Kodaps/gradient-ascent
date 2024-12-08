import { Metadata } from "next"
import Link from "next/link"
import { Post } from "contentlayer/generated"

import { allPagesByLang, allPostsByLang, getPermalink } from "@/lib/content"
import { Lang } from "@/lib/i18n"
import { AltLink } from "@/components/altlinks/AltLangLink"

import { getTranslations } from "../../dictionaries"

interface SitemapParams {
  params: {
    locale: Lang
  }
}

export async function generateMetadata({
  params,
}: SitemapParams): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations(locale)

  return {
    title: t("sitemap.metatitle"),
    description: t("sitemap.metadescription"),
  }
}

interface Count {
  category: { [key: string]: number }
  tag: { [key: string]: number }
}

// interface Item

export default async function SitemapPage({ params }: SitemapParams) {
  const { locale } = await params
  const t = await getTranslations(locale)
  const otherLang = locale === "en" ? "fr" : "en"
  const _posts = allPostsByLang(locale)
  const _pages = allPagesByLang(locale)

  const emptyCount = { category: {}, tag: {} }

  // count the number of occurences of a each category & tag in the posts
  const count = _posts.reduce((acc: Count, post: Post) => {
    if (post.category) {
      if (acc.category[post.category]) {
        acc.category[post.category] += 1
      } else {
        acc.category[post.category] = 1
      }
    }
    for (let tag of post.tags || []) {
      if (acc.tag[tag]) {
        acc.tag[tag] += 1
      } else {
        acc.tag[tag] = 1
      }
    }
    return acc
  }, emptyCount)

  const categories = Object.entries(count.category)
    .sort(
      ([itmA, countA], [itmB, countB]) =>
        (countB as number) - (countA as number)
    )
    .map(([category, count]) => category)

  const tags = Object.entries(count.tag)
    .sort(
      ([itmA, countA], [itmB, countB]) =>
        (countB as number) - (countA as number)
    )
    .map(([tag, count]) => tag)

  return (
    <section className="">
      <div className="px-4 py-16 mx-auto max-w-5xl lg:py-20">
        <div className="container prose">
          <h1>{t("sitemap.title")}</h1>
          <p>{t("sitemap.description")}</p>
          <h2>{t("sitemap.mainpages")}</h2>
          <Link href="/">{t("home.title")}</Link>
          <br />
          {_pages.map((page) => {
            return (
              <span key={page.slug}>
                <Link href={getPermalink(page.slug || "", "Page", lang)}>
                  {page.title}
                </Link>
                <br />
              </span>
            )
          })}
          <h2>{t("blog.h1")}</h2>
          <h3>{t("blog.categories")}</h3>
          {categories.map((category) => {
            return (
              <>
                <Link
                  key={category}
                  href={getPermalink(category, "category", lang)}
                >
                  {t("blog.category") + " " + t(category)}
                </Link>
                <ul>
                  {_posts
                    .filter((post) => !!post.slug && post.category === category)
                    .map((post) => {
                      return (
                        <li key={post.slug}>
                          <Link
                            href={getPermalink(post.slug || "", "Post", lang)}
                          >
                            {post.title}
                          </Link>
                        </li>
                      )
                    })}
                </ul>
                <br />
              </>
            )
          })}

          <h3>{t("blog.tags")}</h3>
          {tags.map((tag) => {
            return (
              <span key={tag}>
                <Link href={getPermalink(tag, "tag", lang)}>
                  {t("blog.tagged") + " " + t(tag)}
                </Link>
                <br />
              </span>
            )
          })}
        </div>
        <AltLink altLink={`/${otherLang}/sitemap`} hidden={false}>
          {t("switch_languages")}
        </AltLink>
      </div>
    </section>
  )
}
