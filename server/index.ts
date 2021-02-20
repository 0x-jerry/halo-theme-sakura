import axios from 'axios'
import Koa, { Middleware } from 'koa'
import proxy from 'koa-better-http-proxy'
// @ts-ignore
import { Nuxt, Builder } from 'nuxt'
import nuxtConfig from '../nuxt.config'
import { haloAccessKey, haloTarget, isDev } from './config'
import { createHaloApi } from './halo-api'
import { router } from './router'

const url = new URL(haloTarget)

const proxyConf = {
  target: url.toString(),
  https: url.protocol === 'https:',
  accessKey: haloAccessKey,
}

async function main() {
  const app = new Koa()

  const nuxt = new Nuxt(nuxtConfig)

  await nuxt.ready()

  if (isDev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  const haloProxy = createHaloProxy({
    target: proxyConf.target,
    accessKey: proxyConf.accessKey,
  })

  const haloApi = createHaloApi()

  const haloUrl = new URL(haloTarget)
  const haloAdminProxy = proxy(haloUrl.host, {
    https: haloUrl.protocol === 'https:',
    preserveReqSession: true,
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx, next) => {
      const reqPath = ctx.request.path

      const haloAdminPrefix = ['/admin', '/theme', '/api/admin', '/images']

      if (/^\/admin(\/)?$/.test(reqPath)) {
        ctx.redirect('/admin/index.html')
        return
      }

      if (haloAdminPrefix.find((r) => reqPath.startsWith(r))) {
        return haloAdminProxy(ctx, next)
      }

      if (reqPath.startsWith('/api')) {
        await haloProxy(ctx, next)
        await haloApi(ctx, next)
      } else {
        ctx.res.statusCode = 200
        ctx.respond = false

        nuxt.render(ctx.req, ctx.res)
      }
    })

  const port = isDev ? 9555 : 9556

  app.listen(port, () => {
    console.log('http://localhost:' + port)
  })

  return app
}

main().catch((e) => {
  console.log(e)
})

function createHaloProxy(opt: {
  target: string
  accessKey: string
}): Middleware {
  const instance = axios.create({
    baseURL: opt.target,
  })

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
      data: ctx.body,
    })

    ctx.body = res.data
  }
}
