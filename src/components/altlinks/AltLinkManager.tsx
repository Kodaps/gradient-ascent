import { Lang } from "@/lib/i18n";
import { LinkFormat } from "./AltLinkProvider";
import { AltLangLinks } from "./AltLangLinks";

interface AltLinkManagerProps {
  altLinks: LinkFormat;
  lang: Lang;
  hidden?: boolean;
}



export const AltLinkManager = ({altLinks, lang, hidden }: AltLinkManagerProps) => {

  return <AltLangLinks altLinks={altLinks} lang={lang} hidden={hidden} />;

}