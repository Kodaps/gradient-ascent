import Providers from '@/components/providers/Providers';
import Header from '@/components/widgets/Header';
// import Announcement from '@/components/widgets/Announcement';
// import Footer2 from '@/components/widgets/Footer2';
import Script from 'next/script'

const SITE = require('src/config/site.config.mjs').SITE;


// import type { Metadata } from 'next'
//import 'highlight.js/styles/github.css';

interface Params {
  params : {
    slug: string
  }
}

/*
export const metadata:Metadata = {
  title: {
    default: 'Acme',
    template: '%s | Acme',
  },
}*/

import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
// const inter = Inter({ subsets: ['latin'] })



//import { Inter as CustomFont } from "next/font/google";

import { getDictionary } from '../dictionaries';
import { Lang } from "@/lib/i18n";

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

  return <>
      <Header lang={lang} dict={dict} />
          <main className="gap-5 flex flex-col">{children}
          </main>
      {/*<Footer2 lang={lang} /> */}
    </>;
};

export default RootLayout;
