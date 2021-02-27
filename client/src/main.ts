import 'windi.css'
import './style/app.css'
import viteSSR from 'vite-ssr'
import routes from 'voie-pages'
import { i18n } from 'vite-i18n-plugin'
import { useI18n } from 'vue-i18n'
import { createStore } from './store'
import { isSSR } from './utils'
import App from './App.vue' // Vue or React main app

export default viteSSR(App, { routes }, ({ app, initialState }) => {
  const store = createStore()

  if (isSSR) {
    initialState.storeState = store.state
  } else {
    store.replaceState(initialState.storeState)
  }

  app.use(i18n)

  Object.defineProperty(app.config.globalProperties, 't', {
    get: () => {
      const { t } = useI18n()
      return t
    },
  })

  Object.defineProperty(app.config.globalProperties, 'locale', {
    get: () => {
      const { locale } = useI18n()
      return locale
    },
  })

  app.use(store)
})
