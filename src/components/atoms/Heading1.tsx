import { clsx } from "clsx"

export type Variants = "default" | "dark" | "light"

interface HeaderProps {
  children?: React.ReactNode
  variant?: Variants
  className?: string
  html?: string
}

export const Heading1 = ({
  variant,
  className,
  children,
  html,
}: HeaderProps) => {
  const classes = `leading-tighter font-heading mb-6 text-5xl font-bold tracking-tighter md:text-6xl sm:text-4xl sm:leading-none group font-heading ${className}`

  return html ? (
    <h1 className={classes} dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <h1 className={classes}>{children}</h1>
  )
}
