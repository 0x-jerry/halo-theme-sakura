import { isSSR } from '../utils'
import { globalConfigs } from '../configs'
import { initConfig } from './contentApi'
import { CategoryDTO, TagDTO } from './contentApiDefine'
import axios from 'axios'

export * from './contentApiDefine'
export * from './contentApi'

export const target = globalConfigs.isDev
  ? 'http://localhost:9555'
  : isSSR
  ? 'http://localhost:9556'
  : ''

export const axiosInstance = axios.create({
  baseURL: target,
})

initConfig({
  target,
})

// fix typedef
export interface TagDTOMore extends TagDTO {
  postCount: number
}

export interface CategoryDTOMore extends CategoryDTO {
  postCount: number
}
