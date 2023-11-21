"use client"

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
import { isFeatureActive } from "@/utils/features"
import { Dict, Lang, routeToHref, _t } from "@/utils/i18n"
import { IconBrain } from "@tabler/icons-react"


interface NavigationMenuProps {
  className?: string
  blogLinks: { label: string; href: string, description?: string }[], 
  dict: Dict,
  lang: Lang
}

export const FullNavigationMenu: React.FC<NavigationMenuProps> = ({className, blogLinks, dict, lang}) => {

  const t = (key: string) => _t(key, dict);

  return (
    <NavigationMenu>
      <NavigationMenuList>
      <NavigationMenuItem>
          <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {blogLinks.map((component) => (
                <ListItem
                  key={component.label}
                  title={component.label}
                  href={component.href}
                >
                  {component.description || component.label}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('resources.h1')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <IconBrain className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      kodaps
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {t('resources.desc')}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {isFeatureActive('courses') && <ListItem href={routeToHref(["/courses"], lang)}  title={t('courses.title')}>
                {t('courses.desc')}
              </ListItem>}
              <ListItem title={t('documentation.title')} className="opacity-50">
                {t('documentation.desc')}
              </ListItem>
              <ListItem title={t('help.h1')} className="opacity-50">
                {t('help.desc')}
              </ListItem>
              <ListItem href={routeToHref(["/newsletter"], lang)} title={t('newsletter.title')}>
                {t('newsletter.h1')}
              </ListItem>
            </ul>
          </NavigationMenuContent>
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

// FR87408606705
