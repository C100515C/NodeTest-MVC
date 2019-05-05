///导入
const Koa = require('koa');
const router = require('koa-router')();
const controller = require('./controller');
const bodyparser = require('koa-bodyparser');// 处理 post 请求 request body 里面 表单或者json
const env = require('./Env');
///判断环境
const isProduction = process.env.NODE_ENV === 'production';
/// new Koa对象
const app = new Koa();
///记录URL以及页面执行时间
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});
///读取静态文件
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
// bodyparser  必须注册在 router 之前  因为 middleware 顺序很重要
app.use(bodyparser());
/// 读取view
app.use(env('views',{
    noCache: !isProduction,
    watch: !isProduction
}));
/// 处理请求
app.use(controller());
/// 监听端口
app.listen(8080);
console.log("list 8080 port!!");

