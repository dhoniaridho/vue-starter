import { createApp } from 'vue'
import 'virtual:svg-icons-register'

import App from './App.vue'

const app = createApp(App)

app.use((ctx) => {
  Object.values(import.meta.globEager('./modules/*.ts')).forEach((i) =>
    i.install?.(ctx)
  )
})

app.mount('#app')
