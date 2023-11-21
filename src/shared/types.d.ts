import { LucideIcon } from "lucide-react";

interface ILink{
  label: string,
  href: string,
  icon?: LucideIcon,
};

interface IMenuSection{
  label: string,
  href: string,
  icon?: LucideIcon,
  links?: ILink[],
};

interface IHeader {
  title: string,
  subtitle: string,
  highlight?: string,
};

interface ITextSection {
  title: string,
  texts : Array<string>,
};

interface FooterProps {
  columns: Array<ITextSection>,
  links: ILink[],
  highlight?: string,
  socials: Social[],
  footNote: JSX.Element
};

interface Social {
  label: string, icon: LucideIcon, href: string 
};

interface ImgData {
  src: string,
  width: number,
  height: number,
  alt: string,
}

interface HeroProps {
  title: string,
  subtitle: string,
  callToAction: ILink,
  image: ImgData,
};



interface HeaderProps {
  links: Array<IMenuSection>,
  isSticky: boolean,
  showToggleTheme: boolean,
  showRssFeed: boolean,
  position: string,
};
