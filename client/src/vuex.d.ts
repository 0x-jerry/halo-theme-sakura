import { Composer } from 'vue-i18n'
import { Store } from 'vuex'
import { ISiteState } from './store'

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<ISiteState>
    t: Composer['t']
  }
}
