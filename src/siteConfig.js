const dev = process.env.NODE_ENV !== 'production';

module.exports.SITE = {
  name: 'kodaps',

  origin: dev ? 'http://localhost:3000': 'https://www.my-site.dev',
  basePathname: '/',
  trailingSlash: false,
  orgName: 'kodaps',
  defaultLocale: 'en',
  locales: ['en', 'fr'],
  defaultAuthor: 'David from Kodaps',
  title: 'Kodaps Starter Website',
  description: 'A nextjs starter built in public',
};
