import 'server-only';
import { Dict, Lang, _t } from '@/lib/i18n';


interface D {
  en : () => Promise<Dict>,
  fr : () => Promise<Dict>,
}


const dictionaries:D = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
};


export const getDictionary = async (lang:Lang = 'en') => (await dictionaries[lang] || dictionaries.en)();

export type Translator = (key:string) => string;

export const getTranslations = async (lang:Lang = "en"):Promise<Translator> => {

  const dict = await getDictionary(lang);
  return (key:string) => _t(key, dict);
}