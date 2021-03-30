const Koa = require('koa')
const koaBody = require('koa-body')
const userRouter = require('./api/user')
const blogRouter = require('./api/blog')
const categoryRouter = require('./api/category')
const commentRouter = require('./api/comment')
const likeRouter = require('./api/like')
const choiceRouter = require('./api/choiceness')
const wordCloudRouter = require('./api/wordCloud')
const cors = require('@koa/cors')
const koajwt = require('koa-jwt')

const app = new Koa()

const SECRET = 'smilerain'

app.use(cors())
app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    keepExtensions: true,    // 保持文件的后缀
    onFileBegin: (name, file) => { // 文件上传前的设置
      file.path = 'E:/VsCodes/vue/graduation-design/smileblog/public/imgs/' + file.name
    },
  }
}))
app.use(koajwt({ secret: SECRET }).unless({
  path: ['/login', '/register'],
  method: ['GET']
}))
app.use(userRouter.routes())
app.use(blogRouter.routes())
app.use(categoryRouter.routes())
app.use(commentRouter.routes())
app.use(likeRouter.routes())
app.use(choiceRouter.routes())
app.use(wordCloudRouter.routes())

app.listen(8000, () => {
  console.log('server连接成功');
})
