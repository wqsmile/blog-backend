const Router = require('koa-router')
const { asyncHandler } = require('../getSendResult')
const wordCloudServ = require('../../service/wordCloudServ')
const router = new Router()

router.get('/wordCloud', asyncHandler(async () => {
  return await wordCloudServ.getWordCloud()
}))


router.del('/wordCloud', asyncHandler(async ctx => {
  return await wordCloudServ.delWordCloud(ctx.query.id)
}))

router.post('/wordCloud', asyncHandler(async ctx => {
  return await wordCloudServ.setWordCloud(ctx.request.body)
}))

module.exports = router