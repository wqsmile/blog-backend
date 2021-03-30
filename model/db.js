const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('smileblog', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})
  /**
   * 测试连接
   */
  ; (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })()

module.exports = { sequelize, DataTypes }