import { headerData } from "@/config/ui.config"
import { getTranslations, Lang, routeToHref } from "@/lib/i18n"

import ClientHeader from "./ClientHeader"

interface HeaderProps {
  lang: Lang
}
const { links } = headerData

const Header = async ({ lang }: HeaderProps) => {
  const { t } = await getTranslations(lang)
  const rawLinks = links && links.length > 1 ? links[1].links || [] : []
  const blogLinks = rawLinks.map(({ label, href, description }) => ({
    label: t(`submenu.${label}`),
    href: routeToHref([href], lang),
    description,
  }))

  return <ClientHeader lang={lang} links={links} blogLinks={blogLinks} />
}

export default Header
