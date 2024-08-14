import Image from "next/image";
import Link from "next/link";
import { Lang } from "@/utils/i18n";
import { getPermalink, parseContent, renderMarkdown } from "@/utils/content";
import { AltLink } from "../altlinks/AltLangLinks";
import { YoutubeEmbed } from "../widgets/YoutubeEmbed";
import { Item } from "./Item";
import { Person, Post } from "contentlayer/generated";

interface PortraitProps {
  post: Person,
  lang: Lang,
  type?: 'Person',
}


export const Portrait:React.FC<PortraitProps> = ({post, lang, type}) => {

  const parsedContent =  parseContent(post.body.raw);

  return  <section className={`mx-auto py-8 sm:py-16 lg:py-20`}>
  <article>
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

      { parsedContent?.sections.map((section, index) => <div key={index}>
        {false && <div className="bg-white shadow-sm rounded-md text-neutral-700"> INTERSTICE </div>}
        <div dangerouslySetInnerHTML={{__html: renderMarkdown(section)}} />
      </div>
      )}

    </div>
  </article>
</section>;
}
