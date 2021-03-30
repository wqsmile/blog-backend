const Router = require('koa-router')
const userServ = require('../../service/userServ')
const { asyncHandler } = require('../getSendResult')
const { addToken } = require('../token')


const router = new Router()
// 注册
router.post('/register', asyncHandler(async ctx => {
  const { username, password } = ctx.request.body
  return await userServ.register(username, password)
}))
// 登录
router.post('/login', asyncHandler(async ctx => {
  const { username, password } = ctx.request.body
  const res = await userServ.login(username, password)
  if (res) {
    const token = addToken(res);
    return {
      ...res,
      token
    }
  }
  return null
}))

router.get('/info', asyncHandler(async ctx => {
  return await userServ.getInfo(ctx.query.id)
}))

router.post('/info', asyncHandler(async ctx => {
  return await userServ.setInfo(ctx.request.body)
}))


module.exports = router