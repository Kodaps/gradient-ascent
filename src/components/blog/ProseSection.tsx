interface ProseArticleProps {
  children: React.ReactNode
}

export const ProseArticle = ({ children }: ProseArticleProps) => {
  return (
    <section className={`mx-auto lg:py-20`}>
      <article>
        <div className="prose prose-lg prose-headings:font-heading prose-headings:leading-tighter container prose-stone mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:text-xxl prose-headings:tracking-tighter prose-a:text-primary-600 prose-image:rounded-md prose-image:shadow-lg  dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 ">
          {children}
        </div>
      </article>
    </section>
  )
}
