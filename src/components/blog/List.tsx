


import { Post, PostMatter } from "@/utils/posts";
import { ListItem } from "./ListItem";
import { Lang } from "@/utils/i18n";

interface ListProps {
  posts:Array<PostMatter>,
  lang: Lang
}


export const List:React.FC<ListProps> = ({posts, lang}) => {
  return <ul>
  {
    posts.map((post) => (
      <li key={post.slug} className="mb-12 md:mb-20">
        <ListItem lang={lang} post={post} />
      </li>
    ))
  }
</ul>;
}
