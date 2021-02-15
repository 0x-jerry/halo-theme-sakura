import { configs } from './config'

function decodeResponseData(data: any) {
  return data.data ? data.data : data
}

export async function get(path: string, data?: any) {
  const res = await configs.axios.get(path, {
    params: data,
  })

  return decodeResponseData(res.data)
}

export async function post(path: string, data?: any) {
  const res = await configs.axios.post(path, data)

  return decodeResponseData(res.data)
}

export async function put(path: string, data?: any) {
  const res = await configs.axios.put(path, data)

  return decodeResponseData(res.data)
}

export async function remove(path: string, data?: any) {
  const res = await configs.axios.delete(path, { params: data })

  return decodeResponseData(res.data)
}
