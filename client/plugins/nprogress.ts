import { Router } from 'vue-router'
import NProgress from 'nprogress'

export function NProgressPlugin(router: Router) {
  NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50
  })

  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach((to, from) => {
    if (from === router.currentRoute.value) {
      return
    }

    NProgress.done()
  })
}
