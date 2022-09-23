import { createPinia } from 'pinia'
import type { App } from 'vue'

const install = (app: App) => {
  app.use(createPinia())
}

export default install
