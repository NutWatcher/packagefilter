/**
 * Created by lyy on 2017/6/7.
 */
exports.config = {
    "dbPath": __dirname + "/../site/database.db",
    "uploadDir": __dirname + "/../site/upload",
    "dbConfig":{
        "host": "127.0.0.1",
        "port": "3306",
        "database": "packagefilter",
        "multipleStatements": false,
        "user": "root",
        "password": "root",
        "connectionLimit": 5
    }
};