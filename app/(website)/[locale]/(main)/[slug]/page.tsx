// import '@/assets/styles/prism-one-dark.css';
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { getPageBySlug as getCMSPageBySlug } from "@/cms/content/getContentBySlug"
import CMSPage from "@/cms/pages/Page"
import MDXPage from "@/mdx/pages/MDXPage"
import { getMDXComponent } from "next-contentlayer2/hooks"

import {
  getPageBySlug,
} from "@/lib/content"
import { getOtherLanguages, Lang, useTranslation } from "@/lib/i18n"
import StructuredData from "@/components/atoms/StructuredData"

interface Params {
  params: {
    slug: string
    locale: Lang
  }
}

/*
export async function generateMetadata({ params: {slug, lang} }:Params):Promise<Metadata> {
  const page = await getPageBySlug(slug, lang);
  if (!page) return notFound();
  return generateContentMetaData('Page', page);
}

export async function generateStaticParams() {
  return allPages.map(({ slug, lang }) => ({ slug, lang }));
}*/

export default async function Page({ params }: Params) {
  const { slug, locale } = await params

  const page = await getPageBySlug(slug, locale)

  if (page) {
    return <MDXPage page={page} locale={locale} />
  }

  const cmspage = await getCMSPageBySlug({ slug, locale })

  if (!cmspage) {
    notFound()
  }

  return <CMSPage page={cmspage} slug={slug} />
}
