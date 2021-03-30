const { sequelize, DataTypes } = require('./db')
/* 
  - id 分类id
  - name 名称
  - num 数量
*/
const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  num: {
    type: DataTypes.INTEGER
  }
}, {
  paranoid: true
})

module.exports = Category