import axios from 'axios'
import Koa, { Middleware } from 'koa'
// @ts-ignore
import { Nuxt, Builder } from 'nuxt'
// import proxy from 'koa-better-http-proxy'
import nuxtConfig from '../nuxt.config'
import { createHaloApi } from './halo-api'
import { router } from './router'

require('dotenv').config()

const haloTarget = process.env.HALO_TARGET!

const isDev = process.env.NODE_ENV !== 'production'

const url = new URL(haloTarget)

const proxyConf = {
  target: url.toString(),
  https: url.protocol === 'https:',
  headers: {
    'API-Authorization': process.env.HALO_ACCESS_KEY,
  },
}

async function main() {
  const app = new Koa()

  const nuxt = new Nuxt(nuxtConfig)

  await nuxt.ready()

  if (isDev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  const haloProxy = createProxy({
    target: proxyConf.target,
    headers: proxyConf.headers,
  })

  const haloApi = createHaloApi()

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx, next) => {
      const reqPath = ctx.request.path

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

function createProxy(opt: {
  target: string
  headers: Record<string, any>
}): Middleware {
  const instance = axios.create({
    baseURL: opt.target,
    headers: opt.headers,
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
