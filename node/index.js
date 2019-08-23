const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const loggerAsync = require('./server/middleware/logger-async');

const app = new Koa();
const router = new Router({ prefix: '/api' });
const port = 3000;                // 端口

app.use(loggerAsync());           // log中间件

// 首页
app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.status = 200
    ctx.response.body = 'index'
  }
  await next()
})

// 加载子路由
let urls = fs.readdirSync(__dirname + '/server/routers')
urls.forEach((element) => {
  let module = require(__dirname + '/server/routers/' + element)
  /*
    urls 下面的每个文件负责一个特定的功能，分开管理
    通过 fs.readdirSync 读取 routers 目录下的所有文件名，挂载到 router 上面
  */
  router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods()); 

app.listen(port, () => console.log('the server is starting at port 3000'));