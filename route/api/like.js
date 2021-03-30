const Router = require('koa-router')
const { asyncHandler } = require('../getSendResult')
const likeServ = require('../../service/like')

const router = new Router()

router.put('/like', asyncHandler(async ctx => {
  return await likeServ.like(ctx.request.body)
}))

module.exports = router