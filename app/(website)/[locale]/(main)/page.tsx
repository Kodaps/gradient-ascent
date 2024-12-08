import { Metadata } from "next"

import { Locale } from "@/config/i18n.config"
import {
  findLatestPosts,
  getPermalinkByCoreSlug,
  getPermalinkByDocument,
} from "@/lib/content"

import { langs } from "@/lib/i18n"
import { AltLinkManager } from "@/components/altlinks/AltLinkManager"
import { LinkFormat } from "@/components/altlinks/AltLinkProvider"
import { Heading2 } from "@/components/atoms/Heading2"
import RemoteImage from "@/components/atoms/RemoteImage"
import { Section } from "@/components/atoms/Section"
import HeroSection from "@/components/molecules/HeroSection"
import SVG1 from "@/components/svg/svg1"
import SVG2 from "@/components/svg/svg2"
import SVG3 from "@/components/svg/svg3"
import { getTranslations } from "@/lib/i18n/getTranslations"

interface PageProps {
  params: {
    locale: Locale
  }
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }]
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params

  const t = await getTranslations(locale)
  const canonical = locale + "/"

  const alts: LinkFormat = {}
  for (const _lang of langs) {
    alts[_lang] = _lang + "/"
  }

  return {
    title: t("home.metatitle"),
    description: t("home.metadescription"),
    alternates: {
      canonical,
      languages: alts,
      types: {
        "application/rss+xml": [{ url: "rss.xml", title: "rss" }],
      },
    },
  }
}

const Page = async ({ params }: PageProps) => {
  const { locale } = await params

  const t = await getTranslations(locale)

  const posts = await findLatestPosts(locale, 4)

  /*
<RemoteImage
        src='/images/home/technical_white.jpg'
        width={1232}
        height={928}
        alt={'a technical illustration'}
      />
  */

  return (
    <>
      <div className="w-1/2"></div>
      <AltLinkManager lang={locale} altLinks={{ en: "/en", fr: "/fr" }} />
      <HeroSection
        lang={locale}
        image={<SVG3 />}
        title="Gradient Ascent"
        subtitle="A starter website for Next.Js by Kodaps"
        callToAction2={{
          text: "Get Started",
          href: "/en/getting-started",
        }}
        callToAction={{
          text: "Features",
          href: getPermalinkByCoreSlug(locale, "features"),
        }}
      />
      <Section variant="light">
        <Heading2 title={t("blog.title")} />
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <a href={getPermalinkByDocument(post)}>{post.title}</a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

export default Page
