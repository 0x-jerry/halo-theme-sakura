import axios from 'axios'
import Router from '@koa/router'
import LRU from 'lru-cache'

export const apiRouter = new Router({
  prefix: '/capi'
})

const imageCache = new LRU({
  // 1 h
  maxAge: 1000 * 60 * 60,
  max: 100
})

apiRouter.get('/image/random', async (ctx) => {
  const { id } = ctx.query

  const hit = imageCache.get(id)

  if (hit) {
    ctx.body = hit
  } else {
    // docs: https://api.dongmanxingkong.com/suijitupian.html
    const { data } = await axios.get(
      'https://api.dongmanxingkong.com/suijitupian/acg/1080p/index.php?return=json'
    )
    ctx.body = data

    const isValidUrl = !/\/large\/\.jpg$/.test(data.imgurl)

    if (isValidUrl) {
      imageCache.set(id, data)
    }
  }
})
