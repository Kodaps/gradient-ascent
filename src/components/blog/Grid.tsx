import { Post } from "contentlayer/generated"

import { Lang } from "@/lib/i18n"

import { Item } from "./Item"

interface GridProps {
  posts: Array<Post>
  lang: Lang
}

export const Grid: React.FC<GridProps> = ({ posts, lang }) => {
  return (
    <div className="grid gap-6 row-gap-5 md:grid-cols-2 xl:grid-cols-4 -mb-6">
      {posts.map((post) => (
        <Item key={post.slug} post={post} lang={lang} />
      ))}
    </div>
  )
}
