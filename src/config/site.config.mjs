// import { Lang } from "@/lib/i18n";

const dev = process.env.NODE_ENV !== 'production';


/**
 * @type {import("./siteConfig").ISiteConfig}
 */

const siteConfig = {
  name: 'kodaps gradient ascent',
  origin: dev ? 'https://localhost:3000/': 'https://www.gradient-ascent.dev',
  basePathname: '/',
  trailingSlash: false,
  title: 'Kodaps Gradient Ascent',
  description: 'Gradient Ascent: A Next JS Starter Website by Kodaps',
  features : {
    courses: false,
    menu: true,
    profileMenu: false,
    gitPillar: false,
    jsPillar: false,
    reactPillar: false,
    nextPillar: false,
  }
};

export default siteConfig;