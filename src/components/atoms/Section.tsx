import { clsx } from "clsx"

export type Variants = "default" | "dark" | "light"

interface SectionProps {
  children: React.ReactNode
  variant?: Variants
  className?: string
  id?: string
}

export const Section = ({ children, variant, id, className }: SectionProps) => {
  variant = variant || "default"

  const classes = clsx(
    {
      "bg-primary-50 dark:bg-slate-800": variant == "dark",
      "": variant == "default",
    },
    className
  )
  return (
    <section id={id} className={classes}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">{children}</div>
    </section>
  )
}
