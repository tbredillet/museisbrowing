import { defineEventHandler } from 'h3'
import { loadContent } from '~/utils/contentManager'

export default defineEventHandler(() => {
  return loadContent()
})
