import { ref } from '@vue/reactivity'
import { isSSR } from '~/utils'

const isMobile = ref(false)

if (!isSSR) {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 680
  })

  isMobile.value = window.innerWidth < 680
}

export function useMobile() {
  return isMobile
}
