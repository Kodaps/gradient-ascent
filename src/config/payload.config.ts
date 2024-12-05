import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

import path from 'path'

import { fileURLToPath } from 'url'

// import { Posts } from './collections/Posts'
// import { Users } from './collections/Users'

import { plugins } from '@cms/plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { connectionString, db } from '../db/db';

import { defaultLexical } from '@cms/fields/defaultLexical'

import { resendAdapter } from '@payloadcms/email-resend'

import { Categories } from '@cms/collections/categories'
import { Media } from '@cms/collections/media'
import { Pages } from '@cms/collections/pages'
import { Posts } from '@cms/collections/posts'
import { Users } from '@cms/collections/users'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  //editor: lexicalEditor(),
  editor: defaultLexical,

  email: resendAdapter({
    defaultFromAddress: 'david@kodaps.dev',
    defaultFromName: 'Payload CMS',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

  // Define and configure your collections in this array
  collections: [Users, Categories, Posts, Media, Pages],

  localization: {
    locales: ['en', 'fr'], // required
    defaultLocale: 'en', // required
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    ...plugins,
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    // Your Postgres connection string
    pool: {
      connectionString,
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})