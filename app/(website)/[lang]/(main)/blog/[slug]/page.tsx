
'use server';
// import '@/assets/styles/prism-one-dark.css';
import Image from 'next/image';
import { redirect, notFound } from 'next/navigation';
// import { YoutubeEmbed } from '@/components/widgets/YoutubeEmbed';
import type { Metadata } from 'next'

import { findRelatedPosts, generateContentMetaData, generateBlogPostStructuredData, getPermalink, renderMarkdown, generateFAQSchema, 
       getPostBySlug as getContentLayerPostBySlug, parseContent, getAlternateSlug, getAltLinks } from '@/lib/content';
import StructuredData from '@/components/atoms/StructuredData';
import { LatestPosts } from '@/components/molecules/LatestPostsSection';
import { getOtherLanguages, Lang, useTranslation } from '@/lib/i18n';
import { Article } from '@/components/blog/Article';
import { allPosts, Post as ContentLayerPost } from 'contentlayer/generated';
import { AltLinkManager } from '@/components/altlinks/AltLinkManager';
import { getPostBySlug as getPayloadPostBySlug } from '@/cms/content/getContentBySlug';

import PayloadPostPage from '@/cms/pages/Post';


/*
export async function generateMetadata({ params }:BlogPostParams):Promise<Metadata> {

  const { slug, lang } = await params;
  const post = getContentLayerPostBySlug( slug, lang);
  if (!post) return notFound();
  return generateContentMetaData('Post', post);
}
  */

export async function generateStaticParams() {
  return (await allPosts).map(({ lang, slug }) => ({ lang, slug }));
}



async function ContentLayerBlogPostPage({post, lang, slug}: {post: ContentLayerPost, lang: Lang, slug: string}) {

  // get dictionnary for localised text
  const {t} = await useTranslation(lang);

  if (post.redirect) {
    const url = getPermalink(post.redirect, 'Post', lang);
    return redirect(url);
  }


  if (post.lang !== lang) {
    // check if the post has a translation
    // if so redirect
    console.log('lang issue found for slug', slug, 'looking for equivalent in', lang, 'redirecting to blog home')

    if (post.alts) {
      const alt = getAlternateSlug(post.alts, lang);
      if (alt) {
        const url = getPermalink(alt, 'Post', lang);
        return redirect(url);
      }
    }
  }


  let altLink: string = '';
  let otherLang:Lang = getOtherLanguages(lang)[0];


  const altLinks = getAltLinks(post);

  const posts = await findRelatedPosts(post, lang, 4);

  const parsedContent = await parseContent(post.body.raw);

  const FAQStructuredData = generateFAQSchema(parsedContent);

  const faq = parsedContent?.faq;

  return (
    <>
    <StructuredData data={generateBlogPostStructuredData(post)} />
    { FAQStructuredData && <StructuredData data={FAQStructuredData} />}
    <AltLinkManager altLinks={altLinks} lang={lang} hidden={true}/>
    <Article post={post} lang={lang} />
    {/* (faq && faq.length > 0) && <FAQs2 items={faq.map((item) => {
      return {question: item.question, answer: renderMarkdown(item.answer)}
    })} /> */ }
    <LatestPosts
        variant
        title={t('blog.title')}
        subtitle={t('blog.see_all')}
        lang={lang}
        posts={posts}
      />
    </>
  );

}


export default async function BlogPostPage({ params }: BlogPostParams) {

  const {lang, slug} = await params;

  const post =  getContentLayerPostBySlug( slug, lang);

  if (post) {
    console.log(`returning content layer post page`);
    return <ContentLayerBlogPostPage post={post} lang={lang} slug={slug} />
  }

  // get the post using the slug and lang params
  const cmspost = await getPayloadPostBySlug({ slug, lang});

  if (!cmspost) {
    console.log(`returning not found`);

    console.log(`no blog post found for slug ${slug} / ${lang} 'redirecting to blog home`)
    return notFound();
  }

  const url = `/${lang}/blog/${slug}`;

  return <PayloadPostPage post={cmspost} url={url} />

}
