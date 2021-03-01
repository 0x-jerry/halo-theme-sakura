import path from 'path'
import { defineConfig } from 'vite'
import ViteSSR from 'vite-ssr/plugin'
import ViteComponents from 'vite-plugin-components'
import Vue from '@vitejs/plugin-vue'
import voie from 'vite-plugin-voie'
import WindiCSS from 'vite-plugin-windicss'
import { I18nPlugin } from './vite/i18n.plugin'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'client')}/`
    }
  },
  plugins: [
    Vue(),
    ViteSSR(),
    // https://github.com/antfu/vite-plugin-components#configuration
    ViteComponents({
      dirs: 'client/components'
    }),
    WindiCSS({
      scan: {
        dirs: ['client']
      }
    }),
    voie({
      pagesDir: 'client/pages'
    }),
    I18nPlugin(path.join(__dirname, 'client/locales'))
  ]
})
