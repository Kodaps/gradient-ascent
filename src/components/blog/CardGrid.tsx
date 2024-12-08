
interface CardGridProps {
  children?: React.ReactNode
}

export const CardGrid: React.FC<CardGridProps> = ({ children }) => {
  return (
    <div className="grid gap-6 row-gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 -mb-6">
      {children}
    </div>
  )
}
