import clsx from 'clsx'
import React from 'react'
import RichText from '@cms/components/RichText'

import type { Post } from '@payload-types'

import { Card } from '@cms/components/Card'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: any
}

export function RelatedPosts (props: RelatedPostsProps) {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} relationTo="posts" showCategories />
        })}
      </div>
    </div>
  )
}