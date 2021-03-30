const validate = require('validate.js')
const Blog = require('../../model/blog')
const { numberRule, stringRule } = require('./rules')
/* 
验证文章发布
- id 博客 id
- authId 作者 id(即 userid 用户 id)
- content 文章内容
- theme 主题(即博客分类)
- title 标题
*/
exports.cBlogRule = {
  content: stringRule,
  title: stringRule,
  theme: stringRule,
  UserId: numberRule,
  CategoryId: numberRule
}
// 验证文章删除
exports.dBlogRule = {
  id: {
    presence: {
      allowEmpty: false
    },
    isExist: true
  }
}
// 获取文章列表
exports.rBlogsRule = {
  page: {
    presence: undefined,
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    }
  },
  limit: {
    presence: undefined,
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    }
  },
  categoryId: {
    presence: undefined,
    numericality: {
      onlyInteger: true,
      greaterThan: -1,
    }
  }
}
// 获取单个文章
exports.rBlogRule = {
  id: {
    presence: {
      allowEmpty: false
    }
  },
  ...exports.rBlogsRule
}
// 获取用户文章
exports.rUserBlogRule = {
  id: {
    presence: {
      allowEmpty: false
    }
  },
  ...exports.rBlogsRule
}

validate.validators.isExist = async function (id) {
  if (!await Blog.findByPk(id)) {
    return 'is not exist!'
  }
}