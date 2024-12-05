import { ListPage } from '@/components/blog/ListPage';

import { findAllTags, findLatestPostsByTag } from '@/utils/content';
import { Lang } from "@/utils/i18n";
import { getTranslations, Translator } from 'app/[lang]/dictionaries';
interface TagProps {
  params : {
    tag?: string,
    lang: Lang
  }
}


const getTitle = (t:Translator, param: string) => {

  let h1 = t('blog.h1');
  let cat = t('blog.tagged');
  return  `${h1} ${cat} ${param}`;
}

export async function generateMetadata({ params: {tag, lang} }: TagProps) {
  // For /products/123, params.id is "123"
  // For /products/123?foo=bar, searchParams.get("foo") is "bar"
  // The return value is the metadata object
  let t = await getTranslations(lang);

  return { title: getTitle(t, tag || '') }

}

export async function generateStaticParams() {
  return [
    ...(await findAllTags('en')).map((tag) => ({ tag, lang: 'en' })),
    ...(await findAllTags('fr')).map((tag) => ({ tag, lang: 'fr' })) 
];
}

export default async function Home({params: {tag, lang}}:TagProps) {
  const item = tag || '';
  const posts = await findLatestPostsByTag(item, lang);
  let t = await getTranslations(lang);
  return <ListPage lang={lang} title={getTitle(t, tag || '')} posts={posts}/>
}