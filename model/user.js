const { sequelize, DataTypes } = require('./db')

/* 
- username 用户名
- password 密码
- profile 头像
- desc 简介
- tag 标签

*/
const User = sequelize.define('User', {
  // 在这里定义模型属性
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile: {
    type: DataTypes.STRING,
  },
  desc: {
    type: DataTypes.STRING
  },
  tag: {
    type: DataTypes.JSON
  }
}, {
  paranoid: true
});

module.exports = User