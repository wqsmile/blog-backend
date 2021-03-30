const Blog = require('./blog')
const User = require('./user')
const Category = require('./category')
const Comment = require('./comment')

User.hasMany(Blog)
Blog.belongsTo(User)

Category.hasMany(Blog)
Blog.belongsTo(Category)

Blog.hasMany(Comment)
Comment.belongsTo(Blog)