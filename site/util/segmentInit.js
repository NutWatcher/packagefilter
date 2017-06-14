/**
 * Created by lyy on 2017/6/14.
 */

const DB = require("../util/mysql");
const mysqlFormat = require('mysql').format ;
const segmentData = require('./segmentData.js').Data;
const initSegment = async () => {
    let tempSql = "INSERT INTO `segment` (`start`, `end`, `value`) VALUES ? ;";
    //segmentList = await DB.queryDbPromise(tempSql) ;
    for (let i = 0 ; i < segmentData.length ; i ++){
        let tempStr = segmentData[i] ;
        let tempArray = tempStr.split(",");
        if (tempArray.length <= 0 ){
            continue ;
        }
        //console.log(tempArray);
        let segmentValue = tempArray[0] ;
        let values = [];
        for (let j = 1 ; j < tempArray.length ; j ++){
            if (tempArray[j] == ""){
                continue ;
            }
            values.push([tempArray[j], tempArray[j], segmentValue]);
        }
        let sql = mysqlFormat("INSERT INTO `segment` (`start`, `end`, `value`) VALUES ? ;" , [values]) ;
        console.log(sql);
        await DB.queryDbPromise(sql);
    }
};
initSegment();