import { Lang } from "@/lib/i18n"

import { AltLangLinks } from "./AltLangLinks"
import { LinkFormat } from "./AltLinkProvider"

interface AltLinkManagerProps {
  altLinks: LinkFormat
  lang: Lang
  hidden?: boolean
}

export const AltLinkManager = ({
  altLinks,
  lang,
  hidden,
}: AltLinkManagerProps) => {
  return <AltLangLinks altLinks={altLinks} lang={lang} hidden={hidden} />
}
