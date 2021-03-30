const Category = require('../model/category')
const { rBlogRule } = require('./rules/blogRule')
const { validate } = require('validate.js')
const returnErr = require('../util/returnErr')
const Blog = require('../model/blog')

// 获取博客分类
exports.getBlogType = async function () {
  const res = await Category.findAll({
    attributes: ['id', 'name', 'num']
  })
  return JSON.parse(JSON.stringify(res))
}
// 获取单个分类
exports.getBlogByType = async function (id, page = 1, limit = 10) {
  return await validate.async({ id, page, limit }, rBlogRule).then(async () => {
    const res = await Blog.findAndCountAll({
      attributes: ['id', 'likes', 'commentNum', 'browserNum', 'createdAt', 'theme', 'title', 'img', 'CategoryId', 'desc'],
      where: {
        CategoryId: id
      },
      offset: (page - 1) * limit,
      limit: +limit
    })
    if (res) {
      return {
        total: res.count,
        data: JSON.parse(JSON.stringify(res.rows))
      }
    }
  }).catch(err => returnErr(err))
}