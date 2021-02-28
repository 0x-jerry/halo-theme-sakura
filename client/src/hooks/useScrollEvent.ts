import { onMounted, onUnmounted } from 'vue'
import { isSSR } from '../utils'

export function useScrollEvent(func: (e: Event) => void) {
  if (isSSR) {
    return
  }

  onMounted(() => {
    window.addEventListener('scroll', func)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', func)
  })
}
