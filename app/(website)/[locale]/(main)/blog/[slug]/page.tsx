"use server"

// import '@/assets/styles/prism-one-dark.css';
// import { YoutubeEmbed } from '@/components/widgets/YoutubeEmbed';
import type { Metadata } from "next"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { getPostBySlug as getPayloadPostBySlug } from "@/cms/content/getContentBySlug"
import PayloadPostPage from "@/cms/pages/Post"
import MDXBlogPost from "@/mdx/pages/MDXBlogPost"
import { allPosts, Post as ContentLayerPost } from "contentlayer/generated"

import {
  findRelatedPosts,
  generateBlogPostStructuredData,
  generateContentMetaData,
  generateFAQSchema,
  getAlternateSlug,
  getAltLinks,
  getPostBySlug as getContentLayerPostBySlug,
  getPermalink,
  parseContent,
  renderMarkdown,
} from "@/lib/content"
import { getOtherLanguages, Lang, useTranslation } from "@/lib/i18n"
import { AltLinkManager } from "@/components/altlinks/AltLinkManager"
import StructuredData from "@/components/atoms/StructuredData"
import { Article } from "@/components/blog/Article"
import { LatestPosts } from "@/components/molecules/LatestPostsSection"

/*
export async function generateMetadata({ params }:BlogPostParams):Promise<Metadata> {

  const { slug, lang } = await params;
  const post = getContentLayerPostBySlug( slug, lang);
  if (!post) return notFound();
  return generateContentMetaData('Post', post);
}
  */

export async function generateStaticParams() {
  return (await allPosts).map(({ lang, slug }) => ({ lang, slug }))
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const { locale, slug } = await params

  const post = getContentLayerPostBySlug(slug, locale)

  if (post) {
    console.log(`returning content layer post page`)
    return <MDXBlogPost post={post} lang={locale} slug={slug} />
  }

  // get the post using the slug and lang params
  const cmspost = await getPayloadPostBySlug({ slug, locale })

  if (!cmspost) {
    console.log(`returning not found`)

    console.log(
      `no blog post found for slug ${slug} / ${locale} 'redirecting to blog home`
    )
    return notFound()
  }

  const url = `/${locale}/blog/${slug}`

  return <PayloadPostPage post={cmspost} url={url} />
}
