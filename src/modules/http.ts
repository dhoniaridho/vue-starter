import axios from 'axios'
import type { App } from 'vue'
import { appConfig } from '~/config'

const http = axios.create({
  baseURL: appConfig.api.base_url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
const install = (app: App) => {
  app.provide('http', http)
}

console.log(appConfig)

export { http }
export default install
