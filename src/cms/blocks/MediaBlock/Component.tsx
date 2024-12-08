import React from "react"
import type { StaticImageData } from "next/image"
import RichText from "@/cms/components/RichText"
import { Media } from "@cms/components/Media"
import { cn } from "@cms/lib/cn"
import type { MediaBlock as MediaBlockProps } from "@payload-types"

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === "object") caption = media.caption

  return (
    <div
      className={cn(
        "",
        {
          container: enableGutter,
        },
        className
      )}
    >
      <Media
        imgClassName={cn("border border-border rounded-[0.8rem]", imgClassName)}
        resource={media}
        src={staticImage}
      />
      {caption && (
        <div
          className={cn(
            "mt-6",
            {
              container: !disableInnerContainer,
            },
            captionClassName
          )}
        >
          <RichText content={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
