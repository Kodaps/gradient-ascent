import Image from "next/image";
import Link from "next/link";
import { Lang } from "@/lib/i18n";
import { getPermalink } from "@/lib/content";
import { AspectRatio } from "../ui/aspect-ratio";
import { Post } from "contentlayer/generated";

interface ItemProps {
  post: Post, 
  lang: Lang
}

export const Item:React.FC<ItemProps> = ({post, lang}) => {

  const img = post.image?.src || post.featuredImage;

  return <article className="mb-6 transition">
  { post.slug && <Link
          href={getPermalink(post.slug, 'Post', lang)}
          className="hover:text-primary dark:hover:text-blue-700  transition ease-in duration-200 relative  bg-gray-400 dark:bg-slate-700 rounded shadow-lg mb-6"
        >
    { img && <AspectRatio ratio={16 / 9}><Image
          src={img}
          className="md:object-cover w-full md:w-auto md:h-full rounded shadow-lg bg-gray-400 dark:bg-slate-700 hover:scale-110 transition duration-500 cursor-pointer"
          width={post.image?.width || 400}
          height={post.image?.height || 224}
          sizes="(max-width: 900px) 400px, 900px"
          alt={post.title}
          loading="lazy"
          decoding="async"
        /></AspectRatio>}
  <h3 className="mb-2 text-lg font-bold leading-tight sm:text-xl font-heading">
{post.title}
  </h3>
  <p className="text-muted dark:text-slate-400 text-lg">{post.description}</p>
  </Link>}
</article>;
}