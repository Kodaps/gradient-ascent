import { findLatestPosts } from '@/lib/posts';
import { Lang, otherLang } from "@/lib/i18n";

import { getTranslations } from './dictionaries';
import { Metadata } from 'next';

interface PageProps {
  params : {
    lang: Lang
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }];
}


export async function generateMetadata( {params: {lang}}: PageProps ):Promise<Metadata> {

  const t = await getTranslations(lang);
;
  const _otherLang = otherLang(lang);
  const canonical = lang + "/";
  const alts: {[key:string]: string} = {
    [lang] : canonical,
    [_otherLang] : otherLang + "/"
  };

  return {
    title: t('home.metatitle'),
    description: t('home.metadescription'),
    alternates : {
      canonical,
      languages: alts,
      types: {
          'application/rss+xml': [
              { url: 'rss.xml', title: 'rss' }
            ]
      }
    }
  };

}



const Page =  async ({params : {lang}}: PageProps) => {

  const t = await getTranslations(lang);

  const posts = await findLatestPosts(lang, 4);

  return <>
    <section>
      <h1 className='text-xl font-weight-bold'>{t('hello')}</h1>
    </section>
  </>;
}

export default Page;