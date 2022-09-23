import type { App } from 'vue'
import { VueQueryPlugin } from 'vue-query'

const install = (app: App) => {
  app.use(VueQueryPlugin)
}
export default install
