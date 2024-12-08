"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

import { headerData } from "@/config/ui.config"
import { isFeatureActive } from "@/lib/features"
import { Lang, routeToHref } from "@/lib/i18n"
import Logo from "@/components/atoms/Logo"
import ToggleMenu from "@/components/atoms/ToggleMenu"
import { FullNavigationMenu } from "@/components/molecules/NavigationMenu"
// import { IconFlag, IconRss } from '@tabler/icons-react';
import { ToggleDarkMode } from "@/components/molecules/ToggleDarkMode"

import { ToggleLanguage } from "../altlinks/ToggleLanguage"
import Icon, { IconType } from "../atoms/Icon"

interface SubLinks {
  label: string
  href: string
}

interface BlogLinks {
  label: string
  href: string
  description?: string
  icon?: IconType
  links?: Array<SubLinks>
}

interface HeaderProps {
  lang: Lang
  links: Array<BlogLinks>
  blogLinks: Array<BlogLinks>
}

const { isSticky, position } = headerData

const ClientHeader = ({ lang, links, blogLinks }: HeaderProps) => {
  const updatedIsDropdownOpen =
    links &&
    links.map(() => {
      return false
    })

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>(
    updatedIsDropdownOpen as boolean[]
  )
  const [isToggleMenuOpen, setIsToggleMenuOpen] = useState<boolean>(false)

  // const session = useSession()

  const handleOpenDropdownOnClick = (index: number) => {
    setIsDropdownOpen((prevValues) => {
      const newValues = [...(prevValues as boolean[])]
      newValues.forEach((value, i) => {
        newValues[i] = i === index
      })
      return newValues
    })
  }

  const handleCloseDropdownOnClick = (index: number) => {
    setIsDropdownOpen((prevValues) => {
      const newValues = [...(prevValues as boolean[])]
      newValues[index] = false
      return newValues
    })
  }

  const handleToggleMenuOnClick = () => {
    setIsToggleMenuOpen(!isToggleMenuOpen)
  }

  return (
    <header
      className={`top-0 z-40 navbar mx-auto w-full flex-none bg-white dark:bg-zinc-900 md:bg-white/90 md:backdrop-blur-sm dark:md:bg-zinc-900/90 ${
        isSticky ? "sticky" : "relative"
      }`}
      id="header"
    >
      <div className="mx-auto w-full max-w-5xl py-3 px-3 md:flex md:justify-between md:py-3.5 md:px-4">
        <div className="flex justify-between">
          <Link className="flex items-center" href={"/" + lang}>
            <Logo />
          </Link>
          <div className="flex items-center md:hidden">
            <ToggleMenu
              handleToggleMenuOnClick={handleToggleMenuOnClick}
              isToggleMenuOpen={isToggleMenuOpen}
            />
          </div>
        </div>
        <nav
          className={`${isToggleMenuOpen ? "block" : "hidden"} h-screen md:w-full
                      ${position === "right" ? "justify-end" : position === "left" ? "justify-start" : "justify-center"}
                      w-auto overflow-y-auto dark:text-zinc-200 md:mx-5
                      ${!isFeatureActive("menu") && "md:flex md:h-auto md:items-center md:overflow-visible"}`}
          aria-label="Main navigation"
        >
          <ul className="flex w-full flex-col pt-8 text-xl md:w-auto md:flex-row md:self-center md:pt-0 md:text-base">
            {links &&
              links.map(({ label, href, icon, links }, index) => (
                <li
                  key={`item-link-${index}`}
                  className={links?.length ? "dropdown" : ""}
                >
                  {links && links.length ? (
                    <>
                      <button
                        className="flex items-center px-4 py-3 font-medium transition duration-150 ease-in-out hover:text-gray-900 dark:hover:text-white"
                        onClick={() =>
                          isToggleMenuOpen
                            ? handleToggleMenuOnClick()
                            : handleOpenDropdownOnClick(index)
                        }
                      >
                        {`menu.${label}`}{" "}
                        {icon && (
                          <Icon
                            name={icon}
                            className="ml-0.5 hidden h-3.5 w-3.5 md:inline"
                          />
                        )}
                      </button>
                      <ul
                        className={`${
                          isDropdownOpen[index] ? "block" : "md:hidden"
                        } rounded pl-4 font-medium drop-shadow-xl md:absolute md:min-w-[250px] md:bg-white/90 md:pl-0 md:backdrop-blur-md dark:md:bg-slate-900/90`}
                      >
                        {links.map(({ label: label2, href: href2 }, index2) => (
                          <li key={`item-link-${index2}`}>
                            <Link
                              className="whitespace-no-wrap block py-2 px-5 first:rounded-t last:rounded-b dark:hover:bg-gray-700 md:hover:bg-gray-200"
                              href={routeToHref([href2], lang)}
                              onClick={() =>
                                isToggleMenuOpen
                                  ? handleToggleMenuOnClick()
                                  : handleCloseDropdownOnClick(index)
                              }
                            >
                              {`submenu.${label2}`}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      className="flex items-center px-4 py-3 font-medium transition duration-150 ease-in-out hover:text-gray-900 dark:hover:text-white"
                      href={routeToHref([href], lang)}
                      onClick={() =>
                        isToggleMenuOpen
                          ? handleToggleMenuOnClick()
                          : handleCloseDropdownOnClick(index)
                      }
                    >
                      {`menu.${label}`}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </nav>
        <nav className="hidden md:flex">
          {isFeatureActive("menu") && (
            <FullNavigationMenu
              lang={lang}
              blogLinks={blogLinks}
              className="items-center"
            />
          )}
        </nav>
        <nav className="hidden md:flex flex-row gap-2">
          <ToggleDarkMode />
          <ToggleLanguage lang={lang} />
        </nav>
      </div>
    </header>
  )
}

export default ClientHeader
