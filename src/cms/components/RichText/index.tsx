import { cn } from '@cms/lib/cn'
import React from 'react'

import { serialiseLexical } from './serialise'

type Props = {
  className?: string
  content: Record<string, any>
  enableGutter?: boolean
  enableProse?: boolean
}

function RichText ({
  className,
  content,
  enableGutter = true,
  enableProse = true,
}: Props) {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose dark:prose-invert ': enableProse,
        },
        className,
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serialiseLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export default RichText