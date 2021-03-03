import Koa from 'koa'
import cors from '@koa/cors'
import { haloAccessKey, haloTarget, isDev } from './config'
import { router } from './router'
import path from 'path'
import { serveViteBuild, serveViteDev } from './vite'
import { haloProxy } from './halo'
import c2k from 'koa-connect'
import { ViteDevServer } from 'vite'

const url = new URL(haloTarget)

const debug = require('debug')('sakura:server')

const proxyConf = {
  target: url.toString(),
  https: url.protocol === 'https:',
  accessKey: haloAccessKey
}

async function main() {
  const app = new Koa()

  const root = process.cwd()

  let vite: ViteDevServer | null = null

  if (isDev) {
    vite = await (await import('vite')).createServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: true
      }
    })

    app.use(
      cors({
        origin: '*'
      })
    )
  }

  app
    .use(async (ctx, next) => {
      const { request } = ctx
      debug('[server] start: %s', request.path)
      await next()
      debug('[server]   end: %s', request.path)
    })
    .use(router.routes())
    .use(router.allowedMethods())
    .use(haloProxy(proxyConf))

  if (isDev) {
    app.use(c2k(vite!.middlewares))
    app.use(serveViteDev(vite!))
  } else {
    app.use(serveViteBuild(path.join(__dirname, 'client')))
  }

  const port = isDev ? 9555 : 9556

  app.listen(port, () => {
    console.log('http://localhost:' + port)
  })

  return app
}

main()
