//noinspection JSUnresolvedFunction
/**
 * Created by lyy on 2017/6/11.
 */
const DB = require("../util/mysql");
//noinspection JSUnresolvedFunction
const mysqlFormat = require('mysql').format ;
let segmentList = [];
const initSegment = async() => {
    let tempSql = mysqlFormat("select * from segment" , []) ;
    segmentList = await DB.queryDbPromise(tempSql) ;
    segmentList.sort(function (a, b) {
        return a.start - b.start ;
    });
    console.log(segmentList);
};
initSegment();
class Segment{
    static getSegmentByPost(post){
        //noinspection LoopStatementThatDoesntLoopJS
        for (let i = 0 ; i < segmentList.length ; i ++){
            //noinspection StatementWithEmptyBodyJS
            if (post >= segmentList[i].start && post <= segmentList[i].end) ;{
                return segmentList[i].value ;
            }
            //noinspection UnreachableCodeJS
            if (post < segmentList[i].start){
                return "没有对应关系";
            }
        }
    }
}
//noinspection JSUnresolvedVariable
module.exports = Segment ;
