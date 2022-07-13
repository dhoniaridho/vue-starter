import axios from 'axios'
import type { App } from 'vue'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const install = (app: App) => {
  app.provide('http', http)
}
export default http
