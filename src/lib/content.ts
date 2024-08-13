import md from 'markdown-it';
import hljs from 'highlight.js';

import { Metadata } from 'next';
import { getOtherLanguages, Lang, LANGS, otherLang } from '@/lib/i18n';
import { BlogPosting, FAQPage, Organization, Person, WithContext } from 'schema-dts';

type QAPair = {
  question: string;
  answer: string;
};



import {
  allPosts as allPostsUnsorted,
  allPeople as allPeopleUnsorted,
  allPortfolios as allPortfoliosUnsorted,
  allPages as allPagesUnsorted,
  Portfolio,
  Person as PersonContent,
  Post,
  Page,
  DocumentTypeNames,
  AltLink,
  DocumentTypes,
  NestedTypeNames,
  allDocuments as allDocumentsUnsorted,
} from 'contentlayer/generated';

type ContentDocumentTypes = DocumentTypes;



interface AllContentById {
  Post: {[key: string]: Post},
  Person: {[key: string]: PersonContent},
  Portfolio: {[key: string]: Portfolio},
  Page: {[key: string]: Page},
}

const sortByDate = (post1: ContentDocumentTypes, post2: ContentDocumentTypes) => {
  return post1.date < post2.date ? 1 : -1;
};

const filterByEnabled = (item: ContentDocumentTypes) => {
  if (item.enabled === undefined) {
    return true;
  }

  return item.enabled;
}


const unHyphenate = (str: string|undefined) => {
  if (!str) {
    return '';
  }
  return str.replace(/-/g, '');
}



export const findDocumentById = (id: string) => {
  const idNoHyphen = unHyphenate(id);
  return allDocumentsUnsorted.find((item) => unHyphenate(item.notionId) == idNoHyphen);
}

const allPosts = allPostsUnsorted.sort(sortByDate).filter(filterByEnabled);
const allPages = allPagesUnsorted.sort(sortByDate).filter(filterByEnabled);
const allPeople = allPeopleUnsorted.sort(sortByDate).filter(filterByEnabled);
const allPortfolios = allPortfoliosUnsorted.sort(sortByDate).filter(filterByEnabled);




const filterByLang = (lang: Lang) => {
  return (item: DocumentTypes) => item.lang == lang || item.lang == 'all';
}



export const allDocuments = (type: DocumentTypeNames, lang: Lang) => {

  const ret: Array<DocumentTypes> = []

  switch (type) {
    case 'Post':
      return allPosts.filter(filterByLang(lang));
    case 'Page':
      return allPages.filter(filterByLang(lang));
    case 'Person':
      return allPeople.filter(filterByLang(lang));
    case 'Portfolio':
      return allPortfolios.filter(filterByLang(lang));
    default:
      return ret;
  }
};

export const getRoute = (lang: Lang, routeName: string) => {

  if (routeName === 'home') {
    return `/${lang}`;
  }

  const page = allPages.filter(filterByLang(lang)).find((item) => item.route_name == routeName);

  if (!page) {
    return `/${lang}`;
  }

  return `/${lang}/${page.slug}`;
  

}


const allContent:AllContentById = {
  Post: {},
  Person: {},
  Portfolio: {},
  Page: {},
};


allPages.forEach(element => {
  if (element.notionId) {
    allContent.Page[element.notionId] = element;
  }
});

allPosts.forEach(element => {
  if (element.notionId) {
    allContent.Post[element.notionId] = element;
  }
});


allPeople.forEach(element => {
  if (element.notionId) {
    allContent.Person[element.notionId] = element;
  }
});

allPortfolios.forEach(element => {
  if (element.notionId) {
    allContent.Portfolio[element.notionId] = element;
  }
});


export const getPortfolioBySlug = (slug: string) => {
  const item = allPortfolios.find((item) => item.slug == slug);
  return augmentDocument(item) as Portfolio;
};


export const allPostsByLang = (lang: Lang) => {
  return allDocuments('Post', lang) as Array<Post>;
};

export const allPagesByLang = (lang: Lang) => {
  return allDocuments('Page', lang) as Array<Page>;
};

export const getAlternateSlug = (alts: Array<AltLink>, lang: Lang): string | undefined => {
  for (let alt of alts) {
    if (alt[lang]) {
      return alt[lang];
    }
  }
  return undefined;
};

export const getPostBySlug = (slug: string, lang: Lang) => {
  const item = allPosts.find((post) => post.slug == slug && post.lang == lang);
  return augmentDocument(item) as Post;

};

export const getPageBySlug = (slug: string, lang: Lang) => {
  const item = allPages.find((post) => post.slug == slug && post.lang == lang);
  return augmentDocument(item) as Page;
};

export type PostType = 'Page' | 'Post' | 'Person' | 'Product' | 'Portfolio';
export type LinkType = PostType | 'category' | 'tag';

export interface PostContent {
  lead: string;
  intro?: string;
  sections: Array<string>;
  takeaway?: string;
}

