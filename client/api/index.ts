import { globalConfigs } from '../configs'
import { initConfig } from './contentApi'

export * from './contentApiDefine'
export * from './contentApi'

initConfig({
  target: globalConfigs.isDev
    ? 'http://localhost:9555'
    : process.server
    ? 'http://localhost:9556'
    : '',
})
