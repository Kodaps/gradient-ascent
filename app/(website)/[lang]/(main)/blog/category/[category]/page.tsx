import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { List } from '@/components/blog/List';
import { ListPage } from '@/components/blog/ListPage';
import { Lang } from "@/lib/i18n";


import type { Metadata } from 'next'



import { findLatestPostsByCategory, findAllCategories } from '@/lib/content';
import { getTranslations, Translator } from 'app/[lang]/(website)/dictionaries';

interface CategoryProps {
  params : {
    category?: string,
    lang: Lang
  }
}

const getTitle = (t:Translator, param: string) => {

  let h1 = t('blog.h1');
  let cat = t('blog.category');
  return  `${h1} ${cat} ${param}`;
}


export async function generateMetadata({ params: {category, lang} }: CategoryProps) {
  // For /products/123, params.id is "123"
  // For /products/123?foo=bar, searchParams.get("foo") is "bar"
  // The return value is the metadata object
  let t = await getTranslations(lang);
  return { title: getTitle(t, category || '') }

}

export async function generateStaticParams() {
  return [
    ...(await findAllCategories('en')).map((category) => ({ category, lang: 'en' })),
    ...(await findAllCategories('fr')).map((category) => ({ category, lang: 'fr' })) 
];
}




export default async function Home({params: {category, lang}}:CategoryProps) {

  const t = await getTranslations(lang);
  const item = category || '';
  const posts = await findLatestPostsByCategory(lang, item);
  return <ListPage lang={lang} title={getTitle(t, item)} posts={posts}/>
}
