/**
 * Created by lyy on 2017/6/8.
 */
const moment = require('moment');
const sqlite3 = require('sqlite3').verbose();
const config = require('../../config/site_config').config;
const db = new sqlite3.Database(config.dbPath);
db.serialize(function () {
    console.info('-----数据库初始化成功-----');
});
exports.query = (SQLStr, param) => {
    return new Promise((resolve, reject)=>{
        db.get(SQLStr, param, function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};
exports.all = (SQLStr, param) => {
    return new Promise((resolve, reject)=>{
        db.all(SQLStr, param, function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};
exports.run = (SQLStr, param) => {
    return new Promise((resolve, reject)=>{
        db.run(SQLStr, param, function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};
exports.getATMByATMCode = function (ATM_code) {
    return when.promise(function (resolve, reject, notify) {
        db.get("SELECT * FROM atm_info where atm_code = ? ;" , [ATM_code], function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};
exports.insertOperation = function (ATM, ip, user, reason, operation) {
    var date = moment();
    var time = date.format('YYYY-MM-DD HH:mm:ss.SSS');
    return when.promise(function (resolve, reject, notify) {
        db.run("INSERT INTO operation VALUES (?,?,?,?,?,?);" , [ATM, user ,ip, reason, operation, time], function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}
exports.deleteATMStates = function (ATM) {
    return when.promise(function (resolve, reject, notify) {
        db.run("delete from atmstates where atm_code = (?);" , [ATM], function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}
exports.insertATMStates = function (ATM, states) {
    var date = moment();
    var time = date.format('YYYY-MM-DD HH:mm:ss.SSS');
    return when.promise(function (resolve, reject, notify) {
        db.run("INSERT INTO atmstates VALUES (?,?,?);" , [ATM, states, time], function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}
exports.getAllATMStates = function () {
    return when.promise(function (resolve, reject, notify) {
        db.all("SELECT * FROM atmstates;" , function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}
exports.insertATM_info = function (ATM, states) {
    return when.promise(function (resolve, reject, notify) {
        db.run("INSERT INTO atm_info VALUES (?,?,?,?,?,?,?);" ,
            [ATM.atm_code,ATM.atm_name,ATM.organization_code,ATM.atm_address, ATM.atm_ip, ATM.atm_brand , ATM.is_inbank],
            function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
    });
}
exports.changeATM_info = function (ATM, states) {
    return when.promise(function (resolve, reject, notify) {
        db.run("update atm_info set atm_name = $atm_name, organization_code = $organization_code," +
            " atm_address = $atm_address, atm_ip = $atm_ip, atm_brand = $atm_brand  where atm_code = $atm_code;" ,
            {
                $atm_code : ATM.atm_code,
                $atm_name : ATM.atm_name,
                $organization_code : ATM.organization_code,
                $atm_address : ATM.atm_address,
                $atm_ip : ATM.atm_ip,
                $atm_brand : ATM.atm_brand
            },
            function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
    });
}

exports.getOperationByPage = function (page) {
    return when.promise(function (resolve, reject, notify) {
        var start = page *10 - 10 ;
        var end = 10 ;
        db.all("SELECT * FROM operation order by time desc limit ? , ?;" ,[start,end], function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
}