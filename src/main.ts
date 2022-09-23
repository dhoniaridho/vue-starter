import { createApp } from 'vue'
import 'virtual:svg-icons-register'

import App from './App.vue'

const app = createApp(App)

const modules = import.meta.glob('./modules/*.ts', {
  eager: true,
})
Object.values(modules).forEach((module: any) => {
  app.use((app) => {
    return module?.default(app)
  })
})

app.mount('#app')
