const validate = require('validate.js')
const { cBlogRule, dBlogRule, rBlogRule, rBlogsRule, blogImgRule } = require('./rules/blogRule')
const Blog = require('../model/blog')
const Category = require('../model/category')
const returnErr = require('../util/returnErr')
const { Op } = require('sequelize')
const throttle = require('../util/throttle')
const { setWordCloud } = require('./wordCloudServ')

// 获取博客列表
exports.getBlogs = async function (params = {}) {
  return await validate.async(params, rBlogsRule).then(async () => {
    const page = params.page || 1
    const limit = params.limit || 5
    const keyword = params.keyword || ''
    const categoryId = params.categoryId || 0
    const userId = params.userId || 0
    const searchType = params.searchType || ''
    const getPrivate = params.getPrivate
    const searchOp = searchType ? [{
      [searchType]: {
        [Op.like]: `%${keyword}%`
      }
    }] : [{
      content: {
        [Op.like]: `%${keyword}%`
      }
    },
    {
      title: {
        [Op.like]: `%${keyword}%`
      }
    },]
    const privateOp = getPrivate ? [] : [{
      isPublic: {
        [Op.eq]: 1
      }
    }]
    const res = await Blog.findAndCountAll({
      attributes: ['id', 'likes', 'commentNum', 'browserNum', 'createdAt', 'theme', 'title', 'img', 'CategoryId', 'desc'],
      where: {
        [Op.or]: searchOp,
        [Op.and]: [
          {
            CategoryId: {
              [categoryId == 0 ? Op.ne : Op.eq]: categoryId
            }
          },
          {
            UserId: {
              [userId == 0 ? Op.ne : Op.eq]: userId
            }
          },
          ...privateOp
        ],
      },
      offset: (page - 1) * limit,
      limit: +limit,
      order: [['createdAt', 'desc']]
    })
    keyword && res.count && setWordCloud(keyword)
    return {
      total: res.count,
      data: JSON.parse(JSON.stringify(res.rows))
    }
  }).catch(err => returnErr(err))
}

// 获取搜索列表标题
exports.getBlogsTitle = async function (params = {}) {
  return await validate.async(params, rBlogsRule).then(async () => {
    const page = params.page || 1
    const limit = params.limit || 10
    const keyword = params.keyword || ''
    const categoryId = params.categoryId || 0
    const userId = params.userId || 0
    const searchType = params.searchType || ''
    const searchOp = searchType ? [{
      [searchType]: {
        [Op.like]: `%${keyword}%`
      }
    }] : [{
      content: {
        [Op.like]: `%${keyword}%`
      }
    },
    {
      title: {
        [Op.like]: `%${keyword}%`
      }
    },]
    const res = await Blog.findAndCountAll({
      attributes: ['id', 'title'],
      where: {
        [Op.or]: searchOp,
        [Op.and]: [
          {
            CategoryId: {
              [categoryId == 0 ? Op.ne : Op.eq]: categoryId
            }
          },
          {
            UserId: {
              [userId == 0 ? Op.ne : Op.eq]: userId
            }
          }
        ],
        isPublic: 1,
      },
      // offset: (page - 1) * limit,
      // limit: +limit,
      order: [['createdAt', 'desc']]
    })
    return JSON.parse(JSON.stringify(res.rows))
  }).catch(err => returnErr(err))
}

// 根据博客id获取博客详情
exports.getBlog = async function (id) {
  return await validate.async({ id }, rBlogRule).then(async () => {
    return await Blog.findByPk(id).then(async blog => {
      throttle(() => blog.increment('browserNum'), 100000, id)
      if (blog) {
        return blog.toJSON()
      }
    })
  }).catch(err => returnErr(err))
}

// 单个用户的所有博客
exports.getOwnerBlogs = async function (id, page = 1, limit = 10) {
  return await validate.async({ id, page, limit }, rBlogsRule).then(async () => {
    const res = await Blog.findAndCountAll({
      where: {
        UserId: id,
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

/**
 * 文章发布
- id 博客 id
- UserId 作者 id(即 userid 用户 id)
- CategoryId
- content 文章内容
- theme 主题(即博客分类)
- title 标题
- likes 点赞数
- commentNum 评论数
- browserNum 浏览数
 */
exports.publish = async function (blogObj) {
  const newBlog = {
    likes: [],
    commentNum: 0,
    browserNum: 0,
    isPublic: 1,
    isComment: 1,
    ...blogObj,
  }
  newBlog.img = newBlog.img ? newBlog.img : 'logo.png'
  return await validate.async(newBlog, cBlogRule).then(async () => {
    const res = await Blog.create(newBlog)
    if (res) {
      return await Category.findByPk(res.toJSON().CategoryId).then(async cateModel => {
        return await cateModel.increment('num') ? true : null
      })
    }
  }).catch(err => returnErr(err))
}
// 删除
exports.deleteArticle = async function (id) {
  return await validate.async({ id }, dBlogRule).then(async () => {
    const res = await Blog.destroy({
      where: {
        id
      }
    })
    return res ? true : false
  }).catch(err => returnErr(err))
}
