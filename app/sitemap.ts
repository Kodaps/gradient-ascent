import { MetadataRoute } from 'next';
import { Lang } from "@/utils/i18n";
import { getPermalink } from "@/utils/content";
import { allPages, allPosts } from 'contentlayer/generated';

const BASE_URL = 'https://www.kodaps.dev'


interface BlogLanguageData {
  categories: string[];
  tags: string[];
};

interface BlogData {
  fr: BlogLanguageData;
  en: BlogLanguageData;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const _posts = await allPosts;
  const _pages = await allPages;
  const urls:string[] = ['/en', '/fr'];
  const blogData:BlogData = {
    fr: {
      categories: [],
      tags:[],
    },
    en: {
      categories: [],
      tags:[],
    },
  };

  for (const page of _pages) {
    if (!page.slug) {
      continue;
    }
    urls.push(getPermalink(page.slug, 'Page', page.lang as Lang));
  }


  for(const post of _posts) {
    if (!post.slug) {
      continue;
    }
    urls.push(getPermalink(post.slug, 'Post', post.lang as Lang));
    const data = blogData[post.lang as Lang];

    if (post.category && data.categories.indexOf(post.category) === -1) {
      data.categories.push(post.category);
    }
    for(const tag of (post.tags || [])) {
      if (data.tags.indexOf(tag) === -1) {
        data.tags.push(tag);
      }
    }
  }

  const categoryUrls = [];
  const tagUrls = [];

  for (const lang of ['fr', 'en']) {
    const data = blogData[lang as Lang];
    for(const category of data.categories) {
      categoryUrls.push(getPermalink(category, 'category', lang as Lang));
    }
    for(const tag of data.tags) {
      tagUrls.push(getPermalink(tag, 'tag', lang as Lang));
    }
  }

  const urlList = [...urls, ...categoryUrls, ...tagUrls];

  return urlList.map((url) => ({
    url: BASE_URL + url,
    lastModified: new Date(),
  }));

}