import { Lang } from "@/utils/i18n";
import { Portfolio, Post } from "contentlayer/generated";
import { Item } from "./Item";
import { PortfolioItem } from "./PortfolioItem";

interface GridProps {
  posts:Array<Portfolio>,
  lang: Lang
}


export const PortfolioGrid:React.FC<GridProps> = ({posts, lang}) => {
  return <div className="grid gap-6 row-gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 -mb-6">
  {posts.map((item) => <PortfolioItem key={item.slug} item={item} lang={lang} />)}
  </div>;
}
