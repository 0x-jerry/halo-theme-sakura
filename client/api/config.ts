import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface IConfig {
  target: string
  accessKey: string
  axios: AxiosInstance
}

export const configs: IConfig = {
  target: '',
  accessKey: '',
  axios: null as any,
}

export function axiosRequestInterceptor(conf: AxiosRequestConfig) {
  // conf.headers['API-Authorization'] = configs.accessKey

  conf.url = conf.url?.replace(/\{\w+\}/g, (name) => {
    return conf.params[name.slice(1, name.length - 1)]
  })

  return conf
}

export function initConfig(opt: Partial<IConfig>) {
  Object.assign(configs, opt)

  configs.axios = axios.create({
    baseURL: configs.target,
  })

  configs.axios.interceptors.request.use(axiosRequestInterceptor)
}
