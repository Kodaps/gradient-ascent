import Link from "next/link"
import { Post } from "contentlayer/generated"

import { Lang, routeToHref } from "@/lib/i18n"

import { Heading2 } from "../atoms/Heading2"
import { Section } from "../atoms/Section"
import { Grid } from "../blog/Grid"

interface LatestPostsProps {
  posts: Array<Post>
  variant?: boolean
  lang: Lang
  title: string
  subtitle: string
  ctaLink?: string
}

export function LatestPosts ({
  posts,
  variant,
  lang,
  title,
  subtitle,
  ctaLink,
}: LatestPostsProps) {


  return (
    <Section
      id="latestPosts"
      className="py-20"
      variant={variant ? "dark" : "default"}
    >
      <div className="flex flex-col lg:justify-between lg:flex-row mb-8">
        <div className="md:max-w-sm">
          <Heading2 title={title} />
          <Link
            className="text-muted dark:text-slate-400 hover:text-primary transition ease-in duration-200 block mb-6 lg:mb-0"
            href={ctaLink || routeToHref(["blog"], lang)}
          >
            {subtitle}
          </Link>
        </div>

      </div>

      <Grid posts={posts} lang={lang} />
    </Section>
  )
}
