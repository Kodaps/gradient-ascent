// components/GoogleAnalytics.tsx
"use client"

// import Script from 'next/script';
import { klaroConfig } from "./klaro.config"
// import Klaro without CSS

import "klaro/dist/klaro.css"

import { useEffect } from "react"

// import the accompanying CSS (requires style-loader)
// import * as klaro from 'klaro/dist/klaro-no-css';

declare global {
  interface Window {
    klaro: any
    klaroConfig: any
  }
}

export default function KlaroConfig() {
  useEffect(() => {
    import("klaro/dist/klaro-no-css").then((klaro) => {
      window.klaro = klaro
      window.klaroConfig = klaroConfig
      klaro.setup(klaroConfig)
    })
  })

  return <></>
}
