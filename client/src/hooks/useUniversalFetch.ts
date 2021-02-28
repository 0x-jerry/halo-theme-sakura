import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

interface IUniversalFetchData {
  data?: any
  __used?: boolean
}

export async function useUniversalFetch(
  to: RouteLocationNormalizedLoaded,
  fetch: () => any | Promise<any>
) {
  const state: IUniversalFetchData | null = to.meta.state as any

  if (state?.data && !state?.__used) {
    state.__used = true
    return state.data
  }

  const data = await fetch()
  to.meta.state = {
    data,
    __used: false,
  }

  return data
}

export function useUniversalFetchData<T = any>(): T {
  const route = useRoute()
  const state: IUniversalFetchData | null = route.meta.state as any

  return state?.data
}
