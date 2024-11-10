import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconChevronDown,

} from '@tabler/icons-react';




const socials = [
{ label: 'Twitter', icon: 'twitter', href: 'https://twitter.com/KodapsAcademy' },
{ label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/kodapsacademy/' },
{ label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/KodapsAcademy' },
/*{ label: 'RSS', icon: IconRss, href: '#' },*/
{ label: 'Github', icon: 'github', href: 'https://github.com/Kodaps' },
];


interface Link {

  label: string;
  href: string;
  icon?: any;
  links?: Link[];
  description?: string;
}

interface HeaderData {
  links: Link[];
  actions?: Link[];
  isSticky: boolean;
  showToggleTheme: boolean;
  showRssFeed: boolean;
  position: 'left' | 'center' | 'right';
}

// Header data
export const headerData:HeaderData = {
  links: [
    {
      label: 'Pages',
      href: '',
      icon: 'chevron-down',
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
    },
    {
      label: 'about',
      href: '/about',
      description: 'about_description',
    },
    {
      label: 'blog',
      href: '',
      icon: 'down',
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

