const { sequelize, DataTypes } = require('./db')
/* 
  - 
  id: 词云id
  title: '词云标题',
  num: '出现次数'
*/
const WordCloud = sequelize.define('WordCloud', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  num: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  paranoid: true
})

module.exports = WordCloud