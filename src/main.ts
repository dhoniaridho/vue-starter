import { createApp } from 'vue'
import 'virtual:svg-icons-register'

import App from './App.vue'

const app = createApp(App)

Object.values(import.meta.glob('./modules/*.ts', { eager: true })).forEach(
  (i: any) => {
    app.use((ctx) => {
      i.install?.(ctx)
    })
  }
)

app.mount('#app')
