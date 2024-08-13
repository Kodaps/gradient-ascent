
import { Lang } from "@/utils/i18n";

import { List } from "./List";
import { Post } from "contentlayer/generated";



interface ListPageProps {
  title: string;
  posts:Array<Post>;
  lang: Lang;
}

export const ListPage:React.FC<ListPageProps> = ({title, posts, lang}) => {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header>
        <h1 className="leading-tighter capitalize font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
          {title}
        </h1>
      </header>
      <div className="p-4 md:p-0">
        <List lang={lang}  posts={posts}/>
      </div>
    </section>
  );
}