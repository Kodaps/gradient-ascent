import Image from 'next/image';
import Link from 'next/link';
import { List } from '@/components/blog/List';

import { findLatestPosts } from '@/lib/content';
import { Lang } from "@/lib/i18n";
import { Metadata } from 'next';
import { langs, useTranslation, Translator } from "@/lib/i18n";
import { allPortfolios } from 'contentlayer/generated';
interface Params {
  params : {
    lang: Lang
  }
}

const getTitle = (t:Translator, param: string) => {
  return t('blog.h1')+' | Kodaps';
}


export async function generateMetadata({ params: {lang} }: Params):Promise<Metadata> {
  return {
    title: 'The Kodaps blog',
    description: 'Where code is fun'
  };

}



export default async function BlogIndex({params:{lang}}:Params) {
  const {t} = await useTranslation(lang);
  const posts = await findLatestPosts(lang, 20, 0);

  const portfolios = allPortfolios;

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
        {t('blog.h1')+' | Kodaps'}
        </h1>
      <div className="p-4 md:p-0">
        <List 
        lang={lang}
        posts={posts}
        />
      </div>
    </section>
  );
}