const slugify = (value = '') => {
  if (!value) {
    return '';
  }
  return value.toLowerCase().replaceAll(' ', '-');
};

export const getPermalink = (key: string, linkType: LinkType, lang: Lang, debug = false) => {

  if (!key) {
    return `/${lang}/blog`;
  }


  const slugged = slugify(key);

  if (linkType == 'Page') {
    return `/${lang}/${slugged}`;
  }



  if (linkType == 'Person') {
    return `/${lang}/team/${slugged}`;
  }

  if (linkType == 'Portfolio') {
    return `/${lang}/portfolio/${slugged}`;
  }

  if (linkType == 'tag') {
    return `/${lang}/blog/tag/${slugged}`;
  }

  if (linkType == 'category') {
    return `/${lang}/blog/category/${slugged}`;
  }

  if (linkType == 'Post') {
    return `/${lang}/blog/${slugged}`;
  }

  return `/${lang}/blog`;
};

export const getPermalinkByDocument = (doc: DocumentTypes) => {

  const linkType = doc.type as LinkType;

  const lang = doc.lang as Lang;

  const key = doc.slug;

  return getPermalink(key, linkType, lang);
}

export const OrgSchema = (lang: Lang): WithContext<Organization> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kodaps',
    founder: {
      '@type': 'Person',
      name: 'David Hockley',
      url: getPermalink('david-hockley', 'Person', lang),
    },
    sameAs: [
      'https://twitter.com/kodapsacademy',
      'https://www.facebook.com/kodapsacademy',
      'https://www.instagram.com/kodapsacademy',
      'https://www.youtube.com/@kodapsacademy',
      'https://www.youtube.com/@kodaps_fr',
      'https://github.com/Kodaps',
      'https://www.kodaps.dev',
    ],
  };
};

export const generateBlogPostStructuredData = (post: Post): WithContext<BlogPosting> => {
  const lang = post.lang as Lang;

  const schema: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.featuredImage,
    datePublished: post.date,
  };

  if (post.author && post.author.slug) {
    schema.author = [
      {
        '@type': 'Person',
        name: post.author?.name || 'David Hockley',
        url: getPermalink(post.author.slug, 'Person', lang),
      },
    ];
  }

  return schema;
};

export const generatePersonSchema = (data: PersonContent) => {
  const schema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    ...data.metadata,
  };

  return schema;
};

export const generateFAQSchema = (post: PostContent) => {
  if (!post || !post.faq || post.faq.length === 0) {
    return null;
  }

  const schema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [],
  };

  post.faq.forEach((qaPair) => {
    const faqItem = {
      '@type': 'Question',
      name: qaPair.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: renderMarkdown(qaPair.answer, false),
      },
    };

    (schema['mainEntity'] as object[]).push(faqItem);
  });

  return schema;
};

export const generateContentMetaData = (type: LinkType, post: Post | Page | Bit | null): Metadata => {
  let data: Metadata = { title: post?.title };

  if (!post) {
    return data;
  }

  if (post?.alts) {
    const lang = post.lang as Lang;
    const canonical = getPermalink(post.slug, type, lang);

    const otherLangs = getOtherLanguages(lang);

    let alt = getAlternateSlug(post.alts, otherLangs[0]);

    let en = lang == 'en' ? canonical : alt ? getPermalink(alt, post.type, 'en') : null;
    let fr = lang == 'fr' ? canonical : alt ? getPermalink(alt, post.type, 'fr') : null;

    data.alternates = {
      canonical,
      languages: {
        en: en,
        fr: fr,
      },
    };
  }

  return data;
};

const postProximity = (post1: Post | Page, post2: Post | Page) => {
  if (post1.type != post2.type) {
    return 0;
  }

  if (post1.slug === post2.slug) {
    return 0;
  }

  if (post1.lang != post2.lang) {
    return 0;
  }
  let score = 0;

  if (post1.type == 'Post' && post2.type == 'Post') {
    post1.tags = post1.tags || [];
    post2.tags = post2.tags || [];

    if (slugify(post1.category) === slugify(post2.category)) {
      score++;
    }

    (post1.tags || []).forEach((tag) => {
      if ((post2.tags || []).indexOf(tag) > -1) {
        score += 2;
      }
    });

    (post2.tags || []).forEach((tag) => {
      if ((post1.tags || []).indexOf(tag) > -1) {
        score += 2;
      }
    });
  }

  return score;
};

export const findRelatedPosts = async (post: Post | Page, lang: Lang, count?: number) => {
  const _count = count || 20;
  const posts = allPostsByLang(lang);
  if (!posts) {
    return [];
  }

  return posts
    .filter((item) => item.lang === lang)
    .map((item) => {
      return {
        score: postProximity(item, post),
        post: item,
      };
    })
    .sort((p1, p2) => p2.score - p1.score)
    .map((p) => p.post)
    .slice(0, _count);
};

