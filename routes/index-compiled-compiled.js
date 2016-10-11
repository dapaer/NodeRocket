var express = require('express');
var router = express.Router();
var co = require('co');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //内置使用的是bluebird,现在换成原生的,后期有空再弄
var user = require('../models/user1').user;
mongoose.connect('mongodb://dapaer:dapaer@localhost:27017/node');
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
var saveAndGet = function* () {
  var result1 = yield user.saveEntity({ name: 'dapaer1' });
  var result2 = yield user.update({ _id: result1._id }, { name: "dapaer001" });
  var result3 = yield user.queryById({ _id: result1._id });
  return result3;
};

/* GET home page. */
router.get('/', function (req, res, next) {
  co(saveAndGet).then(function (data) {
    res.send(data); //render('index', { title: 'Express' });
  });
});

module.exports = router;

//# sourceMappingURL=index-compiled.js.map

//# sourceMappingURL=index-compiled-compiled.js.map