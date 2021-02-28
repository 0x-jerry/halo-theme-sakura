import { Store } from 'vuex'
import { ISiteState } from '../store'

export const sharedData: Record<string, any> = {}

export function useSharedStore() {
  return sharedData.$store as Store<ISiteState>
}
