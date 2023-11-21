




import Image from "next/image";
import Link from "next/link";
import { Lang } from "@/utils/i18n";
import { getPermalink, Post } from "@/utils/posts";

interface PostTagsProps {
  tags: Array<string>;
  className?: string;
  lang: Lang;
}

export const PostTags:React.FC<PostTagsProps> = ({tags, className, lang}) => {
return <ul className={className}>
      {tags.map((tag) => (
        <li key={tag} className="bg-gray-100 dark:bg-slate-700 inline-block mr-2 mb-2 py-0.5 px-2 lowercase font-medium">
            <Link
              href={getPermalink(tag, 'tag', lang)}
              className="text-muted dark:text-slate-300 hover:text-primary dark:hover:text-gray-200"
            >
              {tag}
            </Link>
        </li>
      ))}
    </ul>;
}