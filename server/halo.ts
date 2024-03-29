import LRU from 'lru-cache'
import proxy from 'koa-better-http-proxy'
import { Context, Middleware } from 'koa'
import { createMarkdownRenderer } from './markdown'
import axios, { AxiosInstance } from 'axios'

const mdCache = new LRU({
  // 24 h
  maxAge: 1000 * 60 * 60 * 24,
  max: 100
})

async function rewriteHaloApi(ctx: Context) {
  const md = createMarkdownRenderer('/', {
    lineNumbers: true
  })

  const req = ctx.request

  const postGetReg = /^\/api\/content\/(posts|sheets)\/[^/]+/

  if (postGetReg.test(req.path)) {
    try {
      const body: any = ctx.body
      const data = body.data
      const raw = data.originalContent
      const hit = mdCache.get(raw)

      if (hit) {
        data.formatContent = hit
      } else {
        const html = md.render(raw).html
        mdCache.set(raw, html)
        data.formatContent = html
      }
    } catch (error) {
      console.log('rewrite halo api error', error)
    }
  }
}

export function haloProxy(proxyConf: any): Middleware[] {
  const haloProxy = createHaloProxy({
    target: proxyConf.target,
    accessKey: proxyConf.accessKey
  })

  const haloUrl = new URL(proxyConf.target)
  const haloAdminProxy = proxy(haloUrl.hostname, {
    https: haloUrl.protocol === 'https:',
    preserveReqSession: true,
    port: +haloUrl.port || undefined
  })

  const haloAdminPrefix = [
    '/admin',
    '/theme',
    '/api/admin',
    '/images',
    '/upload',
    '/rss.xml',
    '/sitemap.xml',
    '/sitemap.html'
  ]

  return [
    async (ctx, next) => {
      const reqPath = ctx.request.path

      if (/^\/admin(\/)?$/.test(reqPath)) {
        ctx.redirect('/admin/index.html')
        return
      }

      if (haloAdminPrefix.find((r) => reqPath.startsWith(r))) {
        return haloAdminProxy(ctx, next)
      }

      if (reqPath.startsWith('/api')) {
        await haloProxy(ctx, next)
        await rewriteHaloApi(ctx)
      } else {
        await next()
      }
    },
    async (ctx, next) => {
      const reqPath = ctx.request.path

      if (haloAdminPrefix.find((r) => reqPath.startsWith(r))) {
        return
      }

      await next()
    }
  ]
}

let axiosInstance: AxiosInstance | null = null

function createHaloProxy(opt: {
  target: string
  accessKey: string
}): Middleware {
  const instance = axios.create({
    baseURL: opt.target
  })
  axiosInstance = instance

  instance.interceptors.request.use((conf) => {
    if (conf.url?.match('/api/admin')) {
      conf.headers['admin-authorization'] = opt.accessKey
    } else {
      conf.headers['api-authorization'] = opt.accessKey
    }

    return conf
  })

  return async (ctx) => {
    const req = ctx.request
    const res = await instance.request({
      method: req.method as any,
      url: ctx.path,
      params: ctx.query,
      data: ctx.body
    })

    ctx.body = res.data
  }
}

let cacheInstalled = false
export async function checkInstall() {
  if (cacheInstalled) {
    return true
  }

  const res = await axiosInstance?.get('/api/admin/is_installed')

  cacheInstalled = !!res?.data?.data

  return cacheInstalled
}
