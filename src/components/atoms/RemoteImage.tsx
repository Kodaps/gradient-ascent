import Image from "next/image"

interface ImageProps {
  src: string
  width: number
  height: number
  alt: string
}

function RemoteImage({ src, width, height, alt }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="mx-auto rounded-md bg-gray-400 dark:bg-slate-700 object-cover"
      loading="eager"
      priority
    />
  )
}

export default RemoteImage
