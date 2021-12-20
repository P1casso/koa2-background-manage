const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const multer = require('koa-multer');
const logger = require('koa-logger')
const baseConfig = require('./config/base-config')
const uploadConfig = require('./config/upload-config')
const index = require('./routes/index')
// const users = require('./routes/users')
const admin = require('./routes/admin')
const news = require('./routes/apis/news')
const session = require("koa-session");
const staticServer = require('koa-static');
const errorHandle = require('./middleWare/error')
const passport = require('./middleWare/passport')
const bodyParser = require('koa-bodyparser');
const koaBody = require("koa-body");
const getUploadDirName = require("./utils/getUploadDirName");
const getUploadFileExt = require("./utils/getUploadFileExt");
const checkDirExist = require("./utils/checkDirExist");
const getUploadFileName = require("./utils/getUploadFileName");
const cors = require('koa2-cors');
const author = require('./routes/author');
const user = require('./routes/apis/user');

app.use(staticServer(__dirname , 'public'));

// error handler
onerror(app)
//session
app.keys = ['some secret hurr'];
app.use(session(baseConfig.session,app))

//middlewares
// app.use(bodyParser({
//    enableTypes:['json', 'form', 'text'],
//
// }))
//为了能上传文件，把bodyParser换成了koa-body 所有的 from表单都要加上 enctype="multipart/form-data"，不然会报错
app.use(koaBody({
 json:true,
  form: true,
  text: true,
  patchNode: true,
  multipart: true,
  encoding: 'gzip',
  formidable: {
    uploadDir: (__dirname, 'public/upload'),
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    onFileBegin: (name, file) => {
      console.log(file);
      // 获取文件后缀
      const ext = getUploadFileExt(file.name);
      // 最终要保存到的文件夹目录
      const dirName = getUploadDirName();
      const dir = (__dirname, `public/upload/${dirName}`);
      // 检查文件夹是否存在如果不存在则新建文件夹
      checkDirExist(dir);
      // 获取文件名称
      const fileName = getUploadFileName(ext);
      // 重新覆盖 file.path 属性
      file.path = `${dir}/${fileName}`;
      app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
      app.context.uploadpath[name] = `public/upload/${dirName}/${fileName}`;
    },
  }
}));


app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

//cors
app.use(cors(baseConfig.cors));

app.use(views(__dirname + '/views', {
  map:{html:'nunjucks'}
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(errorHandle)

//passport
app.use(passport.initialize())
app.use(passport.session())
// routes
app.use(index.routes(), index.allowedMethods())
app.use(news.routes(), news.allowedMethods())
app.use(admin.routes(),admin.allowedMethods())
app.use(author.routes(),author.allowedMethods())
app.use(user.routes(),user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app
