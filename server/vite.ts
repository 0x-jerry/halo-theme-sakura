import path from 'path'
import fs from 'fs'
import serve from 'koa-static'
import { Middleware } from 'koa'
import { ViteDevServer } from 'vite'

export function serveViteDev(vite: ViteDevServer): Middleware {
  const manifest = {}

  return async (ctx) => {
    try {
      const url = ctx.request.originalUrl

      // always read fresh template in dev
      let template = fs.readFileSync(path.resolve('index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      const render = (await vite.ssrLoadModule('/client/entry-server.ts'))
        .render

      const { html, preloadLinks, initialState } = await render(url, manifest)

      const appHtml = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', html)
        .replace(
          '<!--initial-state-->',
          `<script>window.__INITIAL_STATE__=${JSON.stringify(
            initialState
          )}</script>`
        )

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

export function serveViteBuild(dist: string): Middleware {
  // This contains a list of static routes (assets)
  const { ssr } = require(`${dist}/server/package.json`)

  // The manifest is required for preloading assets
  const manifest = require(`${dist}/client/ssr-manifest.json`)

  // This is the server renderer we just built
  const { default: renderPage } = require(`${dist}/server/main.js`)

  const serveStatic = serve(path.join(dist, 'client'))

  return async (ctx, next) => {
    const { request, res } = ctx

    // Serve every static asset route
    for (const asset of ssr.assets || []) {
      if (request.path.startsWith('/' + asset)) {
        await serveStatic(ctx, next)
        return
      }
    }

    const url = request.url

    const { html } = await renderPage(url, {
      manifest,
      preload: true
    })

    res.end(html)
  }
}
