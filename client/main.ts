import 'windi.css'
import './style/app.css'
import routes from 'voie-pages'
import { createStore } from './store'
import { isSSR } from './utils'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
/**
 * virtual module, implement at {@link '../vite/i18n.plugin.ts'}
 */
import { i18n } from 'vite-i18n-plugin'
import { NProgressPlugin, i18nPlugin } from './plugins'
import { createSSRApp } from 'vue'

export async function createApp(initialState: Record<string, any>) {
  const router = createRouter({
    history: isSSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
  const store = createStore()
  const app = createSSRApp(App)

  app.use(router)
  app.use(store)

  app.use(i18n).use(i18nPlugin)

  if (isSSR) {
    try {
      await store.dispatch('serverInit')
      initialState.storeState = store.state
    } catch (error) {
      initialState.storeState = {
        error: String(error)
      }
    }
  } else {
    store.replaceState(initialState.storeState)
    router.currentRoute.value.meta.state = initialState.state
    NProgressPlugin(router)
  }

  router.beforeEach((to) => {
    to.meta.app = app
    to.meta.store = store
  })

  return { app, router }
}
