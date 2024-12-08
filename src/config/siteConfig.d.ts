interface Feature {
  [key: string]: boolean
}

export interface ISiteConfig {
  name: string
  origin: string
  basePathname: string
  trailingSlash: boolean
  title: string
  description: string
  features: {
    [key: string]: Feature | boolean
  }
}
