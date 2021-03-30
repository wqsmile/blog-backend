const { sequelize, DataTypes } = require('./db')
/* 
  - id 博客id
  - comments 评论内容
*/
const Comment = sequelize.define('Comment', {
  comments: {
    type: DataTypes.JSON,
  }
}, {
  paranoid: true
})

module.exports = Comment