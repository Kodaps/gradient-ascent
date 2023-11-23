// contentlayer.config.ts
import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'


const Image = defineNestedType(() => ({
  name: 'Image',
  fields: {
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
    src: { type: 'string', required: true },
  },
}))

export const Portfolio = defineDocumentType(() => ({
  name: 'Portfolio',
  filePathPattern: `portfolio/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    location: { type: 'string', required: true },
    enabled: { type: 'boolean', required: true },
    slug: { type: 'string', required: true },
    notionId: { type: 'string', required: true },
    tags: {type: 'list', of: {type: 'string'}},
    image: { type: 'json',  of: Image, required: false },
  },
}))

export default makeSource({ contentDirPath: 'src/content', documentTypes: [Portfolio] })