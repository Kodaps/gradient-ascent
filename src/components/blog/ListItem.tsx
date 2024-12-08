import Image from "next/image"
import Link from "next/link"
import { getFormattedDate, getPermalink } from "@/lib/content"
import { Lang } from "@/lib/i18n"
import { Post } from "contentlayer/generated"

import { Clock } from "./Clock"
import { PostTags } from "./PostTags"

interface ItemProps {
  post: Post
  lang: Lang
}

export const ListItem: React.FC<ItemProps> = ({ post, lang }) => {
  const img = post.image?.src || post.featuredImage

  return (
    <article
      className={`max-w-md mx-auto md:max-w-none grid gap-6 md:gap-8 ${post.featuredImage ? "md:grid-cols-2" : ""}`}
    >
      {img && post.slug && (
        <Link
          className="relative block group"
          href={getPermalink(post.slug, "Post", lang)}
        >
          <div className="relative h-0 pb-[56.25%] md:pb-[75%] md:h-72 lg:pb-[56.25%] overflow-hidden bg-gray-400 dark:bg-slate-700 rounded shadow-lg">
            {img && (
              <Image
                src={img}
                className="absolute inset-0 object-cover w-full h-full mb-6 rounded shadow-lg bg-gray-400 dark:bg-slate-700"
                sizes="(max-width: 900px) 400px, 900px"
                width={post.image?.width || 900}
                height={post.image?.height || 506}
                alt={post.title}
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        </Link>
      )}
      <div className="mt-2">
        <header>
          <div className="mb-1">
            <span className="text-sm">
              <Clock className="w-3.5 h-3.5 inline-block -mt-0.5 dark:text-gray-400" />
              <time className="ml-1" dateTime={String(post.date)}>
                {getFormattedDate(post.date)}
              </time>
              {post.category && (
                <>
                  {" "}
                  ·{" "}
                  <Link
                    className="capitalize hover:underline"
                    href={getPermalink(post.category, "category", lang)}
                  >
                    {post.category.replaceAll("-", " ")}
                  </Link>
                </>
              )}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-2 font-heading dark:text-slate-300">
            <Link
              className="hover:text-primary dark:hover:text-blue-700 transition ease-in duration-200"
              href={getPermalink(post.slug || "", "Post", lang)}
            >
              {post.title}
            </Link>
          </h2>
        </header>
        {post.description && (
          <p className="flex-grow text-muted dark:text-slate-400 text-lg">
            {post.description}
          </p>
        )}
        <footer className="mt-5">
          {post.tags && <PostTags tags={post.tags} lang={lang} />}
        </footer>
      </div>
    </article>
  )
}
