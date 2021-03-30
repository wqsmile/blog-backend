const validate = require('validate.js')
const returnErr = require('../util/returnErr')
const { cComRule, rComRule } = require('./rules/commentRule')
const Comment = require('../model/comment')
const Blog = require('../model/blog')

exports.comment = async function (params) {
  return await validate.async(params, cComRule).then(async () => {
    const BlogId = params.blogId
    delete params.blogId
    const newComment = {
      ...params
    }
    return await Comment.findOne({
      where: {
        BlogId
      }
    }).then(async comment => {
      if (comment) {
        // 不是首次评论
        await Comment.update({
          comments: [newComment, ...comment.toJSON().comments]
        }, {
          where: {
            BlogId
          }
        })
      } else {
        // 首次评论
        await Comment.create({
          comments: [newComment],
          BlogId
        })
      }
      // 评论数+1
      return await Blog.findByPk(BlogId).then(async blog => {
        return await blog.increment('commentNum')
      }) ? true : null
    })
  }).catch(err => returnErr(err))
}

exports.getComment = async function (BlogId) {
  return await validate.async({ id: BlogId }, rComRule).then(async () => {
    const res = await Comment.findOne({
      attributes: ['comments'],
      where: {
        BlogId
      }
    })
    if (res) {
      return res.toJSON().comments
    }
    return null
  }).catch(err => returnErr(err))
}