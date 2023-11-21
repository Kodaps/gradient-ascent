
import {
  ChevronDown,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LightbulbIcon,
  NewspaperIcon,
  PhoneCall,
  PhoneCallIcon,
  TwitterIcon,

} from 'lucide-react';

import { FooterProps, HeaderProps, HeroProps, Social } from './types';

const socials:Array<Social> = [
{ label: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com/KodapsAcademy' },
{ label: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/kodapsacademy/' },
{ label: 'Facebook', icon: FacebookIcon, href: 'https://www.facebook.com/KodapsAcademy' },
/*{ label: 'RSS', icon: IconRss, href: '#' },*/
{ label: 'Github', icon: GithubIcon, href: 'https://github.com/Kodaps' },
];


// Header data
export const headerData: HeaderProps = {
  links: [
    /*{
      label: 'Pages',
      href: '',
      icon: IconChevronDown,
      links: [
        {
          label: 'Pricing',
          href: '/pricing',
        },
        {
          label: 'Contact',
          href: '/',
        },
      ],
    },*/
    {
      label: 'about',
      href: '/about',
    },
    {
      label: 'blog',
      href: '',
      icon: ChevronDown,
      links: [
        {
          label: 'all_categories',
          href: '/blog',
        },
        {
          label: 'react',
          href: '/blog/category/react',
        },
        {
          label: 'javascript',
          href: '/blog/category/javascript',
        },
        {
          label: 'frameworks',
          href: '/blog/category/frameworks',
        },
        {
          label: 'backend',
          href: '/blog/category/backend',
        },
        {
          label: 'coderlife',
          href: '/blog/category/coderlife',
        },

      ]
    },
  ],
  /*actions: [
    {
      label: 'Download',
      href: 'https://github.com/onwidget/tailnext',
      type: 'primary',
    },
  ],*/
  isSticky: true,
  showToggleTheme: true,
  showRssFeed: false,
  position: 'center',
};

// Hero data
export const heroData: HeroProps = {
  title: 'hero.title',
  subtitle: 'hero.subtitle',
  callToAction: {
    label: 'Learn more',
    href: 'blog',
  },
  image: {
    src: '/images/site/journey-into-code.jpg',
    width: 1536,
    height: 1024,
    alt: 'A journey into code',
  },
};





export const footerData2: FooterProps = {
  columns: [
  ],
  links: [
    /*{
      label: 'Terms of Use',
      href: '',
    },*/
    {
      label: 'Site Map',
      href: 'sitemap',
    },
    {
      label: 'Privacy Policy',
      href: 'privacy-policy',
    },
  ],

  socials,
  footNote: (
    <div className="mr-4 text-sm dark:text-slate-400">
      Made by <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
      kodaps</span> · All rights reserved.
    </div>
  ),
};
