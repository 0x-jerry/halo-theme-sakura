import 'windi.css'
import './style/app.css'
import viteSSR from 'vite-ssr'
import routes from 'voie-pages'
import { createStore } from './store'
import { isSSR } from './utils'
import { Router } from 'vue-router'
import App from './App.vue'
/**
 * virtual module, implement at {@link '../vite/i18n.plugin.ts'}
 */
import { i18n } from 'vite-i18n-plugin'
import { NProgressPlugin, i18nPlugin } from './plugins'

export default viteSSR(
  App,
  { routes },
  async ({ app, initialState, router }) => {
    NProgressPlugin(router)

    app.use(i18n)

    const store = createStore()
    app.use(store)

    app.use(i18nPlugin)

    const r: Router = router

    if (isSSR) {
      await store.dispatch('serverInit')
      initialState.storeState = store.state
    } else {
      store.replaceState(initialState.storeState)
      // sync data that fetched in `beforeRouteEnter`
      r.currentRoute.value.meta.state = initialState.state
    }

    // provide app/store context for `beforeRouteEnter` hook
    r.beforeEach((to) => {
      to.meta.app = app
      to.meta.store = store
    })
  }
)
