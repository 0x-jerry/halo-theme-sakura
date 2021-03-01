import { Router } from 'vue-router'
import { isSSR } from '../utils'
import NProgress from 'nprogress'

export function NProgressPlugin(router: Router) {
  if (isSSR) {
    return
  }

  NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50,
  })

  router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })

  router.afterEach((to, from) => {
    if (from === router.currentRoute.value) {
      return
    }

    NProgress.done()
  })
}
