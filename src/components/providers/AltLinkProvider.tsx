'use client'

import { createContext } from 'react'

export const AltLinkContext = createContext('')

export default function AltLinkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <AltLinkContext.Provider value=''>
    {children}
  </AltLinkContext.Provider>
}