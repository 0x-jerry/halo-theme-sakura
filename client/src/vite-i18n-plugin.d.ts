declare module 'vite-i18n-plugin' {
  import { I18n } from 'vue-i18n'

  export const i18n: I18n

  export const messages: Record<string, any>
}
