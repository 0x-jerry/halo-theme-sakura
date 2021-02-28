import { Composer } from 'vue-i18n'

declare module '@vue/runtime-core' {
  // provide typings for `this.t`
  interface ComponentCustomProperties {
    t: Composer['t']
  }
}
