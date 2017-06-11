/**
 * Created by lyy on 2017/6/11.
 */
const DB = require("../util/mysql");
//noinspection JSUnresolvedFunction
const mysqlFormat = require('mysql').format ;
//noinspection JSUnresolvedFunction
const Segment = require("../service/segment");
//noinspection JSUnresolvedVariable
module.exports = (router) => {
    router.get('/admin/segmentList', async(ctx, ) => {
        try {
            let tempSql = mysqlFormat("select * from segment;", []);
            let result = await DB.queryDbPromise(tempSql);
            ctx.body = {
                success: true,
                segmentList: result
            };
        }
        catch (e){
            consle.log(e.toString());
            ctx.body = {
                success: false,
                segmentList: e.toString()
            };
        }
    })
};