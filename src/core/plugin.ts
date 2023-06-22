import type { App } from 'vue'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

type Plugin = (app: App) => void

export function definePlugin(plugin: Plugin) {
  return plugin
}

type Middleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => unknown

export function defineMiddleware(middleware: Middleware) {
  return middleware
}
