import Koa from 'koa'
// @ts-ignore
import { Nuxt, Builder } from 'nuxt'
import proxy from 'koa-better-http-proxy'
import nuxtConfig from '../nuxt.config'
import { createMarkdownRenderer } from './lib/markdown/markdown'

require('dotenv').config()

const host = process.env.HALO_TARGET!

const isDev = process.env.NODE_ENV !== 'production'

const url = new URL(host)

const proxyConf = {
  target: url.host,
  https: url.protocol === 'https:',
  headers: {
    'API-Authorization': process.env.HALO_ACCESS_KEY,
  },
}

const md = createMarkdownRenderer('/', {
  lineNumbers: true,
})

async function main() {
  const app = new Koa()

  const nuxt = new Nuxt(nuxtConfig)

  await nuxt.ready()

  if (isDev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

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

  const port = isDev ? 9555 : 9556
  app.listen(port, () => {
    console.log('http://localhost:' + port)
  })

  return app
}

main().catch((e) => {
  console.log(e)
})
