// contentlayer.config.ts
import { defineDocumentType, defineNestedType, FieldDefs, makeSource } from 'contentlayer2/source-files'

const Author = defineNestedType(() => ({
  name: 'Author',
  fields: {
    name: { type: 'string', required: true },
    slug: { type: 'string', required: true },
  },
}))

const AltLink = defineNestedType(() => ({
  name: 'AltLink',
  fields: {
    en: { type: 'string', required: false },
    fr: { type: 'string', required: false },
  },
}))


const Image = defineNestedType(() => ({
  name: 'Image',
  fields: {
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
    src: { type: 'string', required: true },
  },
}))

const MetaData = defineNestedType(() => ({
  name: 'MetaData',
  fields: {
    lang: { type: 'string', required: true },
    url: { type: 'string', required: true },
  },
}))

const ProfileLinks = defineNestedType(() => ({
  name: 'ProfileLinks',
  fields: {
    icon: { type: 'string', required: true },
    url: { type: 'string', required: true },
  },
}))


const coreFields:FieldDefs = {
  title: { type: 'string', required: true },
  author: { type: 'nested', of: Author, required: false },
  slug: { type: 'string', required: true },
  enabled: { type: 'boolean', required: false },
  notionId: { type: 'string', required: false },
  tags: {type: 'list', of: {type: 'string'}},
  translation: {type: 'list', of: {type: 'string'}},
  image: {type: 'nested', of: Image, required: false },
  alts: {type: 'list', of: AltLink },
  lang: { type: 'string', required: true },
  updatedAt: { type: 'date', required: false },
  sentToNotion:  { type: 'date', required: false },
}

export const Portfolio = defineDocumentType(() => ({
  name: 'Portfolio',
  filePathPattern: `portfolio/**/*.md`,
  fields: {
    ...coreFields,
    prompt: { type: 'string', required: false },
    engine: { type: 'string', required: false },
    description : { type: 'string', required: false },
  }
}))

export const Person = defineDocumentType(() => ({
  name: 'Person',
  filePathPattern: `person/**/*.md`,

  fields: {
    ...coreFields,
    portrait: { type: 'string', required: false },
    author: { type: 'json', of: Author, required: false },
    metadata: { type: 'json', required: false },
    description: { type: 'string', required: false },
    image: { type: 'string', required: false },
    profileLinks: {type: 'list', of: ProfileLinks },
    notionId: { type: 'string', required: false },
  },
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `page/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    ...coreFields,
    featuredImage: { type: 'string', required: false },
    route_name: { type: 'string', required: true },
    metadata: { type: 'json', required: false },
    redirect: { type: 'string', required: false },
    subject: { type: 'string', required: false },
    image: { type: 'string', required: false },
    notionId: { type: 'string', required: false },
  },
}))



export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `post/**/*.md`,
  fields: {
    ...coreFields,
    date: { type: 'date', required: true },
    featuredImage: { type: 'string', required: false },
    video: { type: 'string', required: false },
    category: { type: 'string', required: true },
    subtitle: { type: 'string', required: false },
    credits: { type: 'string', required: false },
    author: { type: 'json', of: Author, required: false },
    description: { type: 'string', required: false },
    redirect: { type: 'string', required: false },
    subject: { type: 'string', required: false },
    readingTime: { type: 'number', required: false },
    words: { type: 'number', required: false },
    video_script: {type: 'list', of: {type: 'string'}},
  },
}))

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Post, Page, Person, Portfolio],
});