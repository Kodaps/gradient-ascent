'use server'
import Image from "next/image"
import { Page } from "contentlayer/generated"
import { getMDXComponent } from "next-contentlayer2/hooks"

import { findRelatedPosts, getAltLinks } from "@/lib/content"
import { Lang } from "@/lib/i18n"
import { AltLinkManager } from "@/components/altlinks/AltLinkManager"
import { Heading1 } from "@/components/atoms/Heading1"
import { Section } from "@/components/atoms/Section"
import StructuredData from "@/components/atoms/StructuredData"
import { LatestPosts } from "@/components/molecules/LatestPostsSection"
import { getTranslations } from "@/lib/i18n/getTranslations"


interface MDXPageProps {
  page: Page
  locale: Lang
}

export default async function MDXPage({ page, locale }: MDXPageProps) {

  const t = await getTranslations(locale)

  const MDXContent = getMDXComponent(page?.body?.code || "")

  const altLinks = getAltLinks(page)

  const posts = await findRelatedPosts(page, locale, 4)

  const blogStructuredData = false

  return (
    <>
      {blogStructuredData && <StructuredData data={blogStructuredData} />}
      <Section>
        <article>
          <header className={page.featuredImage ? "text-center" : ""}>
            <AltLinkManager altLinks={altLinks} lang={locale} hidden={true} />
            <Heading1>{page.title}</Heading1>
            {page.featuredImage ? (
              <Image
                src={page.featuredImage}
                className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-4xl"
                sizes="(max-width: 900px) 400px, 900px"
                alt={page.title || ""}
                loading="eager"
                priority
                width={900}
                height={480}
              />
            ) : (
              <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="border-t dark:border-slate-700" />
              </div>
            )}
          </header>
          <div className="prose prose-md prose-headings:font-heading prose-headings:leading-tighter container prose-stone prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-image:rounded-md prose-image:shadow-lg  dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl">
            <MDXContent />
          </div>
        </article>
      </Section>
      <LatestPosts
        title={t("blog.title")}
        subtitle={t("blog.see_all")}
        variant
        lang={locale}
        posts={posts}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6"></div>
    </>
  )
}
