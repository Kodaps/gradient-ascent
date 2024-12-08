"use client"

import { createContext, useContext, useReducer } from "react"

export interface LinkFormat {
  [key: string]: string
}

interface Action {
  type: string
  payload: any
}

const initialLinks: LinkFormat = { en: "/en", fr: "/fr" }

function linksReducer(links: LinkFormat, action: Action) {
  switch (action.type) {
    case "reset": {
      return initialLinks
    }
    case "set": {
      return action.payload
    }
    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}

export const AltLinkDispatchContext = createContext(null)

const AltLinkContext = createContext<{
  state: LinkFormat
  dispatch: React.Dispatch<any>
}>({
  state: initialLinks,
  dispatch: () => null,
})

export default function AltLinkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(linksReducer, initialLinks)

  return (
    <AltLinkContext.Provider value={{ state, dispatch }}>
      {children}
    </AltLinkContext.Provider>
  )
}

export function useAltLinks() {
  return useContext(AltLinkContext).state
}

export function useAltLinksDispatcher() {
  return useContext(AltLinkContext).dispatch
}
