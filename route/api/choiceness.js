const Router = require('koa-router')
const { asyncHandler } = require('../getSendResult')
const choiceServ = require('../../service/choicenessServ')

const router = new Router()

router.post('/choice', asyncHandler(async ctx => {
  return await choiceServ.setChoiceness(ctx.request.body)
}))

router.get('/choice', asyncHandler(async () => {
  return await choiceServ.getChoiceness()
}))

router.delete('/choice', asyncHandler(async ctx => {
  return await choiceServ.delChoiceness(ctx.query.id)
}))

module.exports = router