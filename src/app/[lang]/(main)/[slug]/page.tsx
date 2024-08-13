
// import '@/assets/styles/prism-one-dark.css';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

import { getMDXComponent } from 'next-contentlayer2/hooks'

import { findRelatedPosts, generateContentMetaData, getPermalink, getPageBySlug, getAlternateSlug } from '@/lib/content';
import StructuredData from '@/components/atoms/StructuredData';

import { Lang, getOtherLanguages } from '@/lib/i18n';
import { getTranslations } from '../../dictionaries';
import { Metadata, ResolvingMetadata } from 'next';
import { AltLink } from '@/components/atoms/AltLangLink';
import { allPages } from 'contentlayer/generated';
import { LatestPosts } from '@/components/molecules/LatestPostsSection';
import { Heading1 } from '@/components/atoms/Heading1';
import { Section } from '@/components/atoms/Section';


interface Params {
  params : {
    slug: string,
    lang: Lang,
  }
}



export async function generateMetadata({ params: {slug, lang} }:Params):Promise<Metadata> {
  const post = await getPageBySlug(slug, lang);
  if (!post) return notFound();
  return generateContentMetaData('Page', post);
}

export async function generateStaticParams() {
  return allPages.map(({ slug, lang }) => ({ slug, lang }));
}

export default async function Page({ params: {lang, slug } }: Params) {

  const t = await getTranslations(lang);
  const post = await getPageBySlug(slug, lang);
  if (!post) notFound();

  const MDXContent = getMDXComponent(post?.body?.code || '')

  let altLink: string = '';
  let otherLang:Lang = getOtherLanguages(lang)[0];


  if (post?.alts) {
    const alt = getAlternateSlug(post.alts, otherLang);
    if (alt) {
        altLink = getPermalink(alt, 'Page', otherLang as Lang);
    }
  }

  const posts = await findRelatedPosts(post, lang, 4);

  const blogStructuredData = false;

  return (
    <>
    { blogStructuredData && <StructuredData data={blogStructuredData} />}
    <Section>
      <article>
        <header className={post.featuredImage ? 'text-center' : ''}>
          <AltLink altLink={altLink} hidden={true}>
          {t('switch_languages')}
        </AltLink>
          <Heading1>
            {post.title}
          </Heading1>
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-4xl"
              sizes="(max-width: 900px) 400px, 900px"
              alt={post.title || ''}
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
        <div
          className="prose prose-md prose-headings:font-heading prose-headings:leading-tighter container prose-stone prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-image:rounded-md prose-image:shadow-lg  dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl"
          >
          <MDXContent />
          </div>
      </article>
    </Section>
    <LatestPosts
        title={t('blog.title')}
        subtitle={t('blog.see_all')}
        variant
        lang={lang}
        posts={posts}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">

      </div>
    
    </>
  );
}
