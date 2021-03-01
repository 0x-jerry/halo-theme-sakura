import { Composer } from 'vue-i18n'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // i18n plugin
    t: Composer['t']
  }
}
