import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)
console.log(routes)

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
