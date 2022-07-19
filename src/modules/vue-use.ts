import { createHead } from '@vueuse/head'
import type { App } from 'vue'

export const install = (app: App) => {
  const head = createHead()
  app.use(head)
}
