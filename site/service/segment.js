//noinspection JSUnresolvedFunction
/**
 * Created by lyy on 2017/6/11.
 */
const DB = require("../util/mysql");
//noinspection JSUnresolvedFunction
const mysqlFormat = require('mysql').format ;
let segmentList = [];
let segmentMap = new Map();
const initSegment = async() => {
    let tempSql = mysqlFormat("select * from segment" , []) ;
    segmentList = await DB.queryDbPromise(tempSql) ;
    segmentList.sort(function (a, b) {
        return a.start - b.start ;
    });
    for (let i = 0 ; i < segmentList.length ; i ++){
        segmentMap.set(segmentList[i].start, segmentList[i].value);
    }
    console.log(segmentList);
};
initSegment();
class Segment{
    static getSegmentByPost(post){
        let key = post.substring(0,4);
        console.log(key);
        let result = segmentMap.get(key) ;
        return result == undefined ? "没有对应号段": result ;
    }
}
//noinspection JSUnresolvedVariable
module.exports = Segment ;
