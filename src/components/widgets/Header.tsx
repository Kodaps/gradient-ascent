'use client';

import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
import { Dict, Lang, routeToHref, _t, getOtherLanguages } from '@/lib/i18n';
import { usePathname } from 'next/navigation';
import { useState } from 'react';


interface HeaderProps {
  lang: Lang,
  dict: Dict
}

const isSticky = false;


const Header:React.FC<HeaderProps> = ({lang, dict}) => {

  const [langHref, setLangHref] = useState('');
  const t = (key: string) => _t(key, dict);

  return (
    <header
      className={`top-0 z-40 navbar mx-auto w-full flex-none bg-white dark:bg-zinc-900 md:bg-white/90 md:backdrop-blur-sm dark:md:bg-zinc-900/90 ${
        isSticky ? 'sticky' : 'relative'
      }`}
      id="header"
    >
      <div className="mx-auto w-full max-w-4xl py-3 px-3 md:flex md:justify-between md:py-3.5 md:px-4">
        <div className="flex justify-between">
          <Link className="flex items-center" href={'/' + lang}>
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
