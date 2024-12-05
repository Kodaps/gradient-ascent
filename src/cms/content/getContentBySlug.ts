import { cache } from 'react'
import { draftMode } from 'next/headers'
import { CollectionSlug, getPayload } from 'payload'
import configPromise from '@payload-config'
import { Page as PayloadPage, Post as PayloadPost } from '@/config/payload-types'


const queryContentBySlug = cache(async ({ slug, lang, collectionType }: { slug: string, lang: string, collectionType: CollectionSlug }) => {

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
        equals: lang,
      },
    },
  })

  return result.docs?.[0] || null
})


export function getPostBySlug ({slug, lang}: {slug:string, lang:string}): Promise<PayloadPost | null> {
    return queryContentBySlug({ slug, lang, collectionType: 'posts' })
}

export function getPageBySlug ({slug, lang}: {slug:string, lang:string}): Promise<PayloadPage | null> {
  return queryContentBySlug({ slug, lang, collectionType: 'pages' })
}

