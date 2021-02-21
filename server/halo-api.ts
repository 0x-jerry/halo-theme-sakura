import LRU from 'lru-cache'
import { Middleware } from 'koa'
import { createMarkdownRenderer } from './markdown'

const mdCache = new LRU({
  // 24 h
  maxAge: 1000 * 60 * 60 * 24,
  max: 100,
})

export function createHaloApi(): Middleware {
  const md = createMarkdownRenderer('/', {
    lineNumbers: true,
  })

  return (ctx) => {
    const req = ctx.request

    const postGetReg = /^\/api\/content\/(posts|sheets)\/[^/]+/

    if (postGetReg.test(req.path)) {
      try {
        const data = ctx.body.data
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
        console.log(error)
      }
      // console.log(req.path, ctx.body)
    }
  }
}
