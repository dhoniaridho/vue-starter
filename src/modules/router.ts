import type { App } from 'vue'
import router from '~/router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const install = (app: App) => {
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

  router.afterEach(() => {
    Nprogress.done()
  })
  app.use(router)
}

export default install
