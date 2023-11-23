import Link from 'next/link';
import { getPermalink } from "@/lib/content";

import { footerData2 } from '@/shared/data';

import { Lang, routeToHref } from '@/lib/i18n';

interface LangProps {
  lang: Lang;
}

const Footer2:React.FC<LangProps> = ({lang}) => {

  const { links, columns, socials, footNote } = footerData2;

  return (
    <div className="w-full bg-zinc-100 dark:bg-zinc-700">
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="xs:gap-8 grid grid-cols-4 gap-4 gap-y-8 py-8 md:py-12">
        {columns.map(({ title, texts }, index) => (
          <div
            key={`item-column-${index}`}
            className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1"
          >
            <div className="mb-2 font-medium text-gray-800 dark:text-gray-300">{title}</div>
            {texts &&
              texts.map((text, index2) => (
                <p key={`item-text-${index2}`} className="text-gray-600 dark:text-slate-400">
                  {text}
                </p>
              ))}
          </div>
        ))}
        <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
          <div className="mb-2 font-medium text-gray-800 dark:text-gray-300">Social</div>
          <ul className="mb-4 -ml-2 flex md:order-1 md:mb-0">
            {socials.map(({ label, icon: Icon, href }, index) => (
              <li key={`item-social-${index}`}>
                <Link
                  className="inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  aria-label={label}
                  href={href}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="py-6 text-sm text-gray-700 dark:text-slate-400 md:flex md:items-center md:justify-between md:py-8">
        <ul className="mb-4 -ml-2 flex pl-2 md:order-1 md:mb-0">
          {links &&
            links.map(({ label, href }, index) => (
              <li key={`item-link-${index}`}>
                <Link
                  className="duration-150 ease-in-out placeholder:transition hover:text-gray-700 hover:underline dark:text-gray-400"
                  aria-label={label}
                  href={routeToHref([href], lang)}
                >
                  {label}
                </Link>
                {links.length - 1 !== index && <span className="mr-1"> · </span>}
              </li>
            ))}
        </ul>
        {footNote} {'© 2023'}
      </div>
    </div>
    </div>
  );
};

export default Footer2;
