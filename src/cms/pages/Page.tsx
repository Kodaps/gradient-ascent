import React, { cache } from "react"
import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { RenderBlocks } from "@cms/blocks/RenderBlocks"
import { PayloadRedirects } from "@cms/components/PayloadRedirects"
import { RenderHero } from "@cms/heroes/RenderHero"
import { generateMeta } from "@cms/lib/generateMeta"
import configPromise from "@payload-config"
// import { homeStatic } from '@cms/endpoints/seed/home-static'

import type { Page as PageType } from "@payload-types"
import { getPayload } from "payload"

// import PageClient from './page.client'

/*
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}
*/

type Args = {
  page: PageType | null
  slug: string
}

export default async function CMSPage({ page, slug }: Args) {
  const url = "/" + slug

  // Remove this code once your website is seeded
  /*if (!page && slug === 'home') {
    page = homeStatic
  }*/

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      {/* <PageClient /> */}
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}
