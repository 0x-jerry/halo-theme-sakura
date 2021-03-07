import path from 'path'
import fs from 'fs'
import serve from 'koa-static'
import { Middleware } from 'koa'
import { ViteDevServer } from 'vite'
import { checkInstall } from './halo'

const debug = require('debug')('sakura:vite')

export function serveViteDev(vite: ViteDevServer): Middleware {
  const manifest = {}

  return async (ctx) => {
    const ssrContext = getSSRContext()

    try {
      const url = ctx.request.originalUrl

      debug('url: %s', url)

      // always read fresh template in dev
      let template = fs.readFileSync(path.resolve('index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      const render = (await vite.ssrLoadModule('/client/entry-server.ts'))
        .render

      const { html, preloadLinks, initialState } = await render(
        url,
        manifest,
        ssrContext
      )

      const appHtml = renderHtml(template, { preloadLinks, html, initialState })

      ctx.status = 200
      ctx.set({ 'Content-Type': 'text/html' })
      ctx.body = appHtml
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      ctx.status = 500
      ctx.body = e.stack
    }
  }
}

export function serveViteBuild(dist: string): Middleware[] {
  const indexTpl = fs.readFileSync(`${dist}/client/index.html`, {
    encoding: 'utf-8'
  })

  const manifest = require(`${dist}/client/ssr-manifest.json`)

  // This is the server renderer we just built
  const render = require(`${dist}/server/entry-server.js`).render

  const serveStatic = serve(path.join(dist, 'client'), { index: false })

  return [
    serveStatic,
    async (ctx, next) => {
      const ssrContext = await getSSRContext()

      const url = ctx.request.url

      const { html, preloadLinks, initialState } = await render(
        url,
        manifest,
        ssrContext
      )

      const appHtml = renderHtml(indexTpl, { html, preloadLinks, initialState })

      ctx.body = appHtml
    }
  ]
}

async function getSSRContext() {
  return {
    isInstalled: await checkInstall()
  }
}

function renderHtml(
  template: string,
  opt: {
    preloadLinks: any
    html: any
    initialState: any
  }
) {
  const { preloadLinks, html, initialState } = opt
  return template
    .replace('<!--preload-links-->', preloadLinks)
    .replace('<!--app-html-->', html)
    .replace(
      '<!--initial-state-->',
      `<script>window.__INITIAL_STATE__=${JSON.stringify(
        initialState
      )}</script>`
    )
}
