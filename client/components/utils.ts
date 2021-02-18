let observer: IntersectionObserver = null as any

if (process.client) {
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

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0) {
            entry.target.classList.add('visible')
            const e = new Event('can-visible')

            entry.target.dispatchEvent(e)
            observer.unobserve(entry.target)
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

export const globalUtils = {
  observer,
}
