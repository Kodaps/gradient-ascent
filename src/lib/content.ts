

import {
  allPortfolios, Portfolio
} from 'contentlayer/generated';


export const getPortfolioBySlug = (slug: string) => {
  return allPortfolios.find((item) => item.slug == slug);
};




/** */

