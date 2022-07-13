import { createPinia } from 'pinia'
import type { App } from 'vue'

export const install = (app: App) => {
  app.use(createPinia())
}
