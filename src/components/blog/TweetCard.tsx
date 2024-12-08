
import { Bit } from "contentlayer/generated"

import { Card } from "@/components/ui/card"

interface BitCardProps {
  className?: string
  bit: Bit
}

export const BitCard: React.FC<BitCardProps> = ({ className, bit }) => {
  return <Card></Card>
}
