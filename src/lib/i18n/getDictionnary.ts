import { getOptions, i18n as i18nConfig, Locale } from "@/config/i18n.config"


export type Dict = {
  [key: string]: string | Dict
}


type D = Record<Locale, () => Promise<Dict>>;


const init:D = {} as D;

const dictionaries:D = i18nConfig.locales.reduce((acc, lang) => {
  acc[lang] = () => import(`../../translations/${lang}.json`).then((module) => module.default);
  return acc;
}, init);


export const getDictionary = async (lang:Locale = i18nConfig.defaultLocale) => (await dictionaries[lang] || dictionaries.en)();
