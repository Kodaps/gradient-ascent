


import { ListItem } from "./ListItem";
import { Lang } from "@/utils/i18n";
import { Post } from "contentlayer/generated";

interface ListProps {
  posts:Array<Post>,
  lang: Lang
}


export const List:React.FC<ListProps> = ({posts, lang}) => {
  return <ul>
  {
    posts.map((post) => (
      <li key={post.slug} className="mb-12 md:mb-20">
        <ListItem lang={lang} post={post} />
      </li>
    ))
  }
</ul>;
}
