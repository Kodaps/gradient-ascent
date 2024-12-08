"use server"

import { redirect } from "next/navigation"
import { Post as ContentLayerPost } from "contentlayer/generated"

import {
  findRelatedPosts,
  generateBlogPostStructuredData,
  generateFAQSchema,
  getAlternateSlug,
  getAltLinks,
  getPermalink,
  parseContent,
} from "@/lib/content"
import { Lang } from "@/lib/i18n"
import { AltLinkManager } from "@/components/altlinks/AltLinkManager"
import StructuredData from "@/components/atoms/StructuredData"
import { Article } from "@/components/blog/Article"
import { LatestPosts } from "@/components/molecules/LatestPostsSection"
import { getTranslations } from "@/lib/i18n/getTranslations"

export default async function MDXBlogPost({
  post,
  lang,
  slug,
}: {
  post: ContentLayerPost
  lang: Lang
  slug: string
}) {
  // get dictionnary for localised text
  const t = await getTranslations(lang)

  if (post.redirect) {
    const url = getPermalink(post.redirect, "Post", lang)
    return redirect(url)
  }

  if (post.lang !== lang) {
    // check if the post has a translation
    // if so redirect
    console.error(`lang issue found for ${slug}, looking for equivalent in ${lang} then redirecting to home`);

    if (post.alts) {
      const alt = getAlternateSlug(post.alts, lang)
      if (alt) {
        const url = getPermalink(alt, "Post", lang)
        return redirect(url)
      }
    }
  }

  const altLinks = getAltLinks(post)

  const posts = await findRelatedPosts(post, lang, 4)

  const parsedContent = await parseContent(post.body.raw)

  const FAQStructuredData = generateFAQSchema(parsedContent)

  return (
    <>
      <StructuredData data={generateBlogPostStructuredData(post)} />
      {FAQStructuredData && <StructuredData data={FAQStructuredData} />}
      <AltLinkManager altLinks={altLinks} lang={lang} hidden={true} />
      <Article post={post} lang={lang} />
      {/* (faq && faq.length > 0) && <FAQs2 items={faq.map((item) => {
      return {question: item.question, answer: renderMarkdown(item.answer)}
    })} /> */}
      <LatestPosts
        variant
        title={t("blog.title")}
        subtitle={t("blog.see_all")}
        lang={lang}
        posts={posts}
      />
    </>
  )
}
