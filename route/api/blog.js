const Router = require('koa-router')
const { asyncHandler } = require('../getSendResult')
const blogServ = require('../../service/blogServ')

const router = new Router()

// 获取博客列表
router.get('/blogs', asyncHandler(async ctx => {
  return await blogServ.getBlogs(ctx.query)
}))
// 获取搜索标题
router.get('/blogsTitle', asyncHandler(async ctx => {
  return await blogServ.getBlogsTitle(ctx.query)
}))
// 获取单个博客详情
router.get('/blog', asyncHandler(async ctx => {
  const { id } = ctx.query
  return await blogServ.getBlog(id)
}))
// 获取单个用户所有博客
router.get('/user', asyncHandler(async ctx => {
  const { id, page, limit } = ctx.query
  return await blogServ.getOwnerBlogs(id, page, limit)
}))
// 发布文章
router.post('/publish', asyncHandler(async ctx => {
  return await blogServ.publish(ctx.request.body)
}))
// 接收文章图片文件
router.post('/blogImg', asyncHandler(async ctx => {
  // console.log(ctx.request.files);
}))
// 删除文章
router.delete('/', asyncHandler(async ctx => {
  const { id } = ctx.query
  return await blogServ.deleteArticle(id)
}))

module.exports = router