/**
 * Created by dapaer on 16/10/6.
 */
var xlsx = require('node-xlsx');
var excelHelper = {
    importExcel : function(fileName){
      //  console.error(filename);
        var obj = xlsx.parse(fileName);
        console.log(JSON.stringify(obj));
        return obj;

    }
}
module.exports = excelHelper;