

import siteConfig from '@/config/site.config.mjs';

const features = siteConfig.features;

export const isFeatureActive = (feature: string, lang?: string): boolean => {

  lang = lang || 'en';

  if (features[feature] instanceof Object) {
    return features[feature][lang] || false;
  }

  return features[feature] || false;

}