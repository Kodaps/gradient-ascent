
import '@/assets/styles/base.css';

import Script from 'next/script'
import Providers from '@/components/atoms/Providers';
import Header from '@/components/widgets/Header';

const SITE = require('src/siteConfig.js').SITE;


import type { Metadata } from 'next'

interface Params {
  params : {
    slug: string
  }
}


export interface LayoutProps {
  children: React.ReactNode;
  params : {
    lang: Lang;
  }
}

import { Inter } from 'next/font/google'


import { getDictionary } from './dictionaries';
import { Lang } from "@/lib/i18n";
import Footer2 from '@/components/widgets/Footer2';


const customFont = Inter({ subsets: ['latin'],  display:'swap',  variable: '--font-inter' });

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }];
}

export interface LayoutProps {
  children: React.ReactNode;
  params : {
    lang: Lang;
  }
}




const  RootLayout = async ({ children, params }: LayoutProps) => {

  const {lang} = params;
  const dict = await getDictionary(lang);

  return (
    <html lang={ lang } className={`motion-safe:scroll-smooth 2xl:text-[24px] ${customFont.variable} font-sans`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white tracking-tight text-gray-900 antialiased dark:bg-zinc-900 dark:text-slate-300">
        <Providers>
          {/*<Announcement />*/}
          <Header lang={lang} dict={dict} />
          <main>{children}</main>
          <Footer2 lang={lang} />
        </Providers>
      </body>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script id="gtag_config" strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </html>
  );
};

export default RootLayout;

