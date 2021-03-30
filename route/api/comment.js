const Router = require('koa-router')
const { asyncHandler } = require('../getSendResult')
const commentServ = require('../../service/commentServ')

const router = new Router()

router.post('/comment', asyncHandler(async ctx => {
  return await commentServ.comment(ctx.request.body)
}))

router.get('/getComment', asyncHandler(async ctx => {
  return await commentServ.getComment(ctx.query.id)
}))

module.exports = router