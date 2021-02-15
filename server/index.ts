import Koa from 'koa'
// @ts-ignore
import { Nuxt, Builder } from 'nuxt'
import proxy from 'koa-better-http-proxy'
import nuxtConfig from '../nuxt.config'

require('dotenv').config()

const host = process.env.HALO_TARGET!

const url = new URL(host)

const proxyConf = {
  target: url.host,
  https: url.protocol === 'https:',
  headers: {
    'API-Authorization': process.env.HALO_ACCESS_KEY,
  },
}

async function main() {
  const app = new Koa()

  const nuxt = new Nuxt(nuxtConfig)

  await nuxt.ready()

  const builder = new Builder(nuxt)
  await builder.build()

  app.use(async (ctx, next) => {
    if (ctx.request.path.startsWith('/api')) {
      await next()
    } else {
      ctx.res.statusCode = 200
      ctx.respond = false

      nuxt.render(ctx.req, ctx.res)
    }
  })

  app.use(
    proxy(proxyConf.target, {
      https: proxyConf.https,
      headers: proxyConf.headers,
    })
  )

  const port = 9555
  app.listen(port, () => {
    console.log('http://localhost:' + port)
  })

  return app
}

main().catch((e) => {
  console.log(e)
})
