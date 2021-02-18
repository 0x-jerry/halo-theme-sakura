import { globalConfigs } from '../configs'
import { api as contentApi } from './api/contentApi'
import { api as adminApi } from './api/adminApi'
import { initConfig } from './config'
import { apiInfo } from './api/info'

initConfig({
  target: globalConfigs.isDev
    ? 'http://localhost:9555'
    : 'http://localhost:9556',
})

export default {
  version: apiInfo.version,
  content: contentApi,
  admin: adminApi,
  initConfig,
}
