import Providers from '@/components/providers/Providers';

import { auth } from "auth"
// import { getDictionary } from './dictionaries';
import { Lang } from "@/lib/i18n";

// import { authConfig } from 'auth.config';

// import CookieBanner from '@/components/widgets/CookieBanner';
// import GoogleAnalytics from '@/components/widgets/GoogleAnalytics';


interface Params {
  params : {
    slug: string
  }
}

import { Inter } from 'next/font/google'


const customFont = Inter({ subsets: ['latin'],  display:'swap',  variable: '--font-inter' });



export interface LayoutProps {
  children: React.ReactNode;
  params : {
    lang: Lang;
  }
}

const  RootLayout = async ({ children, params }: LayoutProps) => {

  const {lang} = params;
  const session = await auth();

  return (
    <html lang={ lang } className={`motion-safe:scroll-smooth ${customFont.variable} font-sans`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      { /* <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ''}/> */ }
      <body className="bg-white tracking-tight text-gray-900 antialiased dark:bg-zinc-900 dark:text-slate-300">
        <Providers session={session}>
          <main>{children}</main>
        </Providers>
        {/* <CookieBanner/> */}
      </body>
      {/*<Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script id="gtag_config" strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
              });
          `}
            </Script>*/}
    </html>
  );
};

export default RootLayout;
