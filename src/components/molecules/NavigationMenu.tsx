// "use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/atoms/Icon"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { isFeatureActive } from "@/lib/features"
import { Dict, Lang, routeToHref, useTranslation,  } from "@/lib/i18n"
import { IconBrain } from "@tabler/icons-react"


interface NavigationMenuProps {
  className?: string
  blogLinks: { label: string; href: string, description?: string }[], 
  lang: Lang
}

export const FullNavigationMenu= async ({className, blogLinks, lang}: NavigationMenuProps) => {

  const {t} = await useTranslation(lang);

  return (
    <NavigationMenu>
      <NavigationMenuList>
      <NavigationMenuItem>
          <Link href={routeToHref(["/blog"], lang)}  legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {t('menu.blog')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={routeToHref(["/about"], lang)}  legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {t('menu.about')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"