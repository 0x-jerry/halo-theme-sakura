import 'windi.css'
import './style/app.css'
import viteSSR from 'vite-ssr'
import routes from 'voie-pages'
import { i18n } from 'vite-i18n-plugin'
// import { useI18n } from 'vue-i18n'
import { createStore } from './store'
import { isSSR } from './utils'
import App from './App.vue' // Vue or React main app
import { Router } from 'vue-router'
import { NProgressPlugin } from './plugins'

export default viteSSR(
  App,
  { routes },
  async ({ app, initialState, router }) => {
    NProgressPlugin(router)

    app.use(i18n)

    const store = createStore()
    app.use(store)

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
