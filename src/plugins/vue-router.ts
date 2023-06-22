import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from '~pages'
// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts'
import { definePlugin } from '@/core'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default definePlugin((app) => {
  app.use(router)
})
