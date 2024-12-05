import { cn } from '@cms/lib/cn'
import React, { Fragment } from 'react'

import type { Page } from '@payload-types'

import { ArchiveBlock } from '@cms/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@cms/blocks/CallToAction/Component'
import { ContentBlock } from '@cms/blocks/Content/Component'
import { FormBlock } from '@cms/blocks/Form/Component'
import { MediaBlock } from '@cms/blocks/MediaBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}