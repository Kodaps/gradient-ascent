import { Tweet } from "react-tweet"

import { renderMarkdown } from "@/lib/content"
import { Lang } from "@/lib/i18n"

import { YouTubeEmbed } from "../widgets/YouTubeEmbed"

interface ParagraphProps {
  paragraph: string
  lang: Lang
}

export const isEmbed = (text: string) => {
  return text.startsWith("[") || text.startsWith("https")
}
const isYouTubeEmbed = (text: string) => {
  if (!isEmbed(text)) {
    return false
  }

  return text.indexOf("(https://www.youtube.com/") > -1
}

const isTwitterEmbed = (text: string) => {
  if (!isEmbed(text)) {
    return false
  }

  return text.indexOf("(https://twitter.com/") > -1
}

const getEmbedUrl = (text: string) => {
  const bits = text.split("](")
  return bits.length > 1 ? bits[1] : text
}

const getYoutubeEmbedId = (text: string) => {
  const url = getEmbedUrl(text)

  const bits = url.split("/")
  const lastBit = bits[bits.length - 1]
  return lastBit.split("&")[0].replace("watch?v=", "")
}

const getTweetEmbedId = (text: string) => {
  const url = getEmbedUrl(text)
  const bits = url.split("/")
  const lastBit = bits[bits.length - 1].split("?")[0]
  return lastBit.split("&")[0].replace(")", "")
}

export const ParagraphSwitcher: React.FC<ParagraphProps> = ({
  paragraph,
  lang,
}) => {
  if (isYouTubeEmbed(paragraph)) {
    const embedId = getYoutubeEmbedId(paragraph)
    return <YouTubeEmbed embedId={embedId} />
  }

  if (isTwitterEmbed(paragraph)) {
    const embedId = getTweetEmbedId(paragraph)
    return (
      <div className="w-full not-prose flex flex-row justify-center">
        <Tweet id={embedId} />
      </div>
    )
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: renderMarkdown(paragraph, true) }}
    />
  )
}
