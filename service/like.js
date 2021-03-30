const Blog = require('../model/blog')
const validate = require('validate.js')
const { cLikeRule } = require('./rules/like')
const returnErr = require('../util/returnErr')

exports.like = async function (params) {
  const { id, userId, isLike = true } = params
  return validate.async({ id, userId, isLike }, cLikeRule).then(async () => {
    return await Blog.findByPk(id).then(async blog => {
      let { likes } = blog.toJSON()
      if (!likes) {
        likes = []
      }
      if (isLike) {
        likes.push(userId)
      } else {
        likes.splice(likes.indexOf(userId), 1)
      }
      return await blog.update({ likes })
    }) ? true : null
  }).catch(err => returnErr(err))
}