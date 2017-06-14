//noinspection JSUnresolvedFunction
/**
 * Created by lyy on 2017/6/7.
 */
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaViews = require('koa-views');
const koaStatic = require('koa-static');


let app = new Koa();
let index_router = require('./router/index');



// Must be used before any router is used
console.log(__dirname + '/public');
app.use(koaStatic(__dirname + '/../public'));
app.use(koaViews(path.join('../app'), { extension: 'ejs' }));
app.use(koaBody({ multipart: true }));


app.use(async (ctx, next) => {  
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    const time = new Date().toLocaleString();
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms - ${time}`);
});

app.use(index_router.routes())
    .use(index_router.allowedMethods());

// // response
// app.use(async (ctx) => {
//    // await ctx.render('user', { user });
//     await ctx.render("admin.html");
//     //ctx.body = {sdf:'Hello Koa'};
// });

module.exports = app;