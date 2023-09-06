import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Layouts from 'vite-plugin-vue-layouts'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueDevTools(),
    vue(),
    vueJsx(),
    Pages({
      dirs: [
        {
          filePatern: '**/page.*',
          dir: 'src/app',
          baseRoute: '',
          filePattern: '**/page.vue'
        }
      ],
      exclude: ['**/components/**'],
      importMode: 'async',
      extensions: ['vue', 'tsx'],
      onRoutesGenerated(routes) {
        return routes.map((item) => {
          return {
            ...item,
            path: item.path.replace(/\/page$/, '')
          }
        })
      }
    }),
    Components({ resolvers: [NaiveUiResolver()] }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: ['vue', 'vue-router', 'vue-i18n', 'vue/macros', '@vueuse/head', '@vueuse/core'],
      dirs: ['src/composables', 'src/store', 'src/core'],
      vueTemplate: true,
      eslintrc: {
        enabled: true
      }
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default.layout'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
