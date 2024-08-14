import Image from "next/image";
import Link from "next/link";
import { Lang } from "@/utils/i18n";
import { getPermalink, parseContent, renderMarkdown } from "@/utils/content";
import { AltLink } from "../altlinks/AltLangLinks";
import { YoutubeEmbed } from "../widgets/YoutubeEmbed";
import { Item } from "./Item";
import { Person, Bit } from "contentlayer/generated";
import { compareDesc, format, parseISO } from 'date-fns'
import { ArticleSection } from "./ArticleSection";

interface ArticleProps {
  doc: Bit,
  lang: Lang,
  type?: 'Page' | 'Post' | 'Product' | 'Person',
  hideHeader?: boolean;
}




export const BitArticle:React.FC<ArticleProps> = ({doc, lang, type}) => {


  const img = doc.image?.src;

  return <section className={`mx-auto py-8 sm:py-16'} lg:py-20`}>
  <article>
      <p className="mx-auto max-w-5xl px-4 sm:px-6">
        { doc.date && <time dateTime={doc.date}>{format(parseISO(doc.date), 'LLLL d, yyyy')}</time>}
        { (doc.author && doc.date) && <span className="mx-2">•</span>}
        { doc.author?.name && <Link href={getPermalink(doc.author.slug, "Person", lang)} className="mx-2">{doc.author?.name} </Link>}
      </p>
      <h1 className="leading-tighter font-heading mx-auto mb-8 max-w-3xl px-4 text-4xl font-bold tracking-tighter sm:px-6 md:text-5xl">
        {doc.title}
      </h1>
       {img ? (
        <><Image
          src={img}
          className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-4xl"
          sizes="(max-width: 900px) 400px, 900px"
          alt={doc.title || ''}
          loading="eager"
          priority
          width={doc.image?.width || 900}
          height={doc.image?.height ||480}
        />
      </>
      ) : (
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="border-t dark:border-slate-700" />
        </div>
      )}
    <div
      className="prose prose-lg prose-headings:font-heading prose-headings:leading-tighter container prose-stone mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:text-xl prose-headings:tracking-tighter prose-a:text-primary-600 prose-image:rounded-md prose-image:shadow-lg  dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 "
      dangerouslySetInnerHTML={{__html: doc.body.html}} 
    />
  </article>
</section>;
}
