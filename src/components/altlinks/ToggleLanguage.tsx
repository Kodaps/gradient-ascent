'use client';


import { Flag, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAltLinks } from './AltLinkProvider';
import { Lang } from "@/lib/i18n";
import Link from "next/link";

export function ToggleLanguage({lang}: {lang: Lang}) {
  const links = useAltLinks()

  const availableLanguages = Object.keys(links).filter((_lang) => (_lang != lang) && links[_lang]);

  return (availableLanguages.length > 0 && <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Flag className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((_lang) => {
          return <Link key={_lang} href={links[_lang]}>{_lang}</Link>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

