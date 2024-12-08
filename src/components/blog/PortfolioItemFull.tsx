import Image from "next/image"
import { Lang } from "@/lib/i18n"
import { Portfolio } from "contentlayer/generated"

interface PortfolioItemFullProps {
  item: Portfolio
  lang: Lang
  type?: "Page" | "item" | "Product" | "Person"
  hideHeader?: boolean
}

export const PortfolioItemFull: React.FC<PortfolioItemFullProps> = ({
  item,
  lang,
  type,
  hideHeader,
}) => {
  return (
    <section
      className={`mx-auto ${hideHeader ? "" : "py-8 sm:py-16"} lg:py-20`}
    >
      <article>
        <header className={item.image ? "text-center" : ""}>
          <p className="mx-auto max-w-5xl px-4 sm:px-6">
            {item.date && type !== "Person" && (
              <time dateTime={item.date}>{item.date}</time>
            )}
            {/* {Math.ceil(item.readingTime)} min read */}
          </p>
          <h1 className="leading-tighter font-heading mx-auto mb-8 max-w-3xl px-4 text-4xl font-bold tracking-tighter sm:px-6 md:text-5xl">
            {item.title}
          </h1>

          {item.image && (
            <Image
              src={item.image.src}
              className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-4xl"
              sizes="(max-width: 900px) 400px, 900px"
              alt={item.prompt || ""}
              loading="eager"
              priority
              width={item.image.width}
              height={item.image.height}
            />
          )}
          {item.prompt && (
            <p
              className="text-muted dark:text-slate-400 text-lg"
              dangerouslySetInnerHTML={{ __html: item.prompt }}
            />
          )}
        </header>
      </article>
    </section>
  )
}
