/**
 * Created by dapaer on 16-3-13.
 */
var mysql = require('mysql');
var config = require('./Config.js');
var dataUtil = require('./dataUtil.js');
var bluebird = require("bluebird");
if (dataUtil.isEmpty(global.dbPool)) {
    global.dbPool = mysql.createPool(config.dbInfo);
}

//数据库操作帮助对象
var dbHelper = function () {

    //sql对象
    var sqlObj = {
        sql: '',
        params: [],
        searchSql: "",
        setDataParam: {},
        insertData:{}
    }

    //操作符标识对象
    var opObj = {
        $lt: '<',
        $le: '<=',
        $gt: '>',
        $ge: '>=',
        $eq: '=',
        $order: ' order by ',
        $in: ' in ',
        $nin: ' not in ',
        like: ' like ',
        llike: ' like ',
        rlike: ' like '
    }

    /**
     * 是否自动清空流数据
     * @type {boolean}
     */
    var isAutoFlush = false;
    var autoFilter = false;


    /**
     * 计算表达式
     */
    var calcuteExpression = function (key, value) {
        var returnExpression = 'and ' + key + " ";
        console.info("value",value);
        if (!dataUtil.isEmpty(value)) {
            if (!dataUtil.isEmpty(value.op)) {
                if (!dataUtil.isEmpty(opObj[value.op])) {
                    if (value.op == '$in') {
                        returnExpression += ' in (';
                        for (var i = 0; i < value.value.length; i++) {
                            returnExpression += "?,";
                            sqlObj.params.push(value.value);
                        }
                        returnExpression = returnExpression.substr(0, returnExpression.length - 1);
                        returnExpression += ') ';
                    }
                    switch (value.op) {
                        case '$in':
                            returnExpression += ' in (';
                            for (var i = 0; i < value.value.length; i++) {
                                returnExpression += "?,";
                                sqlObj.params.push(value.value[i]);
                            }
                            returnExpression = returnExpression.substr(0, returnExpression.length - 1);
                            returnExpression += ') ';
                            break;
                        case '$nin':
                            returnExpression += ' not in (';
                            for (var i = 0; i < value.value.length; i++) {
                                returnExpression += "?,";
                                sqlObj.params.push(value.value[i]);
                            }
                            returnExpression = returnExpression.substr(0, returnExpression.length - 1);
                            returnExpression += ') ';
                            break;
                        case 'like':
                            returnExpression += " like '%" + value.value + "%' ";
                            break;
                        case 'llike':
                            returnExpression += " like '%" + value.value + "' ";
                            break;
                        case 'rlike':
                            returnExpression += " like '" + value.value + "%' ";
                            break;
                        default:
                            returnExpression += opObj[value.op] + " ? ";
                            sqlObj.params.push(value.value);
                            break;
                    }
                }
            }else{
                console.info("value1",returnExpression,value);
                returnExpression += " =  ? ";
                sqlObj.params.push(value);
                return returnExpression;
            }
        } else {
            returnExpression += " =  ? ";
            sqlObj.params.push(value.value);
            return returnExpression;
        }

        return returnExpression;
    }


    /**
     * 计算sql
     * @param queryObj 查询对象
     * @param mode 模式
     */
    var calcuteSql = function (queryObj, mode) {
        for (key in queryObj) {
            sqlObj.searchSql += calcuteExpression(key, queryObj[key]);
        }
    }


    var combindSql = function (mode, table) {
        switch (mode) {
            case 'query':
                sqlObj.sql = 'select * from ' + table + ' where 1=1 ' + sqlObj.searchSql;
                break;
            case 'delete':
                sqlObj.sql = 'delete from ' + table + ' where 1=1 ' + sqlObj.searchSql;
                break;
            case 'update':
                var setDataSql = " set ";
                for (var key in sqlObj.setDataParam) {
                    setDataSql += key + " = " + sqlObj.setDataParam[key] + ",";
                }
                setDataSql = setDataSql.substr(0, setDataSql.length - 1);
                sqlObj.sql = 'update ' + table + setDataSql + ' where 1=1 ' + sqlObj.searchSql;
                break;
            case 'insert':
                sqlObj.sql = 'INSERT INTO ' + table + '(';
                var valueStr ="";
                for (var key in sqlObj.insertData) {
                    sqlObj.sql+=key+',';
                    valueStr +=  "?,";
                    sqlObj.params.push(sqlObj.insertData[key]);                  
                }
                sqlObj.sql = sqlObj.sql.substr(0, sqlObj.sql.length - 1);
                valueStr = valueStr.substr(0, valueStr.length - 1);
                sqlObj.sql+=') VALUES ('+valueStr+')';
                break;
        }
    }
    var setAutoFlush = function (flag) {
        isAutoFlush = flag;
    }
    var setAutoFilter = function (flag) {
        autoFilter = flag;
    }

    return {
        /**
         * 清空流方法（若设置为自动，每次执行操做后会自动调用次方法）
         */
        flush: function () {
            setAutoFilter(false);
            sqlObj.sql= '';
            sqlObj.params= [];
            sqlObj.searchSql= '';
            sqlObj.setDataParam= {};
            sqlObj.insertData={};
        },
        /**
         * 配置dbHelper的一些相关信息{isAutoFlush//是否自动刷新流;autoFilter://是否自动过滤}
         * @param option
         */
        config: function (option) {
            for (var key in option) {
                if (!dataUtil.isEmpty(option[key])) {
                    dbHelper[key] = option[key];
                }
            }
        },
        /**
         * 查询方法
         * @param tableName 表名
         * @param queryObj 查询对象
         * @param callback 回教函数
         * @returns {*}
         */
        query: function (tableName, queryObj, callback) {
            return new Promise(function (resolve, reject) {
                calcuteSql(queryObj);
                combindSql('query', tableName);
                console.log("this is query",sqlObj.sql)
                global.dbPool.getConnection(function (err, conn) {
                    if (err) console.log("POOL ==> " + err);
                    conn.query(sqlObj.sql, sqlObj.params, function (err, rows) {
                        conn.release();
                        if(dataUtil.isFunction(callback)){
                            resolve(callback(err, rows));
                        }else{
                            resolve(rows);
                        }
                    });
                });
            });

        },
        /**
         * 删除方法
         * @param tableName 表名
         * @param queryObj 查询对象
         * @param callback 回教函数
         * @returns {*}
         */
        delete: function (tableName, queryObj, callback) {
            return new Promise(function (resolve, reject) {
                calcuteSql(queryObj);
                combindSql('delete', tableName);
                console.error(sqlObj.sql)
                global.dbPool.getConnection(function (err, conn) {
                    if (err) console.log("POOL ==> " + err);

                    conn.query(sqlObj.sql, sqlObj.params, function (err, rows) {
                        conn.release();
                        if(dataUtil.isFunction(callback)){
                            resolve(callback(err, rows));
                        }else{
                            resolve(rows);
                        }
                    });
                });
            });

        },
        /**
         * 更新方法
         * @param tableName 表名
         * @param queryObj 查询对象
         * @param callback 回教函数
         * @returns {*}
         */
        update: function (tableName,queryObj,setDataParam ,callback) {
            return new Promise(function (resolve, reject) {
                calcuteSql(queryObj);
                combindSql('update', tableName);
                sqlObj.setDataParam = setDataParam || {};
                //FIXME 这里应该是需要抛出异常的
                console.error(sqlObj.sql)
                global.dbPool.getConnection(function (err, conn) {
                    if (err) console.log("POOL ==> " + err);

                    conn.query(sqlObj.sql, sqlObj.params, function (err, rows) {
                        conn.release();
                        if(dataUtil.isFunction(callback)){
                            resolve(callback(err, rows));
                        }else{
                            resolve(rows);
                        }
                    });
                });
            });

        },
        /**
         * 更新方法
         * @param tableName 表名
         * @param queryObj 查询对象
         * @param callback 回教函数
         * @returns {*}
         */
        insert: function (tableName,insertObj,callback) {
            return new Promise(function (resolve, reject) {
                insertObj.ID = dataUtil.generateID();
                sqlObj.insertData = insertObj;
                combindSql('insert', tableName);
                //FIXME 这里应该是需要抛出异常的
                global.dbPool.getConnection(function (err, conn) {
                    if (err) console.log("POOL ==> " + err);
                    conn.query(sqlObj.sql, sqlObj.params, function (err, rows) {
                        conn.release();
                        if(dataUtil.isFunction(callback)){
                            resolve(callback(err, rows));
                        }else{
                            resolve(rows);
                        }
                    });
                });
            });

        }
    }
}


module.exports = dbHelper;
