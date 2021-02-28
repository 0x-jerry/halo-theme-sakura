import { isRef, onMounted, onUnmounted, Ref } from 'vue'
import { isSSR } from '../utils'

let observer: IntersectionObserver | null = null

export const globalUtils = {
  observer,
}

const elMap = new WeakMap<any, Function>()

export function useObserve(
  el: Element | Ref<Element>,
  onChanged?: (visible: boolean) => void
) {
  if (isSSR) {
    return
  }

  onMounted(() => {
    if (!observer) {
      initObserver()
    }

    const ee = isRef(el) ? el.value : el

    if (ee && onChanged) {
      observer?.observe(ee)

      elMap.set(ee, onChanged)
    }
  })

  onUnmounted(() => {
    const ee = isRef(el) ? el.value : el
    if (ee) {
      observer?.unobserve(ee)
    }
  })
}

function initObserver() {
  if (isSSR) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0) {
            const func = elMap.get(entry.target)

            if (func) {
              func(true)
            }

            observer?.unobserve(entry.target)
          }
        }
      })
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: buildThresholdList(),
    }
  )
}

function buildThresholdList() {
  const thresholds = []
  const numSteps = 20

  for (let i = 1.0; i <= numSteps; i++) {
    const ratio = i / numSteps
    thresholds.push(ratio)
  }

  thresholds.push(0)
  return thresholds
}
