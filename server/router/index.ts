import Router from '@koa/router'
import { apiRouter } from './api'

export const router = new Router()

router.use(apiRouter.routes()).use(apiRouter.allowedMethods())
