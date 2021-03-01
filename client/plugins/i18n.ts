import { Plugin } from 'vue'
import { useI18n } from 'vue-i18n'

export const i18nPlugin: Plugin = (app) => {
  const globalProp = app.config.globalProperties

  def(globalProp, '$t', () => useI18n().t)
  def(globalProp, 'locale', () => useI18n().locale)
}

function def(obj: any, prop: string, getter: () => any) {
  Object.defineProperty(obj, prop, {
    get: getter,
  })
}
