import type { Store } from 'vuex'

export type MutationFunction<S, P> = (state: S, args: P) => void

export type Mutation<S> = Record<string, MutationFunction<S, any>>

export type Actions<S> = Record<string, (store: Store<S>, params?: any) => any>
