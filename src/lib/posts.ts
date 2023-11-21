import md from 'markdown-it';
import hljs from "highlight.js";

import { readdirSync, readFileSync, readFile } from 'fs';
import matter, {GrayMatterOption} from 'gray-matter';
import { Metadata } from 'next';
import { join } from 'path';
import { getOtherLanguages, Lang, LANGS, otherLang } from './i18n';
import { BlogPosting, Organization, Person, WithContext } from 'schema-dts';

//import contentEn from '@/content/blog/en/posts.json';
//import contentFr from '@/content/blog/fr/posts.json';

const contentEn:Array<PostMatter> = [];
const contentFr:Array<PostMatter> = [];


import { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';

import siteConfig from '@/siteConfig';

const getBlogDir = (lang:Lang) => {
  return join(process.cwd(), `src/content/blog/${lang}`);
}

const en = contentEn as unknown as Array<PostMatter>;
const fr = contentFr as unknown as Array<PostMatter>;


const sortByDate = (post1:PostMatter, post2:PostMatter) => {
  return post1.date < post2.date ? 1 : -1;
}

const content = {
  en: en.sort(sortByDate),
  fr: fr.sort(sortByDate)
};

const BLOG_DIR = {
  en: getBlogDir('en'),
  fr : getBlogDir('fr')
};



export type PostType = 'page'|'blogpost'|'author'|'resource';
export type LinkType = 'page'|'blogpost'|'author'|'resource'|'category'|'tag';


interface AltItem {
  en?: string;
  fr?: string;
}

interface Author {
  name: string;
  slug: string;
}

interface ProfileLink {
  url: string
}

export interface PostMatter {
  id: string;
  featuredImage: string;
  title: string;
  date: string | Date;
  video?: string;
  description?: string;
  category?: string;
  tags: Array<string>;
  author?: Author;
  portrait?: string;
  blog: boolean;
  lang: string;
  credits?:string;
  metadata?: {[key:string]: any};
  alts?: Array<AltItem>;
  redirect?: string;
  type?: PostType;
  slug?: string;
  profileLinks?: Array<ProfileLink>
}

export interface PersonMatter {
  portrait: string;
  firstName: string;
  lastName: string;
  email: string;
}


export interface PostContent {
  lead: string;
  intro?: string;
  sections: Array<string>;
  takeaway?: string;
}


export interface Post extends PostMatter{
  slug: string;
  formattedDate: string;
  excerpt?: string;
  date: Date;
  type: PostType;
  redirect?: string;
  content: string;
  parsedContent?: PostContent;
}


const slugify = (value = '') => {

  if (!value) {
    return '';
  }
  return value.toLowerCase().replaceAll(' ', '-');
}


export const getPermalink = (key: string, linkType:LinkType, lang: Lang, debug= false ) => {

  if (!key) {
    return `/${lang}/blog`;
  }

  debug && console.log('getPermalink linkType is [', linkType,']');

  const slugged = slugify(key);

  if (linkType == 'page') {
    return `/${lang}/${slugged}`;
  }

  if (linkType == 'author') {
    return `/${lang}/team/${slugged}`;
  }

  if (linkType == 'tag') {
    return `/${lang}/blog/tag/${slugged}`;
  }

  if (linkType == 'category') {
    return `/${lang}/blog/category/${slugged}`;
  }

  if (linkType == 'blogpost') {
    return `/${lang}/blog/${slugged}`;
  }

  return `/${lang}/blog`;
}


export const OrgSchema = (lang:Lang):WithContext<Organization> => {

return {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.SITE.orgName,
  founder: {
    '@type': 'Person',
    name: siteConfig.SITE.defaultAuthor,
    "url": getPermalink("david-hockley", 'author', lang)
  },
  sameAs: [
    'https://twitter.com/kodapsacademy',
    'https://www.facebook.com/kodapsacademy',
    'https://www.instagram.com/kodapsacademy',
    'https://www.youtube.com/@kodapsacademy',
    'https://www.youtube.com/@kodaps_fr',
    'https://github.com/Kodaps',
    "https://www.kodaps.dev",
  ]

  };
}


export const generateBlogPostStructuredData = (post:Post ):WithContext<BlogPosting>   => {

  const lang = post.lang as Lang;

  const schema: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.featuredImage,
    datePublished: post.date.toISOString(),
  };

  if (post.author && post.author.slug) {
    schema.author = [{
      '@type': 'Person',
      name: post.author?.name || siteConfig.SITE.defaultAuthor,
      "url": getPermalink(post.author.slug, 'author', lang)
    }];
  }

  return schema;

}


