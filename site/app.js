/**
 * Created by lyy on 2017/6/7.
 */
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaViews = require('koa-views');
let app = new Koa();
let index_router = require('./router/index');



// Must be used before any router is used
app.use(koaViews(path.join('../app'), { extension: 'ejs' }));
app.use(koaBody({ multipart: true }));


app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//app.use(index_router.routes());

// response
app.use(async (ctx) => {
   // await ctx.render('user', { user });
    await ctx.render("index.html");
    //ctx.body = {sdf:'Hello Koa'};
});

module.exports = app;