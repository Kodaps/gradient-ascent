import { Lang } from "@/lib/i18n"
import { Post } from "contentlayer/generated"

import { ListItem } from "./ListItem"

interface ListProps {
  posts: Array<Post>
  lang: Lang
}

export const List: React.FC<ListProps> = ({ posts, lang }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} className="mb-12 md:mb-20">
          <ListItem lang={lang} post={post} />
        </li>
      ))}
    </ul>
  )
}
