import Koa from 'koa'
import cors from '@koa/cors'
import path from 'path'
import { haloAccessKey, haloTarget, isDev } from './config'
import { router } from './router'
import { serveViteBuild, serveViteDev } from './vite'
import { haloProxy } from './halo'
import { ViteDevServer } from 'vite'

const url = new URL(haloTarget)

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
    .use(router.routes())
    .use(router.allowedMethods())
    .use(haloProxy(proxyConf))

  if (isDev) {
    const c2k = (await import('koa-connect')).default
    app.use(c2k(vite!.middlewares))
    app.use(serveViteDev(vite!))
  } else {
    const [serve, vite] = serveViteBuild(path.join(__dirname, 'client'))
    app.use(serve)
    app.use(vite)
  }

  const port = isDev ? 9555 : 9556

  app.listen(port, () => {
    console.log('http://localhost:' + port)
  })

  return app
}

main()
