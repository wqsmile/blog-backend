const { sequelize, DataTypes } = require('./db')
/* 
  - id 精选id
  - blogId 博客id
  - img 图片
  - title 标题
  - userId 
  - desc 简介
*/
const Choiceness = sequelize.define('Choiceness', {
  blogId: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER
  },
  img: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  desc: {
    type: DataTypes.STRING
  }
}, {
  paranoid: true
})

module.exports = Choiceness