export const findLatestPortfolio = async (count?: number, page?: number) => {
  const _page = page || 0;
  const _count = count || 20;
  const items = allPortfolios;
  return items ? items.sort(sortByDate).slice(_page * _count, (_page + 1) * _count) : [];
};

export const findLatestPosts = async (lang: Lang, count?: number, page?: number) => {
  const _page = page || 0;
  const _count = count || 20;
  const items = allPostsByLang(lang);
  return items ? items.sort(sortByDate).slice(_page * _count, (_page + 1) * _count) : [];
};

export const findLatestPostsByCategory = async (lang: Lang, category: string, count?: number, page?: number) => {
  const _page = page || 0;
  const _count = count || 20;
  const items = allPostsByLang(lang);
  return items
    ? items
        .filter((item) => slugify(item.category) === slugify(category))
        .sort(sortByDate)
        .slice(_page * _count, (_page + 1) * _count)
    : [];
};

export const findAllCategories = async (lang: Lang) => {
  const items = allPostsByLang(lang);
  let data = items ? items.map((item) => slugify(item.category)) : [];
  return data.filter((item, pos) => data.indexOf(item) === pos).filter((item) => !!item);
};

export const findAllTags = async (lang: Lang) => {
  const items = allPostsByLang(lang);
  let data = items
    ? items
        .filter((item) => item.lang == lang)
        .map((item) => item.tags || [])
        .reduce((accumulator, currentValue) => [...accumulator, ...currentValue], [])
    : [];
  return data.filter((item, pos) => data.indexOf(item) === pos).map(slugify);
};

export const findLatestPostsByTag = async (tag: string, lang: Lang, count?: number, page?: number) => {
  const _page = page || 0;
  const _count = count || 20;
  const items = allPostsByLang(lang);
  const _tag = slugify(tag);
  return items
    ? items
        .filter((item) => !!item)
        .filter((item) => (item.tags || []).indexOf(_tag) > -1 && item.lang == lang)
        .sort(sortByDate)
        .slice(_page * _count, (_page + 1) * _count)
    : [];
};

// get locale
const dateOption: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const getFormattedDate = (date: any, locale: Lang = 'en') => {
  let dtObject: Date = new Date();

  if (typeof date == 'string' || typeof date == 'number') {
    dtObject = new Date(date);
  } else if (date instanceof Date) {
    dtObject = date;
  } else {
    return date;
  }
  return dtObject.toLocaleString(locale, dateOption);
};

/** */

const manageFAQ = (FAQcontent: string) => {
  // split into questions
  let questions = FAQcontent.split('\n### ');

  let ret = [];

  for (let item of questions) {
    const lines = item.split('\n');
    const firstLine = lines.shift();
    if (!firstLine) {
      continue;
    }
    const question = firstLine.replace('### ', '').trim();

    const answer = lines.join('\n').trim();

    if (!question || !answer) {
      continue;
    }
    ret.push({
      question,
      answer,
    });
  }

  return ret;
};


export const parseContent = (article: string): PostContent => {
  let FAQ = article.split('\n## Frequently Asked Questions');

  let _article = FAQ[0];

  let faq: Array<QAPair> = [];

  if (FAQ.length > 1) {
    faq = manageFAQ(FAQ[1]);
  }

  let sections = _article.split('\n## ');

  let firstSection = sections.shift();

  let items = (firstSection || '').split('\n### ');

  let takeaway = '';

  if (items.length > 1) {
    const takewayBits = (items.pop() || '').split('\n');
    takewayBits.shift();
    takeaway = takewayBits.join('\n');
  }

  let introBits = items.join('\n ### ').split('\n');

  let lead = introBits.shift() || '';
  let intro = introBits.join('\n');

  return {
    sections: sections.map((item) => "## " + item),
    takeaway,
    faq,
    lead,
    intro,
  };
};

export const renderMarkdown = (content: string, showHighlight = true) => {
  let highlight = showHighlight
    ? (str: string, lang: string) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (__) {}
        }
        return ''; // use external default escaping
      }
    : null;

  return md({
    html: true,
    highlight,
  }).render(content);
};



const augmentDocument = (doc?: DocumentTypes) => {

  if (!doc) {
    return doc;
  }

  if (!doc.translation || doc.translation.length == 0) {
    return doc;
  }

  let doctype = doc.type;

  let translation = doc.translation[0];

  const otherDoc = allContent[doctype][translation];

  if (!otherDoc) {
    return doc;
  }

  if (!doc.image && otherDoc.image) {
    doc.image = otherDoc.image;
  }

  doc.alts = doc.alts || [];

  const type: NestedTypeNames = 'AltLink';

  const alt = {[otherDoc.lang]: otherDoc.slug, _id: otherDoc._id, type,  _raw: {...otherDoc._raw, type}};
  doc.alts.push(alt);

  return doc;

}

type Car = {
  run : () => void;
}