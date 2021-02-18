import { Middleware } from 'koa'
import { createMarkdownRenderer } from './markdown'

export function createHaloApi(): Middleware {
  const md = createMarkdownRenderer('/', {
    lineNumbers: true,
  })

  return async (ctx, next) => {
    const req = ctx.request

    const postGetReg = /^\/api\/content\/posts\/[^/]+/

    if (postGetReg.test(req.path)) {
      try {
        const data = ctx.body.data
        const raw = data.originalContent
        data.formatContent = md.render(raw).html
      } catch (error) {
        console.log(error)
      }
      // console.log(req.path, ctx.body)
    }

    await next()
  }
}
