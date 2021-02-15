import { api as contentApi } from './api/contentApi'
import { api as adminApi } from './api/adminApi'
import { initConfig } from './config'
import { apiInfo } from './api/info'

initConfig({
  target: 'http://localhost:9555',
})

export default {
  version: apiInfo.version,
  content: contentApi,
  admin: adminApi,
  initConfig,
}
