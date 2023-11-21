import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Post, PostMatter } from "@/utils/posts";
import { Grid } from "../blog/Grid";
import { Lang, routeToHref } from "@/utils/i18n";

interface LatestPostsProps {
  posts:Array<PostMatter>;
  variant?: boolean;
  lang: Lang;
  title: string;
  subtitle: string;
}


export const LatestPosts:React.FC<LatestPostsProps> = ({posts, variant, lang, title, subtitle}) => {

let information = '';

return <section className={ variant ? "bg-primary-50 dark:bg-slate-800" : ''}>
<div className="px-4 py-16 mx-auto max-w-4xl lg:py-20">
  <div className="flex flex-col lg:justify-between lg:flex-row mb-8">
    <div className="md:max-w-sm">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none group font-heading mb-2">
              {title}
            </h2>
          <Link
            className="text-muted dark:text-slate-400 hover:text-primary transition ease-in duration-200 block mb-6 lg:mb-0"
            href={ routeToHref(['blog'], lang)}
          >
            {subtitle}
          </Link>
    </div>

    {information && <p className="text-muted dark:text-slate-400 lg:text-sm lg:max-w-md">{information}</p>}
  </div>

  <Grid posts={posts} lang={lang}/>
</div>
</section>;

}
