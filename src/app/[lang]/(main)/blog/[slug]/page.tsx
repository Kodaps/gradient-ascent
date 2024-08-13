

// import '@/assets/styles/prism-one-dark.css';
import Image from 'next/image';
import { redirect, notFound } from 'next/navigation';
// import { YoutubeEmbed } from '@/components/widgets/YoutubeEmbed';
import type { Metadata } from 'next'

import { findRelatedPosts, generateContentMetaData, generateBlogPostStructuredData, getPermalink, renderMarkdown, generateFAQSchema, getPostBySlug, parseContent, getAlternateSlug } from '@/lib/content';
import StructuredData from '@/components/atoms/StructuredData';
import { LatestPosts } from '@/components/molecules/LatestPostsSection';
import { getTranslations } from '@/app/[lang]/dictionaries';
import { getOtherLanguages, Lang } from '@/lib/i18n';
import { AltLink } from '@/components/atoms/AltLangLink';
// import FAQs2 from '@/components/widgets/FAQs2';
import { Article } from '@/components/blog/Article';
import { allPosts } from 'contentlayer/generated';


export async function generateMetadata({ params: {slug, lang} }:BlogPostParams):Promise<Metadata> {
  const post = getPostBySlug( slug, lang);
  if (!post) return notFound();
  return generateContentMetaData('Post', post);
}

export async function generateStaticParams() {
  return (await allPosts).map(({ lang, slug }) => ({ lang, slug }));
}

export default async function BlogPostPage({ params: {lang, slug} }: BlogPostParams) {

  // get dictionnary for localised text
  const t = await getTranslations(lang);

  // get the post using the slug and lang params
  const post =  getPostBySlug( slug, lang);

  if (!post) {
    console.log(`no blog post found for slug ${slug} / ${lang} 'redirecting to blog home`)
    return notFound();
  }

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


  if (post?.alts) {
    const alt = getAlternateSlug(post.alts, otherLang);
    if (alt) {
        altLink = getPermalink(alt, 'Post', otherLang as Lang);
    }
  }


  const posts = await findRelatedPosts(post, lang, 4);

  const parsedContent = await parseContent(post.body.raw);

  const FAQStructuredData = generateFAQSchema(parsedContent);

  const faq = parsedContent?.faq;

  return (
    <>
    <StructuredData data={generateBlogPostStructuredData(post)} />
    { FAQStructuredData && <StructuredData data={FAQStructuredData} />}
    <AltLink altLink={altLink} hidden={true}>
      {t('switch_languages')}
    </AltLink>
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
