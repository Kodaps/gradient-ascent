
const siteConfig = await import ('./src/config/site.config.mjs');
const { withContentlayer } = await import ('next-contentlayer2')
import { withPayload } from '@payloadcms/next/withPayload'


/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: siteConfig.trailingSlash,
  basePath: siteConfig.basePathname !== '/' ? siteConfig.basePathname : '',
  headers: async () => {
    return [{
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      }]
  },


};

export default withPayload(withContentlayer(nextConfig));

