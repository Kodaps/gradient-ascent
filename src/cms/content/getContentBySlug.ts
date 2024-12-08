import { cache } from "react"
import { draftMode } from "next/headers"
import configPromise from "@payload-config"
import { CollectionSlug, getPayload } from "payload"

import {
  Page as PayloadPage,
  Post as PayloadPost,
} from "@/config/payload-types"

const queryContentBySlug = cache(
  async ({
    slug,
    locale,
    collectionType,
  }: {
    slug: string
    locale: string
    collectionType: CollectionSlug
  }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: collectionType,
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
        lang: {
          equals: locale,
        },
      },
    })

    return result.docs?.[0] || null
  }
)

export function getPostBySlug({
  slug,
  locale,
}: {
  slug: string
  locale: string
}): Promise<PayloadPost | null> {
  return queryContentBySlug({
    slug,
    locale,
    collectionType: "posts",
  }) as Promise<PayloadPost | null>
}

export function getPageBySlug({
  slug,
  locale,
}: {
  slug: string
  locale: string
}): Promise<PayloadPage | null> {
  return queryContentBySlug({
    slug,
    locale,
    collectionType: "pages",
  }) as Promise<PayloadPage | null>
}