export const generatePersonSchema = (data: PostMatter) => {

  const schema: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    ...data.metadata
  }

  return schema;

}

export const generateContentMetaData = (type:LinkType, post:Post|null ):Metadata => {

  let data:Metadata =  { title: post?.title };

  if (!post) {
    return data;
  }

  if (post?.description) {
    data.description = post.description;
  }

  if (post?.alts) {

    const lang = post.lang as Lang;
    const canonical = getPermalink(post.slug, type, lang);

    let alt = post.alts.find(item => !!item[otherLang(lang)]);

    let en = (lang == 'en') ? canonical : ((alt && alt['en']) ? getPermalink(alt['en'], type, 'en') : null);
    let fr = (lang == 'fr') ? canonical : ((alt && alt['fr']) ? getPermalink(alt['fr'], type, 'fr') : null);

    data.alternates = {
      canonical,
      languages: {
        'en': en,
        'fr': fr
      }
    };

  }

  return data;


}


/** */
export const findAllPosts = async (_type: PostType, lang?:Lang) => {

  const type = _type || 'blogpost';
  const posts = lang ? content[lang] : [...content.en, ...content.fr];
  return posts ? posts.sort(sortByDate)
    .filter(post => post.type === type) : [];
};



const postProximity= (post1:PostMatter, post2:PostMatter) => {

  if (post1.slug === post2.slug) {
    return 0;
  }

  if (post1.lang != post2.lang) {
    return 0;
  }


  let score = 0;
  if (slugify(post1.category) === slugify(post2.category)) {
    score++;
  }

  post1.tags.forEach(tag => {
    if (post2.tags.indexOf(tag) > -1) {
      score += 2;
    }
  });

  post2.tags.forEach(tag => {
    if (post1.tags.indexOf(tag) > -1) {
      score +=2;
    }
  });

  return score;
}

const isValidBlog = (item:PostMatter, lang: Lang) => {
  return (item.type === "blogpost") && 
          (item.lang === lang);
}

export const findRelatedPosts = async (post: Post, lang: Lang, count?:number) => {
  const _count = count || 20;
  const posts = content[lang];
  if (!posts) {
    return [];
  }

  return posts
      .filter((item) => isValidBlog(item, lang) && item.lang === lang)
      .map((item) => {
        return {
          score: postProximity(item, post),
          post: item
        }
      }).sort((p1, p2) => p2.score - p1.score)
      .map((p) => p.post)
      .slice(0, _count);
}


export const findLatestPosts = async (lang: Lang, count?:number, page?:number) => {
  const _page = page || 0;
  const _count = count || 20;
  const posts = content[lang];
  return posts ? posts
          //.sort(sortByDate)
          .filter((post) => (post.blog !== false) && (post.lang == lang))
          .slice(_page * _count, (_page +1) * _count) : [];
};

export const findLatestPostsByCategory = async (lang: Lang, category: string, count?:number, page?:number) => {
  const _page = page || 0;
  const _count = count || 20;
  const posts = content[lang];
  return posts ? posts
    .filter((post) => slugify(post.category) === slugify(category) && (post.lang == lang))
    //.sort(sortByDate)
    .slice(_page * _count, (_page +1) * _count) : [];
};

