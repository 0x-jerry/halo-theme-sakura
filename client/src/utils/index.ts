export * from './sharedData'

export const isSSR = import.meta.env.SSR

export function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
