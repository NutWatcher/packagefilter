/**
 * Created by lyy on 2017/6/8.
 */
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const moment = require('moment');
//const sqlite = require("../util/sqlite");
const DB = require("../util/mysql");
const mysqlFormat = require('mysql').format ;
const config = require('../../config/site_config').config;
const readFile = async (fileName, taskId) => {
    console.log("readFile in");
    let tempSql = "";
    try {
        let workbook = XLSX.readFile(path.join(config.uploadDir, fileName));
        let sheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[sheetName];

        let orderCount = 0;
        let orderList = [];
        for (let i = 2; i < 50000; i++) {
            let tempOrderIndex = 'G' + i.toString();
            if (worksheet[tempOrderIndex] == undefined || worksheet[tempOrderIndex].v == '') {
                break;
            }
            let tempOrder = worksheet[tempOrderIndex].v;
            let tempPost = worksheet['I' + i.toString()] ? worksheet['I' + i.toString()].v.toString() : "000000";
            orderCount++;
            orderList.push({
                tempOrder: tempOrder.replace(/\s/g,""),
                tempPost: tempPost.replace(/\s/g,"")
            });
        }
        //let insertOrderList = [];
        for (let i = 0 ; i < orderList.length ; i ++){
            tempSql = mysqlFormat("insert into `package` (task_id, order_number, post) values (?, ?, ?)",
                [taskId, orderList[i].tempOrder, orderList[i].tempPost]);
            await DB.queryDbPromise(tempSql);
            if (i%100 == 0){
                console.log(i);
            }
        }
        tempSql = mysqlFormat("UPDATE `task` set `num` = ? , `status` = ? where `id` = ? ", [orderCount, '准备导入', taskId]);
        DB.queryDbPromise(tempSql);
        console.log('导入完成');
    }
    catch(e){
        console.log(e);
        tempSql = mysqlFormat("UPDATE `task` set `status` = ? where `id` = ? ", ['读取文件出错', taskId]);
        DB.queryDbPromise(tempSql);
    }
};
module.exports = (router) => {
    router.post('/admin/uploadPackageFile', async(ctx, next) => {
        console.log("uploadPackageFile in");
        let tempSql = "";
        try {
            const file = ctx.request.body.files.packageFile;
            const reader = fs.createReadStream(file.path);
            let newFileName = moment().format('YYYYMMDD-HHmmss') + file.name;
            const stream = fs.createWriteStream(path.join(config.uploadDir, newFileName));
            reader.pipe(stream);
            console.log('uploading %s -> %s', file.name, stream.path);

            tempSql = mysqlFormat("insert into `task` (name, num, status) values (?, ?, ?)", [newFileName, 0, '读取中']);
            let res = await DB.queryDbPromise(tempSql);
            console.log(res.insertId);
            let taskId = res.insertId;
            ctx.body = {
                success: true,
                msg:""
            };
            next();
            readFile(newFileName, taskId);
        }
        catch (e){
            console.log(e);
            ctx.body = {
                success: false ,
                msg: e.toString()
            };
        }
    });
    router.get('/admin/taskList', async(ctx ) => {
        console.log("taskList in");
        let tempSql = "";
        try {
            tempSql = "select * from task order by id desc limit 100 ;";
            let res = await DB.queryDbPromise(tempSql);
            ctx.body = {
                success: true,
                msg:"",
                taskList:res
            };
        }
        catch (e){
            console.log(e);
            ctx.body = {
                success: false ,
                msg: e.toString()
            };
        }
    })
};