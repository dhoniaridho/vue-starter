import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

const plugins = import.meta.glob('./plugins/*.ts', {
  eager: true
})

Object.values(plugins).forEach((module: any) => {
  app.use(module.default)
})

app.mount('#app')
