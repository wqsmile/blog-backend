const { sequelize, DataTypes } = require('./db')
/* 
  - id 博客id
  - content 文章内容
  - theme 主题(即博客分类)
  - title 标题
  - likes 点赞数
  - commentNum 评论数
  - browserNum 浏览数
  - isPublic 是否公开
  - isComment 允许评论
*/
const Blog = sequelize.define('Blog', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING
  },
  likes: {
    type: DataTypes.JSON,
    allowNull: false
  },
  commentNum: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  browserNum: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isPublic: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isComment: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  paranoid: true
})

module.exports = Blog