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
            let tempSql = mysqlFormat("select * from segment order by id desc ;", []);
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
                msg: e.toString()
            };
        }
    });
    router.post('/admin/addSegment', async(ctx, ) => {
        try {
            let startPost = ctx.request.body['startPost'];
            let endPost = ctx.request.body['endPost'];
            let segmentValue = ctx.request.body['segmentValue'];
            let tempSql = mysqlFormat("INSERT INTO `segment` (`start`, `end`, `value`) VALUES (?,?,?);",
                [startPost, endPost, segmentValue]);
            await DB.queryDbPromise(tempSql);
            ctx.body = {
                success: true
            };
        }
        catch (e){
            consle.log(e.toString());
            ctx.body = {
                success: false,
                msg: e.toString()
            };
        }
    })
    router.post('/admin/deleteSegment', async(ctx) => {
        try {
            let deleteId = ctx.request.body['id'];
            let tempSql = mysqlFormat("DELETE FROM `segment` WHERE `id`= ? ;", [deleteId]);
            await DB.queryDbPromise(tempSql);
            ctx.body = {
                success: true
            };
        }
        catch (e){
            consle.log(e.toString());
            ctx.body = {
                success: false,
                msg: e.toString()
            };
        }
    })
};