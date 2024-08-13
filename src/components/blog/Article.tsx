import Image from "next/image";
import Link from "next/link";
import { Lang } from "@/lib/i18n";
import { getPermalink, parseContent, renderMarkdown } from "@/lib/content";
import { AltLink } from "../atoms/AltLangLink";
import { YouTubeEmbed } from "../widgets/YouTubeEmbed";
import { Item } from "./Item";
import { Person, Post } from "contentlayer/generated";
import { compareDesc, format, parseISO } from 'date-fns'
import { ArticleSection } from "./ArticleSection";

interface ArticleProps {
  post: Post,
  lang: Lang,
  type?: 'Page' | 'Post' | 'Product' | 'Person',
  hideHeader?: boolean;
}


export const Article:React.FC<ArticleProps> = ({post, lang, type, hideHeader}) => {

  const parsedContent =  parseContent(post.body.raw);

  const img = post.image?.src || post.featuredImage;

  return  <section className={`mx-auto ${hideHeader ? '' : 'py-8 sm:py-16'} lg:py-20`}>
  <article>
    { (!hideHeader) && <header className={post.featuredImage ? 'text-center' : ''}>
      <p className="mx-auto max-w-5xl px-4 sm:px-6">
        { (post.date && (type!=='Person')) && <time dateTime={post.date}>{format(parseISO(post.date), 'LLLL d, yyyy')}</time>}
        {/* {Math.ceil(post.readingTime)} min read */}
        { (post.author && post.date) && <span className="mx-2">•</span>}
        { post.author?.name && <Link href={getPermalink(post.author.slug, "Person", lang)} className="mx-2">{post.author?.name} </Link>}
      </p>
      <h1 className="leading-tighter font-heading mx-auto mb-8 max-w-3xl px-4 text-4xl font-bold tracking-tighter sm:px-6 md:text-5xl">
        {post.title}
      </h1>
      <div className="flex flex-row sm:px-6 prose-md container prose-stone mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-image:rounded-md prose-image:shadow-lg  dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 ">
      {parsedContent?.lead ?
          <p className="flex-grow dark:text-slate-400 text-lg" dangerouslySetInnerHTML={{__html: renderMarkdown(parsedContent?.lead)}} /> 
        : <p className="flex-grow dark:text-slate-400 text-lg">{post.description}</p>
      }
      </div>
      { post.video ? <div className='max-w-3xl mx-auto'><YoutubeEmbed  className='w-full' embedId={post.video}/></div> :
      <>{img ? (
        <><Image
          src={img}
          className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-4xl"
          sizes="(max-width: 900px) 400px, 900px"
          alt={post.description || ''}
          loading="eager"
          priority
          width={post.image?.width || 900}
          height={post.image?.height ||480}
        />
        { post.credits && <p className="text-muted dark:text-slate-400 text-lg" dangerouslySetInnerHTML={{__html: post.credits}} />}
        </>
      ) : (
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="border-t dark:border-slate-700" />
        </div>
      )}</>}
    </header>}

    <div
      className="prose prose-lg prose-headings:font-heading prose-headings:leading-tighter container prose-stone mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:text-xl prose-headings:tracking-tighter prose-a:text-primary-600 prose-image:rounded-md prose-image:shadow-lg  dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 "
    >
      {parsedContent?.intro && <div dangerouslySetInnerHTML={{__html: renderMarkdown(parsedContent?.intro)}} />}

      {parsedContent?.takeaway && <div className={`mb-2 rounded-md border border-gray-300 shadow-md md:px-6 py-4 md:py-5 px-5`}>
          <span className="not-prose" > 
          <h3 className="mt-0 font-bold pl-8">Key Takeways</h3>
          </span>
          <p dangerouslySetInnerHTML={{__html: renderMarkdown(parsedContent?.takeaway)}} />
      </div>}

      { parsedContent?.sections.map((section, index) => <ArticleSection key={index} paragraph={section} lang={lang}/>)}

    </div>
  </article>
</section>;
}
