'use server'
// import React from "react"
import { CollectionArchive } from "@cms/components/CollectionArchive"
import RichText from "@cms/components/RichText"
import configPromise from "@payload-config"
import type { ArchiveBlock as ArchiveBlockProps, Post } from "@payload-types"
import { getPayload } from "payload"

type Props = ArchiveBlockProps & {
  id?: string
}

export async function ArchiveBlock(props: Props) {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: "posts",
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === "object") return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText
            className="ml-0 max-w-[48rem]"
            content={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
