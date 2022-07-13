import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use((ctx) => {
  Object.values(import.meta.globEager('./modules/*.ts')).forEach((i) =>
    i.install?.(ctx)
  )
})

app.mount('#app')
