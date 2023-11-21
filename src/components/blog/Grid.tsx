import { Lang } from "@/utils/i18n";
import { Post, PostMatter } from "@/utils/posts";
import { Item } from "./Item";

interface GridProps {
  posts:Array<PostMatter>,
  lang: Lang
}


export const Grid:React.FC<GridProps> = ({posts, lang}) => {
  return <div className="grid gap-6 row-gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 -mb-6">
  {posts.map((post) => <Item key={post.slug} post={post} lang={lang} />)}
  </div>;
}
