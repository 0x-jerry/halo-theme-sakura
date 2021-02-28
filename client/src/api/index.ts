import { isSSR } from '../utils'
import { globalConfigs } from '../configs'
import { initConfig } from './contentApi'
import { CategoryDTO, TagDTO } from './contentApiDefine'

export * from './contentApiDefine'
export * from './contentApi'

initConfig({
  target: globalConfigs.isDev
    ? 'http://localhost:9555'
    : isSSR
    ? 'http://localhost:9556'
    : '',
})

// fix typedef
export interface TagDTOMore extends TagDTO {
  postCount: number
}

export interface CategoryDTOMore extends CategoryDTO {
  postCount: number
}
