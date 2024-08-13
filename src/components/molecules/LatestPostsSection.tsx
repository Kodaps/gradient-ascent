import Link from "next/link";
import { Grid } from "../blog/Grid";
import { Lang, routeToHref } from "@/lib/i18n";
import { Post } from "contentlayer/generated";
import { Section } from "../atoms/Section";
import { Heading2 } from "../atoms/Heading2";


interface LatestPostsProps {
  posts:Array<Post>;
  variant?: boolean;
  lang: Lang;
  title: string;
  subtitle: string;
  ctaLink?: string;
}


export const LatestPosts:React.FC<LatestPostsProps> = ({posts, variant, lang, title, subtitle, ctaLink}) => {

let information = '';

return <Section id="latestPosts" className="py-20" variant={ variant ? 'dark' : 'default'}>
  <div className="flex flex-col lg:justify-between lg:flex-row mb-8">
    <div className="md:max-w-sm">
          <Heading2 title={title} />
          <Link
            className="text-muted dark:text-slate-400 hover:text-primary transition ease-in duration-200 block mb-6 lg:mb-0"
            href={ ctaLink || routeToHref(['blog'], lang)}
          >
            {subtitle}
          </Link>
    </div>

    {information && <p className="text-muted dark:text-slate-400 lg:text-sm lg:max-w-md">{information}</p>}
  </div>

  <Grid posts={posts} lang={lang}/>
</Section>;

}
