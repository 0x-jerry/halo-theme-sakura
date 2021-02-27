import { isSSR } from '../utils'
import { globalConfigs } from '../configs'
import { initConfig } from './contentApi'

export * from './contentApiDefine'
export * from './contentApi'

initConfig({
  target: globalConfigs.isDev
    ? 'http://localhost:9555'
    : isSSR
    ? 'http://localhost:9556'
    : '',
})