export const findAllCategories = async (lang:Lang) => {
  const posts = content[lang];
  let data = posts ? posts
        .filter((post) => post.lang == lang)
        .map((post) => slugify(post.category)) : [];
  return data
        .filter((item, pos) => data.indexOf(item) === pos)
        .filter(item => !!item);
};

export const findAllTags = async (lang: Lang) => {
  const posts = content[lang];
  let data = posts ? posts.filter((post) => post.lang == lang).map((post) => post.tags)
      .reduce(
        (accumulator, currentValue) => [...accumulator, ...currentValue],
        []
      ) : [];
  return data.filter((item, pos) => data.indexOf(item) === pos).map(slugify);
};


export const findLatestPostsByTag = async (tag: string, lang: Lang, count?:number, page?:number) => {
  const _page = page || 0;
  const _count = count || 20;
  const posts = content[lang];
  const _tag = slugify(tag);
  return posts ? posts
    .filter((post) => !!post)
    .filter((post) => post.tags.indexOf(_tag) > -1 && (post.lang == lang))
    .sort(sortByDate)
    .slice(_page * _count, (_page +1) * _count) : [];
};

// get locale
const dateOption:Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};


export const getFormattedDate = (date: any, locale: Lang = 'en') => {
  
  let dtObject:Date = new Date();
  
  if ((typeof(date) == 'string') || (typeof(date) == 'number')) {
    dtObject = new Date(date);
  } else if (date instanceof Date) {
    dtObject = date;
  } else {
    return date;
  }
  return dtObject.toLocaleString(locale, dateOption );
}

/** */



const manageFAQ = (FAQcontent: string) => {
  // split into questions
  let questions = FAQcontent.split('\n### ');

  let ret = []

  for(let item of questions) {
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
      answer
    })

  }

  return ret;

}


export const loadPostBySlug = async (lang: Lang, slug: string, splitContent = false):Promise<Post|null> => {
  if (!slug) {
    console.error(`no slug provided for ${slug}`);
    return null;
  }

  try {
    let readFile;
    try {
      readFile = readFileSync(join(BLOG_DIR[lang], `${slug}.md`), 'utf-8');
    } catch(err) {
      return null;
    }


    if (!readFile) {
      return null;
    }

    const { data: fm, content: article } = matter(readFile);

    const frontmatter = fm as unknown as PostMatter;

    let parsedContent:PostContent|null = null;

    if (splitContent) {


      let sections = article.split("\n## ");

      let firstSection = sections.shift();

      let items = (firstSection || '').split("\n### ");

      let takeaway = '';

      if (items.length > 1) {
        const takewayBits = (items.pop() || '').split("\n");
        takewayBits.shift();
        takeaway = takewayBits.join("\n");
      }

      let introBits = (items.join("\n ### ")).split("\n");

      let lead = introBits.shift() || '';
      let intro = introBits.join("\n")

      parsedContent = { 
        sections: sections.map(section => renderMarkdown("## " + section, true)),
        takeaway,
        lead,
        intro
      }

    }


    return {
      slug,
      ...frontmatter,
      date: new Date(frontmatter.date),
      lang,
      content: article,
      // defaults to true
      blog: (typeof frontmatter.blog == "undefined") ? true : frontmatter.blog,
      tags: (frontmatter.tags || []).map(slugify),
      type: frontmatter.type || 'blogpost',
      formattedDate: getFormattedDate(frontmatter.date),
      parsedContent: parsedContent || undefined
    };
  } catch (e) {
    console.error(e);
  }

  return null;
};


export const findPostBySlug = loadPostBySlug;
/** */


/*
export const findPostsByIds = async (ids:Array<string>) => {
  if (!Array.isArray(ids)) return [];

  const posts = content.;

  return ids.reduce(function (r:Array<Post>, id) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};*/

export const renderMarkdown = (content:string, showHighlight = true) => {

  let highlight = showHighlight ? (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  } : null

  return  md({
      html: true,
      highlight
    }).render(content);
}