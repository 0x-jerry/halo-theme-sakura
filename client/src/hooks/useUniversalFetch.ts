import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { Store } from 'vuex'
import { ISiteState } from '~/store'
import { isSSR } from '~/utils'

interface IUniversalFetchData {
  data?: any
  __used?: boolean
}

export async function useUniversalFetch(
  to: RouteLocationNormalizedLoaded,
  fetch: (store: Store<ISiteState>) => any | Promise<any>
) {
  const meta = to.meta as any
  const state: IUniversalFetchData | null = meta.state

  const isFetchedInServerSide = !!(state?.data && !state?.__used)

  if (isFetchedInServerSide) {
    state!.__used = true
    return state!.data
  }

  // todo: test
  const store = meta.store

  const data = await fetch(store)

  to.meta.state = {
    data,
    __used: !isSSR,
  }

  return data
}

export function useUniversalFetchData<T = any>(): T {
  const route = useRoute()
  const state: IUniversalFetchData | null = route.meta.state as any

  return state?.data
}
