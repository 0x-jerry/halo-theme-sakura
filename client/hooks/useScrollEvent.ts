import { onMounted, onUnmounted } from 'vue'
import { isSSR } from '../utils'

export function useScrollEvent(func: () => void, immediately = false) {
  if (isSSR) {
    return
  }

  onMounted(() => {
    window.addEventListener('scroll', func)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', func)
  })

  if (immediately) {
    func()
  }
}
