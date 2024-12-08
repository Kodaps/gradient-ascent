

import { getOptions, i18n as i18nConfig, Locale } from "@/config/i18n.config"
import { getDictionary } from "./getDictionnary";
import { _t } from "./translator";

export type Translator = (key:string) => string;

export const getTranslations = async (lang:Locale =  i18nConfig.defaultLocale):Promise<Translator> => {

  const dict = await getDictionary(lang);
  return (key:string) => _t(key, dict);
}