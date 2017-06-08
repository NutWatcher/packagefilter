/**
 * Created by lyy on 2017/6/7.
 */
let Router = require('koa-router');
let router = new Router();

router.get('/',async (ctx, next) =>  {
    console.log("in");
    await ctx.render("admin.html");
    console.log(ctx.request.query);
    console.log(ctx.query);
});

module.exports = router;