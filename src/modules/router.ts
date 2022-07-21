import type { App } from 'vue'
import router from '@/router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

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
  router.beforeResolve((to, from, next) => {
    Nprogress.start()
    next()
  })

  router.afterEach((to, from) => {
    Nprogress.done()
  })
  app.use(router)
}
