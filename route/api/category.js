const Router = require('koa-router')
const { asyncHandler } = require('../getSendResult')
const categoryServ = require('../../service/categoryServ')
const blogServ = require('../../service/blogServ')

const router = new Router()

// 博客分类
router.get('/blogtype', asyncHandler(async () => {
  return await categoryServ.getBlogType()
}))

// 单个分类的博客
router.get('/type', asyncHandler(async ctx => {
  const { id, page, limit } = ctx.query
  return await categoryServ.getBlogByType(id, page, limit)
}))
module.exports = router