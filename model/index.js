require('./relation')
require('./user')
require('./blog')
require('./comment')
require('./category')
require('./choiceness')
require('./wordCloud')

const { sequelize } = require('./db')
sequelize.sync({ alter: true }).then(() => {
  console.log('mysql连接成功');
}).catch(err => {
  console.log('mysql连接失败', err);
})