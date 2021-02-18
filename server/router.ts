import LRU from 'lru-cache'
import Router from '@koa/router'
import axios from 'axios'

export const router = new Router({
  prefix: '/capi',
})

const imageCache = new LRU({
  // 1 h
  maxAge: 1000 * 60 * 60,
  max: 100,
})

router.get('/image/random', async (ctx) => {
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

    const isInvalidImg = data.imgurl === 'https://tvax4.sinaimg.cn/large/.jpg'

    if (!isInvalidImg) {
      imageCache.set(id, data)
    }
  }
})
