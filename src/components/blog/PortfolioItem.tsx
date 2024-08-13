import Image from "next/image";
import Link from "next/link";
import { Lang } from "@/utils/i18n";
import { getPermalink } from "@/utils/content";
import { AspectRatio } from "../ui/aspect-ratio";
import { Portfolio, Post } from "contentlayer/generated";

interface PortfolioItemProps {
  item: Portfolio, 
  lang: Lang
}

export const PortfolioItem:React.FC<PortfolioItemProps> = ({item, lang}) => {
return <article className="mb-6 transition">
  { item.slug && <Link
          href={getPermalink(item.slug, 'Portfolio', lang)}
          className="hover:text-primary dark:hover:text-blue-700  transition ease-in duration-200 relative  bg-gray-400 dark:bg-slate-700 rounded shadow-lg mb-6"
        >
    { item.image && <Image
          src={item.image?.src}
          className="md:object-cover w-full md:w-auto md:h-full rounded shadow-lg bg-gray-400 dark:bg-slate-700 hover:scale-110 transition duration-500 cursor-pointer"
          width={400}
          height={224}
          sizes="(max-width: 900px) 400px, 900px"
          alt={item.title}
          loading="lazy"
          decoding="async"
        />}
  </Link>}
</article>;
}