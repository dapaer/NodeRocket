/**
 * Created by dapaer on 16-3-26.
 */
var Promise = require('bluebird');
module.exports = function(obj){
    return new Promise(function(resolve,reject){
        resolve(obj);
    });
};