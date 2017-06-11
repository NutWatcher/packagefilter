//noinspection JSUnresolvedFunction
/**
 * Created by lyy on 2017/6/7.
 */

let Router = require('koa-router');
let router = new Router();

router.get('/',async (ctx) =>  {
    await ctx.render("work.html");
});
router.get('/admin',async (ctx) =>  {
    await ctx.render("admin/index.html");
});
router.get('/admin/segment',async (ctx) =>  {
    await ctx.render("admin/segment.html");
});

let package_router = require('./package');
let task_router = require('./task');
let segment_router = require('./segment');
package_router(router);
task_router(router);
segment_router(router);
module.exports = router;