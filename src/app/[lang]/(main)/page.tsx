import { findLatestPosts, getPermalink, getPermalinkByDocument } from '@/lib/content';
import { Lang, otherLang } from "@/lib/i18n";
import { getTranslations } from '../dictionaries';
import { Metadata } from 'next';
import { Section } from '@/components/atoms/Section';
import { Header2 } from '@/components/atoms/Header2';
import { Header1 } from '@/components/atoms/Header1';
import HeroSection from '@/components/molecules/HeroSection';

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

  return (<>
    <HeroSection>
      <Header1>Gradient Ascent - A starter website for Next.Js by Kodaps</Header1>
      <image></image>
    </HeroSection>
    <Section variant="light">
      <Header2 title="Latest Posts" />
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <a href={getPermalinkByDocument(post)}>{post.title}</a>
          </li>
        ))}
      </ul>
    </Section>
  </>);
}

export default Page;