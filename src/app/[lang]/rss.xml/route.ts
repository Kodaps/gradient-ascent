import Rss from "rss";

import { Lang } from "@/lib/i18n";
import { findLatestPosts, getPermalink } from "@/utils/content";
import { getTranslations } from "../dictionaries";
const BASE_URL = 'https://www.kodaps.dev'

const generateRssFeed = async (lang: Lang) => {

  try {
    const maxArticlesToShow = 10;

    const t = await getTranslations(lang);

    const sortedArticles = await findLatestPosts(lang, maxArticlesToShow);

    const feed = new Rss({
      title: t('home.metatitle'),
      description: t('home.metadescription'),
      site_url: `${BASE_URL}/${lang}`,
      feed_url: `${BASE_URL}/${lang}/rss.xml`,
    });

    sortedArticles.filter(article => !!article.slug).forEach((article) => {
      feed.item({
        title: article.title,
        description: article.description || '',
        url: BASE_URL + getPermalink(article.slug || '', 'Post', lang),
        date: article.date,
      });
    });

    return feed.xml();
  } catch (error) {
    // Handle error appropriately (e.g., log, return an error message, etc.)
    console.error("Error generating RSS feed:", error);
    return null;
  }
};


interface LangProps {
  params : {
    lang: Lang
  }
}

export async function GET(request: Request, context: LangProps) {

  const feedXml = await generateRssFeed(context.params.lang);

  if (feedXml) {
    return new Response(feedXml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } else {
    return new Response("Error generating RSS feed.", { status: 500 });
  }
}