import {
  IconBook,
  IconBookmarks,
  IconBrain,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTailwind,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBulb,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconDeviceGamepad,
  IconMail,
  IconMapPin,
  IconPhoneCall,
  IconRss,
  IconSchool,
  IconTree,
} from "@tabler/icons-react"

export type IconType =
  | "twitter"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "youtube"
  | "github"
  | "tailwind"
  | "rss"
  | "mail"
  | "phone"
  | "map"
  | "clock"
  | "arrow-down"
  | "arrow-right-left"
  | "chevron-down"
  | "bulb"
  | "check"
  | "components"
  | "download"
  | "list-check"
  | "rocket"
  | "book"
  | "brain"
  | "game"
  | "bookmarks"
  | "tree"
  | "school"
  | "chevron-down"
  | "down"

interface IconProps {
  name: IconType
  className?: string
}

export const Icon = ({ name, className }: IconProps) => {
  switch (name) {
    case "twitter":
      return <IconBrandTwitter className={className || ""} />
    case "linkedin":
      return <IconBrandLinkedin className={className || ""} />
    case "facebook":
      return <IconBrandFacebook className={className || ""} />
    case "instagram":
      return <IconBrandInstagram className={className || ""} />
    case "youtube":
      return <IconBrandYoutube className={className || ""} />
    case "github":
      return <IconBrandGithub className={className || ""} />
    case "mail":
      return <IconMail className={className || ""} />
    case "phone":
      return <IconPhoneCall className={className || ""} />
    case "bulb":
      return <IconBulb className={className || ""} />
    case "check":
      return <IconCheck className={className || ""} />
    case "map":
      return <IconMapPin className={className || ""} />
    case "clock":
      return <IconClock className={className || ""} />
    case "rss":
      return <IconRss className={className || ""} />
    case "game":
      return <IconDeviceGamepad className={className || ""} />
    case "book":
      return <IconBook className={className || ""} />

    case "chevron-down":
    case "down":
      return <IconChevronDown className={className || ""} />

    default:
      console.error("No match found for icon " + name)
      return <></>
  }

  return <></>
}

export default Icon
