
//import 'server-only';

import { getOptions, i18n as i18nConfig, Locale } from '@/config/i18n.config';

import i18next, { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next'
// not using namespaces for now

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`../translations/${language}.json`)))
    .init(getOptions(lng, ns))
  return i18nInstance
}

interface Options {
  keyPrefix?: string
}


export async function useTranslation(lng: string, ns = 'common', options:Options = {}) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}

export type Translator = (key:string) => string;


/*

import 'server-only';
import { Dict, _t } from '@/lib/i18n';
import { i18n, Locale } from '@/config/i18n.config';


interface D {
  en : () => Promise<Dict>,
  fr : () => Promise<Dict>,
}


const dictionaries:D = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
};


export const getDictionary = async (lang:Locale = i18n.defaultLocale) => (await dictionaries[lang] || dictionaries.en)();

export type Translator = (key:string) => string;

export const useTranslations = async (lang:Locale =  i18n.defaultLocale):Promise<Translator> => {

  const dict = await getDictionary(lang);
  return (key:string) => _t(key, dict);
}

*/



export type Lang = Locale;

// no namepace



// export type Locale;

export const langs:Array<Locale> = i18nConfig.locales as unknown as Array<Locale>;

export const defaultLang = i18nConfig.defaultLocale as Locale;

export const otherLangs  = (lang:Locale) => {
  return langs.filter((_lang) => _lang !== lang);
}

export const otherLang  = (lang:Locale) => {
  return langs.find((_lang) => _lang !== lang) || defaultLang;
}


export type Dict = {
  [key:string]: string|Dict
}

export const getOtherLanguages = (lang: Locale) => {
  return langs.filter((_lang) => _lang != lang);
} 


/*
function getFromDictionnary(keys: Array<string>, dict: Dict|string):Dict|string {

  if (typeof dict == "string") {
    return dict;
  }

  if (keys.length === 0) {
    return '';
  }

  if (!dict) {
    return '';
  }

  const key = keys.shift() || '';

  return getFromDictionnary(keys, dict[key]);
}

export const _t = (key: string, dict: Dict): string => {

  if (!key) { return ''; }

  const keys = key.split(".");

  // console.warn('Split keys is now ', keys);

  const ret = getFromDictionnary(keys, dict);

  if (!ret) {
    return key;
  }

  if (typeof ret !== 'string') {
    console.error('getFromDict returned a ' + (typeof ret ))
    return key;
  }

  return ret;
}
*/



const baseRoutes = [
  'blog',
  'sitemap', 
  'team'
];


interface transRoutes {
  [key:string]: {
    [key:string]: string
  }
}

// TODO: convert to MDX
const routeTranslations:transRoutes = {
  'about': {
    'fr': 'a-propos-de-kodaps',
    'en': 'about'
  },
  'privacy-policy': {
    'fr': 'politique-de-confidentialite',
    'en': 'privacy-policy'
  }
};

export const routeToHref = (route: Array<string>, lang: Locale) => {

  // 1. get page corresponsing to route in lang
  let base = route.shift();

  if (!base) {
    return `/${lang}/`;
  }

  if (base[0] === '/') {
    base = base.slice(1);
  }


   if (route.length === 0 && base.indexOf('/') > -1) {
    route = base.split('/');
    base = route.shift();
   }

   if (!base) {
    return `/${lang}/`;
  }

  if ( baseRoutes.indexOf(base) > -1) {
    return `/${lang}/${base}/${route.join('/')}`;
  }


  if (routeTranslations[base]) {
    return `/${lang}/${routeTranslations[base][lang]}/${route.join('/')}`;
  }

  // 2. get page corresponding to route in other lang
  return `/${lang}/${base}/${route.join('/')}`;

}
