'use client';

import { getOtherLanguages, Lang } from "@/lib/i18n";
import { LinkFormat, useAltLinksDispatcher } from "./AltLinkProvider";
import { useEffect } from "react";

interface AltLinkProps {
  altLinks: LinkFormat;
  lang: Lang;
  children?: React.ReactNode;
  hidden?: boolean;
}


export const AltLangLinks = ({altLinks, lang, children, hidden}: AltLinkProps) => {

  const dispatch = useAltLinksDispatcher();

  useEffect(() => {
    if (altLinks) {
      dispatch({type: 'set', payload:  altLinks});
    }
  }, [altLinks])

  let otherLanguages:Array<string> = [];


  if (altLinks) {
    otherLanguages = getOtherLanguages(lang).filter((lang) => !!altLinks[lang]);
  }

  return <> { otherLanguages.map((lang) => <a id={`lang_${lang}`}
              key={`lang_${lang}`}
              href={altLinks[lang]}
              className={hidden ? 'hidden': ''}>
              {children}
        </a>)
      }</>;

}