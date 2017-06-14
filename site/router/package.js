//noinspection JSUnresolvedFunction
/**
 * Created by lyy on 2017/6/8.
 */
const DB = require("../util/mysql");
//noinspection JSUnresolvedFunction
const mysqlFormat = require('mysql').format ;
//noinspection JSUnresolvedFunction
const Segment = require("../service/segment");
//noinspection JSUnresolvedVariable
module.exports = (router) => {
    router.get('/getOrderInfo', async(ctx, ) => {
        try {
            let tempSql = mysqlFormat("select * from package where order_number = ? ; ", [ctx.request.query.order]);
            let result = await DB.queryDbPromise(tempSql);
            if (result.length == 0) {
                ctx.body = {
                    "segment" : "查无此订单",
                    "post" : ""
                }
            } else {
                let segment = Segment.getSegmentByPost(result[0].post);
                ctx.body = {
                    "segment" : segment,
                    "post" : result[0].post
                }
            }
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