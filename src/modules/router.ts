import type { App } from 'vue'
import router from '@/router'

export const install = (app: App) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.auth)) {
      if (localStorage.getItem('name')) {
        next()
      } else {
        next('/')
      }
    } else {
      next()
    }
  })
  app.use(router)
}
