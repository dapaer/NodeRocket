var fs = require('fs');

var fileUtil = {};

/**
 * 遍历文件夹
 * @param path 文件路径
 * @author dapaer
 * @returns {Array}
 */
fileUtil.geFileList = geFileList;

fileUtil.readFile = readFile;

/**
 * 遍历文件夹
 * @param path 文件路径
 * @author dapaer
 * @returns {Array}
 */
function geFileList(path) {
    var filesList = [];
    readFile(path, filesList);
    return filesList;
}

/**
 * 读取文件夹所有文件，此处采取同步读取策略
 * @param path 文件路径
 * @param filesList 文件对象存储数组：[{size:xxx,name:xxx,path:xxx}]
 */
function readFile(path, filesList) {
    var files = fs.readdirSync(path); //需要用到同步读取
    files.forEach(walk);
    function walk(file) {
        var states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        } else {
            //创建一个对象保存信息
            var obj = new Object();
            obj.size = states.size; //文件大小，以字节为单位
            obj.name = file; //文件名
            obj.path = path + '/' + file; //文件绝对路径
            filesList.push(obj);
        }
    }
}

//写入文件utf-8格式
function writeFile(fileName, data) {
    fs.writeFile(fileName, data, 'utf-8', complete);
    function complete() {
        console.log("文件生成成功");
    }
}

module.exports = fileUtil;

//# sourceMappingURL=fileUtil-compiled.js.map