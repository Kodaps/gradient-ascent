import React from "react"
import RichText from "@cms/components/RichText"

import { Width } from "../Width"

export function Message({ message }: { message: Record<string, any> }) {
  return (
    <Width className="my-12" width="100">
      {message && <RichText content={message} />}
    </Width>
  )
}
