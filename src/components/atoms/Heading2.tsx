import { clsx } from "clsx"

export type Variants = "default" | "dark" | "light"

interface HeaderProps {
  variant?: Variants
  className?: string
  title: string
}

export const Heading2 = ({ variant, title, className }: HeaderProps) => {
  return (
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none group font-heading mb-2">
      {title}
    </h2>
  )
}
