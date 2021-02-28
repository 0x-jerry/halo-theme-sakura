import { Router } from 'vue-router'
import { isSSR } from '../utils'
import NProgress from 'nprogress'

export function NProgressPlugin(router: Router) {
  if (isSSR) {
    return
  }

  NProgress.configure({
    showSpinner: false,
  })

  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
