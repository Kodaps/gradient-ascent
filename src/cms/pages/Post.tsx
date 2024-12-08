"use server"

import { PayloadRedirects } from "@cms/components/PayloadRedirects"
import RichText from "@cms/components/RichText"
import { PostHero } from "@cms/heroes/PostHero"

import { Post } from "@/config/payload-types"

import { RelatedPosts } from "../blocks/RelatedPosts/Component"

type Args = {
  post: Post
  url: string
}

export default async function PostPage({ post }: Args) {
  const slug = post.slug

  const url = "/posts/" + slug

  console.log(" in post", post)

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText
            className="max-w-[48rem] mx-auto"
            content={post.content}
            enableGutter={false}
          />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter(
                (post) => typeof post === "object"
              )}
            />
          )}
        </div>
      </div>
    </article>
  )
}
