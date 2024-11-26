import { findLatestPosts, getPermalinkByDocument, getPermalinkByCoreSlug } from '@/lib/content';
import { langs, useTranslation } from "@/lib/i18n";
import { Metadata } from 'next';
import { Section } from '@/components/atoms/Section';
import HeroSection from '@/components/molecules/HeroSection';
import { Heading2 } from '@/components/atoms/Heading2';
import { AltLinkManager } from '@/components/altlinks/AltLinkManager';
import { LinkFormat } from '@/components/altlinks/AltLinkProvider';
import { Locale } from '@/config/i18n.config';

import SVG1 from '@/components/svg/svg1';
import RemoteImage from '@/components/atoms/RemoteImage';
import SVG2 from '@/components/svg/svg2';
import SVG3 from '@/components/svg/svg3';

interface PageProps {
  params : {
    lang: Locale
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }];
}


export async function generateMetadata( {params}: PageProps ):Promise<Metadata> {

  const {lang} = await params;

  const {t} = await useTranslation(lang);
;
  const canonical = lang + "/";

  const alts:LinkFormat = {};
  for(const _lang of langs) {
    alts[_lang] = _lang + "/";
  }

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



const Page =  async ({params}: PageProps) => {

  const lang = await params.lang;
  const {t} = await useTranslation(lang);

  const posts = await findLatestPosts(lang, 4);

  /*
<RemoteImage
        src='/images/home/technical_white.jpg'
        width={1232}
        height={928}
        alt={'a technical illustration'}
      />
  */

  return (<>

    <div className="w-1/2">

    </div>
    <AltLinkManager lang={lang} altLinks={{en : '/en', fr: '/fr'}}/>
    <HeroSection
      lang={lang}
      image={ <SVG3 /> }

      title='Gradient Ascent'
      subtitle='A starter website for Next.Js by Kodaps'
      callToAction2={{
        text: 'Get Started',
        href: '/en/getting-started'
      }}
      callToAction={{
        text: 'Features',
        href: getPermalinkByCoreSlug(lang, 'features')
      }}
    />
    <Section variant="light">
      <Heading2 title={ t('blog.title') }/>
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